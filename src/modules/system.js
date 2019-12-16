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
    log.log("LOADING Lifter.system ...");
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
        log.info("Browse to command: " + cmd);
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

        for(var m=0; m<masks.length; m++)
        {
            reMask = masks[m];

            // convert text filters like "*.txt" to regex
            if(typeof reMask == "string")
            {
                reMask = reMask.replace(/\./g,"\\.").replace(/\*/g,".*");
                reMask =  new RegExp(reMask+"$");
            }

            if(typeof reMask == "function" && fileName.search(reMask) !== -1)
            {
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
            log.log("Creating new folder: " + inFolder.fsName);
            try {
                if( inFolder.create() === false )
                {
                    log.error( "copyFiles: error creating directory "+inFolder.fsName);
                    return 0;
                }
            } catch (e) {
                log.error(e.message);
                return 0;
            }
        } else if ( inFolder.readonly )
        {
            log.error( "copyFiles: directory is read only "+inFolder.fsName);
            return 0;
            // make writeable
            //inFolder.readonly = false;
        }
        return 1;
    };

    /**
     * Recursively remove directory folder
     * @param  {Folder/String} folder folder or path to remove
     * @return {Boolean}       success result like folder.create()
     */
    system.files.removeDir = function removeDir( srcFolder ) {
        srcFolder = new Folder(srcFolder);

        // create folder if missing
        if (srcFolder.exists)
        {
            // get file list from folder
            srcFiles = srcFolder.getFiles( );

            log.log( "\n---  system.files.removeDir  ---" );
            log.log( 'Folder: ' + srcFolder );
            log.log( 'Items: ' + srcFiles.length );
            srcFiles.forEach(function(srcFile){
                log.log(' - '+srcFile.name);
            });


            srcFiles.forEach(function(srcFile){

                //if( !srcFiles.hasOwnProperty (f) ) continue;// sanity check for shims on for/in loops
                //srcFile = srcFiles[f];
                // srcFile.readonly = false;

                if (srcFile instanceof File)
                {
                    remResult = srcFile.remove();// user deleted
        		}
                else if (srcFile instanceof Folder)
                {
                    system.files.removeDir(srcFile);
                }
                else
                {
                    log.log ("Don't know if I can remove this?\n"+srcFile);
                }
            });

            // close the door on your way out...
            return srcFolder.remove();// user deleted
        }
        return 1;
    };

    /**
     * Recurseively copy a file or folder path with options and dialogs
     * @param  {File/Folder/String} src     Source file (can be a string)
     * @param  {File/Folder/String} dst     Destination path (can be a string)
     * @param  {Object} options     Options to override defaults...
     *                                  {
     *                                     overwrite: true,// overwrite existing files
     *                                     silent: false,// no dialogs
     *                                     unlock:true,// unlock read-only files after copy
     *                                     masks:[],//file masks (i.e. ["*.psd","*.tif"])
     *                                     excludes:[],//files to exclude (i.e. ["*.config","node_modules"])
     *                                     replacements:[]// list of pairs to replace in file name. ex. [["tmp","TheThing"],[" ","_"]]
     *                                  }
     * @return {Array}         Resulting list of File objects that were copied.
     */
    system.files.copy = function copyFiles( src, dst, options ) {
        // mutable vars accept file path or File/Folder handle...
        var srcFile = new File(src);
        var dstFile = new File(dst);

        // if folder, pass to copyDir like a snake eating its tail
        if (File(srcFile) instanceof Folder)
        {
            return system.files.copyDir(src, dst, options);
        }

        // if dst is folder, copy file name from src
        if (File(dstFile) instanceof Folder)
        {
            dstFile = new File(dstFile.fsName+"/"+srcFile.name);
        }

        var newFile;

        var newFileName,
            newFilePath;

        var newFolder = dstFile.parent;

        // Passed Options
        if(typeof options !== "object") options = {};
        options.defaults(
            {
                overwrite: true,
                silent: false,
                unlock:true,
                masks:[],
                excludes:[],
                replacements:[],
                dialogId:1038876
            }
        );

        // Dialog setup
        var dialogId = 1038876;
        var dialogArgs = { id:dialogId, skippable:true, buttons:["OK","Skip"]};
            dialogArgs.title = "Overwrite File?";
            dialogArgs.text = "Do you want to overwrite existing files?";
        var dialogResult;
        Lifter.dialogs.clearCached(dialogId);// clear or subsequent non-recursive calls pick up old input

        // log.log( "---  src  ---" );
        // log.log( src );

        log.log( "\n[]------  system.files.copy()  ------[]\n" );

        log.log( "options:" );
        for(var opt in options)
        {
            if( !options.hasOwnProperty (opt) ) continue;
            log.log( "-- "+opt+":" + options[opt] );
        }

        log.log( "Src File: \n" + srcFile );
        log.log( "Dst File: \n" + dstFile );

        // sanity check
        log.log( "srcFile.exists "+srcFile.exists );
        // log.log( "srcFile.fsName "+srcFile.fsName );
        if (!srcFile.exists || srcFile.name === ".DS_Store") { return; }

        // create folder if missing
        if(!system.files.makeDir(newFolder)) { return; }

        // Mask tests to filter files
        if(system.files.maskTest(srcFile.name, options.masks) === false){return;}
        if(system.files.excludeTest(srcFile.name, options.excludes) === false){return;}

        // replace text in file name
        newFileName = dstFile.name;
        for(var r=0;r<options.replacements.length;r++)
        {
            var rep = options.replacements[r];
            newFileName = newFileName.replace(new RegExp(rep[0],'g'),rep[1]);
        }

        newFilePath = newFolder.fsName + "/" + newFileName;

        log.log("\n-- Src:\n"+srcFile.fsName);
        log.log("\n-- Dst:\n"+new Folder(newFilePath).fsName);


        newFile = File(newFilePath);
        log.log("\n--- exists "+newFile.exists+" ---");

        // if file exists and not silent mode, bring up confirm dialog
        if (newFile.exists && options.silent === false && typeof Lifter.dialogs.confirm === "function")
        {
            // Message
            if(!newFile.readonly)
            {
                dialogArgs.text = "\"" + newFile.name + "\" already exists. Do you want to overwrite it?";
            }else{
                dialogArgs.text = "\"" + newFile.name + "\" is set to Read-Only. It may be locked by Perforce. Do you want to overwrite it?";
            }

            dialogResult = Lifter.dialogs.confirm (dialogArgs);
            dialogCache = Lifter.dialogs.getCached(dialogId);

            options.overwrite = (dialogCache && dialogCache.value !== 1);
            options.silent = (dialogCache && dialogCache.skip === true);

            log.log("dialogResult: " + (dialogResult));
            log.log("dialogCache: " + (dialogCache));
            // log.log("dialogCache.value: " + (dialogCache.value));
            // for(var opt in options)
            // {
            //     if( !options.hasOwnProperty (opt) ) continue;
            //     log.log( opt+":" + options[opt] );
            // }
        }

        // Copy or skip?
        if( !newFile.exists || options.overwrite )
        {
            try {
                srcFile.copy(newFilePath);
            } catch (e) {
                log.error(e.message);
                return;// "error:copyFiles:could not copy file "+newFilePath+":"+ e.message;
            }

            // Sanity check and return error if missing
            newFile = File(newFilePath);
            if (! newFile.exists){
                log.error("copyFiles:file not created "+newFilePath+ ", "+ newFile.error);
                return;
            }

            // make writeable
            if(options.unlock) newFile.readonly = false;

            // return copied file
            return newFile;
        } else {
            log.log ("User skipped this one...");
        }
    };


    /**
     * Recurseively copy a file or folder path with options and dialogs
     * @param  {File/Folder/String} src     Source file (can be a string)
     * @param  {File/Folder/String} dst     Destination path (can be a string)
     * @param  {Object} options     Options to override defaults...
     *                                  {
     *                                     overwrite: true,// overwrite existing files
     *                                     silent: false,// no dialogs
     *                                     unlock:true,// unlock read-only files after copy
     *                                     masks:[],//file masks (i.e. ["*.psd","*.tif"])
     *                                     excludes:[],//files to exclude (i.e. ["*.config","node_modules"])
     *                                     replacements:[]// list of pairs to replace in file name. ex. [["tmp","TheThing"],[" ","_"]]
     *                                  }
     * @return {Array}         Resulting list of File objects that were copied.
     */
    system.files.copyDir = function copyDir( src, dst, options ) {
        // mutable vars accept file path or File/Folder handle...
        var srcFolder = (typeof src == 'string')? new Folder(src): src;
        var newFolder = (typeof dst == 'string')? new Folder(dst): dst;

        // if single file, pass to system.files.copy like a snake eating its tail
        if (File(srcFolder) instanceof File)
        {
            return [system.files.copy(src, dst, options)];// return an array!
        }

        var srcFiles,
            srcFile;

        var newFileName,
            newFilePath;

        // Passed Options
        if(typeof options !== "object") options = {};
        options.defaults(
            {
                overwrite: true,
                silent: false,
                unlock:true,
                masks:[],
                excludes:[],
                replacements:[]
            }
        );

        // return val
        var result = [];

        // log.log( "---  src  ---" );
        // log.log( src );

        log.log( "\n[]------  copyFiles  ------[]\n" );

        log.log( "options: \n" );
        for(var opt in options)
        {
            if( !options.hasOwnProperty (opt) ) continue;
            log.log( "-- "+opt+":" + options[opt] );
        }

        log.log( "Src Dir: \n" + src );
        log.log( "Dst Dir: \n" + dst );

        // sanity check
        if (!srcFolder.exists) { return; }

        // create folder if missing
        if(!system.files.makeDir(newFolder)) { return; }
        //log.log( "---  newFolder  ---" );
        //log.log( newFolder );

        // get file list from folder
        srcFiles = srcFolder.getFiles( );

        //log.log( "\n---  dir  ---" );
        log.log( 'Items: ' + srcFiles.length );
        srcFiles.forEach(function(srcFile){
            log.log(' - '+srcFile.name);
        });

        for (var f in srcFiles)
        {
            if( !srcFiles.hasOwnProperty (f) ) continue;// sanity check for shims on for/in loops
            srcFile = srcFiles[f];

            newFilePath = newFolder.fsName + "/" + srcFile.name;

            if (srcFile instanceof File)
            {
                var newFile = system.files.copy(srcFile,newFilePath,options);
                if(newFile) {
                    result.concat(newFile);
                }
    		}
            else if (srcFile instanceof Folder)
            {

                var newSubFolder = new Folder(newFilePath);

                try {

                    if( newSubFolder.create() === false )
                    {
                        log.error("copyFiles:error creating sub-directory "+newSubFolder.fsName);
    	                return;
                    }
                } catch (e) {
                    log.error(e.message);
                    return;
                }
                result = system.files.copyDir(srcFile, newSubFolder, options);
            }
            else {
                log.log ("Skipping this one...");
            }
        }
        // return list of copied files
        return result;
    };


    /**
     * Recurseively remove a file or folder path with options and dialogs
     * @param  {File/Folder/String} src     Source file/folder (can be a string)
     * @return {Array}         Resulting list of File objects that were copied.
     */
    system.files.remove = function copyFiles( src, dst, options )
    {
        // mutable vars accept file path or File/Folder handle...
        var srcFolder = (typeof src == 'string')? new Folder(src): src;
        var newFolder = (typeof dst == 'string')? new Folder(dst): dst;

        var srcFiles,
            srcFile,
            newFile;

        // sanity check
        if (!srcFolder.exists) { return; }

        log.log( "\n[]------  copyFiles  ------[]\n" );

        log.log( "Src: \n" + srcFolder );

        srcFiles = srcFolder.getFiles( );

        log.log( 'Items: ' + srcFiles.length );
        srcFiles.forEach(function(srcFile){
            log.log(' - '+srcFile.name);
        });

        for (var f in srcFiles)
        {
            if( !srcFiles.hasOwnProperty (f) ) continue;// sanity check for shims on for/in loops
            srcFile = srcFiles[f];
        }

    };

    // Public API
    /**
    * Contains low-level methods to work with OS and files without accessing Photoshop DOM.
    */
    Lifter.system = Lifter.sys = system;

    log.log("Lifter.system done.");
}());
