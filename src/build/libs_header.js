/*!
 * Copyright N/A (see below)
 *
 * This is a wrapper for dependencies. See individual libs for Copyright info
 *
 */

 /* jshint ignore: start */

 // Add semicolon to prevent BAD THINGS (TM) from happening to concatenated code.
;

// Avoid re-initializing our dependencies
// Partly for tidiness, but mostly because it explodes and dies on es5 Date object.
// Inelegant sanity check... is to see if we have an es5 shim or not.
if(typeof [].map !== "function") {
    $.strict = false;
