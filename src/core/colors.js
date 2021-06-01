/**
 * Copyright 2019 Max Johnson
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
    var colors = {};

    /*** Converts RGB array to SolidColor color object
    * @param { Array } color RGB array eg [255,255,255]
    * @returns { SolidColor }
    */
    colors.arrayToSolidColor = function colorArrayToSolidColor(aRGB) {
        var color = new SolidColor();
        color.rgb.red = aRGB[0];
        color.rgb.green = aRGB[1];
        color.rgb.blue = aRGB[2];
        return color;
    };


    /**
     * Converts SolidColor color object to RGB array [255,255,255]
     * @param {SolidColor}  color   SolidColor object
     * @returns {Array} RGB array eg [255,255,255]
     */
    colors.solidColorToArray = function colorSolidColorToArray(color) {
        if (color.hasOwnProperty("rgb")) {
            return [color.rgb.red, color.rgb.green, color.rgb.blue];
        }
        return [];
    };


    /**
     * Converts rgb color text list or hex value to array eg. "#777777",
     * "(255,255,255)", "[255, 255, 255]"
     * @param {String}  color   0-255 rgb color text list  eg. "(255,255,255)", "[255, 255, 255]"
     * @returns {Array} RGB array eg [255,255,255]
     */
    colors.stringToArray = function colorStringToArray(color) {
        // no commas means hex... cause assumptions.
        if (color.indexOf(",") === -1) {
            // strip # symbol if present...
            if ((color.indexOf("#") === 0)) {
                color = color.substring(1, color.length);
            }
            // handle shorthand #334 style. So robust!
            if (color.length === 3) {
                color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            }
            // parse char pairs in base 16
            return [
                parseInt(color.substring(0, 2), 16),
                parseInt(color.substring(2, 4), 16),
                parseInt(color.substring(4, 6), 16)
            ];
        } else {
            // strip whitespace, brackets, and parens, then convert to array
            return color.replace(/[\s\(\)\[\]]/g, "").split(",");
        }
    };

    /**
     * Attempts to convert object to Photoshop SolidColor object
     * defaults to foreground color
     * @param {*}  color   SolidColor object, string, or array
     * @returns {Array}
     */
    colors.toSolidColor = function colorToSolidColor(color) {
        if(color instanceof SolidColor === false) {
            if(typeof color === 'string') {
                color = colors.toArray(color);
            }
            color = colors.arrayToSolidColor(color);
        }
        return color;
    };


    /**
     * Attempts to convert var to Action Descriptor Color object
     * defaults to foreground color
     * @param {*}  color   SolidColor object, string, or array
     * @returns {ActionDescriptor}
     */
    colors.toActionDescriptor = function colorToActionDescriptor(color) {
        var aColor = colors.toArray(color);
        var descColor = new ActionDescriptor();
        var descRGBC = new ActionDescriptor();
        descRGBC.putDouble( c2id( 'Rd  ' ), aColor[0] );
        descRGBC.putDouble( c2id( 'Grn ' ), aColor[1] );
        descRGBC.putDouble( c2id( 'Bl  ' ), aColor[2] );
        descColor.putObject( s2id( "color" ), s2id( "RGBColor" ), descRGBC );

        return descColor;
    };


    /**
     * Attempts to convert object to 0-255 based RGB array
     * defaults to foreground color
     * @param {*}  color   SolidColor object, string, or array
     * @returns {Array} RGB array eg [255,255,255]
     */
    colors.toArray = function colorToArray(color) {
        //$._PSU.log(color.hasOwnProperty("constructor"),true)
        if (typeof color !== "undefined") {
            switch (color.constructor.name) {
                case "SolidColor":
                    color = colors.solidColorToArray(color);
                    break;
                case "String":
                    color = colors.stringToArray(color);
                    break;
                case "Array":
                    color = color;
                    break;
                default:
                    color = colors.solidColorToArray(app.foregroundColor);
                    break;
            }
            return color;
        } else {
            return colors.solidColorToArray(app.foregroundColor);
        }
    };


    /**
     * Invert a color
     * @method colorInvert
     * @param  {*}    color SolidColor object, string, or RGB array [255,255,255]
     * @return {*}          returns SolidColor or RGB array eg [255,255,255]
     */
    colors.invert = function colorInvert(color) {
        var type = color.constructor.name;
        color = colors.toArray(color);
        color = [255 - color[0], 255 - color[1], 255 - color[2]];
        if(type === "SolidColor") {
            color = colors.arrayToSolidColor(color);
        }
        return color;
    };


    // Public API
    /**
    * Contains methods to covert and manipulate colors.
    */
    Lifter.colors = colors;
}());
