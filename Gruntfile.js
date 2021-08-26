/*!
 * Copyright 2014 Francesco Camarlinghi
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

module.exports = function (grunt)
{
    'use strict';
    var path = require('path'),

        // Output tpaths
        debug_dir = 'build/debug',
        release_dir = 'build/release',
        jsbin_dir = 'build/bin',

        // Common
        oldshim = [
            'src/libs/es5/es5-shim.js'
        ],
        libs = [
            'src/build/libs_header.js',
            'src/libs/es5/extendscript-es5-shim.js',
            'src/libs/json3.js',
            'src/libs/polyfills.js',
            'src/libs/extendscript_logfile.jsxinc',
            'src/libs/extendscript_log.jsxinc',
            'src/libs/extendscript_dialogs.jsxinc',
            'src/build/libs_footer.js',
        ],
        header = ['src/build/header.js'],
        dev_flag = ['src/build/header_dev.js'],
        footer = ['src/build/footer.js'],
        core = ['src/lifter.js', 'src/core/core.js', 'src/core/utils.js','src/core/colors.js'],

        // Single builds
        builds = {
            test: [].concat('src/test/test.js'),
            documents: [].concat(libs, header, core, 'src/modules/documents.js', footer),
            filters: [].concat(libs, header, core, 'src/modules/filters.js', footer),
            history: [].concat(libs, header, core, 'src/modules/history.js', footer),
            layers: [].concat(libs, header, core, 'src/modules/layers.js', footer),
            selection: [].concat(libs, header, core, 'src/modules/selection.js', footer),
            layerComps: [].concat(libs, header, core, 'src/modules/layerComps.js', footer),
            system: [].concat(libs, header, core, 'src/modules/system.js', footer),
            full: [].concat(libs, header, core, 'src/modules/layerComps.js', 'src/modules/documents.js', 'src/modules/filters.js', 'src/modules/history.js', 'src/modules/layers.js', 'src/modules/selection.js', 'src/modules/system.js', footer),
            dev: [].concat(libs, header, dev_flag, core, 'src/modules/layerComps.js', 'src/modules/documents.js', 'src/modules/filters.js', 'src/modules/history.js', 'src/modules/layers.js', 'src/modules/selection.js', 'src/modules/system.js', footer),

            // Custom build support
            // Just uncomment the following line and add the modules to the array
            custom: [].concat(header, core, 'src/modules/documents.js', 'src/modules/layers.js', footer),
        },

        // Grunt config
        config = {
            clean: {
                debug: [debug_dir],
                release: [release_dir],
                jsbin: [path.join(jsbin_dir,'*.jsx')],
            },
            concat: {
                debug: {
                    files: {},
                },
            },
            esmin: {
                release: {
                    files: {},
                },
                jsbin: {
                    files: {},
                }
            },
            run: {
                jsbin: {
                    exec:'node "src/build/exportToJSX.js" --force -n ' + jsbin_dir,
                }
            },
        };

    // Setup tasks
    for (var build in builds)
    {
        if (builds.hasOwnProperty(build))
        {
            // Debug
            config.concat.debug.files[path.join(debug_dir, 'lifter.' + build + '.js')] = builds[build];

            // Release
            config.esmin.release.files[path.join(release_dir, 'lifter.' + build + '.min.jsxinc')] = builds[build];

            // JSBin
            config.esmin.jsbin.files[path.join(jsbin_dir, 'lifter.' + build + '.jsx')] = builds[build];
        }
    }

    // Init configuration
    grunt.initConfig(config);

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-esmin');
    grunt.loadNpmTasks('grunt-run');

    // Register tasks
    grunt.registerTask('debug', ['clean:debug', 'concat:debug']);
    grunt.registerTask('release', ['clean:release', 'esmin:release']);
    grunt.registerTask('bin', ['clean:jsbin', 'esmin:jsbin', 'run:jsbin', 'clean:jsbin']);
};
