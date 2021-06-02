/**
  *
  * Descriptor-Info
  * JSX script to recursively get all the properties in an ActionDescriptor used in Adobe applications
  *
  * Author: Javier Aroche (https://github.com/JavierAroche)
  * Repo: https://github.com/JavierAroche/descriptor-info
  * Version: v1.1.0
  * License MIT
  *
  */

/**
  * Descriptor Info constructor.
  * @constructor
  */
var Descriptor = this.Descriptor = function Descriptor() {}

/**
  * @public
  * Handler function to get Action Descriptor properties
  * @param {Object} Action Descriptor
  * @param {Object} Optional params object
  * 	@param {Boolean} reference - return reference descriptors. Could slightly affect speed. Default = false.
  * 	@param {Number} maxRawLimit - limits the max number of characters from a RAWTYPE descriptor. Default = 10000.
  * 	@param {Number} maxXMPLimit - limits the max number of characters from an XMPMetadataAsUTF8 property. Default = 10000.
  */
Descriptor.prototype.getProperties = function( theDesc, params ) {
	// Define params
	this.descParams = {
		reference : params.reference || false,
		maxRawLimit : params.maxRawLimit || 10000,
		maxXMPLimit : params.maxXMPLimit || 10000
	};

	var descObject;
	if( theDesc == '[ActionList]' ) {
		descObject = this._getDescList( theDesc );
	} else {
		descObject = this._getDescObject( theDesc, {} );
	}

	return descObject;
};

/**
  * @private
  * Handler function to get the items in an ActionDescriptor Object
  * @param {Object} Action Descritor
  * @param {Object} Empty object to return (required since it's a recursive function)
  */
Descriptor.prototype._getDescObject = function( theDesc, descObject ) {
	for ( var i = 0; i < theDesc.count; i++ ) {
			var typeID = theDesc.getKey(i);
			var descType = ( theDesc.getType( typeID ) ).toString();

			var descProperties,
				descStringID = typeIDToStringID( typeID ),
				descCharID = typeIDToCharID( typeID );

			descProperties = this._getValue( theDesc, descType, typeID );

			var objectName = this._getBestName( typeID );

			switch( descType ) {
				case 'DescValueType.OBJECTTYPE':
					descProperties = this._getDescObject( descProperties, {} );
				break;

			case 'DescValueType.LISTTYPE':
					descProperties = this._getDescList( descProperties );
                    break;

			case 'DescValueType.ENUMERATEDTYPE':
				descProperties.enumerationType = typeIDToStringID(theDesc.getEnumerationType( typeID ));
				break;

			case 'DescValueType.REFERENCETYPE':
				if( this.descParams.reference ) {
						var referenceValue;

						referenceValue = descProperties;

						try {
							descProperties.actionReference = this._getActionReferenceInfo( referenceValue );
						} catch( err) {
							$.writeln( "Unable to get value: " + descStringID + ' - ' + err );
						}

						try {
							descProperties.actionReferenceContainer = this._getActionReferenceInfo( referenceValue.getContainer() );
						} catch( err ) {
							$.writeln( "Unable to get container: " + descStringID + ' - ' + err );
						}

						try {
							descProperties.reference = executeActionGet( referenceValue );
						} catch( err ) {
							$.writeln( "Unable to run executeActionGet from value: " + descStringID + ' - ' + err );
						}

						try {
							descProperties.referenceContainer = executeActionGet( referenceValue.getContainer() );
						} catch( err ) {
							$.writeln( "Unable to run executeActionGet from container: " + descStringID + ' - ' + err );
						}
					}
					break;

				default:
					break;
			}

			descObject[objectName] = descProperties;
	}

	return descObject;
};

/**
  * @private
  * Handler function to get the items in an ActionList
  * @param {Object} Action List
  */
Descriptor.prototype._getDescList = function( list ) {
	var listArray = [];

	for ( var ii = 0; ii < list.count; ii++ ) {
		var listItemType = list.getType(ii).toString();
		var listItemValue = this._getValue( list, listItemType, ii );

        try {
    		switch( listItemType ) {
    			case 'DescValueType.OBJECTTYPE':
    				var listItemOBJ = {};

    				var listItemProperties,
    					descStringID = typeIDToStringID( list.getClass(ii) );

    				listItemProperties = this._getDescObject( listItemValue, {} );

    				var listItemObject = {};
    				listItemObject[descStringID] = listItemProperties;

    				listArray.push( listItemObject );
    				break;

    			case 'DescValueType.LISTTYPE':
    				listArray.push( this._getDescList( listItemValue ) );
    				break;

    			case 'DescValueType.REFERENCETYPE':
    				if( this.descParams.reference ) {
    					var referenceProperties = {};

    					try {
    						referenceProperties.actionReference = this._getActionReferenceInfo( listItemValue );
    					} catch( err) {
    						$.writeln( "Unable to get value: " + descStringID + ' - ' + err );
    					}

    					try {
    						referenceProperties.actionReferenceContainer = this._getActionReferenceInfo( listItemValue.getContainer() );
    					} catch( err ) {
    						$.writeln( "Unable to get container: " + descStringID + ' - ' + err );
    					}

    					try {
    						referenceProperties.reference = executeActionGet( listItemValue );
    					} catch( err ) {
    						$.writeln( "Unable to run executeActionGet from value: " + descStringID + ' - ' + err );
    					}

    					try {
    						referenceProperties.referenceContainer = executeActionGet( listItemValue.getContainer() );
    					} catch( err ) {
    						$.writeln( "Unable to run executeActionGet from container: " + descStringID + ' - ' + err );
    					}

    					listArray.push( referenceProperties );

    				} else {
    					listArray.push( listItemValue );
    				}
    				break;

    			default:
    				listArray.push( listItemValue );
    				break;
    		}
        } catch( err) {
            $.writeln( "Unable to get list: "+ listItemValue + " - " + err );
        }
	}

	return listArray;
}

/**
  * @private
  *
  * Based on code by Michael Hale
  * http://www.ps-scripts.com/
  *
  * Handler function to get the value of an Action Descriptor
  * @param {Object} Action Descriptor
  * @param {String} Action Descriptor type
  * @param {Number} Action Descriptor Key / Index
  */
Descriptor.prototype._getValue = function( theDesc, descType, position ) {
	switch( descType ) {
		case 'DescValueType.BOOLEANTYPE':
			return theDesc.getBoolean( position );
			break;

		case 'DescValueType.CLASSTYPE':
			return theDesc.getClass( position );
			break;

		case 'DescValueType.DOUBLETYPE':
			return theDesc.getDouble( position );
			break;

		case 'DescValueType.ENUMERATEDTYPE':
			return typeIDToStringID(theDesc.getEnumerationValue( position ));
			break;

		case 'DescValueType.INTEGERTYPE':
			return theDesc.getInteger( position );
			break;

		case 'DescValueType.LISTTYPE':
			return theDesc.getList( position );
			break;

		case 'DescValueType.OBJECTTYPE':
			return theDesc.getObjectValue( position );
			break;

		case 'DescValueType.REFERENCETYPE':
			return theDesc.getReference( position );
			break;

		case 'DescValueType.STRINGTYPE':
			var str = '';
			if( typeIDToStringID( position ) == 'XMPMetadataAsUTF8' ) {
				return str + JSON.stringify(theDesc.getString( position )).substring( 0, this.descParams.maxXMPLimit );
			} else {
				return str + theDesc.getString( position );
			}

			break;

		case 'DescValueType.UNITDOUBLE':
			return theDesc.getUnitDoubleValue( position );
			break;

		case 'DescValueType.ALIASTYPE':
			return decodeURI(theDesc.getPath( position ));
			break;

		case 'DescValueType.RAWTYPE':
			return theDesc.getData( position ).substring( 0, this.descParams.maxRawLimit );
			break;

		case 'ReferenceFormType.CLASSTYPE':
			return theDesc.getDesiredClass();
			break;

		case 'ReferenceFormType.ENUMERATED':
			var enumeratedID = theDesc.getEnumeratedValue();
			return this._getBestName( enumeratedID );
			break;

		case 'ReferenceFormType.IDENTIFIER':
			return theDesc.getIdentifier();
			break;

		case 'ReferenceFormType.INDEX':
			return theDesc.getIndex();
			break;

		case 'ReferenceFormType.NAME':
			var str = '';
			return str + theDesc.getName();
			break;

		case 'ReferenceFormType.OFFSET':
			return theDesc.getOffset();
			break;

		case 'ReferenceFormType.PROPERTY':
			var propertyID = theDesc.getProperty();
			return this._getBestName( propertyID );
			break;

		default:
			break;
	};
};

/**
  * @private
  *
  * Handler function to get the info about action reference
  * @param {Object} Action Reference
  */
Descriptor.prototype._getActionReferenceInfo = function( reference ) {
	var form = reference.getForm().toString();
	var classID = reference.getDesiredClass();
	var info = this._getValue( reference, form, 0 );

	return info;
}


/**
  * @private
  *
  * Handler function to get the best name for typeID
  * @param {Number} typeID
  */
Descriptor.prototype._getBestName = function( typeID ) {
	var stringValue = typeIDToStringID( typeID );
	var charValue = typeIDToCharID( typeID );

	if( stringValue ) {
		return stringValue;
	} else if( charValue ) {
		return charValue;
	} else {
		return typeID + "";
	}
}

// Create a new Descriptor instance
Lifter.Descriptor = new Descriptor();
