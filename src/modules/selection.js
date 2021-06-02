/**
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

; (function ()
{
    log.debug("LOADING Lifter.selection ...");

    var selection = {};

    /**
     * Selection from layer transparency, mask, or vector mask with SelectionType
     * @private
         * @method  _doSelectionFromLayer
     * @param {Number} [layerId] Layer Id, defaults to currently active layer if null or not specified.
     * @param  {LifterMaskType} maskType      The type of mask, transparency, mask or vector
     * @param  {SelectionType} [combination] Selection type to use.
     * @return {Object}             Chained reference to selection utilities.
     */
    _doSelectionFromLayer = function(layerId, maskType, selectionType) {

        // init action vars
        var desc = new ActionDescriptor(),
            refFrom = new ActionReference(),
            refTo = new ActionReference(),
            execId = c2id('setd'),
            isVector = false;

        // build out action refs for channel and selection

        // setup "from" ref as current user selection
        refFrom.putProperty(c2id('Chnl'), c2id('fsel'));

        // setup "to" ref
        switch (maskType) {
            case LifterMaskType.TRANSPARENCY:
                refTo.putEnumerated(c2id('Chnl'), c2id('Chnl'), c2id('Trsp'));

                break;
            case LifterMaskType.LAYERMASK:
                refTo.putEnumerated(c2id('Chnl'), c2id('Chnl'), c2id('Msk '));

                break;
            case LifterMaskType.VECTORMASK:
                refTo.putEnumerated(c2id('Path'), c2id('Path'), s2id('vectorMask'));
                isVector = true;
                break;
            default:
                throw new Error("Unknown LifterMaskType: " + maskType);
        }

        // ref to id or selected layer
        if (typeof layerId !== 'number' || layerId === 0) {
            refTo.putEnumerated(c2id('Lyr '), c2id('Ordn'), c2id('Trgt'));
        } else {
            refTo.putIdentifier(c2id('Lyr '), layerId);
        }

        // setup the action descriptor
        switch (selectionType) {
            case SelectionType.REPLACE:
                desc.putReference(c2id('null'), refFrom);
                desc.putReference(c2id('T   '), refTo);
                execId = c2id('setd');

                break;
            case SelectionType.EXTEND:
                if(isVector) {
                    desc.putReference(c2id('null'), refFrom);
                    desc.putReference(c2id('T   '), refTo);
                    execId = c2id('AddT');
                } else {
                    desc.putReference(c2id('null'), refTo);
                    desc.putReference(c2id('T   '), refFrom);
                    execId = c2id('Add ');
                }

                break;
            case SelectionType.DIMINISH:
                if(isVector) {
                    desc.putReference(c2id('null'), refFrom);
                    desc.putReference(c2id('T   '), refTo);
                    execId = c2id('SbtF');
                } else {
                    desc.putReference(c2id('null'), refTo);
                    desc.putReference(c2id('From'), refFrom);
                    execId = c2id('Sbtr');
                }

                break;
            case SelectionType.INTERSECT:
                if(isVector) {
                    desc.putReference(c2id('null'), refFrom);
                    desc.putReference(c2id('T   '), refTo);
                    execId = c2id('IntW');
                } else {
                    desc.putReference(c2id('null'), refTo);
                    desc.putReference(c2id('With'), refFrom);
                    execId = c2id('Intr');
                }

                break;
            default:
                throw new Error("Unknown SelectionType: " + selectionType);
        }

        // special params for vector masks
        if (isVector) {
            desc.putInteger(c2id('Vrsn'), 1);
            desc.putBoolean(s2id('vectorMaskParams'), true);
        }

        executeAction(execId, desc, DialogModes.NO);
    };

    /**
     * Test if there is a user selection on the canvas.
     * @method
     * @return {Boolean} True if there is canvas selection
     */
    selection.exists = function ()
    {
        // selection.hasOwnProperty("bounds") returned true when no selection
        // but would throw errors if selection.bounds accessed
        try{
            return (app.activeDocument.selection.bounds.length>0);
        }
        catch(err){
            return false;// not an real error... just a check.
        }
    };

    /**
     * Selects the whole canvas.
     * @return Chained reference to selection utilities.
     */
    selection.selectAll = function ()
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Chnl'), c2id('fsel'));
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putEnumerated(c2id('T   '), c2id('Ordn'), c2id('Al  '));
        executeAction(c2id('setd'), desc, _dialogModesNo);
        return selection;
    };

    /**
     * Copies the current selection to clipboard.
     * @param {Boolean} [merged] If specified, the copy includes all visible layers.
     * @return Chained reference to selection utilities.
     */
    selection.copy = function (merged)
    {
        if (merged)
            executeAction(c2id('CpyM'), undefined, _dialogModesNo);
        else
            executeAction(c2id('copy'), undefined, _dialogModesNo);
        return selection;
    };

    /**
     * Pastes the current clipboard contents.
     * @param {Boolean} [inPlace] If specified, paste in place.
     * @return Chained reference to selection utilities.
     */
    selection.paste = function (inPlace)
    {
        var desc = new ActionDescriptor();

        if(inPlace)
            desc.putBoolean( s2id("inPlace"), inPlace );

        desc.putEnumerated(c2id('AntA'), c2id('Annt'), c2id('Anno'));
        executeAction(c2id('past'), desc, _dialogModesNo);
        return selection;
    };

    /**
     * Pastes the current clipboard contents into the current selection.
     * @return Chained reference to selection utilities.
     */
    selection.pasteInto = function ()
    {
        var desc = new ActionDescriptor();
        desc.putEnumerated(c2id('AntA'), c2id('Annt'), c2id('Anno'));
        executeAction(c2id('PstI'), desc, _dialogModesNo);
        return selection;
    };

    /**
     * Pastes the current clipboard contents outside of the current selection.
     * @return Chained reference to selection utilities.
     */
    selection.pasteOutside = function ()
    {
        var desc = new ActionDescriptor();
        desc.putEnumerated(c2id('AntA'), c2id('Annt'), c2id('Anno'));
        executeAction(c2id('PstO'), desc, _dialogModesNo);
        return selection;
    };

    /**
     * Creates a new document using clipboard content.
     * @param {String} [name] Document name.
     * @return Chained reference to selection utilities.
     */
    selection.pasteToNewDocument = function (name)
    {
        // Create document
        var desc = new ActionDescriptor();
        desc.putString(s2id('preset'), "Clipboard");

        if (typeof name === 'string' && name.length)
            desc3.putString(c2id('Nm  '), name);

        var desc2 = new ActionDescriptor();
        desc2.putObject(c2id('Nw  '), c2id('Dcmn'), desc);
        executeAction(c2id('Mk  '), desc2, _dialogModesNo);

        // Paste clipboard data
        selection.paste();

        // Flatten resulting document
        if (Lifter.documents)
            Lifter.documents.flatten();

        return selection;
    };

    /**
     * Clears the current selection. If nothing is selected, the currently active layer will be deleted instead.
     * @return Chained reference to selection utilities.
     */
    selection.clear = function ()
    {
        executeAction(c2id('Dlt '), undefined, _dialogModesNo);
        return selection;
    };

    /**
     * Inverts the current selection.
     * @return Chained reference to selection utilities.
     */
    selection.invert = function ()
    {
        executeAction(c2id('Invs'), undefined, _dialogModesNo);
        return selection;
    };

    /**
     * Deselects all. Safer than selection.clear()
     * @return Chained reference to selection utilities.
     */
    selection.deselect = function ()
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Chnl'), c2id('fsel'));
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putEnumerated(c2id('T   '), c2id('Ordn'), c2id('None'));
        executeAction(c2id('setd'), desc, _dialogModesNo);
        return selection;
    };


    /**
     * Stores a selection in an alpha channel
     * @method
     * @param  {String} channelName name of channel to store into
     * @param  {SelectionType} [combination] Selection type to use. Defaults to SelectionType.REPLACE
     * @return {Object}             Chained reference to selection utilities.
     */
    selection.store = function (channelName, combination)
    {
        var channel;

        combination = combination || SelectionType.REPLACE;

        if( !selection.exists()){
            throw new Error("No canvas selection to store.");
        }

        try{
            channel = app.activeDocument.channels.getByName(channelName);
        } catch (err) {
            // user selection "fsel" channel duplicated into new channel with name
            var desc93 = new ActionDescriptor();
            desc93.putString( c2id('Nm  '), channelName );
            var ref22 = new ActionReference();
            ref22.putProperty( c2id('Chnl'), c2id('fsel') );
            desc93.putReference( c2id('null'), ref22 );
            executeAction( c2id('Dplc'), desc93, DialogModes.NO );

            channel = app.activeDocument.channels.getByName(channelName);
        }

        app.activeDocument.selection.store(channel, combination);

        return selection;
    };


    /**
     * Loads seleciton from an alpha channel
     * @method
     * @param  {String} channelName name of channel to store into
     * @param  {SelectionType} [combination] Selection type to use. Defaults to SelectionType.REPLACE
     * @return {Object}             Chained reference to selection utilities.
     */
    selection.load = function (channelName, combination, remove)
    {
        var channel = app.activeDocument.channels.getByName(channelName);

        combination = combination || SelectionType.REPLACE;

        var dlgMode = app.displayDialogs;

        try {
            app.displayDialogs = DialogModes.NO;
            app.activeDocument.selection.load(channel, combination);
        } catch (err) {
            log.error(err);
            log.warn($.stack);
            throw err;
            // throw new Error('Could not load channel: '+ channelName + "\n\n" + err.message)
        } finally {
            app.displayDialogs = dlgMode;
        }

        if(remove) {
            channel.remove();
        }

        return selection;
    };

    /**
     * Loads seleciton from aggregate merge of all visible layers. Slow but effective.
     * @method
     * @param  {SelectionType} [combination] Selection type to use. Defaults to SelectionType.REPLACE
     * @return {Object}             Chained reference to selection utilities.
     */
    selection.fromVisiblePixels = function(combination) {

        if (!Lifter.layers)
            throw new Error('Lifter.selection.fromLayerMask requires the Lifter.layers library.');

        // empty or non-visible layers cause 'copy' to throw error
        try {
            // make tmp merged layer to get selection from
            selection
            .selectAll()
            .copy(true)// copy merged
            .paste(true);// paste in place makes new layer

            // do all the selection checks and defaults here
            selection.fromLayerTransparency(combination);

            // remove tmp layer
            Lifter.layers.remove();

        } catch (error) {
            throw new Error('Unable to make selection from layers. Likely no pixels selected.');
        } finally {
            return selection;
        }
    };

    /**
     * Loads seleciton from layer transparency channel
     * @method
     * @param {Number} [layerId] Layer Id, defaults to currently active layer if null or not specified.
     * @param  {SelectionType} [combination] Selection type to use. Defaults to SelectionType.REPLACE
     * @return {Object}             Chained reference to selection utilities.
     */
    selection.fromLayerTransparency = function() {
        _overloadFunction_Number_Obj(arguments, undefined, SelectionType.REPLACE);

        // Parse args
        var layerId = arguments[0],
            combination = arguments[1];

        if (!Lifter.layers)
            throw new Error('Lifter.selection.fromLayerMask requires the Lifter.layers library.');

        _doSelectionFromLayer(layerId, LifterMaskType.TRANSPARENCY, combination);
        return selection;
    };


    /**
     * Loads seleciton from layer mask channel
     * @method
     * @param {Number} [layerId] Layer Id, defaults to currently active layer if null or not specified.
     * @param  {SelectionType} [combination] Selection type to use. Defaults to SelectionType.REPLACE
     * @return {Object}             Chained reference to selection utilities.
     */
    selection.fromLayerMask = function() {
        _overloadFunction_Number_Obj(arguments, undefined, SelectionType.REPLACE);

        // Parse args
        var layerId = arguments[0],
            combination = arguments[1];

        if (!Lifter.layers)
            throw new Error('Lifter.selection.fromLayerMask requires the Lifter.layers library.');

        if (Lifter.layers.masks.hasLayerMask(layerId) == false)
            throw new Error('Layer '+Lifter.layers.prop(layerId, 'name') + ' has no layer mask to select.');

        _doSelectionFromLayer(layerId, LifterMaskType.LAYERMASK, combination);
        return selection;
    };


    /**
     * Loads seleciton from layer's vector mask
     * @method
     * @param {Number} [layerId] Layer Id, defaults to currently active layer if null or not specified.
     * @param  {SelectionType} [combination] Selection type to use. Defaults to SelectionType.REPLACE
     * @return {Object}             Chained reference to selection utilities.
     */
    selection.fromVectorMask = function() {
        _overloadFunction_Number_Obj(arguments, undefined, SelectionType.REPLACE);

        // Parse args
        var layerId = arguments[0],
            combination = arguments[1];

        if (!Lifter.layers)
            throw new Error('Lifter.selection.fromLayerMask requires the Lifter.layers library.');

        if (Lifter.layers.masks.hasVectorMask(layerId) == false)
            throw new Error('Layer '+Lifter.layers.prop(layerId, 'name') + ' has no vector mask to select.');

        _doSelectionFromLayer(layerId, LifterMaskType.VECTORMASK, combination);
        return selection;
    };

    // selection.makeNewRegion(x,y,sw,sh,strInUnit){ //makeSelection(x,y,sw,sh,"cm")
    // 	var ysh=new UnitValue (parseFloat(y+sh), strInUnit);
    // 	var xsw=new UnitValue (parseFloat(x+sw), strInUnit);
    //     app.activeDocument.selection.select([ [x,y], [x,ysh], [xsw,ysh], [xsw,y] ]);
    // }

    // Public API
    /**
    * Contains low-level methods to work with selections without accessing Photoshop DOM.
    */
    Lifter.selection = selection;
    log.debug("Lifter.selection done.");
}());
