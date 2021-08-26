/**
 * Copyright 2021 Max Johnson
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
    // You can't "get" a comp descriptor alone like a layer or document
    // This will throw errors -> desc = executeActionGet(ref);
    // It is in the document->compsList as an ObjectValue type
    //
    // You can not get the ID via the DOM properties
    // You can not get the selected state from the comp AM properties
    // You can ONLY get the applied state via AM JSON extraction

    var layerComps = {};

    /** shortcut var to DOM comps object */
    function _getCompsDOM (){
        return app.activeDocument.layerComps;
    };

    /** Puts the correct value in 'ref' to the get the document specified by DocumentId. @private */
    function _getDocumentIdRef(documentId, ref)
    {
        if (typeof documentId !== 'number')
        {
            // If DocumentId is not passed, assume current document
            if (app.documents.length === 0)
                throw new Error('Could not target current document: no documents are currently open.');

            ref.putEnumerated(c2id('Dcmn'), c2id('Ordn'), c2id('Trgt'));
        }
        else
        {
            // Use DocumentId directly
            ref.putIdentifier(c2id('Dcmn'), documentId);
        }
    };

    /**
     * Gets compsList descriptor for current document.
     * @private
     * @param {Number} [documentId] id of target document, defaults to active doc if null or undefined.
     * @returns {ActionDescriptor} List type ActionDescriptor of layer comps
     */
    function _getCompsListDesc(documentId) {
        var ref = new ActionReference();
        _getDocumentIdRef(documentId, ref);
        return executeActionGet(ref).getList(stringIDToTypeID("compsList"));
    };

    /**
     * Gets comp descriptor by id or for first selected.
     * @private
     * @param {Number} [compId] id of target comp, defaults to first selected if null or undefined.
     * @returns {ActionDescriptor} Object type ActionDescriptor of layer comp
     */
    function _getCompIdDesc(compId)
    {
        var itemIndex = (typeof compId !== 'number')? layerComps.getSelectedItemIndex() : layerComps.getItemIndexFromId(compId);

        if(typeof itemIndex !== 'number')
            throw new Error('No layer comp selected.');

        return _getCompsListDesc().getObjectValue(itemIndex);
    };

    /** Puts the correct value in 'ref' to the get the comps state specified by compId. @private */
    function _getCompIdRef(compId, ref)
    {
        if (typeof compId !== 'number')
        {
            // If compId is not passed, assume current comps state
            ref.putEnumerated(s2id('compsClass'), c2id('Ordn'), c2id('Trgt'));
        }
        else
        {
            // Use compId directly
            ref.putIdentifier(s2id('compsClass'), compId);
        }
    };


    /**
    * Supported comps state properties. This is public so that additional properties can be added at runtime.
    */
    layerComps.supportedProperties = {
        'itemIndex': {
            typeId: c2id('ItmI'),
            type: DescValueType.INTEGERTYPE,
            set: false,
        },
        'id': {
            typeId: s2id('ID'),
            type: DescValueType.INTEGERTYPE,
            set: false,
        },
        'selected': {
            typeId: s2id('selection'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: false,
            set: false
        },
        'name': {
            typeId: c2id('Ttl '),
            type: DescValueType.STRINGTYPE,
            defaultValue: 'Comp'
        },
        'comment': {
            typeId: s2id('comment'),
            type: DescValueType.STRINGTYPE,
            defaultValue: ''
        },
        'visibility': {
            typeId: s2id('useVisibility'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: true
        },
        'position': {
            typeId: s2id('usePosition'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: false
        },
        'appearance': {
            typeId: s2id('useAppearance'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: false
        },
        'childLayerCompState': {
            typeId: s2id('useChildLayerCompState'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: true
        }
    };

    /**
     * Gets the number of comps states for the currently active document.
     * @return Number of comps states for the currently active document.
     */
    layerComps.count = function ()
    {
        return _getCompsDOM().length;
    };

    /**
     * Gets comps data object via JSON query. Optionally gets per-layer data.
     * @private
     * @param {Number} [documentId] id of target document, defaults to active doc if null or undefined.
     * @param {Boolean} [ doLayerData = false ] if true, include data for each layer per comp 
     * @returns {Object} JSON object with comps data
     */
    layerComps.getJSON = function (documentId, doLayerData) {
        doLayerData = (doLayerData === true);

        var desc = new ActionDescriptor();
        var docRef = new ActionReference();
            docRef.putProperty(c2id('Prpr'), s2id("json"));
            _getDocumentIdRef(documentId, docRef);

        desc.putReference(c2id('null'), docRef);
        desc.putBoolean(s2id("compInfo"), true);// just return the Layer Comp settings
        desc.putBoolean(s2id( "getCompLayerSettings" ), doLayerData); // return Layer Comp settings for each layer

        return executeAction(c2id( "getd" ), desc, DialogModes.NO).getString(s2id("json"));
    };

    /**
     * Gets the identifier of the comps state identified by the passed ItemIndex.
     * @param {Number} itemIndex comps state ItemIndex.
     * @return {Number} comps state identifier.
     */
    layerComps.getIdFromItemIndex = function (itemIndex)
    {
        // return _getCompsDOM()[i].id;//shockingly, the action manager is slower at this!
        var compDesc = _getCompsListDesc().getObjectValue(itemIndex);
        return compDesc.getInteger(stringIDToTypeID('ID'));
    };

    /**
     * Gets the ItemIndex of the comps state identified by the passed identifier.
     * @param {Number} compId comps state id.
     * @return {Number} comps state ItemIndex.
     */
    layerComps.getItemIndexFromId = function (compId)
    {
        var comps = _getCompsDOM();
        var testId;
        var i;
        var n = comps.length;
        for(i=0;i<n;i++) {
            testId = layerComps.getIdFromItemIndex(i);
            if (testId === compId) {
                return i;
            }
        }
    };

    /**
     * Gets the identifier of the first selected comps state.
     * @return {Number} identifier of first selected comps state. Undefined if no comp selected.
     */
    layerComps.getSelectedId = function ()
    {
        var comps = _getCompsDOM();
        var i;
        var n = comps.length;
        for(i=0;i<n;i++) {
            if (comps[i].selected === true) {
                return layerComps.getIdFromItemIndex(i);
            }
        }
        return undefined;
    };

    /**
     * Gets the index of the first selected comps state.
     * @return {Number} index of first selected comps state. Undefined if no comp selected.
     */
    layerComps.getSelectedItemIndex = function ()
    {
        var comps = _getCompsDOM();
        var i;
        var n = comps.length;
        for(i=0;i<n;i++) {
            if (comps[i].selected === true) {
                return i;
            }
        }
        return undefined;
    };

    /**
     * Gets the identifier of the currently applied comps state.
     * @return {Number} ID of the currently active comps state. Undefined if no comp applied.
     */
    layerComps.getAppliedId = function ()
    {
        obj = layerComps.getJSON();
        var i;
        var n = obj.length;
        for(i=0;i<n;i++) {
            if(obj.comps[i].hasOwnProperty('applied'));
                return obj.comps[i].id;
        }
        return undefined;
    };

    /**
     * Gets the identifier of the currently applied comps state.
     * @return {Number} index of the currently active comps state. Undefined if no comp applied.
     */
    layerComps.getAppliedItemIndex = function ()
    {
        obj = layerComps.getJSON();
        var i;
        var n = obj.length;
        for(i=0;i<n;i++) {
            if(obj.comps[i].hasOwnProperty('applied'));
                return i;
        }
        return undefined;
    };

    /**
     * Gets comp DOM object by id or for first selected.
     * @private
     * @param {Number} [compId] id of target comp, defaults to first selected if null or undefined.
     * @returns {Object} DOM object of layer comp
     */
    layerComps.getById = function (compId)
    {
        var itemIndex = layerComps.getItemIndexFromId(compId);

        if(typeof itemIndex === 'number')
            return _getCompsDOM()[itemIndex];
    }

    /**
     * Gets first selected layer comp object.
     * @return {Object} First selected comp DOM object.
     */
    layerComps.getSelected = function ()
    {
        var itemIndex = layerComps.getSelectedItemIndex();

        if(typeof itemIndex === 'number')
            return _getCompsDOM()[itemIndex];
    }

    /**
     * Gets all selected layer comp objects.
     * @return {Array} Array of selected comps DOM objects.
     */
    layerComps.getAllSelected = function ()
    {
        var comps = _getCompsDOM();
        var selection = [];
        var i;
        var n = comps.length;
        for(i=0;i<n;i++) {
            if (comps[i].selected === true) {
                selection.push(comps[i]);
            }
        }
        return selection;
    };

    /**
     * Iterates over the comps states stack, executing the specified callback on each element.
     * Please note: Adding or removing comps states while iterating is not supported.
     * @param {Function} callback       Callback function. It is bound to context and invoked with two arguments (itemIndex, compsStateId).
     *                                  If callback returns true, iteration is stopped.
     * @param {Object} [context=null]   Callback function context.
     * @param {Boolean} [reverse=false] Whether to iterate from the end of the comps states stack.
     * @return Chained reference to comps utilities.
     */
    layerComps.forEach = function (callback, context, reverse) // callback[, context[, reverse]]
    {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a valid function.');

        var n, i;

        if (reverse)
        {
            i = layerComps.count() + 1;
            n = 0;

            while (--i > n)
            {
                if (callback.call(context, i, layerComps.getIdFromItemIndex(i)))
                    break;
            }
        }
        else
        {
            n = layerComps.count() + 1;
            i = 0;

            while (++i < n)
            {
                if (callback.call(context, i, layerComps.getIdFromItemIndex(i)))
                    break;
            }
        }

        return layerComps;
    };

    /**
     * Gets or sets the property with the given name on the specified comps state. If invoked with no arguments
     * returns id of first selected comp.
     * @param {Number} [compId] comps state identifier, defaults to currently active comps state if null or not specified.
     * @param {String} [name] Property name.
     * @param {Any} [value] Property value.
     * @return {Any, ActionDescriptor, Object}  Property value when getting a property, selected comp id when invoked with no arguments
     *                                          or a chained reference to document utilities when setting a property.
     */
    layerComps.prop = function ()
    {
        // Parse args
        var compId, name, value, ref, compObj;
        var obj, n, i;
        obj = _getCompsDOM();
        n = layerComps.count();

        if (typeof arguments[0] === 'number'
            || (!arguments[0] && arguments.length > 1))
        {
            compId = arguments[0];
            name = arguments[1];
            value = arguments[2];
        }
        else
        {
            name = arguments[0];
            value = arguments[1];
        }

        if (typeof name === 'undefined')
        {
            for(i=0;i<n;i++) {
                if (obj[i].selected === true) {
                    return layerComps.getIdFromItemIndex(i);
                }
            }
        }
        else
        {
            // Find property
            if (!layerComps.supportedProperties.hasOwnProperty(name))
                throw new Error(['Invalid comps state property: "', name, '".'].join(''));

            var prop = layerComps.supportedProperties[name];
            compObj = layerComps.getById(compId);

            if (typeof value === 'undefined')
            {
                // Get
                if (prop.get)
                {
                    // Use custom getter for this property
                    return prop.get.call(null, prop, compId, compObj);
                }
                else
                {
                    // Call getter for specific type
                    return compObj[name];
                }
            }
            else
            {
                // Set
                if (prop.set === false)
                    throw new Error(['Property "', name, '" is read-only.'].join(''));
                else if (typeof prop.set === 'function') {
                    prop.set.call(null, prop, compId, value);
                }
                else
                {
                    compObj[name] = value;
                }
                return layerComps;
            }
        }
    };

    /**
     * Finds all the comps states that match the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Array} An array containing find results.
     */
    layerComps.findAll = _find.bind(null, layerComps, 0);

    /**
     * Finds the first comps state that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    layerComps.findFirst = _find.bind(null, layerComps, 1);

    /**
     * Finds the last comps state that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    layerComps.findLast = _find.bind(null, layerComps, 2);

    /**
     * Resets to Last Document State.
     * @return Chained reference to comps utilities.
     */
     layerComps.applyLastDocumentState = function ()
     {
        var desc = new ActionDescriptor();
        executeAction( s2id( "resetFromComp" ), desc, DialogModes.NO );

        return this;
     };

    /**
     * Sets the currently active comps state to the one identified by the passed compId.
     * @param {Number} compId comps state identifier.
     * @return Chained reference to comps utilities.
     */
    layerComps.apply = function (compId)
    {
        if (typeof compId !== 'number' || compId < 1)
            throw new Error(['Invalid comps state identifier: "', compId, '".'].join(''));

        layerComps.getById(compId).apply()

        return this;
    };

    /**
     * Sets the currently active comps state to the one identified by the passed offset.
     * @param {Number} offset Offset from the last comps state.
     * @return Chained reference to comps utilities.
     */
    layerComps.applyByOffset = function (offset)
    {
        if (typeof offset !== 'number' || offset === 0)
            throw new Error(['Invalid comps state offset: "', offset, '".'].join(''));
            
        var comps = _getCompsDOM();
        var newIndex = 0;
        var appliedIndex = layerComps.getAppliedItemIndex();

        if(typeof appliedIndex === 'number') {
            appliedIndex = 0;
        }

        newIndex = comps[(comps.length+appliedIndex+(offset%comps.length))%comps.length];// double modulus bug hack - https://stackoverflow.com/questions/11153364/javascript-array-get-offset-index-from-specific-index
        comps[newIndex].apply();
        return this;
    };

    /**
     * Sets the currently active comps state to the previous one in the stack.
     * @return Chained reference to comps utilities.
     */
    layerComps.applyPrevious = layerComps.applyByOffset.bind(null, -1);

    /**
     * Sets the currently active comps state to the next one in the stack.
     * @return Chained reference to comps utilities.
     */
    layerComps.applyNext = layerComps.applyByOffset.bind(null, 1);

    /**
     * Recapture the selected comp state
     * @param {Boolean} useSelected     update only selected layers
     * @param {Boolean} useVisibility   update visibility
     * @param {Boolean} usePosition     update position
     * @param {Boolean} useAppearance   update styles
     * @param {Boolean} useChildLayerCompState update smart object comp states
     * @return Chained reference to comps utilities.
     */
    layerComps.recapture = function (useSelected, useVisibility, usePosition, useAppearance, useChildLayerCompState)
     {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
            _getCompIdRef(undefined, ref);
            desc.putReference( c2id('null'), ref );

        if(typeof useVisibility === 'boolean')
            desc.putBoolean( s2id('useVisibility'), useVisibility );
        if(typeof usePosition === 'boolean')
            desc.putBoolean( s2id('usePosition'), usePosition );
        if(typeof useAppearance === 'boolean')
            desc.putBoolean( s2id('useAppearance'), useAppearance );
        if(typeof useChildLayerCompState === 'boolean')
            desc.putBoolean( s2id('useChildLayerCompState'), useChildLayerCompState );

        if(typeof useSelected === 'boolean')
            desc.putBoolean( s2id('selected'), useSelected );
        executeAction( s2id('recapture'), desc, DialogModes.NO );
         return this;
     };

    /**
     * Duplicates the currently active comps state, creating a new document from it.
     * @return Chained reference to comps utilities.
     */
    layerComps.duplicate = function (compId)
    {
        var desc = new ActionDescriptor();
            var ref = new ActionReference();
            _getCompIdRef(compId, ref);
        desc.putReference( c2id('null'), ref );
        executeAction( c2id('Dplc'), desc, DialogModes.NO );
        return this;
    };

    /**
     * Deletes the specified comps state.
     * @param {Number} [compId] comps state identifier, defaults to currently active comps state if not provided.
     * @return Chained reference to comps utilities.
     */
    layerComps.remove = function (compId)
    {
        var desc = new ActionDescriptor();
            var ref = new ActionReference();
            _getCompIdRef(compId, ref);
        executeAction( cTID('Dlt '), desc, DialogModes.NO );
        return layerComps;
    };

    // Public API
    /**
    * Contains low-level methods to work with comps without accessing Photoshop DOM.
    */
    Lifter.layerComps = layerComps;
}());
