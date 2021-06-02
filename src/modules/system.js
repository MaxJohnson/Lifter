/**
 * Copyright 2018 Max Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

; (function ()
{
    log.debug("LOADING Lifter.system ...");
    var system = {};
    //var log = Lifter.log;

    /**
     * is the OS windows?
     * @returns {boolean}
     */
    system.isWindows = function isWindows ()
    {
        return $.os.match( /windows/i );
    };

    /**
     * is the OS mac?
     * @returns {boolean}
     */
    system.isMac = function isMac ()
    {
        return !system.isWindows();
    };

    system.files = {};

    /**
     * Verifies file exists and returns File object
     * @param {File, String} File object or file path.
     * @return {File} File object.
     */
    system.files.getFile = _ensureFile;

    /**
     * Returns true if path or object is a Folder
     * @method isDirectory
     * @param {File, Folder, String} File, Folder object or file path to test
     * @return {Boolean} True if directory Folder
     */
    system.files.isDirectory = system.files.isFolder = function isDirectory( myDir ) {
        return (File(myDir) instanceof Folder);
    };

    /**
     * Open and select (or not) the file or path in the OS file browser
     * @method browseTo
     * @param  {File,Folder,String} theFile File, Folder, or path string to open
     */
    system.files.browseTo = function browseTo( theFile ) {
        var cmd;
        var isDir = system.files.isDirectory(theFile);
        if(system.isMac()) {
            cmd = (isDir)?'open ':'open -R ';
        } else {
            cmd = (isDir)?'explorer.exe /n, ':'explorer.exe /select, ';
        }
        cmd += '\"' + new File(theFile).fsName + '\"';
        log.info("Browse to command: " + cmd.replace(/\\/g,'/').replace(/"/g,'\\"'));
        app.system(cmd);
    };

    /**
     * Eval one or more files
     * @param  {File or Folder } inFile File or Folder object to eval
     * @return {File or folder}        Same object ref that was passed in
     */
    system.files.eval = function (inFile)
    {
        inFile = _ensureFile(inFile);
        var jsxFiles = [inFile];

        if (File(inFile) instanceof Folder)//Wrapping in File() returns correct instance type
        {
            jsxFiles = Folder(inFile).getFiles( "*.jsx" );
        }
        jsxFiles.forEach(_evalFile);

        return inFile;
    };


    /**
     * File type mask to apply to path
     * @param  {String} fileName  path or file name to check
     * @param  {Array or String} masks file type masks (i.e. ["*.psd","*.tif"])
     * @return {Boolean}       True if path passes mask check
     */
    system.files.maskTest = function (fileName, masks, isExclude)
    {
        // escape early if no masks
        if( !masks || !masks.length ) return true;

        var reMask;
        var result = (!isExclude)?false:true;// flip defaults for excludes

        // if string, wrap in array
        if(typeof masks === "string"){ masks = [masks];}

        for(var m=0; m<masks.length; m++) {
            reMask = masks[m];

            // convert text filters like "*.txt" to regex
            if(typeof reMask == "string") {
                reMask = reMask.replace(/\./g,"\\.").replace(/\*/g,".*");
                reMask =  new RegExp(reMask+"$");
            }

            if(typeof reMask == "function" && fileName.search(reMask) !== -1) {
                result = (!isExclude)?true:false;
                break;
            }
        }
        return result;
    };

    /**
     * Exclude file type mask to apply to path. Opposite of maskTest()
     * @param  {String} fileName  path or file name to check
     * @param  {Array or String} masks file type masks (i.e. ["*.psd","*.tif"])
     * @return {Boolean}       True if path passes mask check
     */
    system.files.excludeTest = function (fileName, masks)
    {
        return system.files.maskTest(fileName, masks, true);
    };

    /**
     * Make directory with error checking
     * @param  {Folder/String} folder folder or path to create
     * @return {Boolean}       success result like folder.create()
     */
    system.files.makeDir = function makeDir( inFolder ) {
        inFolder = new Folder(inFolder);

        // create folder if missing
        if (!inFolder.exists) {
            log.debug("Creating new folder: " + inFolder.fsName);
            try {
                if( inFolder.create() === false ) {
                    log.error( "copyFiles: error creating directory "+inFolder.fsName);
                    return 0;
                }
            } catch (e) {
                log.error(e.message);
                return 0;
            }
        } else if ( inFolder.readonly ) {
            log.error( "copyFiles: directory is read only "+inFolder.fsName);
            return 0;
            // make writeable
            //inFolder.readonly = false;
        }
        return 1;
    };


    /**
     * Recurseively copy a file or folder path with options and dialogs
     * @param  {File/Folder} src     Source file or folder
     * @param  {File/Folder/String} dst     Destination file or folder
     * @param  {Object} options     Options to override defaults...
     *                                  {
     *                                     overwrite: true,// overwrite existing files
     *                                     silent: false,// no dialogs
     *                                     unlock:true,// unlock read-only files after copy
     *                                     nameOnly: true,// only test filename not full path for mask and excludes
     *                                     masks:[],//file masks (i.e. ["*.psd","*.tif"])
     *                                     excludes:[],//files to exclude (i.e. ["*.config","node_modules"])
     *                                     replacements:[]// list of pairs to replace in file name. ex. [["tmp","TheThing"],[" ","_"]]
     *                                  }
     * @return {Array}         Resulting list of File objects that were copied.
     */
    system.files.copy = function copyFiles( src, dst, options ) {
        // mutable vars accept file path or File/Folder handle...
        var srcFile = src;
        var dstFile = dst;
        var isFolder = File(srcFile) instanceof Folder;
        var maskResult = true;
        var excludeResult = true;
        var newFile;
        var newFileName;
        var newFilePath;
        var newFolder =  dstFile.parent;
        var subFiles;
        var subFile;
        var newSubFile;
        var result = [];// return val is array

        // if dst is folder, copy file name from src
        // if (isFolder) {
        //     dstFile = new Folder(dstFile.fsName+"/"+srcFile.name);
        // }

        // Passed Options
        if(typeof options !== "object") options = {};
        options.defaults(
            {
                overwrite: true,
                silent: false,
                unlock:true,
                nameOnly:true,
                masks:[],
                excludes:[],
                replacements:[],
                dialogId:1038876
            }
        );

        var maskPathType = (options.nameOnly)? 'name' : 'absoluteURI';

        // Dialog setup
        var dialogId = 1038876;
        var dialogArgs = { id:dialogId, skippable:true, buttons:["OK","Skip"]};
            dialogArgs.title = "Overwrite File?";
            dialogArgs.text = "Do you want to overwrite existing files?";
        var dialogResult;
        Lifter.dialogs.clearCached(dialogId);// clear or subsequent non-recursive calls pick up old input

        log.log( "\n[]------  system.files.copy()  ------[]" );
        // log.log( "options:" );
        // for(var opt in options) {
        //     if( !options.hasOwnProperty (opt) ) continue;
        //     log.log( "- "+opt+" : " + options[opt] );
        // }

        // log.log( "Src File: " + srcFile );
        // log.log( "Dst File: " + dstFile );

        // sanity check
        // log.log( "srcFile.exists "+srcFile.exists );
        if (!srcFile.exists || srcFile.name === ".DS_Store") { return; }

        // replace text in file name and path
        newFileName = dstFile.name;
        for(var r=0;r<options.replacements.length;r++) {
            var rep = options.replacements[r];
            newFileName = newFileName.replace(new RegExp(rep[0],'g'),rep[1]);

            if(!options.nameOnly) {
                newFolder = new Folder(newFolder.absoluteURI.replace(new RegExp(rep[0],'g'),rep[1]));
            }
        }

        newFilePath = newFolder.fsName + "/" + newFileName;
        newFile = File(newFilePath);

        // Mask tests to filter files
        maskResult = system.files.maskTest(srcFile[maskPathType], options.masks);
        excludeResult = system.files.excludeTest(srcFile[maskPathType], options.excludes);
        // excluded exits
        if(!excludeResult) { return; }
        // masks let directories pass through
        if(!maskResult && !isFolder) { return; }

        // don't make new directory unless mask passes or is file
        if(maskResult || !isFolder) {
            if(!system.files.makeDir(newFolder)) { return; }
        }

        log.log("-- Src: "+srcFile.fsName);
        log.log("-- Dst: "+new Folder(newFilePath).fsName);


        log.log("--- newFile.exists "+newFile.exists+" ---");

        // if src is folder process children
        if (isFolder) {
            // have to redefine from File to Folder or getFiles() breaks
            srcFile = new Folder(srcFile);
            // get file list from folder
            subFiles = srcFile.getFiles();

            //log.log( "\n---  dir  ---" );
            // log.log( '  SubFiles: ' + subFiles.length );
            // subFiles.forEach(function(subFile){
            //     log.log('   - '+subFile.name);
            // });

            for (var f in subFiles) {
                if( !subFiles.hasOwnProperty (f) ) continue;// sanity check for shims on for/in loops
                subFile = subFiles[f];
                // have to be explicitly defined in case we recurse with nonexistent folder
                if (subFile instanceof File) {
                    newSubFile = new File(newFile.fsName + "/" + subFile.name);
        		} else {
                    newSubFile = new Folder(newFile.fsName + "/" + subFile.name);
                }
                result = result.concat(system.files.copy(subFile, newSubFile, options));
            }
        }
        else {
            // if file exists and not silent mode, bring up confirm dialog
            if (newFile.exists && options.silent === false && typeof Lifter.dialogs.confirm === "function") {
                // Message
                if(!newFile.readonly) {
                    dialogArgs.text = "\"" + newFile.name + "\" already exists. Do you want to overwrite it?";
                }
                else {
                    dialogArgs.text = "\"" + newFile.name + "\" is set to Read-Only. It may be locked by Perforce. Do you want to overwrite it?";
                }

                dialogResult = Lifter.dialogs.confirm (dialogArgs);
                dialogCache = Lifter.dialogs.getCached(dialogId);

                options.overwrite = (dialogCache && dialogCache.value !== 1);
                options.silent = (dialogCache && dialogCache.skip === true);

                log.debug("dialogResult: " + (dialogResult));
                log.debug("dialogCache: " + (dialogCache));
                // log.log("dialogCache.value: " + (dialogCache.value));
                // for(var opt in options)
                // {
                //     if( !options.hasOwnProperty (opt) ) continue;
                //     log.log( opt+":" + options[opt] );
                // }
            }

            // Copy or skip?
            if( !newFile.exists || options.overwrite ) {
                try {
                    srcFile.copy(newFilePath);
                } catch (e) {
                    log.error(e.message);
                    return;// "error:copyFiles:could not copy file "+newFilePath+":"+ e.message;
                }

                // Sanity check and return error if missing
                newFile = File(newFilePath);
                if (! newFile.exists) {
                    log.error("copyFiles:file not created "+newFilePath+ ", "+ newFile.error);
                    return;
                }

                // make writeable
                if(options.unlock) newFile.readonly = false;

                // return copied file wrapped in array
                result = [newFile];
            } else {
                log.log ("User skipped this one...");
            }
        }
        // return list of copied files
        return result;
    };
    // system.files.copy = function copyFiles( src, dst, options ) {
    //     // mutable vars accept file path or File/Folder handle...
    //     var srcFile = new File(src);
    //     var dstFile = new File(dst);
    //
    //     // if folder, pass to copyDir like a snake eating its tail
    //     if (File(srcFile) instanceof Folder)
    //     {
    //         return system.files.copyDir(src, dst, options);
    //     }
    //
    //     // if dst is folder, copy file name from src
    //     if (File(dstFile) instanceof Folder)
    //     {
    //         dstFile = new File(dstFile.fsName+"/"+srcFile.name);
    //     }
    //
    //     var newFile;
    //
    //     var newFileName,
    //         newFilePath;
    //
    //     var newFolder = dstFile.parent;
    //
    //     // Passed Options
    //     if(typeof options !== "object") options = {};
    //     options.defaults(
    //         {
    //             overwrite: true,
    //             silent: false,
    //             unlock:true,
    //             nameOnly:true,
    //             masks:[],
    //             excludes:[],
    //             replacements:[],
    //             dialogId:1038876
    //         }
    //     );
    //
    //     var maskPathType = (options.nameOnly)? 'name' : 'absoluteURI';
    //
    //     // Dialog setup
    //     var dialogId = 1038876;
    //     var dialogArgs = { id:dialogId, skippable:true, buttons:["OK","Skip"]};
    //         dialogArgs.title = "Overwrite File?";
    //         dialogArgs.text = "Do you want to overwrite existing files?";
    //     var dialogResult;
    //     Lifter.dialogs.clearCached(dialogId);// clear or subsequent non-recursive calls pick up old input
    //
    //     // log.log( "---  src  ---" );
    //     // log.log( src );
    //
    //     log.log( "\n[]------  system.files.copy()  ------[]" );
    //     log.log( "options:" );
    //     for(var opt in options)
    //     {
    //      if( !options.hasOwnProperty (opt) ) continue;
    //      log.log( "- "+opt+":" + options[opt] );
    //     }
    //
    //     // log.log( "Src File: " + srcFile );
    //     // log.log( "Dst File: " + dstFile );
    //
    //     // sanity check
    //     // log.log( "srcFile.exists "+srcFile.exists );
    //     // log.log( "srcFile.fsName "+srcFile.fsName );
    //     if (!srcFile.exists || srcFile.name === ".DS_Store") { return; }
    //
    //     // Mask tests to filter files
    //
    //     if(system.files.maskTest(srcFile[maskPathType], options.masks) === false){return;}
    //     if(system.files.excludeTest(srcFile[maskPathType], options.excludes) === false){return;}
    //
    //     // create folder if missing
    //     if(!system.files.makeDir(newFolder)) { return; }
    //
    //     // replace text in file name
    //     if(options.nameOnly) {
    //
    //     }
    //     newFileName = dstFile.name;
    //     for(var r=0;r<options.replacements.length;r++)
    //     {
    //         var rep = options.replacements[r];
    //         newFileName = newFileName.replace(new RegExp(rep[0],'g'),rep[1]);
    //     }
    //
    //     newFilePath = newFolder.fsName + "/" + newFileName;
    //
    //     log.log("-- Src: "+srcFile.fsName);
    //     log.log("-- Dst: "+new Folder(newFilePath).fsName);
    //
    //
    //     newFile = File(newFilePath);
    //     log.log("--- newFile.exists "+newFile.exists+" ---");
    //
    //     // if file exists and not silent mode, bring up confirm dialog
    //     if (newFile.exists && options.silent === false && typeof Lifter.dialogs.confirm === "function")
    //     {
    //         // Message
    //         if(!newFile.readonly)
    //         {
    //             dialogArgs.text = "\"" + newFile.name + "\" already exists. Do you want to overwrite it?";
    //         }else{
    //             dialogArgs.text = "\"" + newFile.name + "\" is set to Read-Only. It may be locked by Perforce. Do you want to overwrite it?";
    //         }
    //
    //         dialogResult = Lifter.dialogs.confirm (dialogArgs);
    //         dialogCache = Lifter.dialogs.getCached(dialogId);
    //
    //         options.overwrite = (dialogCache && dialogCache.value !== 1);
    //         options.silent = (dialogCache && dialogCache.skip === true);
    //
    //         log.debug("dialogResult: " + (dialogResult));
    //         log.debug("dialogCache: " + (dialogCache));
    //         // log.log("dialogCache.value: " + (dialogCache.value));
    //         // for(var opt in options)
    //         // {
    //         //     if( !options.hasOwnProperty (opt) ) continue;
    //         //     log.log( opt+":" + options[opt] );
    //         // }
    //     }
    //
    //     // Copy or skip?
    //     if( !newFile.exists || options.overwrite )
    //     {
    //         try {
    //             srcFile.copy(newFilePath);
    //         } catch (e) {
    //             log.error(e.message);
    //             return;// "error:copyFiles:could not copy file "+newFilePath+":"+ e.message;
    //         }
    //
    //         // Sanity check and return error if missing
    //         newFile = File(newFilePath);
    //         if (! newFile.exists){
    //             log.error("copyFiles:file not created "+newFilePath+ ", "+ newFile.error);
    //             return;
    //         }
    //
    //         // make writeable
    //         if(options.unlock) newFile.readonly = false;
    //
    //         // return copied file wrapped in array
    //         return [newFile];
    //     } else {
    //         log.log ("User skipped this one...");
    //     }
    // };


    /**
     * Recurseively copy a file or folder path with options and dialogs
     * @param  {File/Folder/String} src     Source file (can be a string)
     * @param  {File/Folder/String} dst     Destination path (can be a string)
     * @param  {Object} options     Options to override defaults...
     *                                  {
     *                                     overwrite: true,// overwrite existing files
     *                                     silent: false,// no dialogs
     *                                     unlock:true,// unlock read-only files after copy
     *                                     nameOnly: true,// only test filename not full path for mask and excludes
     *                                     masks:[],//file masks (i.e. ["*.psd","*.tif"])
     *                                     excludes:[],//files to exclude (i.e. ["*.config","node_modules"])
     *                                     replacements:[]// list of pairs to replace in file name. ex. [["tmp","TheThing"],[" ","_"]]
     *                                  }
     * @return {Array}         Resulting list of File objects that were copied.
     */
    system.files.copyDir = function copyDir( src, dst, options ) {
        // mutable vars accept file path or File/Folder handle...
        var srcFolder = new Folder(src);
        var newFolder = new Folder(dst);
        var maskTest = true;
        var excludeTest = true;
        var srcFiles,
            srcFile;

        var newFile,
            newFilePath;

        var newSubFolder;

        var result = [];// return val is array

        // if single file, pass to system.files.copy like a snake eating its tail
        if (File(srcFolder) instanceof File)
        {
            return [system.files.copy(src, dst, options)];// return an array!
        }

        // log.log( "---  src  ---" );
        // log.log( src );

        // Passed Options
        if(typeof options !== "object") options = {};
        options.defaults(
            {
                overwrite: true,
                silent: false,
                unlock:true,
                nameOnly: true,
                masks:[],
                excludes:[],
                replacements:[]
            }
        );
        var maskPathType = (options.nameOnly)? 'name' : 'absoluteURI';


        log.log( "\n[]------  system.files.copyDir()  ------[]" );
        log.log( "options:" );
        for(var opt in options)
        {
         if( !options.hasOwnProperty (opt) ) continue;
         log.log( "- "+opt+":" + options[opt] );
        }

        log.log( "Src Dir: " + src );
        log.log( "Dst Dir: " + dst );

        // sanity check
        if (!srcFolder.exists) { return; }

        // create folder if missing
        // Mask tests to filter folders... but just to avoid making
        // random empty directories, don't stop the search.
        maskTest = system.files.maskTest(srcFolder[maskPathType], options.masks);
        excludeTest = system.files.excludeTest(srcFolder[maskPathType], options.excludes);

        if(maskTest && excludeTest) {
            if(!system.files.makeDir(newFolder)) { return; }
        }
        //log.log( "---  newFolder  ---" );
        //log.log( newFolder );

        // get file list from folder
        srcFiles = srcFolder.getFiles( );

        //log.log( "\n---  dir  ---" );
        log.log( 'Items: ' + srcFiles.length );
        srcFiles.forEach(function(srcFile){
            log.log(' - '+srcFile.name);
        });

        for (var f in srcFiles) {
            if( !srcFiles.hasOwnProperty (f) ) continue;// sanity check for shims on for/in loops
            srcFile = srcFiles[f];

            newFilePath = newFolder.fsName + "/" + srcFile.name;

            if (srcFile instanceof File) {
                newFile = system.files.copy(srcFile,newFilePath,options);
                if(newFile) {
                    result = result.concat(newFile);
                }
    		}
            else if (srcFile instanceof Folder) {

                // newSubFolder = new Folder(newFilePath);
                //
                // // Mask tests to filter folders... but just to avoid making
                // // random empty directories, don't stop the search.
                // maskTest = system.files.maskTest(srcFolder.absoluteURI, options.masks);
                // excludeTest = system.files.excludeTest(srcFolder.absoluteURI, options.excludes);
                // if(maskTest && excludeTest) {
                //     try {
                //
                //         if( newSubFolder.create() === false )
                //         {
                //             log.error("copyFiles:error creating sub-directory "+newSubFolder.fsName);
        	    //             return;
                //         }
                //     } catch (e) {
                //         log.error(e.message);
                //         return;
                //     }
                // }
                // result = result.concat(system.files.copyDir(srcFile, newSubFolder, options));
                result = result.concat(system.files.copyDir(srcFile, newFilePath, options));
            }
            else {
                log.log ("Skipping this one...");
            }
        }
        // return list of copied files
        return result;
    };

    /**
     * Recursively remove directory folder
     * @param  {Folder/String} folder folder or path to remove
     * @return {Boolean}       success result like folder.create()
     */
    system.files.removeRecursively = function removeRecursively( srcFolder ) {
        srcFolder = new Folder(srcFolder);

        if (srcFolder.exists) {
            // get file list from folder
            srcFiles = srcFolder.getFiles();

            log.debug( "\n---  system.files.removeRecursively  ---" );
            log.debug( 'Folder: ' + srcFolder );
            log.debug( 'Items: ' + srcFiles.length );
            srcFiles.forEach(function(srcFile){
                log.debug(' - '+srcFile.name);
            });


            srcFiles.forEach(function removeFile(srcFile) {
                //if( !srcFiles.hasOwnProperty (f) ) continue;// sanity check for shims on for/in loops
                //srcFile = srcFiles[f];
                // srcFile.readonly = false;

                if (srcFile instanceof File) {
                    remResult = srcFile.remove();
        		}
                else if (srcFile instanceof Folder) {
                    system.files.removeRecursively(srcFile);
                }
                else {
                    log.debug ("Don't know if I can remove this?\n"+srcFile);
                }
            });

            // close the door on your way out...
            return srcFolder.remove();// user deleted
        }
        return 1;
    };


    // Public API
    /**
    * Contains low-level methods to work with OS and files without accessing Photoshop DOM.
    */
    Lifter.system = Lifter.sys = system;

    log.debug("Lifter.system done.");
}());
