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

/*
 * A collection of ES5 shims for polyfiling Exendscript (https://github.com/ExtendScript/extendscript-es5-shim)
 */

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function(callback, thisArg) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var T = arguments.length > 1 ? thisArg : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && callback.call(T, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
*/
if (!Array.prototype.every) {
  Array.prototype.every = function(callback, thisArg) {
    var T, k;

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.every called on null or undefined');
    }

    // 1. Let O be the result of calling ToObject passing the this
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method
    //    of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    T = (arguments.length > 1) ? thisArg : void 0;

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method
        //    of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the Call internal method
        //     of callback with T as the this value and argument list
        //     containing kValue, k, and O.
        var testResult = callback.call(T, kValue, k, O);

        // iii. If ToBoolean(testResult) is false, return false.
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/
if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.filter called on null or undefined');
    }

    var t = Object(this);
    var len = t.length >>> 0;

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var res = [];

    var T = (arguments.length > 1) ? thisArg : void 0;

    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (callback.call(T, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {


        if (this === void 0 || this === null) {
            throw new TypeError('Array.prototype.forEach called on null or undefined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (callback.__class__ !== 'Function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        var T = (arguments.length > 1) ? thisArg : void 0;


        // 6. Let k be 0
        //k = 0;

        // 7. Repeat, while k < len
        for (var k = 0; k < len; k++) {
            var kValue;
            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {
                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];
                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
        }
        // 8. return undefined
    }
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {


    // 1. Let o be the result of calling ToObject passing
    //    the this value as the argument.
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.indexOf called on null or undefined');
    }

    var k;
    var o = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of o with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = o.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of o with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of o with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*/
if (!Array.isArray) {
  Array.isArray = function(arg) {

    if (arg === void 0 || arg === null) {
      return false;
    }
  	return (arg.__class__ === 'Array');
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.15
// Reference: http://es5.github.io/#x15.4.4.15
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement, fromIndex) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.lastIndexOf called on null or undefined');
    }

    var n, k,
      t = Object(this),
      len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }

    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.map called on null or undefined');
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    T = (arguments.length > 1) ? thisArg : void 0;

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    for (var k = 0; k < len; k++) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
    }
    // 9. return A
    return A;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this), len = t.length >>> 0, k = 0, value;

    if (arguments.length > 1)
      {
        value = initialValue;
      }
    else
      {
        while (k < len && !(k in t)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k++];
      }

    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.22
// Reference: http://es5.github.io/#x15.4.4.22
if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callback, initialValue) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
    if (arguments.length > 1)
      {
        value = initialValue;
      }
    else
      {
        while (k >= 0 && !(k in t)) {
          k--;
        }
        if (k < 0) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k--];
      }

    for (; k >= 0; k--) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
*/
if (!Date.prototype.toISOString) {
  (function() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toISOString = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };

  }());
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

WARNING! Bound functions used as constructors NOT supported by this polyfill!
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Bound_functions_used_as_constructors
*/
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (this.__class__ !== 'Function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
if (!Object.create) {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function(O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (Object(O) !== O && O !== null) {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            var descriptor = Properties[prop];
            if (Object(descriptor) !== descriptor) {
              throw TypeError(prop + 'must be an object');
            }
            if ('get' in descriptor || 'set' in descriptor) {
              throw new TypeError('getters & setters can not be defined on this javascript engine');
            }
            if ('value' in descriptor) {
              obj[prop] = Properties[prop];
            }

          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
*/
if (!Object.defineProperties) {

  Object.defineProperties = function(object, props) {

    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function convertToDescriptor(desc) {

      if (Object(desc) !== desc) {
        throw new TypeError('Descriptor can only be an Object.');
      }


      var d = {};

      if (hasProperty(desc, "enumerable")) {
        d.enumerable = !!desc.enumerable;
      }

      if (hasProperty(desc, "configurable")) {
        d.configurable = !!desc.configurable;
      }

      if (hasProperty(desc, "value")) {
        d.value = desc.value;
      }

      if (hasProperty(desc, "writable")) {
        d.writable = !!desc.writable;
      }

      if (hasProperty(desc, "get")) {
        throw new TypeError('getters & setters can not be defined on this javascript engine');
      }

      if (hasProperty(desc, "set")) {
        throw new TypeError('getters & setters can not be defined on this javascript engine');
      }

      return d;
    }

    if (Object(object) !== object) {
      throw new TypeError('Object.defineProperties can only be called on Objects.');
    }

    if (Object(props) !== props) {
      throw new TypeError('Properties can only be an Object.');
    }

    var properties = Object(props);
    for (propName in properties) {
      if (hasOwnProperty.call(properties, propName)) {
        var descr = convertToDescriptor(properties[propName]);
        object[propName] = descr.value;
      }
    }
    return object;
  }
}
if (!Object.defineProperty) {

    Object.defineProperty = function defineProperty(object, property, descriptor) {

        if (Object(object) !== object) {
            throw new TypeError('Object.defineProperty can only be called on Objects.');
        }

        if (Object(descriptor) !== descriptor) {
            throw new TypeError('Property description can only be an Object.');
        }

        if ('get' in descriptor || 'set' in descriptor) {
            throw new TypeError('getters & setters can not be defined on this javascript engine');
        }
        // If it's a data property.
        if ('value' in descriptor) {
            // fail silently if 'writable', 'enumerable', or 'configurable'
            // are requested but not supported
            // can't implement these features; allow true but not false
            /* if (
                     ('writable' in descriptor && !descriptor.writable) ||
                     ('enumerable' in descriptor && !descriptor.enumerable) ||
                     ('configurable' in descriptor && !descriptor.configurable)
                 )
                     {
                         throw new RangeError('This implementation of Object.defineProperty does not support configurable, enumerable, or writable properties SET to FALSE.');
                     }*/


            object[property] = descriptor.value;
        }
        return object;
    }
}
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
if (!Object.freeze) {
    Object.freeze = function freeze(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.freeze can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
if (!Object.getOwnPropertyDescriptor) {

    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
        if (Object(object) !== object) {
            throw new TypeError('Object.getOwnPropertyDescriptor can only be called on Objects.');
        }

        var descriptor;
        if (!Object.prototype.hasOwnProperty.call(object, property)) {
            return descriptor;
        }

        descriptor = {
            enumerable: Object.prototype.propertyIsEnumerable.call(object, property),
            configurable: true
        };

        descriptor.value = object[property];

        var psPropertyType = object.reflect.find(property).type;
        descriptor.writable = !(psPropertyType === "readonly");

        return descriptor;
    }
}
if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {

        if (Object(object) !== object) {
            throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
        }
        var names = [];
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
        for (var prop in object) {
            if (hasOwnProperty.call(object, prop)) {
                names.push(prop);
            }
        }
        var properties = object.reflect.properties;
        var methods = object.reflect.methods;
        var all = methods.concat(properties);
        for (var i = 0; i < all.length; i++) {
            var prop = all[i].name;
            if (hasOwnProperty.call(object, prop) && !(propertyIsEnumerable.call(object, prop))) {
                names.push(prop);
            }
        }
        return names;
    };
}
if (!Object.getPrototypeOf) {
	Object.getPrototypeOf = function(object) {
		if (Object(object) !== object) {
			throw new TypeError('Object.getPrototypeOf can only be called on Objects.');
		}
		return object.__proto__;
	}
}
// ES5 15.2.3.13
// http://es5.github.com/#x15.2.3.13
if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isExtensible can only be called on Objects.');
        }
        return true;
    };
}
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isFrozen can only be called on Objects.');
        }
        return false;
    };
}
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isSealed can only be called on Objects.');
        }
        return false;
    };
}
if (!Object.keys) {
    Object.keys = function(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.keys can only be called on Objects.');
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var result = [];
        for (var prop in object) {
            if (hasOwnProperty.call(object, prop)) {
                result.push(prop);
            }
        }
        return result;
    };
}
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {

        if (Object(object) !== object) {
            throw new TypeError('Object.preventExtensions can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.8
// http://es5.github.com/#x15.2.3.8
if (!Object.seal) {
    Object.seal = function seal(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.seal can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
/*
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
*/
if (!String.prototype.trim) {
	// Вырезаем BOM и неразрывный пробел
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

/*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root.Object());
    exports || (exports = root.Object());

    // Native constructor aliases.
    var Number = context.Number || root.Number,
        String = context.String || root.String,
        Object = context.Object || root.Object,
        Date = context.Date || root.Date,
        SyntaxError = context.SyntaxError || root.SyntaxError,
        TypeError = context.TypeError || root.TypeError,
        Math = context.Math || root.Math,
        nativeJSON = context.JSON || root.JSON;

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty = objectProto.hasOwnProperty,
        undefined;

    // Internal: Contains `try...catch` logic used by other functions.
    // This prevents other functions from being deoptimized.
    function attempt(func, errorFunc) {
      try {
        func();
      } catch (exception) {
        if (errorFunc) {
          errorFunc();
        }
      }
    }

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    attempt(function () {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    });

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] != null) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
      } else if (name == "date-serialization") {
        // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
        isSupported = has("json-stringify") && isExtended;
        if (isSupported) {
          var stringify = exports.stringify;
          attempt(function () {
            isSupported =
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          });
        }
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function";
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            attempt(function () {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undefined &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undefined) === undefined &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undefined &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undefined]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undefined, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
            }, function () {
              stringifySupported = false;
            });
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse, parseSupported;
          if (typeof parse == "function") {
            attempt(function () {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  attempt(function () {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  });
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    });
                  }
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    });
                  }
                }
              }
            }, function () {
              parseSupported = false;
            });
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }
    has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      var forOwn = function (object, callback) {
        var size = 0, Properties, dontEnums, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        dontEnums = new Properties();
        for (property in dontEnums) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(dontEnums, property)) {
            size++;
          }
        }
        Properties = dontEnums = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = dontEnums.length; property = dontEnums[--length];) {
              if (hasProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forOwn(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify") && !has("date-serialization")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Serializes a date object.
        var serializeDate = function (value) {
          var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
          // Define additional utility methods if the `Date` methods are buggy.
          if (!isExtended) {
            var floor = Math.floor;
            // A mapping between the months of the year and the number of days between
            // January 1st and the first of the respective month.
            var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            // Internal: Calculates the number of days between the Unix epoch and the
            // first day of the given month.
            var getDay = function (year, month) {
              return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
            };
            getData = function (value) {
              // Manually compute the year, month, date, hours, minutes,
              // seconds, and milliseconds if the `getUTC*` methods are
              // buggy. Adapted from @Yaffle's `date-shim` project.
              date = floor(value / 864e5);
              for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
              for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
              date = 1 + date - getDay(year, month);
              // The `time` value specifies the time within the day (see ES
              // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
              // to compute `A modulo B`, as the `%` operator does not
              // correspond to the `modulo` operation for negative numbers.
              time = (value % 864e5 + 864e5) % 864e5;
              // The hours, minutes, seconds, and milliseconds are obtained by
              // decomposing the time within the day. See section 15.9.1.10.
              hours = floor(time / 36e5) % 24;
              minutes = floor(time / 6e4) % 60;
              seconds = floor(time / 1e3) % 60;
              milliseconds = time % 1e3;
            };
          } else {
            getData = function (value) {
              year = value.getUTCFullYear();
              month = value.getUTCMonth();
              date = value.getUTCDate();
              hours = value.getUTCHours();
              minutes = value.getUTCMinutes();
              seconds = value.getUTCSeconds();
              milliseconds = value.getUTCMilliseconds();
            };
          }
          serializeDate = function (value) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              getData(value);
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
              "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
              // Months, dates, hours, minutes, and seconds should have two
              // digits; milliseconds should have three.
              "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
              // Milliseconds are optional in ES 5.0, but required in 5.1.
              "." + toPaddedString(3, milliseconds) + "Z";
              year = month = date = hours = minutes = seconds = milliseconds = null;
            } else {
              value = null;
            }
            return value;
          };
          return serializeDate(value);
        };

        // For environments with `JSON.stringify` but buggy date serialization,
        // we override the native `Date#toJSON` implementation with a
        // spec-compliant one.
        if (has("json-stringify") && !has("date-serialization")) {
          // Internal: the `Date#toJSON` implementation used to override the native one.
          function dateToJSON (key) {
            return serializeDate(this);
          }

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          var nativeStringify = exports.stringify;
          exports.stringify = function (source, filter, width) {
            var nativeToJSON = Date.prototype.toJSON;
            Date.prototype.toJSON = dateToJSON;
            var result = nativeStringify(source, filter, width);
            Date.prototype.toJSON = nativeToJSON;
            return result;
          }
        } else {
          // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
          var unicodePrefix = "\\u00";
          var escapeChar = function (character) {
            var charCode = character.charCodeAt(0), escaped = Escapes[charCode];
            if (escaped) {
              return escaped;
            }
            return unicodePrefix + toPaddedString(2, charCode.toString(16));
          };
          var reEscape = /[\x00-\x1f\x22\x5c]/g;
          var quote = function (value) {
            reEscape.lastIndex = 0;
            return '"' +
              (
                reEscape.test(value)
                  ? value.replace(reEscape, escapeChar)
                  : value
              ) +
              '"';
          };

          // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
          var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
            var value, type, className, results, element, index, length, prefix, result;
            attempt(function () {
              // Necessary for host object support.
              value = object[property];
            });
            if (typeof value == "object" && value) {
              if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                value = serializeDate(value);
              } else if (typeof value.toJSON == "function") {
                value = value.toJSON(property);
              }
            }
            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }
            // Exit early if value is `undefined` or `null`.
            if (value == undefined) {
              return value === undefined ? value : "null";
            }
            type = typeof value;
            // Only call `getClass` if the value is an object.
            if (type == "object") {
              className = getClass.call(value);
            }
            switch (className || type) {
              case "boolean":
              case booleanClass:
                // Booleans are represented literally.
                return "" + value;
              case "number":
              case numberClass:
                // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                // `"null"`.
                return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
              case "string":
              case stringClass:
                // Strings are double-quoted and escaped.
                return quote("" + value);
            }
            // Recursively serialize objects and arrays.
            if (typeof value == "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  // throw TypeError();
                  // instead let's just pass the error as value and not explode ok?
                  value = TypeError();
                }
              }
              // Add the object to the stack of traversed objects.
              stack.push(value);
              results = [];
              // Save the current indentation level and indent one additional level.
              prefix = indentation;
              indentation += whitespace;
              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undefined ? "null" : element);
                }
                result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                forOwn(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                  if (element !== undefined) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }
                });
                result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
              }
              // Remove the object from the traversed object stack.
              stack.pop();
              return result;
            }
          };

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          exports.stringify = function (source, filter, width) {
            var whitespace, callback, properties, className;
            if (objectTypes[typeof filter] && filter) {
              className = getClass.call(filter);
              if (className == functionClass) {
                callback = filter;
              } else if (className == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};
                for (var index = 0, length = filter.length, value; index < length;) {
                  value = filter[index++];
                  className = getClass.call(value);
                  if (className == "[object String]" || className == "[object Number]") {
                    properties[value] = 1;
                  }
                }
              }
            }
            if (width) {
              className = getClass.call(width);
              if (className == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  if (width > 10) {
                    width = 10;
                  }
                  for (whitespace = ""; whitespace.length < width;) {
                    whitespace += " ";
                  }
                }
              } else if (className == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            }
            // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).
            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        }
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                var temp = source.slice(Index, Index + 4);
                if (temp == "true") {
                  Index += 4;
                  return true;
                } else if (temp == "fals" && source.charCodeAt(Index + 4 ) == 101) {
                  Index += 5;
                  return false;
                } else if (temp == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;;) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;;) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undefined) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forOwn` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(getClass, forOwn, value, length, callback);
              }
            } else {
              forOwn(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports.runInContext = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root.JSON3,
        isRestored = false;

    var JSON3 = runInContext(root, (root.JSON3 = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root.JSON3 = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

// Log and Console.log objects
if ($ && $.global) {
    if (typeof Log !== "function") {
        Log = function Log() { };
        Log.log = Log.info = Log.warn = Log.error = function(logIn){$.writeln(logIn);};
    }
    if (typeof $.global.log == "undefined") $.global.log = Log;
    if (typeof $.global.console == "undefined") $.global.console = Log;
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat#Polyfill
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) { // check if `this` is null or undefined
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    // To convert string to integer.
    count = +count;
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count |= 0; // floors and rounds-down it.
    if (str.length == 0 || count == 0) {
      return '';
    }
    // // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // // main part. But anyway, most current (August 2014) browsers can't handle
    // // strings 1 << 28 chars or longer, so:
    // if (str.length * count >= (1 << 28)) {
    //   throw new RangeError('repeat count must not overflow maximum string size');
    // }
    // while (count >>= 1) { // shift it by multiple of 2 because this is binary summation of series
    //    str += str; // binary summation
    // }
    // str += str.substring(0, str.length * count - str.length);

    // above doesn't work on cranky es3 photoshop for some reason.
    str = Array(count+1).join(str);
    return str;
  };
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0, targetLength);
        }
    };
}

//Arrays
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        // 1. Let O be ? ToObject(this value).
        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
            return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
            return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }
        // 7. Repeat, while k < len
        while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            if (sameValueZero(o[k], searchElement)) {
                return true;
            }
            // c. Increase k by 1.
            k++;
        }
        // 8. Return false
        return false;
    };
}

/*
MIT License

Copyright (c) 2019 Max Johnson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/* README.md
# Summary
 An Adobe ExtendScript compatible log file constructor with some built in
 convenience functions in a UMD wrapper for cross-compatability with AMD and
 node.js require.

Tries to be flexible but automate most things.

# Features
- Works with node.js require, AMD(probably), and vanilla ExtendScript.
- Tries to make a log file in ./logs with fallback to ~/Desktop/ExtendScript_Log_UnsavedScripts/
- Tries to clean up old files automatically (or keep them foreverrr)
- Plays nice with [ExtendScript_Log](https://github.com/MaxJohnson/extendscript_log)

# Import
## NPM
If running Node NPM, you can `npm install ExtendScript_Log` to add to your node_modules folder
## github
Clone or download the repo and copy the extendscript_logfile.jsxinc to your project

# Include

## NPM
`var LogFile = require("ExtendScript_LogFile");`

## AMD
I don't know but it's probably not difficult? Firmly in the untested-but-should-work category

## ExtendScript
### Eval into environment
`$.evalFile("<path>/extendscript_logfile.jsxinc")`

### Include in scripts
`//@include "<path>/extendscript_logfile.jsxinc"`

### concatinate or copy-paste directly
Add to a build script or, I dunno, just copy-pasta it in there?

# Use:

## Make new LogFile object
make a new log file and you get a separate instance
```
var myLogFile = new ExtendScript_LogFile();
myLogFile.log('Hey there.');
```
### Constructor options
"new" constructor takes 4 optional arguments.

```new ExtendScript_LogFile (root, logType, logDir, useDate)```

#### Argument 1 : root
is an alternate root object to tack on a 'logFile' alias
By passing $.global as first arg, we get global log and console objects!

```
root = $.global;// root to add convenience aliases to

var myExplicitLogFileVariable = new ExtendScript_LogFile(root);
myExplicitLogFileVariable.log('So explicit!');// call from a var
logFile.log('Like magic.');// uses the $.global.logFile we made
```

#### Argument 2 : logType
 specifies a non-"default" *type* and makes a file name
```
var myLogFile = new ExtendScript_LogFile();
myLogFile.log('Hey there.');

var specialLogFile = new ExtendScript_LogFile(null,"special");
specialLogFile.log('Salutations.');

// prints to:
// ./logs/default_2021-05-28T16-15-37.611.log >>[2021-05-28T16:15:37.612] default : Hey there.
// ./logs/special_2021-05-28T16-15-37.656.log >>[2021-05-28T16:15:37.657] special : Salutations.
```

#### Argument 3 : logDir (default: './logs/')
a non-"default" directory path to save the log to
```
root = $.global;// root to add convenience aliases to
logType = "special";// name other than "default"
logDir = '~/Desktop/mylogcabin/';// custom log directory

var myLogFile = new ExtendScript_LogFile(root, logType, logDir);
myLogFile.log('Salutations.');

// prints to:
// ~/Desktop/mylogcabin/special_2021-05-28T16-15-37.656.log >>[2021-05-28T16:15:37.657] special : Salutations.
```

#### Argument 3 : useDate (default: true)
specifies if the date should be prepended to the log entries
can be changed with `.useDate(false)`
```
root = $.global;// root to add convenience aliases to
logType = "special";// name other than "default"
logDir = '~/Desktop/mylogcabin/';// custom log directory
useDate = false;

var myLogFile = new ExtendScript_LogFile(root, logType, logDir, useDate);

myLogFile.log('Salutations.');

// prints to:
// ~/Desktop/mylogcabin/special_2021-05-28T16-15-37.656.log >> special : Salutations.
```

## Use the log file
`.log()` and `.writeln()` do the same thing...

`.useDate(false)` will disable the date printing in each entry

### Attatch to namespace or other log object
```
myLogFile = new ExtendScript_Log($.global);
logFile.log('Messages are good.');

var namespace = {};// maybe some other log system?

myLogSafeFile = new ExtendScript_Log(namespace);
namespace.logFile.log('This is way safer.');
```
## Cleanup
You can `.clear()` the contents or `.remove()` the file from disk.

You can also clear out of the same *type* with `.removeOld()` for non-current or `.removeAll()` for all.
```
myLogFile = new ExtendScript_Log();
logfile.log('Messages are good.');

myLogSafeFile = new ExtendScript_Log(namespace,'special');
namespace.logFile.log('This is way safer.');

myLogSafeFile.remove();

// make a bunch of "default" logs...
myLogFile = new ExtendScript_Log();
myLogFile = new ExtendScript_Log();
myLogFile = new ExtendScript_Log();
myLogFile = new ExtendScript_Log();

// purge all but latest "default" log.
myLogFile.removeOld();

// now only the current "default" file is left
myLogFile.removeAll();

myLogSafeFile = new ExtendScript_Log(namespace);

```

# Bonus Features
## Logs for unsaved scripts:
Tries to make a log file in ./logs in the location of the currently running
script, but will fall back to ~/Desktop/ExtendScript_Log_UnsavedScripts/

## Compatible with ExtendScript_Log:
This is used as a optional extra in [ExtendScript_Log](https://github.com/MaxJohnson/extendscript_log)

Like peanutbutter and chocolate...

*/

// Add semicolon to prevent BAD THINGS (TM) from happening to concatenated code.
;

// UMD for compatability with AMD and Node require, but still support a global constructor in the ExtendScript context
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS
    module.exports = factory;
  } else {
    // (root is global... so should be $.global for ExtendScript)
    root.ExtendScript_LogFile = factory;
  }
}($.global, function (root, logType, logDir, useDate) {// IIFE straight into the UMD, attaching to the $.global space

    $.strict = true;
    $.writeln("Loading extendscript LogFile...");

    var LogFile = { };
    var _logDir = logDir;
    var _useDate = (useDate !== false);

//helper functions

    // Make a folder and return a file handle.
    function _createLogFile(typeString) {
        var logFileDir = new Folder(_getDirString());
        if (!logFileDir.exists) {
            logFileDir.create();
        }

        var logFileName = typeString + "_" + _getDateString().replace(/[:]/g,'-')+ ".log";
        var logFilePath = _getDirString() + logFileName;
        return new File(logFilePath);
    }

    // Delete the log files that match the "type" name. Tidy up.
    function _removeLogFiles( keepLatest ) {

        var typeString = _getTypeString();
        var removeTime = (LogFile.file instanceof File && LogFile.file.exists)? LogFile.file.created.getTime():new Date().getTime();

        var logFileDir = new Folder(_getDirString());

        if (logFileDir.exists) {
            var logFiles = logFileDir.getFiles();
            for (f = 0; f < logFiles.length; f++) {
                var myFile = logFiles[f];
                var fileTime = myFile.created.getTime();
                var nameSearch = myFile.name.search(typeString + "_");
                if ( ( fileTime < removeTime || keepLatest == false ) && nameSearch > -1) {

                    myFile.remove();
                }
            }
        }
    }

    // Get log "type" or fallback
    function _getTypeString() {
        return LogFile.type||"default"; // account for un-saved or temp scripts
    }

    // Get script dir or fallback to desktop temp folder
    function _getDirString() {
        var dirPath;
        if (_logDir) {
            // user defined
            dirPath = _logDir;
        } else if (File($.fileName).exists) {
            // same directory as script
            dirPath = File($.fileName).path + "/logs/";
        } else {
            // account for un-saved or temp scripts
            dirPath = Folder.desktop + "/ExtendScript_Log_UnsavedScripts/";
        }
        return dirPath; 
    }

    // Overly complex UTC-like date string constructor polyfill
    function _getDateString() {
        var myDate = new Date();
        // forward compatability with ES5 Shims
        if (typeof myDate.getFullYear !== "function") {
            myDate.getFullYear = function() {
                return (myDate.getYear + 1900); // offset from year 1900
            };
        }

        var myYear = myDate.getFullYear().toString();
        var myMonth = _zeroPad(myDate.getMonth() + 1, 2); // counts from 0
        var myDay = _zeroPad(myDate.getDate(), 2);
        var myHours = _zeroPad(myDate.getHours(), 2);
        var myMinutes = _zeroPad(myDate.getMinutes(), 2);
        var mySeconds = _zeroPad(myDate.getSeconds(), 2);

        return myYear + 
        "-" + myMonth + 
        "-" + myDay + 
        "T" + myHours + 
        ':' + myMinutes + 
        ':' + mySeconds +
        '.' + (myDate.getMilliseconds() / 1000).toFixed(3).slice(2, 5);
    }

    // Pad those number strings kid. Pad em good.
    function _zeroPad(num, numZeros) {
        var absNum = Math.abs(num);
        var zeros = Math.max(0, numZeros - Math.floor(absNum).toString().length);
        var zeroString = Math.pow(10, zeros).toString().substr(1);
        if (num < 0) {
            zeroString = '-' + zeroString;
        }

        return zeroString + absNum;
    }

// Public Functions

    //initialization
    LogFile.init = function (logType) {
        LogFile.type = logType;
        LogFile.directory = _getDirString();
        LogFile.file = _createLogFile(_getTypeString());
        
        $.writeln("Initializing new LogFile: " + LogFile.file.path);

        return LogFile;
    };

    //write to file, date added by default
    LogFile.writeln = LogFile.log = function (logMessage) {
        LogFile.file.open("a+");
        if(_useDate) {
            logMessage = '[' + _getDateString() + "] " + logMessage;
        }
        LogFile.file.writeln(logMessage);
        LogFile.file.close();

        return LogFile;
    };

    //cleanup
    LogFile.clear = function () {
        LogFile.file.open("w");
        LogFile.file.close();

        return LogFile;
    };

    //remove this file
    LogFile.remove = function() {
        if(File(LogFile.file).exists) {
            LogFile.file.remove();
        }

        return LogFile;
    };

    // remove all similar files but this one
    LogFile.removeOld = function () {
        _removeLogFiles();
        return LogFile;
    };

    // remove all similar files
    LogFile.removeAll = function () {
        _removeLogFiles(false);
        return LogFile;
    };

    // change log file directory
    LogFile.setDirectory = function (newDir) {
        _logDir = newDir;
        LogFile.init(LogFile.type);
        return LogFile;
    };

    // change log file directory
    LogFile.useDate = function (useDate) {
        _useDate = (useDate !== false);//only false if explicitly stated
        LogFile.init(LogFile.type);
        return LogFile;
    };

    if(root) {
        root.logfile = LogFile;
    }
    // Spit it out already
    return LogFile.init(logType);

}));

/*
MIT License

Copyright (c) 2019 Max Johnon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/*
# Summary
An ExtendScript compatible log constructor object with shims for basic Console calls,
log file, and custom "ExtendScript_Log" events sent to CEP panels.

Trying to split the difference between too-basic and OMG-features-and-dependencies.

# Features
- Works with node.js require, AMD(probably), and vanilla ExtendScript.
- Adds 'log' and 'console' aliases to optional parameter (like `$.global`)
- Tries to JSON.stringify your message for you
- Optional [ExtendScript_LogFile](https://github.com/MaxJohnson/extendscript_logfile) support
- Event delivery to CEP (panels) (with secret support for passing data packets)
- Make multiple logs with different names and levels and files
- Graceful fallbacks or omissions if optional dependencies missing

## Non-Blocking Dependencies
- `JSON.stringify()` via whatever library you care to include
- Event to CEP panels with `new ExternalObject("lib:\PlugPlugExternalObject")`
- [ExtendScript_LogFile](https://github.com/MaxJohnson/extendscript_logfile)

# Import
## NPM
If running Node NPM, you can `npm install ExtendScript_Log` to add to your node_modules folder
## github
Clone or download the repo and copy the ExtendScript_Log.jsxinc to your project

# Include

## NPM
`var extlog = require("ExtendScript_Log");`

## AMD
I don't know but it's probably not difficult? Firmly in the untested-but-should-work category

## ExtendScript
### Eval into environment
`$.evalFile("<path>/ExtendScript_Log.jsxinc")`

### Include in scripts
`//@include "<path>/ExtendScript_Log.jsxinc"`

### concatinate or copy-paste directly
Add to a build script or, I dunno, just copy-pasta it in there?

# Use:
Default log levels are:

- 0  - trace
- 1  - debug
- 2  - info (also default if not specified)
- 3  - warn
- 10 - error

## Make new log object
make a new log and you get a separate instance
```
var myLog = new ExtendScript_Log();
myLog.log('Hey there.');
var specialLog = new ExtendScript_Log(null,"special");
specialLog.log('Salutations.');
myLog.warn('Special log thinks they're all that...');
specialLog.info('Default log is jealous cause I have a label.');

// prints:
// Hey there.
// SPECIAL:Salutations.
// [WARN] Special log thinks they're all that...
// SPECIAL:[INFO] Default log is jealous of my label.
```
### Constructor options
"new" constructor takes 6 optional arguments.
First arg is an alternate root object to tack on a 'log' and 'console' alias
By passing $.global as first arg, we get global log and console objects!

```
root = $.global;// root to add convenience alisases to
logName = "specialLog";// name other than "defualt"
logLevel = 2;// log level filter
useLogFile = true;// make a log file? Deafults to false. (see Bonus Features)
keepOldLogs = false;// keep or delete all but latest log file?
logFileDir = undefined;// a string filepath to save logs to.

myLog = new ExtendScript_Log(root, logName, logLevel, useLogFile, keepOldLogs, logFileDir);
```

## Use the log
```
Log.log (message, useAlert);// standard use

// send custom level/label; doesn't work with Log.info() etc.
Log.log (message, level, label, useAlert);
```

```
myLog = new ExtendScript_Log($.global);
console.log('Messages are good.');
console.info('So informative...');
log.warn('Duck!');
log.error('Not a good thing');

mySecretLog = new ExtendScript_Log(null, "secret");
mySecretLog.warn('Tell no one...');

// prints:
// Messages are good.
// [INFO] So informative...
// [WARN] Duck!
// [ERROR] Not a good thing
// SECRET:[WARN] Tell no one...
```

Second argument sends up an blocking alert dialog in app if true

```
log.error('Not a good thing', true);
```

# Bonus Features
## Log file:
Tries to make a log file in ./logs or to ~/Desktop/ExtendScript_Log_UnsavedScripts/
or you can specify a custom log folder path as the 6th argument.
Needs [ExtendScript_LogFile](https://github.com/MaxJohnson/extendscript_logfile),
*but will make a new log file automatically* if that has been included.

*Note: Different logs get different log files, even if they all print to the same console.*

## CEP event:
Tries to send type, level, label, and message as a packet in a custom event "ExtendScript_Log"
No JSON support needed in the script to send, but you have to un-strigify on receipt:
data string looks like: `{type: "default", level:2, label:"info", message:"Important things!"}`
Note: the "clear()" function sends a packet with "clear" label and log level 99.

## Add custom labels and levels:
```
// add a custom log level
Log.addLogLevel("gui",3);
Log.gui('Making dialog');
```
*/

// Add semicolon to prevent BAD THINGS (TM) from happening to concatenated code.
;

/**
 * ExtendScript_Log constructor
 * @method new ExtendScript_Log
 * @param   {Object}  root        Object to attach ".log" and ".console" aliases to.
 * @param  {String}   logName     Name for this log type, "" or null for "default"
 * @param  {Integer}  logLevel    Log level threshold. 0 = least important.
 * @param  {Boolean}  useLogFile  Whether or not to make a log file on the drive. Defaults to false.
 * @param  {Boolean}  keepOldLogs Unless set to true, only the latest log file is kept.
 * @return {Object}               Log object for chaining
 */

// UMD for compatability with AMD and Node require, but still support a global constructor in the ExtendScript context
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS
    module.exports = factory;
  } else {
    // (root is global... so should be $.global for ExtendScript)
    root.ExtendScript_Log = factory;
  }
}($.global, function (root, logName, logLevel, useLogFile , keepOldLogs, logFileDir) {// IIFE straight into the UMD, attaching to the $.global space

    $.strict = true;
    $.writeln("Loading extendscript Log...");

    var Log = { };

    Log.level = 0; //TODO: figure out some config for log level
    Log.logFile = null;
    Log.levels = {};
    Log.type = "";

    // Support for custom events
    try {
            var _xLib = new ExternalObject("lib:\PlugPlugExternalObject");
    } catch (err) {
        //silent fail and check for _xLib later
        $.writeln("[ERROR] Could not create ExternalObject for event handling. No CEP support.");
    }


    // convert error to string
    _getExceptionMessage = function _getExceptionMessage(e) {
        var fname, str;
        fname = !e.fileName ? '???' : decodeURI(e.fileName);
        str = "\tMessage: " + e.message + "\n\tFile: " + fname + "\n\tLine: " + (e.line || '???') + "\n\tError Name: " + e.name + "\n\tError Number: " + e.number;
        if ($.stack) {
            str += "\n\tStack: " + $.stack.split('\n').join('\n\t  ');
        }
        return str;
    };


    // Safety wrapper and fallback for stringify attempt
    _stringifyMessage = function _stringifyMessage(message) {
        switch (typeof message) {
            case 'string':
                return message;

            case 'function':
                // for logging, give more than just 'undefined'
                message = message.toString();
                return /(function [^\{]*)/.exec(message)[1];

            default:
                if (JSON && typeof JSON.stringify === 'function') {
                    return JSON.stringify(message);
                } else {
                    return String(message);
                }
        }
    };

    /**
     * Initialize log object with parameters
     * @method
     * @param  {String} logName     Name for this log type, "" or null for "default"
     * @param  {Integer} logLevel    Log level number. Lowest is least important.
     * @param  {Boolean} useLogFile  Whether or not to make a log file on the drive. Defaults to false.
     * @param  {Boolean} keepOldLogs Unless set to true, only the latest log file is kept.
     * @return {Object}            Log object for chaining
     */
    Log.init = function(logName, logLevel, useLogFile, keepOldLogs, logFileDir) {
        Log.level = (typeof logLevel == "number") ? logLevel : 0;
        Log.type = (typeof logName == "string")? logName.toLowerCase():"default";

        if (useLogFile && typeof ExtendScript_LogFile == "function") {

            if (!Log.logFile) {
                Log.logFile = new ExtendScript_LogFile(Log, logName, logFileDir);
                if (!keepOldLogs) {
                    Log.logFile.removeOld();
                }
            }
        }
        return Log;
    };

    /**
     * Ensures special control characters are properly escaped for
     * JSON message delivery
     * This is a bastardization of the `Quote(value)` operation
     * defined in ES 5.1 section 15.12.3.
     * @method
     * @param  {String} value string to escape control chars from
     * @return {String}       fixed up string
     */
    Log.escapeControlCharacters = function (value) {
        // Control characters and escaped equivalents
        var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
        };

        var _escapeChar = function(character) {
            var charCode = character.charCodeAt(0);
            var escaped = Escapes[charCode];
            if (escaped) {
                return escaped;
            }
            return "\\u00" + toPaddedString(2, charCode.toString(16));
        };

        var reEscape = /[\x00-\x1f\x22\x5c]/g;
        reEscape.lastIndex = 0;

        if(reEscape.test(value)) {
            value = value.replace(reEscape, _escapeChar);
        }
        return value;
    };

    /**
     * Master log function to filter log, print, send event, write to file.
     * @method log
     * @param   {*}         message   message to print to log
     * @param   {Number}    level     log level 0 being least urgent
     * @param   {String}    label     Label for log level ex. "info"
     * @param   {boolean}   useAlert  true to invoke blocking alert dialog
     *                                can be used in place of level for shorthand call
     * @return  {Object}              self reference for chaining
     */
    Log.log = function log(message, level, label, useAlert) {
        var messageStr;
        var data = {};
        var eventObj = new CSXSEvent();

        // try to add labels (ex. "MyLogger [WARN] : ")
        var prefix = "";
            prefix += (Log.type.length) ? Log.type.toLowerCase() + " " : "";
            prefix += (typeof label == "string" && label.length) ? "[" + label.toLowerCase() + "] " : "";
            prefix += (prefix.length) ? ": " : "";

        // check if shorthand call log(message, useAlert)
        useAlert = (typeof level === 'boolean') ? level : useAlert;// if user did log.log("messages", true)
        level = (typeof level === 'number') ? level : 2;

        // reject by level
        if ( level < Log.level ) {
            return;
        }

        if(message instanceof Error) {
            // add stack trace, but remove any colons ":" or the JSON parser 
            // freaks out no matter what I try on the receiving end.
            message.stack = $.stack.replace(/[:]/g,'\\:').split('\n');
            delete message.source;// please don't send the entire source code in the message.
        }

        // try to JSON strigify
        messageStr = _stringifyMessage(message);

        // remove non-printable and other non-valid JSON chars
        messageStr = messageStr.replace(/[\u0000-\u0019]+/g,'');

        // Send message to CEP (panel) context via event packet
        // un-strigify on receipt for:
        // {type: "default", level:0, label:"log", message:"Important things!"}
        if(typeof _xLib !== "undefined")
        {
            if(typeof label !== 'string' || !label.length) { label = "log";}

            data =
              '{' +
              '"type":"'      + Log.type +
              '","level":"'   + level +
              '","label":"'   + label +
              '","message":"' + Log.escapeControlCharacters(messageStr) +
              '"}';
            eventObj.type = "ExtendScript_Log";
            eventObj.data = data;
            eventObj.dispatch();
        }

        if(message instanceof Error) {
            messageStr = prefix + ' ERROR\n' + _getExceptionMessage(message);
        } else {
            messageStr = prefix + messageStr;
        }

        // Send message to Extendscript console
        if ($) {
            $.writeln( messageStr);
        }

        // Write to log file
        if ( Log.logFile instanceof Object && Log.logFile.file instanceof File) {
            Log.logFile.writeln(messageStr);
        }

        // Popup blocking alert
        if (useAlert) {
            alert(messageStr);
        }
        return Log;
    };

    /**
     * Add new Log level and attach convenience function to Log object
     * @method addLogLevel
     * @param  {String}    name  Name for log level
     * @param  {Integer}    level log level
     * @return {Object}              self reference for chaining
     */
    Log.addLogLevel = function addLogLevel(name, level) {
        name = name.toLowerCase();

        // Don't overwrite things like Log.init()...
        if(typeof Log.name == "function" && !Log.levels.name) {
            throw new Error('[ERROR] ExtendScript_Log can not make log level. Name '+name+'is reserved.');
        }

        Log.levels[name] = level;
        Log[name] = function (message, useAlert) {
            return Log.log(message, level, name, useAlert);
        };
        return Log;
    };

    /**
     * Remove log level with specified name
     * @method removeLogLevel
     * @param  {String}       name name of log to remove
     * @return {Object}              self reference for chaining
     */
    Log.removeLogLevel = function removeLogLevel(name) {
        Log.levels[name.toLowerCase()] = undefined;
        return Log;
    };

    /**
     * Clear console, empty log file, send up "ExtendScript_Log" event with level 99
     * @method clear
     * @return {Object}              self reference for chaining
     */
    Log.clear = function clear() {
        $.sleep(1000);// have to pause to catch our breath... otherwise print statements happen *after* clear.
        if (app.name === "ExtendScript Toolkit") {
            app.clc();
        } else {
            var estApp = BridgeTalk.getSpecifier("estoolkit");
            if (estApp) {
                var bt = new BridgeTalk();
                bt.target = estApp;
                bt.body = "app.clc()";
                bt.send();
            }
        }

        // Send clear event to CEP (panel) context via event packet
        if(typeof _xLib !== "undefined")
        {
            var eventObj = new CSXSEvent();
            eventObj.type = "ExtendScript_Log";
            eventObj.data = '{"type":"'+Log.type+'","level":99,"label":"clear","message":""}';
            eventObj.dispatch();
        }

        if ( Log.logFile instanceof Object && Log.logFile.file instanceof File) {
            Log.logFile.clear();
        }
        return Log;
    };

    // Initialize

    // add default log levels
    Log.addLogLevel("critical",5);
    Log.addLogLevel("error",4);
    Log.addLogLevel("warn",3);
    Log.addLogLevel("info",2);
    Log.addLogLevel("debug",1);
    Log.addLogLevel("trace",0);

    // bind convenience aliasing
    if(root)
    {
        root.log = Log;
        root.console = Log;
    }

    return Log.init(logName, logLevel, useLogFile, keepOldLogs, logFileDir);

}));

/*
MIT License

Copyright (c) 2019 Max Johnson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/*

# Summary
 A helper Class for quick ScriptUI dialogs in Adobe ExtendScript with UMD wrapper for cross-compatability with AMD and node.js require.

The idea being to replace native dialogs with prettier ScriptUI versions that have optional additional functionality and customization. Plus a dropdown menu dialog... cause I use that a lot too.

Basically I got tired of rewriting an alert that has a "Do not ask again" checkbox.

All dialogs function like the native version *or* accept an options object with custom arguments with default settings as fallbacks.

Quick example of a confirmation dialog that has three buttons and a skip-me checkbox...
```
var weapon = confirm({text:"Kill it with...", skippable:true, buttons:["Boredom","Fire","Hugs"]});
// returns the index number of the button selected.
```

# Features
- Works with node.js require, AMD(probably), and vanilla ExtendScript.
- Tries to simplify basic dialog creation to a couple lines.
- Retrievable dialog cache (for skippable dialogs!)
- Optionally replace native Javascript dialogs
- Easily attach to the `$.global` space or your own namespace in a `Dialogs` object

# Import
## NPM
If running Node NPM, you can `npm install ExtendScript_Dialogs` to add to your node_modules folder
## github
Clone or download the repo and copy the extendscript_dialogs.jsxinc to your project

# Include

## NPM
`var Dialogs = require("ExtendScript_Dialogs");`

## AMD
I don't know but it's probably not difficult? Firmly in the untested-but-should-work category

## ExtendScript
### Eval into environment
`$.evalFile("<path>/extendscript_dialogs.jsxinc")`

### Include in scripts
`//@include "<path>/extendscript_dialogs.jsxinc"`

### concatinate or copy-paste directly
Add to a build script or, I dunno, just copy-pasta it in there?

# Use:

## Initialize Dialogs object
Make a "new" ExtendScript_Dialogs. *Note: check the constructor options below for how to override native dialogs.*

You can either pass a root object to attach the Dialogs object to, or directly capture the Dialogs object in a variable. Or both?
```
var myDialogDad = {};
var myDialogs = new ExtendScript_Dialogs(myDialogDad);// two ways to attach Dialogs object...through root arg or return capture
myDialogs.alert('Whatever dad. I don't need you.');
myDialogDad.Dialogs.alert('Can I borrow the car?');// hint, it's the same Dialogs object...
```
### Constructor options
"new" constructor takes 2 optional arguments.

First argument is an alternate root object to tack on a 'Dialogs' alias.

By passing $.global as first arg, we get global Dialogs object!
```
var root = $.global;// root to add convenience aliases to
var overrideNative = false;// replace native dialogs or not

myDialogs = new ExtendScript_Dialogs(root, overrideNative);

Dialogs.alert('Like magic.');
Dialogs.dropdown(["Thing 1","Thing 2"]);
```

The second argument is whether or not to replace native JS dialogs with prettier ExtendScript versions.
```
// don't care about the Dialogs object right now... just native stuff
new ExtendScript_Dialogs(null, true);

alert('I've been overridden!');
var myBool = confirm('Do the thing?');
var myText = prompt('What to say?','Replace these words...');
```

## Dialog Types
### Alert
The alert dialog has a variable-typed parameter to either mimic native Alert or add customization.
Options:
* title: title string
* text: static text string message
* id: id number for retrieval from the cache
* skippable: whether or not to add a "Do not ask again" checkbox

```

 new ExtendScript_Dialogs($.global, true);
 alert("Beware!");
 alert({text:"Beware!"});
```

### Confirm
The confirm dialog has a variable-typed first parameter to either mimic native Confirm or add customization.

Note: If you pass an options object as first argument, it returns the button number (0, 1, 2, etc) instead of a boolean value.

Options Object:
* title: title string
* text: static text string message
* id: id number for retrieval from the cache
* skippable: whether or not to add a "Do not ask again" checkbox
* buttons: a string array that is converted to buttons on the bottom of the dialog. First is "dismiss" function and last is "confirm" by default.

```
 new ExtendScript_Dialogs($.global, true);
 var killCheck = confirm("Should I do it?");// returns true/false

 // for more complex choices...
 var weapon = confirm({text:"Kill it with...", skippable:true, buttons:["Boredom","Fire","Hugs"]});
 // returns the index number of the button selected.
```
### Prompt
The prompt dialog has a variable-typed first parameter to either mimic native Prompt or add customization.

Options Object:
* title: title string
* text: static text string message
* defaultText: placeholder string in the input field
* multiline: if true, adds a multiline input instead of single line
* id: id number for retrieval from the cache
* skippable: whether or not to add a "Do not ask again" checkbox
* buttons: a string array that is converted to buttons on the bottom of the dialog. First is "dismiss" function and last is "confirm" by default.

```
 new ExtendScript_Dialogs($.global, true);
 var answer = prompt("Favorite ice-cream flavor?","Margarine");

 // for more complex choices...
 var bio = prompt({text:"Write your life story here...", defaultText:"It was the best of times, it was the blurst of times.", multiline:true});
```
### Dropdown
The dropdown dialog has a variable-typed first parameter as an array for quick use or as an options object to add customization.

Options Object:
* title: title string
* text: static text string message
* defaultText: placeholder string in the input field
* multiline: if true, adds a multiline input instead of single line
* id: id number for retrieval from the cache
* skippable: whether or not to add a "Do not ask again" checkbox
* buttons: a string array that is converted to buttons on the bottom of the dialog. First is "dismiss" function and last is "confirm" by default.

```
 new ExtendScript_Dialogs($.global, true);
 var fish = Dialogs.dropdown(["Salmon","Tuna","Eel"]);

 // for more complex choices...
 var hero = Dialogs.dropdown({text:"Favorite Robotroid Character...", menuItems:["Black", "Red", "Blue", "Green", "Yellow"]});
```

## Cached values and skippable dialogs
What if you are looping through a bunch of things and want to have a dialog pop up once with the option to not ask again? Or maybe just be able to retrieve a previous dialog selection?

Gotcha covered. Behold the somewhat clunky dialog cache!
### Cache set and clear
* `Dialogs.getCached(id)` retrieves the saved properties from an id.
If no argument is passed, it defaults to an id of -1.
Cached data
    * button: index number of which button was pressed to dismiss dialog
    * skippable: Boolean, if true, dialog should be skipped
    * value: the return value from the dialog (various types)
* `Dialogs.clearCached(id)` sets the saved properties from an id to undefined.
If no argument is passed, it defaults to an id of -1.


```
new ExtendScript_Dialogs($.global, true);
for (i=0;i<5;i++)
{
    var cached = Dialogs.getCached();
    if(cached && cached.skippable) {
        break;
    } else {
        alert({text:"You have been warned...", skippable:true});
    }
}
Dialogs.clearCached();

for (i=0;i<5;i++)
{
    var answer;
    var buttons = ["Naw","Meh","Yeah"];
    var cached = Dialogs.getCached(55);
    if(cached && cached.skippable) {
        answer = Dialogs.getCached(55).value;
        button = Dialogs.getCached(55).button;
    } else {
        answer = prompt({text:"Tedious input", id:55, skippable:true, buttons:buttons});
        button = Dialogs.getCached(55).button;
    }
    // could also get buttons and values down here with cache
    $.writeln(buttons[button]);
    $.writeln(answer);
}
Dialogs.clearCached(55);
```

# Disclaimer
This was hacked together and refactored a lot before it became an actual distributable thing so... it's not the prettiest.
Emphasis was on making something really easy to use out of the box with extra bonus features. Not efficiency or elegance.

Also, I'm not trying to solve every dialog problem in one API. If there's something more complex than single input, several buttons, it's probably best to just make a custom dialog.

*/

// Add semicolon to prevent BAD THINGS (TM) from happening to concatenated code.
;

// UMD for compatability with AMD and Node require, but still support a global constructor in the ExtendScript context
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS
    module.exports = factory;
  } else {
    // (root is global... so should be $.global for ExtendScript)
    root.ExtendScript_Dialogs = factory;
  }
}($.global, function (root, overrideNative) {// IIFE straight into the UMD, attaching to the $.global space

    $.strict = true;

    // shim in log
    try{ log.log(''); }
    catch(e){
        log = {};
        log.log = function(i){ $.writeln(i); };
    }

    log.log("Making extendscript Dialogs...");

    // Default to override global dialogs.
    // root = (overrideNative == true)? root || $.global;

    // Custom Dialog Overrides
    var _UICache = {};
    var Dialogs = {};

    /**
     * Add basic default static text message to existing dialog
     * @param       {Object} w       Window object of the dialog
     * @param       {Number} id      cache id of the dialog
     * @param       {String} message Text for the message field
     *
     * @return      {Object}         Window object of the dialog
     */
    var _addMessage = Dialogs.addMessage = function (w,id,message)
    {
        if(message)
        {
            w.message = w.add('statictext', undefined, message, {multiline:true});
            w.message.alignment = "fill";
            w.message.maximumSize = [1000,1000];
        }
        return w;
    };

    /**
     * Add basic default static text message to existing dialog
     * @param       {Object}  w         Window object of the dialog
     * @param       {Number}  id        cache id of the dialog
     * @param       {Boolean} skippable Whether or not to make skippable
     *
     * @return      {Object}         Window object of the dialog
     */
    var _addSkippable = Dialogs.addSkippable = function (w,id,skippable)
    {
        if( skippable )
        {
            w.cbNoAskAgain = w.add('checkbox', undefined, 'Don\'t ask about this again.');
            w.cbNoAskAgain.onClick = function(){ _UICache[id].skip = w.cbNoAskAgain.value;};
        }
        return w;
    };

    /**
     * Add basic default static text message to existing dialog
     * @param       {Object}   w               Window object of the dialog
     * @param       {Number}   id              cache id of the dialog
     * @param       {Array}    buttons         Array of button name strings
     * @param       {Function} onClickFunction Function override for onClick()
     *
     * @return      {Object}         Window object of the dialog
     */
    var _addButtons = Dialogs.addButtons = function (w,id,buttons, onClickFunction)
    {
        var onClickDefault = function onClickDefault ()
        {
            //$.writeln ("Clicked button " + this.index + " on dialog " + id);
            // $.writeln ("Value = " +_UICache[args.id].value);
            _UICache[id].value = Number(this.index);
            _UICache[id].button = Number(this.index);
            w.close( _UICache[id].value ) ;
        };

        // Add group and buttons at the bottom
        w.buttonGroup = w.add('group');
        w.buttonGroup.orientation = "row";

        for( var btn in buttons )
        {
            if( !buttons.hasOwnProperty (btn) ) continue;// sanity check for shims on for/in loops

            var newButton = w.buttonGroup.add('button {alignment:"fill",justify:"center"}');
            newButton.text = buttons[btn];
            newButton.index = btn;

            newButton.onClick = (typeof onClickFunction == "function")? onClickFunction:onClickDefault;
        }

        w.defaultElement = w.buttonGroup.children[(w.buttonGroup.children.length-1)];
        w.cancelElement = w.buttonGroup.children[0];
        return w;
    };

    /**
     * Get cached UI options object, if anyway
     * @param  {number} id ID number of the UI element
     * @return {Object}    Cached UI options object or undefined
     */
    Dialogs.getCached = function (id) {
        if(typeof id === "undefined"){id=-1;}
        return _UICache[id];
    };

    /**
     * Get cached UI options object, if anyway
     * @param  {number} id ID number of the UI element
     * @return {Object}    Cached UI options object or undefined
     */
    Dialogs.clearCached = function (id){
        if(typeof id === "undefined"){id=-1;}
        _UICache[id] = undefined;
    };

    /**
     * Replaces standard alert with prettier and skippable ScriptUI version
     * @param {String, Object} String of text or options object.
     *                          args = {
     *                             title:"Confirm",
     *                             text:"Message",
     *                             id:234,
     *                             skippable:true,
     *                          }
     */
    Dialogs.alert = function alertDialog(args)
    {
        // Set our defaults
        // We want an object but might have been invoked with alert("String Message!")
        if(typeof args == "string") { args = {text:args}; }

        args.title = args.title||'Alert';
        args.text = args.text || "Something Happened!";
        args.id = (typeof args.id == "number")? args.id : -1;
        args.skippable = args.skippable || false;
        args.buttons = args.buttons || ["OK"];

        return Dialogs.confirm(args);
    };

    /**
     * Replaces standard confirm with prettier and skippable ScriptUI version
      * @param {String, Object} String of text or options object.
      *                          Button order assumes first is cancel, last is accept.
      *                          args = {
      *                             title:"Confirm",
      *                             text:"Message",
      *                             id:234,
      *                             skippable:true,
      *                             buttons:["Cancel","Select","Delete"]
      *                          }
      *
      * @return {Number} boolean if 1st arg is string, index of the clicked button if 1st arg is options object
      */
    Dialogs.confirm = function confirmDialog(args)
    {
        // Set our defaults
        // We want an object but might have been invoked with alert("String Message!")
        if(typeof args == "string") { args = {text:args}; }

        args.title = args.title||'Confirm';
        args.text = args.text || "Do you agree?";
        args.id = (typeof args.id == "number")? args.id : -1;
        args.skippable = args.skippable || false;
        args.buttons = args.buttons || ["Cancel","OK"];

        // Initial cache or check if skipping
        if( !_UICache.hasOwnProperty(args.id) || typeof _UICache[args.id] !== "object" )
        {
            _UICache[args.id] = {};
        }
        else if( args.skippable === true && _UICache[args.id].skip === true)
        {
            //$.writeln ("cached value = " + _UICache[args.id].value);
            return _UICache[args.id].value;
        }

        var w = new Window ("dialog", args.title);
        w.minimumSize = [155,50];

        // Add basic static text message
        _addMessage(w,args.id,args.text);

        // Maybe add a checkbox to skip through future alerts of this type
        _addSkippable(w,args.id,args.skippable);

        // Add dismiss buttons
        _addButtons(w,args.id,args.buttons);

        // Jiggle the handle on layout cause long strings in statictext don't look right first time
        w.onShow = function(){ w.layout.resize (true); };
        w.onResize = function(){ if(w.message) w.message.size.width = w.size.width-10; };
        w.center();
        return w.show();
    };

    /**
     * Replaces standard prompt with prettier and skippable ScriptUI version
      * @param {String, Object} args String of text or options object.
      *                          args = {
      *                             title:"Prompt",
      *                             text:"Message",
      *                             defaultText:"Example...",
      *                             multiline: true
      *                             id:234,
      *                             skippable:true,
      *                             buttons:["Cancel","OK"]
      *                          }
      * @param {String} defaultText String to put as default in text field.
      *
      * @return {String} Input from text field
      */
    Dialogs.prompt = function promptDialog(args, defaultText)
    {
        function onClickDlgButton ()
        {
            //$.writeln ("Clicked button " + this.index + " on dialog " + id);
            // $.writeln ("Value = " +_UICache[args.id].value);
            _UICache[args.id].button = Number(this.index);
            _UICache[args.id].value = this.window.prompt.text;
            w.close( Number(this.index) ) ;
        }

        // Set our defaults
        // We want an object but might have been invoked with prompt("String Message!","Default Placeholder")
        if(typeof args == "string") { args = {text:args,defaultText:defaultText}; }

        args.title = args.title||'Prompt';
        args.text = args.text || "What is your answer?";
        args.id = (typeof args.id == "number")? args.id : -1;
        args.skippable = args.skippable || false;
        args.buttons = args.buttons || ["Cancel","OK"];

        args.defaultText = args.defaultText || "";
        args.multiline = args.multiline || false;

        // Initial cache or check if skipping
        if( !_UICache.hasOwnProperty(args.id) || typeof _UICache[args.id] !== "object" )
        {
            _UICache[args.id] = {};
        }
        else if( args.skippable === true && _UICache[args.id].skip === true)
        {
            //$.writeln ("cached value = " + _UICache[args.id].value);
            return _UICache[args.id].value;
        }

        var w = new Window ("dialog", args.title);

        // Add basic static text message
        _addMessage(w,args.id,args.text);

        // Add input element
        if(args.multiline)
        {
            w.prompt = w.add ("edittext",  [0,0,150,70], args.defaultText, {multiline:true, wantReturn: true});
        } else {
            w.prompt = w.add ("edittext", undefined, args.defaultText, {wantReturn: true});
        }
        w.prompt.alignment = "fill";
        w.layout.layout();
        w.prompt.active = true; // this line must follow w.layout.layout()

        // Maybe add a checkbox to skip through future alerts of this type
        _addSkippable(w,args.id,args.skippable);

        // Add dismiss buttons
        _addButtons(w,args.id,args.buttons, onClickDlgButton);

        // Jiggle the handle on layout cause long strings in statictext don't look right first time
        w.onShow = function(){ w.layout.resize (true); };
        w.onResize = function(){ if(w.message) w.message.size.width = w.size.width-10; };
        w.center();

        if( w.show() !== 0 )
        {
            return _UICache[args.id].value;
        }
    };

    /**
     * Dialog with dropdown menu
      * @param {Array, Object} args Array of strings or options object.
      *                          options: {
      *                          title:"Confirm",
      *                          text:"Message",
      *                          id:234,
      *                          skippable:true,
      *                          menuItems:["Salmon","Tuna","Eel"],
      *                          buttons:["Cancel","OK"]
      *                          }
      *
      * @return {String} Selected menu item
      */
    Dialogs.dropdown = function dropdownDialog(args)
    {
        function onClickDlgButton ()
        {
            //$.writeln ("Clicked button " + this.index);
            //$.writeln ("Dialog ID = " + id);
            // $.writeln ("Value = " +this.window.dropdown.selection.text);
            _UICache[args.id].button = Number(this.index);
            _UICache[args.id].value = this.window.dropdown.selection.text;
            w.close( Number(this.index) ) ;
        }

        // Set our defaults
        // We want an object but might have been invoked with dropdown(["Thing 1","Thing 2"])
        if(Object.prototype.toString.call(args) === '[object Array]'){args = {menuItems:args};}

        args.title = args.title||'Choose One';
        args.text = args.text || "";
        args.id = (typeof args.id == "number")? args.id : -1;
        args.skippable = args.skippable || false;
        args.buttons = args.buttons || ["Cancel","OK"];
        args.menuItems = args.menuItems || ["Item1","Item2"];

        // Initial cache or check if skipping
        if( !_UICache.hasOwnProperty(args.id) || typeof _UICache[args.id] !== "object" )
        {
            _UICache[args.id] = {};
        }
        else if( args.skippable === true && _UICache[args.id].skip === true)
        {
            //$.writeln ("cached value = " + _UICache[args.id].value);
            return _UICache[args.id].value;
        }

        var w = new Window ("dialog", args.title);
        w.minimumSize = [155,50];

        // Add basic static text message
        _addMessage(w,args.id,args.text);

        // add dropdown element
        w.dropdown = w.add ("dropdownlist", undefined, args.menuItems);
        w.dropdown.selection = 0;

        // Maybe add a checkbox to skip through future alerts of this type
        _addSkippable(w,args.id,args.skippable);

        // Add dismiss buttons
        _addButtons(w,args.id,args.buttons, onClickDlgButton);

        // Jiggle the handle on layout cause long strings in statictext don't look right first time
        w.onShow = function(){ w.layout.resize (true); };
        w.onResize = function(){ if(w.message) w.message.size.width = w.size.width-10; };
        w.center();

        if( w.show()!== 0 )
        {
            return _UICache[args.id].value;
        }
    };

    // mimic functionality from native JS dialogs...
    function alertNative (arg) {
        var args = (typeof arg == "object")? arg:{title:"Alert",id:-1,text:arg, buttons:["OK"]};
        Dialogs.alert(args);
    }
    function confirmNative (arg) {
        if(typeof arg == "object") {
            return Dialogs.confirm(arg);
        } else {
            return Boolean(Dialogs.confirm({title:"Confirm",id:-1,text:arg, buttons:["Cancel","OK"]}));
        }
    }
    function promptNative(args, defaultText) {
        args = (typeof args == "object")? args : {title:"Prompt",id:-1,text:args,defaultText:defaultText, buttons:["Cancel","OK"]};
        return Dialogs.prompt(args);
    }

    // lick-n-stick to root
    if(root) {
        root.Dialogs = Dialogs;
        if(root !== $.global)
        {
            root.alert = alertNative;
            root.confirm = confirmNative;
            root.prompt = promptNative;
        }
    }

    // replace native js dialogs with ours
    if(overrideNative === true) {
        $.sleep(200);// sleep or sometimes native alert is read-only...
        $.global.alert = alertNative;
        $.global.confirm = confirmNative;
        $.global.prompt = promptNative;
    }

    // return a reference
    return Dialogs;

}));


    $.writeln("Libs for shims, shams, polyfills, and party hats loaded...");
}// end dependency check
else {
    console.debug("ES5 function [].map() found. Assume we already shim-shammed this party. Not reinitializing dependencies.");
}

 /* jshint ignore: end */
/*!
 * Libs for shims, shams, polyfills, and party hats loaded...
 */

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

;
if(typeof Lifter !== "object") {// sanity check for previous definition
(function ()
{
$.strict = true;
var _DEVBUILD = false;
$.writeln("Starting Lifter...");

_DEVBUILD = true;

//=========================//
//    WELCOME TO LIFTER    //
//=========================//

// Public interface

/**
 * A collection of utilities that make extensive use of Action Manager code
 * to provide fast access to Photoshop functionality without accessing the DOM.
 */
var Lifter = this.Lifter = function Lifter() { };

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

 /* jshint -W014, -W061, -W069 */

/** Cached reference to DialogModes.NO. */
var _dialogModesNo = DialogModes.NO,

    /** Shortcut to 'c2id' function. */
    c2id = charIDToTypeID,

    /** Shortcut to 's2id' function. */
    s2id = stringIDToTypeID;

/** Cache for stacked ruler unit changes */
var _rulerUnitCache = [];

/** Add support for custom events */
try {
    var _xLib = new ExternalObject("lib:\PlugPlugExternalObject");
} catch (err) {
    throw new Error(['Could not create ExternalObject for event handling: \n"', err].join(''));
}

// Global public types

/** init logging */
// attaching to $.global scope so accessed as log.log, log.info, etc
// should probably keep it namespaced...but user can make new log in root
var log = Lifter.log = undefined;
if( _DEVBUILD ) {
    Lifter.log = new ExtendScript_Log($.global, "Lifter", 0, true, false);
} else {
    Lifter.log = new ExtendScript_Log($.global, "Lifter", 4, false);
}

if(typeof log !== 'object'){log = Lifter.log;}

//** init dialog helper */
Lifter.dialogs = new ExtendScript_Dialogs($.global, true);

log.log("LOADING Lifter core ...");

/**
 * Contains utility methods to deal with Enumerators.
 */
var Enumeration = this.Enumeration = function Enumeration() { };

/**
 * Searches the specified enumerator value in enumeration.
 *
 * @param   enumeration     Enumeration type.
 * @param   value           Enumerator value.
 *
 * @return  Enumerator with the specified value is found in enumeration; otherwise, null.
 */
Enumeration.fromValue = function (enumeration, value)
{
    if (typeof enumeration !== 'function')
        throw new TypeError(['Invalid enumeration "', enumeration, '".'].join(''));

    value = +value || 0;
    var enumKeys = Object.keys(enumeration),
        enumerator;

    for (var i = 0, n = enumKeys.length; i < n; i++)
    {
        enumerator = enumeration[enumKeys[i]];

        if (enumerator.valueOf && enumerator.valueOf() === value)
            return enumerator;
    }

    return null;
};

/**
 * Gets whether the specified enumerator value exists in enumeration.
 *
 * @param   enumeration     Enumeration type.
 * @param   value           Enumerator value.
 *
 * @return  True if the enumerator with the specified value is found in enumeration; otherwise, false.
 */
Enumeration.contains = function (enumeration, value)
{
    return Enumeration.fromValue(enumeration, value) !== null;
};

/**
 * Gets an array containing all the enumerators of the specified enumeration.
 *
 * @param   enumeration     Enumeration type.
 *
 * @return  An array containing all the enumerators of the specified enumeration.
 */
Enumeration.toArray = function (enumeration)
{
    if (typeof enumeration !== 'function')
        throw new TypeError(['Invalid enumeration "', enumeration, '".'].join(''));

    var enumKeys = Object.keys(enumeration),
        enumKeysLength = enumKeys.length,
        enumerator,
        result = [];

    for (var i = 0; i < enumKeysLength; i++)
    {
        enumerator = enumeration[enumKeys[i]];

        if (enumerator instanceof Enumerator)
            result.push(enumerator);
    }

    return result;
};

/**
 * Represents an enumeration value by trying to mimic the built-in Enumerator class.
 */
var Enumerator = this.Enumerator = function Enumerator(name, value)
{
    this.__name = name;
    this.__value = value;
};

Enumerator.prototype = {
    'toString': function () { return this.__name; },
    'valueOf': function () { return this.__value; },
    '+': function (operand, rev) { return undefined; },
    '-': function (operand, rev) { return undefined; },
    '*': function (operand, rev) { return undefined; },
    '/': function (operand, rev) { return undefined; },
    '~': function (operand, rev) { return undefined; },
    '===': function (operand, rev) { return (!operand || !operand.valueOf) ? false : operand.valueOf() === this.valueOf(); },
    '==': function (operand, rev) { return (!operand || !operand.valueOf) ? false : operand.valueOf() == this.valueOf(); },
    '<': function (operand, rev)
    {
        if (!operand || !operand.valueOf)
            return undefined;
        else
            return this.valueOf() < operand.valueOf();
    },
    '<=': function (operand, rev)
    {
        if (!operand || !operand.valueOf)
        {
            return undefined;
        }
        else
        {
            if (rev)
                return this.valueOf() >= operand.valueOf();
            else
                return this.valueOf() <= operand.valueOf();
        }
    },
};

/**
 * Represents a UnitDouble action descriptor property.
 * Useful to be able to store the UnitDouble type while still being
 * able to easily perform operations using its value.
 */
var UnitDouble = this.UnitDouble = function UnitDouble(unitType, doubleValue)
{
    this.unitType = unitType;
    this.doubleValue = doubleValue;
};

UnitDouble.prototype = {
    'toString': function () { return this.unitType + ' = ' + this.doubleValue; },
    'valueOf': function () { return this.doubleValue; },
    '+': function (operand, rev) { return this.doubleValue + operand; },
    '-': function (operand, rev) { return (rev) ? operand - this.doubleValue : this.doubleValue - operand; },
    '*': function (operand, rev) { return this.doubleValue * operand; },
    '/': function (operand, rev) { return (rev) ? operand / this.doubleValue : this.doubleValue / operand; },
    '~': function (operand, rev) { return undefined; },
    '===': function (operand, rev) { return (!operand || !operand.valueOf) ? false : operand.valueOf() === this.valueOf(); },
    '==': function (operand, rev) { return (!operand || !operand.valueOf) ? false : operand.valueOf() == this.valueOf(); },
    '<': function (operand, rev)
    {
        if (!operand || !operand.valueOf)
            return undefined;
        else
            return this.valueOf() < operand.valueOf();
    },
    '<=': function (operand, rev)
    {
        if (!operand || !operand.valueOf)
        {
            return undefined;
        }
        else
        {
            if (rev)
                return this.valueOf() >= operand.valueOf();
            else
                return this.valueOf() <= operand.valueOf();
        }
    },
};

/**
 * Represents bounds information for a layer.
 */
var LayerBounds = this.LayerBounds = function LayerBounds(top, left, bottom, right)
{
    // Bounds seem to always be in pixels
    this.top = new UnitValue(top, 'px');
    this.left = new UnitValue(left, 'px');
    this.bottom = new UnitValue(bottom, 'px');
    this.right = new UnitValue(right, 'px');
};

LayerBounds.prototype = {
    'toString': function () { return [this.top, this.left, this.bottom, this.right].join(', '); },
    'valueOf': function () { return undefined; },
    '+': function (operand, rev) { return undefined; },
    '-': function (operand, rev) { return undefined; },
    '*': function (operand, rev) { return undefined; },
    '/': function (operand, rev) { return undefined; },
    '~': function (operand, rev) { return undefined; },
    '===': function (operand, rev)
    {
        return (!operand) ? false : (
            operand.top === this.top
            && operand.left === this.left
            && operand.bottom === this.bottom
            && operand.right === this.right
        );
    },
    '==': function (operand, rev) { return operand === this; },
    '<': function (operand, rev) { return undefined; },
    '<=': function (operand, rev) { return undefined; },
};

/**
 * Enumerates layer types.
 */
var LayerType = this.LayerType = function LayerType() { };
LayerType.SETSTART = new Enumerator('LayerType.SETSTART', 0);
LayerType.SETEND = new Enumerator('LayerType.SETEND', 1);
LayerType.CONTENT = new Enumerator('LayerType.CONTENT', 2);

/**
 * Enumerates layer colors.
 */
var LayerColor = this.LayerColor = function LayerColor() { };
LayerColor.NONE = new Enumerator('LayerColor.NONE', c2id('None'));
LayerColor.RED = new Enumerator('LayerColor.RED', c2id('Rd  '));
LayerColor.ORANGE = new Enumerator('LayerColor.ORANGE', c2id('Orng'));
LayerColor.YELLOW = new Enumerator('LayerColor.YELLOW', c2id('Ylw '));
LayerColor.GREEN = new Enumerator('LayerColor.GREEN', c2id('Grn '));
LayerColor.BLUE = new Enumerator('LayerColor.BLUE', c2id('Bl  '));
LayerColor.VIOLET = new Enumerator('LayerColor.VIOLET', c2id('Vlt '));
LayerColor.GRAY = new Enumerator('LayerColor.GRAY', c2id('Gry '));


/**
 * Enumerates layer mask types. Useful for making selections. This is not native.
 */
var LifterMaskType = this.LifterMaskType = function LifterMaskType() { };
LifterMaskType.TRANSPARENCY = new Enumerator('LifterMaskType.TRANSPARENCY', 0);
LifterMaskType.LAYERMASK = new Enumerator('LifterMaskType.USERMASK', 1);
LifterMaskType.VECTORMASK = new Enumerator('LifterMaskType.VECTORMASK', 2);

/**
 * Enumerates blend modes. Acts as an useful proxy to Photoshop BlendMode enumeration.
 */
var LifterBlendMode = this.LifterBlendMode = function LifterBlendMode() { };
LifterBlendMode.PASSTHROUGH = new Enumerator('LifterBlendMode.PASSTHROUGH', s2id('passThrough'));
LifterBlendMode.NORMAL = new Enumerator('LifterBlendMode.NORMAL', c2id('Nrml'));
LifterBlendMode.DISSOLVE = new Enumerator('LifterBlendMode.DISSOLVE', c2id('Dslv'));
LifterBlendMode.DARKEN = new Enumerator('LifterBlendMode.DARKEN', c2id('Drkn'));
LifterBlendMode.MULTIPLY = new Enumerator('LifterBlendMode.MULTIPLY', c2id('Mltp'));
LifterBlendMode.COLORBURN = new Enumerator('LifterBlendMode.COLORBURN', c2id('CBrn'));
LifterBlendMode.LINEARBURN = new Enumerator('LifterBlendMode.LINEARBURN', s2id('linearBurn'));
LifterBlendMode.DARKERCOLOR = new Enumerator('LifterBlendMode.DARKERCOLOR', s2id('darkerColor'));
LifterBlendMode.LIGHTEN = new Enumerator('LifterBlendMode.LIGHTEN', c2id('Lghn'));
LifterBlendMode.SCREEN = new Enumerator('LifterBlendMode.SCREEN', c2id('Scrn'));
LifterBlendMode.COLORDODGE = new Enumerator('LifterBlendMode.COLORDODGE', c2id('CDdg'));
LifterBlendMode.LINEARDODGE = new Enumerator('LifterBlendMode.LINEARDODGE', s2id('linearDodge'));
LifterBlendMode.LIGHTERCOLOR = new Enumerator('LifterBlendMode.LIGHTERCOLOR', s2id('lighterColor'));
LifterBlendMode.OVERLAY = new Enumerator('LifterBlendMode.OVERLAY', c2id('Ovrl'));
LifterBlendMode.SOFTLIGHT = new Enumerator('LifterBlendMode.SOFTLIGHT', c2id('SftL'));
LifterBlendMode.HARDLIGHT = new Enumerator('LifterBlendMode.HARDLIGHT', c2id('HrdL'));
LifterBlendMode.VIVIDLIGHT = new Enumerator('LifterBlendMode.VIVIDLIGHT', s2id('vividLight'));
LifterBlendMode.LINEARLIGHT = new Enumerator('LifterBlendMode.LINEARLIGHT', s2id('linearLight'));
LifterBlendMode.PINLIGHT = new Enumerator('LifterBlendMode.PINLIGHT', s2id('pinLight'));
LifterBlendMode.HARDMIX = new Enumerator('LifterBlendMode.HARDMIX', s2id('hardMix'));
LifterBlendMode.DIFFERENCE = new Enumerator('LifterBlendMode.DIFFERENCE', c2id('Dfrn'));
LifterBlendMode.EXCLUSION = new Enumerator('LifterBlendMode.EXCLUSION', c2id('Xclu'));
LifterBlendMode.SUBTRACT = new Enumerator('LifterBlendMode.SUBTRACT', s2id('blendSubtraction'));
LifterBlendMode.DIVIDE = new Enumerator('LifterBlendMode.DIVIDE', s2id('blendDivide'));
LifterBlendMode.HUE = new Enumerator('LifterBlendMode.HUE', c2id('H   '));
LifterBlendMode.SATURATION = new Enumerator('LifterBlendMode.SATURATION', c2id('Strt'));
LifterBlendMode.COLOR = new Enumerator('LifterBlendMode.COLOR', c2id('Clr '));
LifterBlendMode.LUMINOSITY = new Enumerator('LifterBlendMode.LUMINOSITY', c2id('Lmns'));

/** Converts the passed BlendMode to a LifterBlendMode. */
LifterBlendMode.fromBlendMode = function (blendMode) { return LifterBlendMode[String(blendMode).replace(/BlendMode\./, '')]; };

/** Converts the passed LifterBlendMode to a BlendMode. */
LifterBlendMode.toBlendMode = function (lifterBlendMode) { return eval(lifterBlendMode.toString().replace(/LifterBlendMode/, 'BlendMode')); /* HACKY!! */ };

/** Ensures the passed blendMode is expressed using the LifterBlendMode enumeration. @private */
function _ensureLifterBlendMode(blendMode)
{
    if (blendMode instanceof Enumerator)
        return blendMode;
    else
        return LifterBlendMode.fromBlendMode(blendMode);
}

/**
 * Enumerates apply image source channels.
 */
var ApplyImageChannel = this.ApplyImageChannel = function ApplyImageChannel() { };
ApplyImageChannel.RGB = new Enumerator('ApplyImageChannel.RGB', c2id('RGB '));
ApplyImageChannel.Red = new Enumerator('ApplyImageChannel.Red', c2id('Rd  '));
ApplyImageChannel.Green = new Enumerator('ApplyImageChannel.Green', c2id('Grn '));
ApplyImageChannel.Blue = new Enumerator('ApplyImageChannel.Blue', c2id('Bl  '));


// Global utilities

/**
  * Test if defined and not null
  *
  * @param {*} v  any variable
  * @returns [Boolean]  if defined and not null
  */
var isDef = Lifter.isDef = function isDef(v) {
    return (typeof v !== 'undefined' && v !== null);
};


/**
  * Test if variable has .length or keys().length > 0
  * everything else returns true (empty).
  * Useful because because jQuery objects can have
  *  a .length of 0 but still have keys().length
  *
  * @param {*} v  any variable
  * @returns [Boolean]  false if varibale has length > 0
  */
var isEmpty = Lifter.isEmpty = function isEmpty(v) {
    // do this because jQuery objects can have length 0 on objects with keys
    var empty = true;
    if (isDef(v)) {
        if (isDef(v.length)) {
            empty = (v.length === 0);
        } else if (Object.keys(v).length > 0) {
            empty = false;
        }
    }
    return empty;
};

/**
* Store current Ruler Unit settings and set to new unit setting
* @param {Int} units a Units.<something> value, eg. Units.PIXELS
*/
var setRuler = Lifter.setRuler = function setRuler (units)
{
    _rulerUnitCache.push(app.preferences.rulerUnits);
    app.preferences.rulerUnits = units;
};

/**
* Reset Ruler Units to stored settings
*/
var resetRuler = Lifter.resetRuler = function resetRuler (units)
{
    app.preferences.rulerUnits = _rulerUnitCache.pop();
};

/**
 * Get a rect (x,y,width,height) from bounds or bounds-like number array
 *
 * @param {*} bounds  a bounds object or number array
 * @returns [Object]  object with x, y, width, height
 */
var getRect = Lifter.getRect = function getRect(bounds, unit) {
    var rect = {};
    unit = (typeof unit === 'string')? unit : 'px';

    function _getVal(o) {
        return (o instanceof UnitValue) ? o.as(unit) : o;
    }

    if(bounds instanceof LayerBounds) {
        rect.x = bounds.left.as(unit);
        rect.y = bounds.top.as(unit);
        rect.width = bounds.right.as(unit) - rect.x;
        rect.height = bounds.bottom.as(unit) - rect.y;
    } else {
        rect.x = _getVal(bounds[0]);
        rect.y = _getVal(bounds[1]);
        rect.width = _getVal(bounds[2]) - rect.x;
        rect.height = _getVal(bounds[3]) - rect.y;
    }

    return rect;
};

/**
 * Gets the descriptor property identified by the specified key (encoded as typeId).
 * Type must be a valid DescValueType enumerator. If type is not provided it is
 * automatically guessed.
 * @private
 */
function _getDescriptorProperty(desc, key, type)
{
    type || (type = desc.getType(key));

    switch (type)
    {
        case DescValueType.ALIASTYPE: return desc.getPath(key);
        case DescValueType.BOOLEANTYPE: return desc.getBoolean(key);
        case DescValueType.CLASSTYPE: return desc.getClass(key);
        case DescValueType.DOUBLETYPE: return desc.getDouble(key);
        case DescValueType.ENUMERATEDTYPE: return { 'type': desc.getEnumerationType(key), 'value': desc.getEnumerationValue(key) };
        case DescValueType.INTEGERTYPE: return desc.getInteger(key);
        case DescValueType.LISTTYPE: return desc.getList(key);
        case DescValueType.OBJECTTYPE: return { 'type': desc.getObjectType(key), 'value': desc.getObjectValue(key) };
        case DescValueType.RAWTYPE: return desc.getData(key);
        case DescValueType.REFERENCETYPE: return desc.getReference(key);
        case DescValueType.STRINGTYPE: return desc.getString(key);
        case DescValueType.UNITDOUBLE: return new UnitDouble(desc.getUnitDoubleType(key), desc.getUnitDoubleValue(key));
        default: throw new Error(['Unsupported descriptor value type: "', type, '".'].join(''));
    }
}

Lifter.getDescPropById = _getDescPropById;
function _getDescPropById(desc, tid)
{
    try{
        return _getDescriptorProperty(desc, tid);
    } catch (e) {
        log.warn('Invalid descriptor property: "'+tid+'".'+e);
        return;
    }
}

Lifter.getDescPropByName = _getDescPropByName;
function _getDescPropByName(desc, name)
{
    var tid, subProps;
    var prop = name;

    var dotTest = name.indexOf(".");
    if(dotTest !== -1 ) {
        prop = name.substring(0, dotTest);
        subProps = name.substring(dotTest+1, name.length);
        desc = _getDescPropById(desc, s2id(prop)).value;
        return _getDescPropByName(desc, subProps);
    }
    else {
        return _getDescPropById(desc, s2id(prop));
    }
}

/**
 * Gets a wrapped ActionDescriptor, whose properties can be accessed and set using
 * Lifter syntactic sugar.
 */
function _getWrappedActionDescriptor(desc, props, id)
{
    var fn = function (desc, props, id, name, value)
    {
        if (typeof value === 'undefined')
        {
            try{
                return _getDescriptorProperty(desc, s2id(name));
            } catch (e) {
                log.warn(['Invalid layer property: "', name, '".'].join(''));
                return;
            }
        } else {
            throw new Error(['Property "', name, '" is read-only.'].join(''));
        }

        var prop = props[name];

        if (typeof value === 'undefined')
        {
            // Get
            if (prop.get)
            {
                // Use custom getter for this property
                return prop.get.call(null, prop, id, desc);
            }
            else
            {
                // Call generic getter
                return _getDescriptorProperty(desc, prop.typeId, prop.type);
            }
        }
        else
        {
            // Set
            if (!prop.set)
                throw new Error(['Property "', name, '" is read-only.'].join(''));

            // Set value
            prop.set.call(null, prop, id, value);
        }
    };

    return {
        innerDescriptor: desc,
        prop: fn.bind(null, desc, props, id),
    };
}

/**
 * Converts a 0-255 integer value to its 100-based percentage equivalent.
 * @private
 */
function _byteToPercent(value) { return (value / 255.0) * 100.0; }

/**
 * Iterates over a collection searching for the specified patterns.
 * @private
 */
function _find(collection, findType, patterns, context)
{
    function __match(id)
    {
        for (var j = 0; j < keysLength; j++)
        {
            var matchPattern = patterns[keys[j]];
            var matchTarget = collection.prop(id, keys[j]);
            if(matchPattern instanceof RegExp) {
                if (matchPattern.test(matchTarget) === false)
                    return false;
            } else {
                if (matchPattern !== matchTarget)
                    return false;
            }
        }

        found.push(id);
        return true;
    }

    if (typeof patterns !== 'function')
    {
        if (typeof patterns !== 'object')
            throw new Error('Search patterns must be either a function or an object.');

        var found = [],
            keys = Object.keys(patterns),
            keysLength = keys.length;

        switch (findType)
        {
            case 2:
                // Find last
                collection.forEach(function (itemIndex, id)
                {
                    if (__match.call(null, id))
                        return true;
                }, null, true);

                return found.length ? found[0] : null;

            case 1:
                // Find first
                collection.forEach(function (itemIndex, id)
                {
                    if (__match.call(null, id))
                        return true;
                }, null);

                return found.length ? found[0] : null;

            default:
                // Find all
                collection.forEach(function (itemIndex, id)
                {
                    __match.call(null, id);
                }, null);

                return found;
        }
    }
    else
    {
        collection.forEach(patterns, context);
    }
}

/**
 * Fakes function overloading for an expected argument set of (Number,Bool)
 * by mutating the argument array directly.
 * Allows for things like fn(), fn(5), fn(true), fn(2, false)
 *
 * @private
 * @method      _overloadFunction_Number_Bool
 * @param       {Array}                      arguments     passed arguments from a function
 * @param       {Number}                      numberDefault Default if not passed as arg
 * @param       {Boolean}                      boolDefault   Default if not passed as arg
 * @void
 */
function _overloadFunction_Number_Bool (arguments, numberDefault, boolDefault) {
    // overload
    if (typeof arguments[0] === 'boolean')
    {
        arguments[1] = arguments[0];
        arguments[0] = undefined;//no id
    }

    // default if NaN
    arguments[0] = isNaN(arguments[0])? numberDefault:arguments[0];

    // default and set to actual boolean
    if( boolDefault === true ) {
        arguments[1] = (arguments[1] !== false);// always true unless false
    } else {
        arguments[1] = (arguments[1] === true);// always false unless true
    }
}

/**
 * Fakes function overloading for an expected argument set of (Number,Obj)
 * by mutating the argument array directly.
 * Allows for things like fn(), fn(5), fn(SelectionType.REPLACE), fn(2, myReference)
 *
 * @private
 * @method      _overloadFunction_Number_Obj
 * @param       {Array}                      arguments     passed arguments from a function
 * @param       {Number}                      numberDefault Default if not passed as arg
 * @param       {Object}                      objDefault   Default if not passed as arg
 * @void
 */
function _overloadFunction_Number_Obj(arguments, numberDefault, objDefault) {
    // overload
    if (typeof arguments[0] === 'object') {
        arguments[1] = arguments[0];
        arguments[0] = undefined; //no id
    }

    // default if NaN
    arguments[0] = isNaN(arguments[0]) ? numberDefault : arguments[0];

    // default and set to actual boolean
    if (typeof arguments[1] !== 'object' && typeof objDefault === 'object') {
        arguments[1] = objDefault;
    }
}


/**
 * Gets a valid File object from the passed parameter.
 * @private
 */
function _ensureFile(myFile)
{
    if (!(myFile instanceof File))
        myFile = new File(myFile);

    if (!myFile.exists)
        throw new Error(['The specified file does not exists: "', myFile, '".'].join(''));

    return myFile;
}

/**
 * Executes a jsx file or errors
 * @private
 * @param {File} File object.
 */
function _evalFile (myFile){
    //TODO: if(_debug) log(["Eval: ", jsxFile].join(''));
    try{
        $.evalFile( myFile );
    } catch (err) {
        throw new Error(['Eval error: "', myFile, '".\n',err].join(''));
    }
}

log.log("Lifter core done.");

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



/**
 * Basic timer object for performance testing
 * @constructor 
 * @example
    var myTime = new Lifter.Timer();
    
    for(var i=0; i < 10; i++) {
        $.sleep(100);
        log.log(myTime.getElapsed());
    }
    
    myTime.stop();
    
    log.log(myTime.getTime());
 */
var Timer = Lifter.Timer = function Timer() {
    // member variables
    this.startTime = new Date();
    this.endTime = new Date();

    // member functions

    /**
    * reset the start time to now
    * @function start
    * @memberOf Timer#
    */
    this.start = function () {
        this.startTime = new Date();
    }

    /**
    * reset the end time to now
    * @function start
    * @memberOf Timer#
    */
    this.stop = function () {
        this.endTime = new Date();
    }

    /**
    * get the difference in milliseconds between start and stop
    * @function start
    * @memberOf Timer#
    */
    this.getTime = function () {
        return (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    }

    /**
    * get the current elapsed time from start to now, this sets the endTime
    * @function start
    * @memberOf Timer#
    */
    this.getElapsed = function () {
        this.endTime = new Date(); return this.getTime();
    }
}


// Custom language extensions
/**
 * Extends the object with the properties of the specified objects.
 * @param {Object} *source Source objects.
 */
Object.prototype.extend = Object.prototype.extend || function ()
{
    if (this === null || typeof this === 'undefined')
        throw new TypeError('Object.prototype.extend called on null or undefined.');

    if (arguments.length === 0) return this;

    var sources = Array.prototype.slice.call(arguments),
        source, prop, i, length = sources.length;

    for (i = 0; i < length; i++)
    {
        source = sources[i];

        for (prop in source)
        {
            if (source.hasOwnProperty(prop))
                this[prop] = source[prop];
        }
    }
};

/**
 * Extends the object with the properties of the specified objects, but only
 * if the properties aren't already present in the base object.
 * @param {Object} *source Source objects.
 */
Object.prototype.defaults = Object.prototype.defaults || function ()
{
    if (this === null || typeof this === 'undefined')
        throw new TypeError('Object.prototype.defaults called on null or undefined.');

    if (arguments.length === 0) return this;

    var sources = Array.prototype.slice.call(arguments),
        source, prop, i, length = sources.length;

    for (i = 0; i < length; i++)
    {
        source = sources[i];

        for (prop in source)
        {
            if (source.hasOwnProperty(prop) && typeof this[prop] === 'undefined')
                this[prop] = source[prop];
        }
    }
};

/**
 * Creates a clone of the object.
 * @return {Object} A clone of the object.
 */
Object.prototype.clone = function ()
{
    var copy = {};

    for (var attr in this)
    {
        if (typeof this[attr] !== 'object')
            copy[attr] = this[attr];
        else if (this[attr] === this)
            copy[attr] = copy;
        else
            copy[attr] = this[attr].clone();
    }

    return copy;
};

/**
 * Creates a clone of the object.
 * @return {Array} A clone of the object.
 */
Array.prototype.clone = function ()
{
    var copy = [];

    for (var i = 0, n = this.length; i < n; i++)
    {
        if (typeof this[i] !== 'object')
            copy[i] = this[i];
        else if (this[i] === this)
            copy[i] = copy;
        else
            copy[i] = this[i].clone();
    }

    return copy;
};

/**
 * Creates a clone of the object.
 * @return {Date} A clone of the object.
 */
Date.prototype.clone = function ()
{
    var copy = new Date();
    copy.setTime(this.getTime());
    return copy;
};

/**
 * Creates a clone of the object.
 * @return {Any} A clone of the object.
 */
Number.prototype.clone = Boolean.prototype.clone = String.prototype.clone = function ()
{
    return this;
};

/**
 * Pads a number with zeros
 * @param  {Interger}  padCount      Interger that is the desired number of digits
 * @return {String} String with added zeros
 */
Number.prototype.pad = function (padCount)
{
    var absNum = Math.abs(this);
    var zeros = Math.max(0, padCount - Math.floor(absNum).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (this < 0) {
        zeroString = '-' + zeroString;
    }

    return zeroString + absNum;
};

/**
 * Shorten a string with ellipsis ...
 * @param  {Interger}  maxLength      Interger that is the desired length including the ellipsis replacement
 * @param  {String}    orientation    Part to chop out: "Start","Center", or "End"
 * @param  {String}    ellipsisString String to put in place of chopped characters
 * @return {String}                   Shortened string
 */
String.prototype.ellipsis = function ellipsis(maxLength, orientation, ellipsisString) {
    ellipsisString = ellipsisString || "...";
    if (this.length > maxLength) {
        if (maxLength > ellipsisString.length)
        {
            switch (orientation) {
                case "start":
                    return ellipsisString + this.slice(-(maxLength - ellipsisString.length));
                case "center":
                    if (maxLength != ellipsisString.length + 1) {
                        return this.slice(0, Math.floor(maxLength / 2) - Math.floor(ellipsisString.length / 2)) + ellipsisString + this.slice(-(Math.ceil(maxLength / 2) - Math.ceil(ellipsisString.length / 2)), this.length);
                    }
                case "end":
                default:
                    return this.slice(0, maxLength - ellipsisString.length) + ellipsisString;
            }
        } else {
            return ellipsisString;
        }
    }
    return this;
};

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
    log.log("LOADING Lifter.documents ...");
    var documents = {};

    /** List of all available color modes (aka color spaces), indexes match the ones of the DocumentMode enumeration. @private */
    var _documentColorModes = [
        -1, // Empty element as DocumentMode enumeration starts at index 1
        c2id('Grsc'), // Grayscale
        c2id('RGBC'), // RGB
        c2id('CMYC'), // CMYK
        c2id('LbCl'), // LAB
        c2id('Btmp'), // Bitmap
        c2id('Indl'), // Indexed Color
        c2id('Mlth'), // Multichannel
        c2id('Dtn '), // Duotone
    ];

    /** Sets the passed document as active and executes the specified callback. @private */
    function _wrapSwitchActive(documentId, callback, context)
    {
        // Set active layer to documentId
        documents.list.makeActive(documentId);

        // Execute code
        callback.call(context);
    }

    /** Puts the correct value in 'ref' to the get the document specified by DocumentId. @private */
    function _getDocumentIdRef(documentId, ref)
    {
        if (typeof documentId !== 'number')
        {
            // If DocumentId is not passed, assume current document
            if (documents.count() === 0)
                throw new Error('Could not target current document: no documents are currently open.');

            ref.putEnumerated(c2id('Dcmn'), c2id('Ordn'), c2id('Trgt'));
        }
        else
        {
            // Use DocumentId directly
            ref.putIdentifier(c2id('Dcmn'), documentId);
        }
    }

    function _isSupportedExtension(inPath, category) {
        var extension = inPath.slice(inPath.lastIndexOf('.'), inPath.length).toUpperCase();
        var fileTypesLookup = documents.fileTypeSupport[(typeof category === 'string')? category : 'all'];
        var prop;

        for(prop in fileTypesLookup) {
            if ( fileTypesLookup.hasOwnProperty( prop ) )
            {
                if(fileTypesLookup[prop].indexOf(extension) >= 0 ) { return true; }
            }
        }
        // log.log('indexOf(' + extension + ') = ' + supported.indexOf(extension));
        return false;
    }

    /**
     * Supported document extensions. This is public so that additional properties can be added at runtime.
     * 'all' can be opened or imported
     * 'native' can be edited and saveIdList
     * 'layered' can contain photoshop layers
     */
    documents.fileTypeSupport = {
        'open' : {
            'Photoshop': ['.PSD', '.PDD', '.PSDT'],
            'Large Document Format': ['.PSB'],
            '3D Studio': ['.3DS'],
            'Collada DAE': ['.DAE'],
            'Google Earth 4 KMZ': ['.KMZ'],
            'OpenGL Transmission Format I GLTF/GLB': ['.GLB', '.GLTF'],
            'PLY': ['.PLY'],
            'STL': ['.STL'],
            'WavefrontlOBJ': ['.OBJ'],
            'Audio': ['.AAC', '.AC3', '.M2A', '.M4A', '.MP2', '.MP3', '.WMA', '.WM'],
            'BMP': ['.BMP', '.RLE', '.DIB'],
            'Camera Raw': ['.TIF', '.CRW', '.NEF', '.RAF', '.ORF', '.MRW', '.DCR', '.MOS', '.RAW', '.PEF', '.SRF', '.ONG', ',X3F', '.CR2', '.ERF', '.SR2', '.KOC', '.MFW', '.MEF', '.ARW', '.NRW', '.RW2', '.RWL', '.IIQ', ',3FR', '.FFF', '.SRW', '.GPR', '.DXO', '.HEIC', '.ARQ', '.CR3'],
            'Cineon': ['.CIN', '.SDPX', '.DPX', '.FIDO'],
            'Dicom': ['.PCM', '.DC3', '.D1C'],
            'Photoshop EPS': ['.EPS'],
            'Photoshop DCS 1.0': ['.EPS'],
            'Photoshop DCS 2.0': ['.EPS'],
            'EPS TIFF Preview': ['.EPS'],
            'Generic EPS': ['.EPS', '.Al3', '.Al4', '.AI5', '.Al6', '.Al7', '.Al8', '.PS', '.Al', '.EPSF', '.EPSP'],
            'GIF': ['.GIF'],
            'IFF Format': ['.IFF', '.TDI'],
            'IGES': ['.IGS', '.IGES'],
            'JPEG': ['.JPG', '.JPEG', '.JPE'],
            'JPEG 2000': ['.JPF', '.JPX', '.JP2', '.J2C', '.J2K', '.JPC'],
            'JPEG Stereo': ['.JPS'],
            'Multi-Picture Format': ['.MPO'],
            'OpenEXR': ['.EXR'],
            'PCX': ['.PCX'],
            'Photoshop PDF': ['.PDF', '.PDP'],
            'Photoshop Raw': ['.RAW'],
            'PICT File': ['.PCT', '.PICT'],
            'Pixar': ['.PXR'],
            'PNG': ['.PNG', '.PNG'],
            'Portable Bit Map': ['.PBM', '.PGM', '.PPM', '.PNM', '.PFM', '.PAM'],
            'PRC': ['.PRC'],
            'Radiance': ['.HDR', '.RGBE', '.XYZE'],
            'Scitex CT': ['.SCT'],
            'SVG': ['.SVG', '.SVGZ'],
            'Targa': ['.TGA', '.VDA', '.ICB', '.VST'],
            'TIFF': ['.TIF', '.TIFF'],
            'U3D': ['.U3D'],
            'Video': ['.264', '.3GP', '.3GPP', '.AVC', '.AVl', '.F4V', '.FLV', '.M4V', '.MOV', '.MP4', '.MPE', '.MPEG', '.MPG', '.MTS', '.MXF', '.R3D', '.TS', '.voB', '.WM', '.wMV'],
            'Wireless Bitmap': ['.WBM', '.WBMP']
        },
        'edit' : {
            'Photoshop': ['.PSD', '.PDD', '.PSDT'],
            'Large Document Format': ['.PSB'],
            'OpenGL Transmission Format I GLTF/GLB': ['.GLB', '.GLTF'],
            'PLY': ['.PLY'],
            'STL': ['.STL'],
            'BMP': ['.BMP', '.RLE', '.DIB'],
            'Cineon': ['.CIN', '.SDPX', '.DPX', '.FIDO'],
            'Dicom': ['.PCM', '.DC3', '.D1C'],
            'GIF': ['.GIF'],
            'IFF Format': ['.IFF', '.TDI'],
            'IGES': ['.IGS', '.IGES'],
            'JPEG': ['.JPG', '.JPEG', '.JPE'],
            'JPEG 2000': ['.JPF', '.JPX', '.JP2', '.J2C', '.J2K', '.JPC'],
            'JPEG Stereo': ['.JPS'],
            'OpenEXR': ['.EXR'],
            'PCX': ['.PCX'],
            'Photoshop PDF': ['.PDP'],
            'PICT File': ['.PCT', '.PICT'],
            'Pixar': ['.PXR'],
            'PNG': ['.PNG'],
            'Portable Bit Map': ['.PBM', '.PGM', '.PPM', '.PNM', '.PFM', '.PAM'],
            'PRC': ['.PRC'],
            'Radiance': ['.HDR', '.RGBE', '.XYZE'],
            'Scitex CT': ['.SCT'],
            'Targa': ['.TGA', '.VDA', '.ICB', '.VST'],
            'TIFF': ['.TIF', '.TIFF'],
            'Video': ['.264', '.3GP', '.3GPP', '.AVC', '.AVl', '.F4V', '.FLV', '.M4V', '.MOV', '.MP4', '.MPE', '.MPEG', '.MPG', '.MTS', '.MXF', '.R3D', '.TS', '.voB', '.WM', '.wMV'],
            'Wireless Bitmap': ['.WBM', '.WBMP']
        },
        'layers' : {
            'Photoshop': ['.PSD', '.PDD', '.PSDT'],
            'Large Document Format': ['.PSB'],
            'Photoshop PDF': ['.PDP'],
            'TIFF': ['.TIF', '.TIFF']
        }
    };


    /**
     * Supported document properties. This is public so that additional properties can be added at runtime.
     */
    documents.supportedProperties = {
        'itemIndex': { typeId: c2id('ItmI'), type: DescValueType.INTEGERTYPE, set: false, },

        'documentId': { typeId: c2id('DocI'), type: DescValueType.INTEGERTYPE, set: false, },

        'width': {
            typeId: c2id('Wdth'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: new UnitValue(64, 'px'),
            get: function (prop, documentId, desc)
            {
                return new UnitValue(desc.getUnitDoubleValue(prop.typeId), 'px');
            },
            set: false,
        },

        'height': {
            typeId: c2id('Hght'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: new UnitValue(64, 'px'),
            get: function (prop, documentId, desc)
            {
                return new UnitValue(desc.getUnitDoubleValue(prop.typeId), 'px');
            },
            set: false,
        },

        'resolution': {
            typeId: c2id('Rslt'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: 72,
            get: function (prop, documentId, desc)
            {
                return desc.getUnitDoubleValue(prop.typeId);
            },
            set: false,
        },

        'name': { typeId: c2id('Ttl '), type: DescValueType.STRINGTYPE, defaultValue: 'Untitled', set: false, },

        'bitsPerChannel': {
            typeId: c2id('Dpth'),
            type: DescValueType.INTEGERTYPE,
            defaultValue: BitsPerChannelType.EIGHT,
            get: function (prop, documentId, desc)
            {
                var bitsPerChannel = desc.getInteger(prop.typeId);

                switch (bitsPerChannel)
                {
                    case 1: return BitsPerChannelType.ONE;
                    case 8: return BitsPerChannelType.EIGHT;
                    case 16: return BitsPerChannelType.SIXTEEN;
                    case 32: return BitsPerChannelType.THIRTYTWO;
                    default: throw new Error('Invalid bit depth: ' + bitsPerChannel + '.');
                }
            },
        },

        'mode': {
            typeId: c2id('Md  '),
            type: DescValueType.ENUMERATEDTYPE,
            defaultValue: DocumentMode.RGB,
            get: function (prop, documentId, desc)
            {
                var mode = desc.getEnumerationValue(prop.typeId);

                switch (mode)
                {
                    case _documentColorModes[1]: return DocumentMode.GRAYSCALE;
                    case _documentColorModes[2]: return DocumentMode.RGB;
                    case _documentColorModes[3]: return DocumentMode.CMYK;
                    case _documentColorModes[4]: return DocumentMode.LAB;
                    case _documentColorModes[5]: return DocumentMode.BITMAP;
                    case _documentColorModes[6]: return DocumentMode.INDEXEDCOLOR;
                    case _documentColorModes[7]: return DocumentMode.MULTICHANNEL;
                    case _documentColorModes[8]: return DocumentMode.DUOTONE;
                    default: throw new Error('Invalid color mode: ' + typeIDToCharID(mode) + '.');
                }
            },
            set: function (prop, documentId, value)
            {
                _wrapSwitchActive(documentId, function ()
                {
                    var desc = new ActionDescriptor();

                    if (value === DocumentMode.BITMAP)
                    {
                        var desc2 = new ActionDescriptor();
                        desc2.putUnitDouble(c2id('Rslt'), c2id('#Rsl'), documents.prop('resolution'));
                        desc2.putEnumerated(c2id('Mthd'), c2id('Mthd'), c2id('DfnD'));
                        desc.putObject(c2id('T   '), c2id('BtmM'), desc2);
                        executeAction(c2id('CnvM'), desc, _dialogModesNo);
                    }
                    else
                    {
                        var mode;

                        switch (value)
                        {
                            case DocumentMode.GRAYSCALE: mode = _documentColorModes[1];break;
                            case DocumentMode.RGB: mode = _documentColorModes[2];break;
                            case DocumentMode.CMYK: mode = _documentColorModes[3];break;
                            case DocumentMode.LAB: mode = _documentColorModes[4];break;
                            case DocumentMode.BITMAP: mode = _documentColorModes[5];break;
                            case DocumentMode.INDEXEDCOLOR: mode = _documentColorModes[6];break;
                            case DocumentMode.MULTICHANNEL: mode = _documentColorModes[7];break;
                            case DocumentMode.DUOTONE: mode = _documentColorModes[8];break;
                            default: throw new Error('Invalid color mode: ' + value + '.');
                        }

                        desc.putClass(c2id('T   '), mode);
                        executeAction(c2id('CnvM'), desc, _dialogModesNo);
                    }
                });
            },
        },

        'colorProfileName': {
            typeId: s2id('profile'),
            type: DescValueType.STRINGTYPE,
            defaultValue: 'sRGB IEC61966-2.1',
            set: function (prop, documentId, value)
            {
                _wrapSwitchActive(documentId, function ()
                {
                    var ref = new ActionReference();
                    _getDocumentIdRef(documentId, ref);
                    var desc = new ActionDescriptor();
                    desc.putReference(c2id('null'), ref);
                    desc.putString(s2id('profile'), value);
                    executeAction(s2id('assignProfile'), desc, _dialogModesNo);
                });
            },
        },

        'format': {
            typeId: c2id('Fmt '),
            type: DescValueType.STRINGTYPE,
            defaultValue: 'Photoshop',
            get: function (prop, documentId, desc)
            {
                if (!desc.hasKey(prop.typeId))
                    throw new Error('Unable to get "format". The document needs to be saved before accessing this property.');

                return new File(desc.getPath(prop.typeId));
            },
            set: false,
        },

        'isDirty': { typeId: c2id('IsDr'), type: DescValueType.BOOLEANTYPE, defaultValue: false, set: false, },

        'pixelAspectRatio': { typeId: s2id('pixelScaleFactor'), type: DescValueType.UNITDOUBLE, defaultValue: 1, set: false, },

        'zoom': { typeId: c2id('Zm  '), type: DescValueType.UNITDOUBLE, defaultValue: 1, set: false, },

        'xmpMetadata': {
            typeId: s2id('XMPMetadataAsUTF8'),
            type: DescValueType.STRINGTYPE,
            defaultValue: '',
            get: function (prop, documentId, desc)
            {
                // Get the data as XMPMeta object if XMP libraries are loaded
                // or as a simple UTF8 string otherwise
                var data = desc.getString(prop.typeId);
                return (typeof XMPMeta === 'function') ? new XMPMeta(data) : data;
            },
            set: function (prop, documentId, value)
            {
                // Serialize data if it's inside an XMPMeta object
                if (typeof value.serialize === 'function')
                    value = value.serialize();

                _wrapSwitchActive(documentId, function ()
                {
                    app.activeDocument.xmpMetadata.rawData = value;
                });
            },
        },

        'fullName': {
            typeId: c2id('FilR'),
            type: DescValueType.ALIASTYPE,
            defaultValue: null,
            get: function (prop, documentId, desc)
            {
                if (!desc.hasKey(prop.typeId))
                    return null;
                else
                    return new File(desc.getPath(prop.typeId));
            },
            set: false,
        },
    };

    /**
     * Gets the number of documents that are currently open.
     * @return {Number} Number of currently open documents.
     */
    documents.count = function ()
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Prpr'), c2id('NmbD'));
        ref.putEnumerated(c2id('capp'), c2id('Ordn'), c2id('Trgt'));
        return executeActionGet(ref).getInteger(c2id('NmbD'));
    };

    /**
     * Gets the identifier of the document identified by the passed ItemIndex.
     * @param {Number} itemIndex Document ItemIndex.
     * @return {Number} Document identifier.
     */
    documents.getDocumentIdByItemIndex = function (itemIndex)
    {
        if (typeof itemIndex !== 'number' || itemIndex < 1)
            throw new Error(['Invalid itemIndex: "', itemIndex, '".'].join(''));

        var ref = new ActionReference();
        ref.putProperty(c2id('Prpr'), c2id('DocI'));
        ref.putIndex(c2id('Dcmn'), itemIndex);

        return executeActionGet(ref).getInteger(c2id('DocI'));
    };

    /**
     * Creates a new document.
     * @param {Number, UnitValue} width Document width.
     * @param {Number, UnitValue} height Document height.
     * @param {Number} [resolution=72] Document resolution.
     * @param {String} [name] Document name.
     * @param {NewDocumentMode} [mode=NewDocumentMode.RGB] Document color mode.
     * @param {DocumentFill, SolidColor} [initialFill=DocumentFill.WHITE] Document initial fill or a valid solid color.
     * @param {Number} [pixelAspectRatio=1.0] Document aspect ratio.
     * @param {BitsPerChannelType} [bitsPerChannel=BitsPerChannelType.EIGHT] Document channel depth.
     * @param {String} [colorProfileName] Document color profile.
     * @return Chained reference to document utilities.
     */
    documents.add = function (width, height, resolution, name, mode, initialFill, pixelAspectRatio, bitsPerChannel, colorProfileName)
    {
        // Parse parameters
        var desc = new ActionDescriptor();

        // Mode
        switch (mode)
        {
            case NewDocumentMode.GRAYSCALE: desc.putClass(c2id('Md  '), c2id('Grys')); break;
            case NewDocumentMode.CMYK: desc.putClass(c2id('Md  '), c2id('CMYM')); break;
            case NewDocumentMode.LAB: desc.putClass(c2id('Md  '), c2id('LbCM')); break;
            case NewDocumentMode.BITMAP: desc.putClass(c2id('Md  '), c2id('BtmM')); break;
            default: desc.putClass(c2id('Md  '), c2id('RGBM')); break; // Default to NewDocumentMode.RGB
        }

        // Name
        if (typeof name === 'string' && name.length)
            desc.putString(c2id('Nm  '), name);

        // Width
        if ((typeof width !== 'number' || width < 0) && !(width instanceof UnitValue))
            throw new Error('Invalid width: ' + width);
        desc.putUnitDouble(c2id('Wdth'), c2id('#Pxl'), (width instanceof UnitValue) ? width.as('px') : width);

        // Height
        if ((typeof height !== 'number' || height < 0) && !(height instanceof UnitValue))
            throw new Error('Invalid height: ' + height);
        desc.putUnitDouble(c2id('Hght'), c2id('#Pxl'), (height instanceof UnitValue) ? height.as('px') : height);

        // Resolution
        desc.putUnitDouble(c2id('Rslt'), c2id('#Rsl'), (typeof resolution === 'number' && resolution > 0) ? resolution : 72);

        // Pixel aspect ratio
        desc.putDouble(s2id('pixelScaleFactor'), (typeof pixelAspectRatio === 'number' && pixelAspectRatio > 0) ? pixelAspectRatio : 1);

        // Initial fill
        initialFill || (initialFill = DocumentFill.WHITE);

        if (initialFill instanceof SolidColor)
        {
            // SolidColor
            desc.putEnumerated(c2id('Fl  '), c2id('Fl  '), c2id('Clr '));
            var desc3 = new ActionDescriptor();
            desc3.putUnitDouble(c2id('H   '), c2id('#Ang'), initialFill.hsb.hue);
            desc3.putDouble(c2id('Strt'), initialFill.hsb.saturation);
            desc3.putDouble(c2id('Brgh'), initialFill.hsb.brightness);
            desc.putObject(c2id('FlCl'), c2id('HSBC'), desc3);
        }
        else
        {
            // DocumentFill
            switch (initialFill)
            {
                case DocumentFill.TRANSPARENT: desc.putEnumerated(c2id('Fl  '), c2id('Fl  '), c2id('Trns')); break;
                case DocumentFill.BACKGROUNDCOLOR: desc.putEnumerated(c2id('Fl  '), c2id('Fl  '), c2id('BckC')); break;
                default: desc.putEnumerated(c2id('Fl  '), c2id('Fl  '), c2id('Wht ')); break; // Default to DocumentFill.WHITE
            }
        }

        // Color depth
        switch (bitsPerChannel)
        {
            case BitsPerChannelType.ONE: desc.putInteger(c2id('Dpth'), 1); break;
            case BitsPerChannelType.SIXTEEN: desc.putInteger(c2id('Dpth'), 16); break;
            case BitsPerChannelType.THIRTYTWO: desc.putInteger(c2id('Dpth'), 32); break;
            default: desc.putInteger(c2id('Dpth'), 8); break; // Default to BitsPerChannelType.EIGHT
        }

        // Color profile
        if (typeof colorProfileName === 'string' && colorProfileName.length)
            desc.putString(s2id('profile'), colorProfileName);

        // Create new document
        var desc2 = new ActionDescriptor();
        desc2.putObject(c2id('Nw  '), c2id('Dcmn'), desc);
        executeAction(c2id('Mk  '), desc2, _dialogModesNo);
        return documents;
    };





    /**
     * Check if photoshop can open or import a file type.
     * @param {File,String} file Either a File object or a path as string indicating the file to open.
     * @return {Boolean} True = photoshop can open or import the file type.
     */
    documents.fileTypeCanOpen = function (inPath)
    {
        return _isSupportedExtension(inPath, 'open');
    };

    /**
     * Check if photoshop can natively edit and save a file type.
     * @param {File,String} file Either a File object or a path as string indicating the file to open.
     * @return {Boolean} True = photoshop can edit and save the file type.
     */
    documents.fileTypeCanEdit = function (inPath)
    {
        return _isSupportedExtension(inPath, 'edit');
    };

    /**
     * Check if the file type supports photoshop layers.
     * @param {File,String} file Either a File object or a path as string indicating the file to open.
     * @return {Boolean} True = the file type can save photoshop layers.
     */
    documents.fileTypeCanHaveLayers = function (inPath)
    {
        return _isSupportedExtension(inPath, 'layers');
    };

    /**
     * Opens the specified document.
     * @param {File,String} file Either a File object or a path as string indicating the file to open.
     * @return Chained reference to document utilities.
     */
    documents.open = function (file)
    {
        var desc = new ActionDescriptor();
        desc.putPath(c2id('null'), _ensureFile(file));
        executeAction(c2id('Opn '), desc, _dialogModesNo);
        return documents;
    };

    /**
     * Saves the currently active document.
     * @param {String,File} [saveIn]        If specified, document will be saved at this location. It can either be a File
     *                                      object or a path string.
     * @param {Any} [options]               Save format options, defaults to Photoshop format if not specified.
     * @param {Boolean} [asCopy]            Saves the document as a copy, leaving the original open.
     * @param {Extension} [extensionType]   Appends the specified extension to the file name.
     * @param {Boolean} [overwrite]         If 'saveIn' is specified and different from current file location, this parameter
     *                                      indicates whether any existing files at the specified location should be overwritten.
     *                                      If false an Error is raised if a file already exists at the specified
     *                                      path.
     * @return Chained reference to document utilities.
     */
    documents.save = function (saveIn, options, asCopy, extensionType, overwrite)
    {
        if (documents.count() > 0)
        {
            if (arguments.length === 0)
            {
                app.activeDocument.save();
            }
            else
            {
                saveIn = _ensureFile(saveIn);

                if (overwrite === false, saveIn.exists && documents.prop('fileReference') !== saveIn)
                    throw new Error(['Another file already exists at the specified location: "', saveIn, '".'].join(''));

                app.activeDocument.saveAs(_ensureFile(saveIn), options, asCopy, extensionType);
            }
        }

        return documents;
    };

    /**
     * Closes the currently active document.
     * @param {Boolean} [save=false] Specifies whether changes should be saved before closing.
     * @return Chained reference to document utilities.
     */
    documents.close = function (save)
    {
        if (documents.count() > 0)
            app.activeDocument.close(!!save ? SaveOptions.SAVECHANGES : SaveOptions.DONOTSAVECHANGES);

        return documents;
    };

    /**
     * Iterates over the currently open documents, executing the specified callback on each element.
     * Please note: Adding or removing documents while iterating is not supported.
     * @param {Function} callback       Callback function. It is bound to context and invoked with two arguments (itemIndex, documentId).
     *                                  If callback returns true, iteration is stopped.
     * @param {Object} [context=null]   Callback function context.
     * @param {Boolean} [reverse=false] Whether to iterate from the end of the documents collection.
     * @return Chained reference to document utilities.
     */
    documents.forEach = function (callback, context, reverse) // callback[, context[, reverse]]
    {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a valid function.');

        var n, i;

        if (reverse)
        {
            i = documents.count() + 1;
            n = 0;

            while (--i > n)
            {
                if (callback.call(context, i, documents.getDocumentIdByItemIndex(i)))
                    break;
            }
        }
        else
        {
            n = documents.count() + 1;
            i = 0;

            while (++i < n)
            {
                if (callback.call(context, i, documents.getDocumentIdByItemIndex(i)))
                    break;
            }
        }

        return documents;
    };

    /**
     * Gets or sets the property with the given name on the specified document. If invoked with no arguments
     * gets a wrapped ActionDescriptor containing all the properties of the specified document.
     * @param {Number} [documentId] Document identifier, defaults to currently active document if null or not specified.
     * @param {String} [name] Property name.
     * @param {Any} [value]Property value.
     * @return {Any, ActionDescriptor, Object}  Property value when getting a property, a wrapped ActionDescriptor when invoked with no arguments
     *                                          or a chained reference to document utilities when setting a property.
     */
    documents.prop = function () // [documentId[, name[, value]]
    {
        // Parse args
        var documentId, name, value, ref, desc;

        if (typeof arguments[0] === 'number'
            || (!arguments[0] && arguments.length > 1))
        {
            // Use specified documentId
            documentId = arguments[0];
            name = arguments[1];
            value = arguments[2];
        }
        else
        {
            // Use current document
            name = arguments[0];
            value = arguments[1];
        }

        if (typeof name === 'undefined')
        {
            // Get wrapped action descriptor
            ref = new ActionReference();
            _getDocumentIdRef(documentId, ref);
            desc = executeActionGet(ref);
            return _getWrappedActionDescriptor(desc, documents.supportedProperties, documentId || desc.getInteger(c2id('DocI')));
        }
        else
        {
            // Find required property
            if (!documents.supportedProperties.hasOwnProperty(name))
                throw new Error(['Invalid document property: "', name, '".'].join(''));

            var prop = documents.supportedProperties[name];

            if (typeof value === 'undefined')
            {
                // Get
                // Get ActionDescriptor for specified document
                ref = new ActionReference();

                if (prop.typeId)
                    ref.putProperty(c2id('Prpr'), prop.typeId);

                _getDocumentIdRef(documentId, ref);
                desc = executeActionGet(ref);

                if (prop.get)
                {
                    // Use custom getter for this property
                    return prop.get.call(null, prop, documentId, desc);
                }
                else
                {
                    // Call generic getter
                    return _getDescriptorProperty(desc, prop.typeId, prop.type);
                }
            }
            else
            {
                // Set
                if (!prop.set)
                    throw new Error(['Property "', name, '" is read-only.'].join(''));

                // Set value
                prop.set.call(null, prop, documentId, value);

                // Chaining
                return documents;
            }
        }
    };

    /**
     * Resizes the currently active document. Supports scale styles (Document.resizeImage does not).
     * @param {Number} width  New width. If height is not specified an uniform scaling is applied.
     * @param {Number} [height] New height, defaults to original document height.
     * @param {Number} [resolution] New resolution, defaults to original document resolution.
     * @param {ResampleMethod} [resampleMethod=ResampleMethod.BICUBICAUTOMATIC] Scaling resample method.
     * @param {Boolean} [scaleStyles=true] Whether to scale styles (only available when using uniform scaling).
     * @return Chained reference to document utilities.
     */
    documents.resizeImage = function (width, height, resolution, resampleMethod, scaleStyles)
    {
        // Get original document values
        var originalWidth = documents.prop('width');
        var originalHeight = documents.prop('height');
        var originalResolution = documents.prop('resolution');

        // Get resize values
        if (typeof width === 'number')
            width = new UnitValue(width, 'px');
        else if (!(width instanceof UnitValue))
            width = originalWidth;

        if (typeof height === 'number')
        {
            height = new UnitValue(height, 'px');
        }
        else if (!(height instanceof UnitValue))
        {
            if (width.type === '%')
            {
                // If width is specified in percentage use uniform scaling
                height = new UnitValue(width.value, '%');
                height.baseUnit = new UnitValue(originalHeight.as('px'), 'px');
            }
            else
            {
                height = originalHeight;
            }
        }

        resolution = typeof resolution === 'number' ? resolution : originalResolution;
        typeof scaleStyles === 'boolean' || (scaleStyles = true);

        // Early exit if image is not modified
        if (width === originalWidth
            && height === originalHeight
            && resolution === originalResolution)
            return documents;

        var desc = new ActionDescriptor();

        if (width/originalWidth === height/originalHeight)
        {
            // Constrain proportions
            desc.putUnitDouble(c2id("Wdth"), c2id("#Pxl"), width.as('px'));
            desc.putBoolean(c2id("CnsP"), true);

            // Scale styles
            desc.putBoolean(s2id("scaleStyles"), scaleStyles);
        }
        else
        {
            // Non-uniform scaling
            desc.putUnitDouble(c2id("Wdth"), c2id("#Pxl"), width.as('px'));
            desc.putUnitDouble(c2id("Hght"), c2id("#Pxl"), height.as('px'));
        }

        // Resolution
        if (resolution !== originalResolution)
            desc.putUnitDouble(c2id("Rslt"), c2id("#Rsl"), resolution);

        // Resample method
        switch (resampleMethod)
        {
            case ResampleMethod.NEARESTNEIGHBOR: resampleMethod = s2id("nearestNeighbor"); break;
            case ResampleMethod.BILINEAR: resampleMethod = s2id("bilinear"); break;
            case ResampleMethod.BICUBIC: resampleMethod = s2id("bicubic"); break;
            case ResampleMethod.BICUBICSHARPER: resampleMethod = s2id("bicubicSharper"); break;
            case ResampleMethod.BICUBICSMOOTHER: resampleMethod = s2id("bicubicSmoother"); break;
            default: resampleMethod = s2id("bicubicAutomatic"); break;
        }
        desc.putEnumerated(c2id("Intr"), c2id("Intp"), resampleMethod);

        // Resize
        executeAction(c2id("ImgS"), desc, _dialogModesNo);
        return documents;
    };

    /**
     * Duplicates the currently active document.
     * @param {String} [duplicateName] Name of the document duplicate.
     * @param {Boolean} [merge] Whether to merge document layers.
     * @return Chained reference to document utilities.
     */
    documents.duplicate = function (duplicateName, merge)
    {
        var ref = new ActionReference();
        ref.putEnumerated(c2id('Dcmn'), c2id('Ordn'), c2id('Trgt'));

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);

        if (typeof duplicateName === 'string' && duplicateName.length)
            desc.putString(c2id('Nm  '), duplicateName);

        if (merge)
            desc.putBoolean(c2id('Mrgd'), true);

        executeAction(c2id('Dplc'), desc, _dialogModesNo);
        return documents;
    };

    /**
     * Flattens the currently active document.
     * @return Chained reference to document utilities.
     */
    documents.flatten = function ()
    {
        executeAction(c2id('FltI'), undefined, _dialogModesNo);
        return documents;
    };

    /**
     * Finds all the documents that match the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Array} An array containing find results.
     */
    documents.findAll = _find.bind(null, documents, 0);

    /**
     * Finds the first document that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    documents.findFirst = _find.bind(null, documents, 1);

    /**
     * Finds the last document that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    documents.findLast = _find.bind(null, documents, 2);

    /**
     * Sets the currently active document to the specified one.
     * @param {Number} documentId Document identifier.
     * @return Chained reference to document utilities.
     */
    documents.makeActive = function (documentId)
    {
        if (typeof documentId !== 'number')
            throw new Error(['Invalid document identifier: ', documentId, '.'].join(''));

        var ref = new ActionReference();
        ref.putIdentifier(c2id('Dcmn'), documentId);
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        executeAction(c2id('slct'), desc, _dialogModesNo);

        // Chaining
        return documents;
    };

    /**
     * Gets the unique identifier of the currently active document.
     * @return {Number} Unique identifier of the currently active document.
     */
    documents.getActiveDocumentId = function ()
    {
        if (documents.count() < 1)
            return -1;
        else
            return documents.prop('documentId');
    };

    /**
     * Gets the DOM representation of the currently active document.
     * @return {Document} The DOM representation of the currently active document, or null if no documents are open.
     */
    documents.toDOM = function ()
    {
        if (documents.count() < 1)
            return null;
        else
            return app.activeDocument;
    };

    // Public API
    /**
     * Contains low-level methods to work with documents without accessing
     * Photoshop DOM.
     *
     * Documents are identified by two numbers in Photoshop: DocumentId and ItemIndex.
     *
     *  - DocumentId: progressive 1-based integer identifier that is guaranteed to be unique for the current
     *                Photoshop work session. This is used in the functions.
     *  - ItemIndex: a 1-based integer index that is assigned when documents are open and closed. It is not
     *               linked in any way with windows location in UI: document with ItemIndex = 0 is not
     *               guaranteed to be the leftmost one in UI.
     */
    Lifter.documents = documents;
    log.log("Lifter.documents done.");
}());

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
    var filters = {};

    /** 
     * Provides access to blur filters.
     */
    filters.blur = {};

    /** 
     * Applies the Blur filter to the currently active layer or selection.
     * @return Chained reference to filter utilities.
     */
    filters.blur.blur = function ()
    {
        executeAction(c2id('Blr '), undefined, _dialogModesNo);
        return filters;
    };

    /** 
     * Applies the Blur More filter to the currently active layer or selection.
     * @return Chained reference to filter utilities.
     */
    filters.blur.blurMore = function ()
    {
        executeAction(c2id('BlrM'), undefined, _dialogModesNo);
        return filters;
    };

    /** 
     * Applies the Gaussian Blur filter to the currently active layer or selection.
     * @param {Number} [radius=1.0] Gaussian Blur radius.
     * @return Chained reference to filter utilities.
     */
    filters.blur.gaussianBlur = function (radius)
    {
        var desc = new ActionDescriptor();
        desc.putUnitDouble(c2id('Rds '), c2id('#Pxl'), +radius || 1.0);
        executeAction(c2id('GsnB'), desc, DialogModes.NO);
        return filters;
    };


    /** 
     * Provides access to sharpen filters.
     */
    filters.sharpen = {};

    /** 
     * Applies the Sharpen filter to the currently active layer or selection.
     * @return Chained reference to filter utilities.
     */
    filters.sharpen.sharpen = function ()
    {
        executeAction(c2id('Shrp'), undefined, _dialogModesNo);
        return filters;
    };

    /** 
     * Applies the Sharpen Edges filter to the currently active layer or selection.
     * @return Chained reference to filter utilities.
     */
    filters.sharpen.sharpenEdges = function ()
    {
        executeAction(c2id('ShrE'), undefined, _dialogModesNo);
        return filters;
    };

    /** 
     * Applies the Sharpen More filter to the currently active layer or selection.
     * @return Chained reference to filter utilities.
     */
    filters.sharpen.sharpenMore = function ()
    {
        executeAction(c2id('ShrM'), undefined, _dialogModesNo);
        return filters;
    };


    /** 
     * Provides access to procedural rendering filters.
     */
    filters.render = {};

    /** 
     * Applies the Cloud filter to the currently active layer or selection.
     * @return Chained reference to filter utilities.
     */
    filters.render.clouds = function ()
    {
        executeAction(c2id('Clds'), new ActionDescriptor(), _dialogModesNo);
        return filters;
    };

    // Public API
    /**
    * Contains low-level methods to work with filters without accessing Photoshop DOM.
    */
    Lifter.filters = filters;
}());
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
    var history = {};

    /** Puts the correct value in 'ref' to the get the history state specified by HistoryId. @private */
    function _getHistoryIdRef(historyId, ref)
    {
        if (typeof historyId !== 'number')
        {
            // If historyId is not passed, assume current history state
            ref.putEnumerated(c2id('HstS'), c2id('Ordn'), c2id('Trgt'));
        }
        else
        {
            // Use historyId directly
            ref.putIdentifier(c2id('HstS'), historyId);
        }
    }

    /** Traverse history in the specified direction, selecting the according history state. @private */
    function _traverseHistory(direction)
    {
        var ref = new ActionReference();
        ref.putEnumerated(c2id('HstS'), c2id('Ordn'), direction);
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        executeAction(c2id('slct'), desc, _dialogModesNo);
        return this;
    }


    /**
    * Supported history state properties. This is public so that additional properties can be added at runtime.
    */
    history.supportedProperties = {
        'itemIndex': {
            typeId: c2id('ItmI'),
            type: DescValueType.INTEGERTYPE,
            set: false,
        },
        'historyId': {
            typeId: c2id('Idnt'),
            type: DescValueType.INTEGERTYPE,
            set: false,
        },
        'name': {
            typeId: c2id('Nm  '),
            type: DescValueType.STRINGTYPE,
            set: false,
        },
        'auto': {
            typeId: c2id('Auto'),
            type: DescValueType.BOOLEANTYPE,
            set: false,
        },
        'historyBrushSource': {
            typeId: c2id('HstB'),
            type: DescValueType.BOOLEANTYPE,
            set: false,
        },
        'currentHistoryState': {
            typeId: c2id('CrnH'),
            type: DescValueType.BOOLEANTYPE,
            set: false,
        },
    };

    /**
     * Gets the number of history states for the currently active document.
     * @return Number of history states for the currently active document.
     */
    history.count = function ()
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Prpr'), c2id('Cnt '));
        ref.putEnumerated(c2id('HstS'), c2id('Ordn'), c2id('Trgt'));
        return executeActionGet(ref).getInteger(c2id('Cnt '));
    };

    /**
     * Gets the identifier of the history state identified by the passed ItemIndex.
     * @param {Number} itemIndex History state ItemIndex.
     * @return {Number} History state identifier.
     */
    history.getHistoryIdFromItemIndex = function (itemIndex)
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Prpr'), c2id('Idnt'));
        ref.putIndex(c2id('HstS'), itemIndex);
        return executeActionGet(ref).getInteger(c2id('Idnt'));
    };

    /**
     * Gets the identifier of the currently active history state.
     * @return {Number} HistoryId of the currently active history state.
     */
    history.getActiveHistoryId = function ()
    {
        return history.prop('historyId');
    };

    /**
     * Iterates over the history states stack, executing the specified callback on each element.
     * Please note: Adding or removing history states while iterating is not supported.
     * @param {Function} callback       Callback function. It is bound to context and invoked with two arguments (itemIndex, historyStateId).
     *                                  If callback returns true, iteration is stopped.
     * @param {Object} [context=null]   Callback function context.
     * @param {Boolean} [reverse=false] Whether to iterate from the end of the history states stack.
     * @return Chained reference to history utilities.
     */
    history.forEach = function (callback, context, reverse) // callback[, context[, reverse]]
    {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a valid function.');

        var n, i;

        if (reverse)
        {
            i = history.count() + 1;
            n = 0;

            while (--i > n)
            {
                if (callback.call(context, i, history.getHistoryIdFromItemIndex(i)))
                    break;
            }
        }
        else
        {
            n = history.count() + 1;
            i = 0;

            while (++i < n)
            {
                if (callback.call(context, i, history.getHistoryIdFromItemIndex(i)))
                    break;
            }
        }

        return history;
    };

    /**
     * Gets or sets the property with the given name on the specified history state. If invoked with no arguments
     * gets a wrapped ActionDescriptor containing all the properties of the specified history state.
     * @param {Number} [historyId] History state identifier, defaults to currently active history state if null or not specified.
     * @param {String} [name] Property name.
     * @param {Any} [value]Property value.
     * @return {Any, ActionDescriptor, Object}  Property value when getting a property, a wrapped ActionDescriptor when invoked with no arguments
     *                                          or a chained reference to document utilities when setting a property.
     */
    history.prop = function ()
    {
        // Parse args
        var historyId, name, value, ref, desc;

        if (typeof arguments[0] === 'number'
            || (!arguments[0] && arguments.length > 1))
        {
            historyId = arguments[0];
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
            // Get wrapped action descriptor
            ref = new ActionReference();
            _getHistoryIdRef(historyId, ref);
            desc = executeActionGet(ref);
            return _getWrappedActionDescriptor(desc, history.supportedProperties, historyId || desc.getInteger(c2id('Idnt')));
        }
        else
        {
            // Find property
            if (!history.supportedProperties.hasOwnProperty(name))
                throw new Error(['Invalid history state property: "', name, '".'].join(''));

            var prop = history.supportedProperties[name];

            if (typeof value === 'undefined')
            {
                // Get
                // Get ActionDescriptor for specified history state
                ref = new ActionReference();

                if (prop.typeId)
                    ref.putProperty(c2id('Prpr'), prop.typeId);

                _getHistoryIdRef(historyId, ref);
                desc = executeActionGet(ref);

                if (prop.get)
                {
                    // Use custom getter for this property
                    return prop.get.call(null, prop, historyId, desc);
                }
                else
                {
                    // Call getter for specific type
                    return _getDescriptorProperty(desc, prop.typeId, prop.type);
                }
            }
            else
            {
                // Set
                if (!prop.set)
                    throw new Error(['Property "', name, '" is read-only.'].join(''));

                // Set value
                prop.set.call(null, prop, historyId, value);
                return history;
            }
        }
    };

    /**
     * Finds all the history states that match the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Array} An array containing find results.
     */
    history.findAll = _find.bind(null, history, 0);

    /**
     * Finds the first history state that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    history.findFirst = _find.bind(null, history, 1);

    /**
     * Finds the last history state that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    history.findLast = _find.bind(null, history, 2);

    /**
     * Sets the currently active history state to the one identified by the passed HistoryId.
     * @param {Number} historyId History state identifier.
     * @return Chained reference to history utilities.
     */
    history.makeActive = function (historyId)
    {
        if (typeof historyId !== 'number' || historyId < 1)
            throw new Error(['Invalid history state identifier: "', historyId, '".'].join(''));

        var ref = new ActionReference();
        ref.putIdentifier(c2id('HstS'), historyId);
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        executeAction(c2id('slct'), desc, _dialogModesNo);
        return this;
    };

    /**
     * Sets the currently active history state to the one identified by the passed offset.
     * @param {Number} offset Offset from the last history state.
     * @return Chained reference to history utilities.
     */
    history.makeActiveByOffset = function (offset)
    {
        if (typeof offset !== 'number' || offset > 0)
            throw new Error(['Invalid history state offset: "', offset, '".'].join(''));

        var ref = new ActionReference();
        ref.putOffset(c2id('HstS'), offset);
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        executeAction(c2id('slct'), desc, _dialogModesNo);
        return this;
    };

    /**
     * Sets the currently active history state to the previous one in the stack.
     * @return Chained reference to history utilities.
     */
    history.makePreviousActive = _traverseHistory.bind(null, c2id('Prvs'));

    /**
     * Sets the currently active history state to the next one in the stack.
     * @return Chained reference to history utilities.
     */
    history.makeNextActive = _traverseHistory.bind(null, c2id('Nxt '));

    /**
     * Sets the currently active history state to the first one in the stack.
     * @return Chained reference to history utilities.
     */
    history.makeFirstActive = _traverseHistory.bind(null, c2id('Frst'));

    /**
     * Sets the currently active history state to the last one in the stack.
     * @return Chained reference to history utilities.
     */
    history.makeLastActive = _traverseHistory.bind(null, c2id('Lst '));

    /**
     * Duplicates the currently active history state, creating a new document from it.
     * @return Chained reference to history utilities.
     */
    history.duplicate = function ()
    {
        var ref = new ActionReference();
        ref.putClass(c2id('Dcmn'));

        var ref2 = new ActionReference();
        ref2.putProperty(c2id('HstS'), c2id('CrnH'));

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putReference(c2id('Usng'), ref2);
        executeAction(c2id('Mk  '), desc, _dialogModesNo);
        return this;
    };

    /**
     * Deletes the specified history state.
     * @param {Number} [historyId] History state identifier, defaults to currently active history state if not provided.
     * @return Chained reference to history utilities.
     */
    history.remove = function (historyId)
    {
        var ref = new ActionReference();

        if (typeof historyId === 'number')
            ref.putIdentifer(c2id('HstS'), historyId);
        else
            ref.putProperty(c2id('HstS'), c2id('CrnH'));

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        executeAction(c2id('Dlt '), desc, _dialogModesNo);
        return history;
    };

    /**
     * Creates a snapshot from the currently active history state.
     * @param {String} [snapshotName] Snapshot name.
     * @return Chained reference to history utilities.
     */
    history.createSnapshot = function (snapshotName)
    {
        var ref = new ActionReference();
        ref.putClass(c2id('SnpS'));

        var ref2 = new ActionReference();
        ref2.putProperty(c2id('HstS'), c2id('CrnH'));

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putReference(c2id('From'), ref2);

        if (typeof snapshotName === 'string' && snapshotName.length)
            desc.putString(c2id('Nm  '), snapshotName);

        executeAction(c2id('Mk  '), desc, _dialogModesNo);
        return this;
    };

    /**
     * Makes the specified snapshot active.
     * @param {Number, String} snapshot Either an history state identifier or a snapshot name.
     * @return Chained reference to history utilities.
     */
    history.makeSnapshotActive = function (snapshot)
    {
        if (typeof snapshot !== 'number')
            snapshot = history.findFirst({ 'name': snapshot });

        return history.makeActive(snapshot);
    };

    /**
     * Deletes the specified snapshot.
     * @param {Number, String} snapshot Either an history state identifier or a snapshot name.
     * @return Chained reference to history utilities.
     */
    history.deleteSnapshot = function (snapshot)
    {
        var type = typeof snapshot,
            ref = new ActionReference();

        if (type === 'string' && snapshot.length)
            ref.putName(c2id('SnpS'), snapshot);
        else if (type === 'number' && snapshot > 0)
            ref.putIdentifier(c2id('SnpS'), snapshot);
        else
            throw new Error(['Invalid snapshot identifier or name: "', snapshot, '".'].join(''));

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        executeAction(c2id('Dlt '), desc, _dialogModesNo);
        return history;
    };

    // Public API
    /**
    * Contains low-level methods to work with history without accessing Photoshop DOM.
    */
    Lifter.history = history;
}());

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

// TODO:
// - Property: grouped (complete support for creating grouped layers).
// - Property: kind (complete support for colorLookup).
// - Property: merge kind and type and add custom LifterLayerKind enumeration.
// - Property: textItem.
// - Property: linkedLayers.
// - Method: move layer!

; (function () {
    log.debug("Lifter.layers loading...");
    /**
     * @namespace
     * @alias Lifter.layers
     */

    /**
     * Unique layer id. Will fallback to current active layer id if null or undefined
     * @typedef {(Number|null)} LayerId
     */

    var layers = {};

    /** Utility object used to temporary hold data during heavy operations. @private */
    var _cache = {};

    _cache.refresh = function _cacheRefresh() {
        // Cleanup cache
        delete _cache['hasBackground'];
        delete _cache['layerCount'];
        // Cache some information to speed up the operation
        _cache['hasBackground'] = layers.hasBackground();
        _cache['layerCount'] = layers.count();
    };

    //Public access to refresh
    layers.cacheRefresh = _cache.refresh;

    /** Sets the passed layer as active and executes the specified callback. @private */
    function _wrapSwitchActive(layerId, callback, context)
    {
        // Set active layer to layerId
        // If we do not have a valid layerId we assume we want to target
        // the currently active layer
        if (typeof layerId === 'number' && layers.prop('layerId') !== layerId)
            layers.stack.makeActive(layerId);

        // Execute code
        callback.call(context);
    }

    /** Gets a ActionDescriptor holding all the properties needed for the Make Layer action. @private */
    function _getMakeLayerDescriptor(name, opacity, blendMode, color)
    {
        // Set layer set properties
        var desc = new ActionDescriptor();

        // Name
        if (typeof name === 'string' && name.length)
            desc.putString(c2id('Nm  '), name);

        // Opacity
        typeof opacity === 'number' || (opacity = 100.0);
        desc.putUnitDouble(c2id('Opct'), c2id('#Prc'), opacity);

        // Blend mode
        (blendMode && blendMode.valueOf) || (blendMode = BlendMode.NORMAL);
        desc.putEnumerated(c2id('Md  '), c2id('BlnM'), _ensureLifterBlendMode(blendMode).valueOf());

        // Color
        (color && color.valueOf) || (color = LayerColor.NONE);
        desc.putEnumerated(c2id('Clr '), c2id('Clr '), color.valueOf());

        return desc;
    }

    /** Puts the correct value in 'ref' to the get the layer specified by LayerId. @private */
    function _getLayerIdRef(layerId, ref)
    {
        if (typeof layerId !== 'number' || layerId === 0)
        {
            // If layerId is not passed, assume current layer
            // If layerId is 0 we're targeting the background layer in a document where background is the only layer
            // Use enumeration to get the background as getting it using LayerId directly will throw an error
            ref.putEnumerated(c2id('Lyr '), c2id('Ordn'), c2id('Trgt'));
        }
        else
        {
            // Use layerId directly
            ref.putIdentifier(c2id('Lyr '), layerId);
        }
    }

    /** Puts the correct value in 'ref' to the get the layer specified by ItemIndex. @private */
    function _getItemIndexRef(itemIndex, ref)
    {
        if (typeof itemIndex !== 'number')
        {
            // If itemIndex is not passed, assume current layer
            ref.putEnumerated(c2id('Lyr '), c2id('Ordn'), c2id('Trgt'));
        }
        else if (layers.count() === 0)
        {
            // Layer count is zero if the background layer is the only layer
            // present in the current document
            if (itemIndex !== 1)
                throw new Error(['Could not find layer with ItemIndex "', itemIndex, '".'].join(''));

            // Use enumeration to get the background as getting it using
            // ItemIndex directly will throw an error
            ref.putEnumerated(c2id('Lyr '), c2id('Ordn'), c2id('Trgt'));
        }
        else
        {
            // Check if document has a background layer and get correct ItemIndex
            if (layers.hasBackground())
                itemIndex--;

            // Use correct layer itemIndex
            ref.putIndex(c2id('Lyr '), itemIndex);
        }

        return ref;
    }

    /** Traverse layer stack in the specified direction, returning the according layer identifier. @private */
    function _getStackId(direction)
    {
        // If only the background layer is present in document, just return background layerId
        if (layers.count() === 0)
        {
            return 0;
        }
        else
        {
            var ref = new ActionReference();
            ref.putProperty(c2id('Prpr'), c2id('LyrI'));
            ref.putEnumerated(c2id('Lyr '), c2id('Ordn'), direction);
            return executeActionGet(ref).getInteger(c2id('LyrI'));
        }

        return layers;
    }

    /** Traverse layer stack in the specified direction, selecting the according layer. @private */
    function _traverseStack(direction)
    {
        // No need of setting the background layer active, it always is
        if (layers.count() === 0)
            return;

            layers.stack.makeActive(_getStackId(direction));
        return layers;
    }


    /**
     * retrieve or mutate basic ActionReference from id or active layer
     *
     * @param {Number} [layerId]
     * @param {ActionReference} [ref]   existing ActionReference to mutate
     * @returns {ActionReference}
     */
    layers.ref = function (layerId, ref) {
        ref = ref|| new ActionReference();
        _getLayerIdRef(layerId, ref);
        return ref;
    };


    /**
     * retrieve or mutate basic ActionDescriptor from id or active layer
     *
     * @param {Number} [layerId]
     * @param {ActionReference} [ref]   existing ActionReference to use or mutate
     * @param {ActionDescriptor} [desc]   existing ActionDescriptor to mutate
     * @returns {ActionDescriptor}
     */
    layers.desc = function (layerId, ref, desc) {
        desc = desc|| new ActionDescriptor();
        desc = executeActionGet(layers.ref(layerId,ref));
        return desc;
    };

    /**
     * Gets the DOM representation of the currently active document.
     * @return {Document} The DOM representation of the currently active document, or null if no documents are open.
     */
    layers.toDOM = function toDom(layerId)
    {
        layers.stack.makeActive(layerId);
        return app.activeDocument.activeLayer;
    };

    /** Supported layer properties. This is public so that additional properties can be added at runtime. */
    /**
     * @namespace
     * @alias Lifter.layers.supportedProperties
     */
    layers.supportedProperties = {
        'itemIndex': {
            typeId: c2id('ItmI'),
            type: DescValueType.INTEGERTYPE,
            set: function (prop, layerId, value)
            {
                if (layers.prop(layerId, 'isBackgroundLayer'))
                    throw new Error('Unable to set ItemIndex on background layer.');

                // Setting itemIndex moves the layer
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);

                var ref2 = new ActionReference();
                ref2.putIndex(c2id('Lyr '), value);

                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                desc.putReference(c2id('T   '), ref2);
                desc.putBoolean(c2id('Adjs'), false);
                desc.putInteger(c2id('Vrsn'), 5);
                executeAction(c2id('move'), desc, _dialogModesNo);
            },
        },
        'layerId': { typeId: c2id('LyrI'), type: DescValueType.INTEGERTYPE, set: false, },

        'name': {
            typeId: c2id('Nm  '),
            type: DescValueType.STRINGTYPE,
            defaultValue: 'Layer',
            set: function (prop, layerId, value)
            {
                // Target layer must be active to change its name
                _wrapSwitchActive(layerId, function ()
                {
                    var ref = new ActionReference();
                    ref.putEnumerated(c2id('Lyr '), c2id('Ordn'), c2id('Trgt'));
                    var desc = new ActionDescriptor();
                    desc.putReference(c2id('null'), ref);
                    var desc2 = new ActionDescriptor();
                    desc2.putString(prop.typeId, value);
                    desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                    executeAction(c2id('setd'), desc, _dialogModesNo);
                });
            },
        },

        'color': {
            typeId: c2id('Clr '),
            type: DescValueType.ENUMERATEDTYPE,
            defaultValue: LayerColor.NONE,
            get: function (prop, layerId, desc)
            {
                // Parse color
                return Enumeration.fromValue(LayerColor, desc.getEnumerationValue(prop.typeId));
            },
            set: function (prop, layerId, value)
            {
                // Target layer must be active to change its color
                _wrapSwitchActive(layerId, function ()
                {
                    var ref = new ActionReference();
                    _getLayerIdRef(layerId, ref);
                    var desc = new ActionDescriptor();
                    desc.putReference(c2id('null'), ref);
                    var desc2 = new ActionDescriptor();
                    desc2.putEnumerated(c2id('Clr '), c2id('Clr '), value.valueOf());
                    desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                    executeAction(c2id('setd'), desc, _dialogModesNo);
                });
            },
        },

        'visible': {
            typeId: c2id('Vsbl'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: true,
            set: function (prop, layerId, value)
            {
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var list = new ActionList();
                list.putReference(ref);
                var desc = new ActionDescriptor();
                desc.putList(c2id('null'), list);

                if (value)
                    executeAction(c2id('Shw '), desc, _dialogModesNo);
                else
                    executeAction(c2id('Hd  '), desc, _dialogModesNo);
            },
        },

        'opacity': {
            typeId: c2id('Opct'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: 100.0,
            get: function (prop, layerId, desc)
            {
                return _byteToPercent(desc.getInteger(prop.typeId));
            },
            set: function (prop, layerId, value)
            {
                // Layer must be visible to be able to apply opacity
                // or an error is thrown by AM
                var oldVisible = layers.prop(layerId, 'visible');

                if (!oldVisible)
                    layers.prop(layerId, 'visible', true);

                // Apply new opacity
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Prc'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);

                // Reset visibility
                if (!oldVisible)
                    layers.prop(layerId, 'visible', false);
            },
        },

        'fillOpacity': {
            typeId: s2id('fillOpacity'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: 100.0,
            get: function (prop, layerId, desc)
            {
                return _byteToPercent(desc.getInteger(prop.typeId));
            },
            set: function (prop, layerId, value)
            {
                if (layers.prop(layerId, 'type') !== LayerType.CONTENT)
                    throw new Error('Applying fill opacity to layer sets is not supported by Action Manager (nor by DOM).');

                // Layer must be visible to be able to apply fillOpacity
                // or an error is thrown by AM
                var oldVisible = layers.prop(layerId, 'visible');

                if (!oldVisible)
                    layers.prop(layerId, 'visible', true);

                // Apply new fillOpacity
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Prc'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);

                // Reset visibility
                if (!oldVisible)
                    layers.prop(layerId, 'visible', false);
            },
        },

        'blendMode': {
            typeId: c2id('Md  '),
            type: DescValueType.ENUMERATEDTYPE,
            defaultValue: BlendMode.NORMAL,
            get: function (prop, layerId, desc)
            {
                // Parse blend mode
                return Enumeration.fromValue(LifterBlendMode, desc.getEnumerationValue(prop.typeId));
            },
            set: function (prop, layerId, value)
            {
                // Passthrough is unsupported on layers, but does not throw an error,
                // thus no checks are implemented
                // Get value from LifterBlendMode enum
                value = _ensureLifterBlendMode(value).valueOf();

                // Set blend mode
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putEnumerated(prop.typeId, c2id('BlnM'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'type': {
            typeId: s2id('layerSection'),
            type: DescValueType.ENUMERATEDTYPE,
            get: function (prop, layerId, desc)
            {
                var type = typeIDToStringID(desc.getEnumerationValue(prop.typeId));

                switch (type)
                {
                    case 'layerSectionStart': return LayerType.SETSTART;
                    case 'layerSectionEnd': return LayerType.SETEND;
                    case 'layerSectionContent': return LayerType.CONTENT;
                    default: throw new Error(['Unsupported layer type encountered: "', type, '".'].join(''));
                }
            },
            set: false,
        },

        'kind': {
            get: function (prop, layerId, desc)
            {
                // Based on:
                // http://www.ps-scripts.com/bb/viewtopic.php?f=9&t=5656
                // Throw error if layer set
                if (layers.prop(layerId, 'type') !== LayerType.CONTENT)
                    throw new Error('Unable to get "kind" for layer sets.');

                if (desc.hasKey(s2id('textKey')))
                    return LayerKind.TEXT;

                // Includes LayerKind.VIDEO
                if (desc.hasKey(s2id('smartObject')))
                    return LayerKind.SMARTOBJECT;

                if (desc.hasKey(s2id('layer3D')))
                    return LayerKind.LAYER3D;

                var adjustmentType = s2id('adjustment');

                if (desc.hasKey(adjustmentType))
                {
                    var adjustmentKind = typeIDToStringID(desc.getList(adjustmentType).getClass(0));

                    switch (adjustmentKind)
                    {
                        case 'photoFilter': return LayerKind.PHOTOFILTER;
                        case 'solidColorLayer': return LayerKind.SOLIDFILL;
                        case 'gradientMapClass': return LayerKind.GRADIENTMAP;
                        case 'gradientMapLayer': return LayerKind.GRADIENTFILL;
                        case 'hueSaturation': return LayerKind.HUESATURATION;
                        case 'colorLookup': return; // This does not exist and throws an error
                        case 'colorBalance': return LayerKind.COLORBALANCE;
                        case 'patternLayer': return LayerKind.PATTERNFILL;
                        case 'invert': return LayerKind.INVERSION;
                        case 'posterization': return LayerKind.POSTERIZE;
                        case 'thresholdClassEvent': return LayerKind.THRESHOLD;
                        case 'blackAndWhite': return LayerKind.BLACKANDWHITE;
                        case 'selectiveColor': return LayerKind.SELECTIVECOLOR;
                        case 'vibrance': return LayerKind.VIBRANCE;
                        case 'brightnessEvent': return LayerKind.BRIGHTNESSCONTRAST;
                        case 'channelMixer': return LayerKind.CHANNELMIXER;
                        case 'curves': return LayerKind.CURVES;
                        case 'exposure': return LayerKind.EXPOSURE;

                        default:
                            // If none of the above, return adjustment kind as string
                            return adjustmentKind;
                    }
                }

                // If we get here normal should be the only choice left
                return LayerKind.NORMAL;
            },
            set: false,
        },

        'bounds': {
            typeId: s2id('bounds'),
            type: DescValueType.OBJECTTYPE,
            get: function (prop, layerId, desc)
            {
                var bounds = desc.getObjectValue(prop.typeId);

                // LayerBounds seems to be always saved in pixels,
                // but unit is loaded from document anyways
                return new LayerBounds(
                        bounds.getUnitDoubleValue(c2id('Top ')),
                        bounds.getUnitDoubleValue(c2id('Left')),
                        bounds.getUnitDoubleValue(c2id('Btom')),
                        bounds.getUnitDoubleValue(c2id('Rght')),
                        bounds.getUnitDoubleType(c2id('Top '))
                    );
            },
            set: false,
        },

        'boundsNoEffects': {
            typeId: s2id('boundsNoEffects'),
            type: DescValueType.OBJECTTYPE,
            get: function (prop, layerId, desc)
            {
                var bounds = desc.getObjectValue(prop.typeId);

                // LayerBounds seems to be always saved in pixels,
                // but unit is loaded from document anyways
                return new LayerBounds(
                        bounds.getUnitDoubleValue(c2id('Top ')),
                        bounds.getUnitDoubleValue(c2id('Left')),
                        bounds.getUnitDoubleValue(c2id('Btom')),
                        bounds.getUnitDoubleValue(c2id('Rght')),
                        bounds.getUnitDoubleType(c2id('Top '))
                    );
            },
            set: false,
        },

        'boundsNoMask': {
            typeId: s2id('boundsNoMask'),
            type: DescValueType.OBJECTTYPE,
            get: function (prop, layerId, desc)
            {
                var bounds = desc.getObjectValue(prop.typeId);

                // LayerBounds seems to be always saved in pixels,
                // but unit is loaded from document anyways
                return new LayerBounds(
                        bounds.getUnitDoubleValue(c2id('Top ')),
                        bounds.getUnitDoubleValue(c2id('Left')),
                        bounds.getUnitDoubleValue(c2id('Btom')),
                        bounds.getUnitDoubleValue(c2id('Rght')),
                        bounds.getUnitDoubleType(c2id('Top '))
                    );
            },
            set: false,
        },

        // NOTE: this does NOT indicate that a layer is a group or set. use 'type' prop for that.
        // True if layer is 'clipped' (has 'clipping mask') onto a group or layer below it.
        'group': { typeId: c2id('Grup'), type: DescValueType.BOOLEANTYPE, set: false, },

        'hasLayerMask': { typeId: s2id('hasUserMask'), type: DescValueType.BOOLEANTYPE, set: false, },

        'layerMaskEnabled': {
            typeId: s2id('userMaskEnabled'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: true,
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to get layer mask enabled: layer does not have a layer mask applied.');

                return desc.getBoolean(prop.typeId);
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to set layer mask enabled: layer does not have a layer mask applied.');

                var desc = new ActionDescriptor();
                var ref = layers.ref(layerId);
                desc.putReference( c2id('null'), ref );
                    var descToggle = new ActionDescriptor();
                    descToggle.putBoolean( c2id('UsrM'), value );
                desc.putObject( c2id('T   '), c2id('Lyr '), descToggle );
                executeAction( c2id('setd'), desc, DialogModes.NO );}
            },

        'layerMaskLinked': {
            typeId: s2id('userMaskLinked'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: true,
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to get layer mask Linked: layer does not have a layer mask applied.');

                return desc.getBoolean(prop.typeId);
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to set layer mask Linked: layer does not have a layer mask applied.');

                var desc = new ActionDescriptor();
                var ref = layers.ref(layerId);
                desc.putReference( c2id('null'), ref );
                    var descToggle = new ActionDescriptor();
                    descToggle.putBoolean( c2id('Usrs'), value );
                desc.putObject( c2id('T   '), c2id('Lyr '), descToggle );
                executeAction( c2id('setd'), desc, DialogModes.NO );}
            },

        'layerMaskDensity': {
            typeId: s2id('userMaskDensity'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: 100.0,
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to get layer mask density: layer does not have a layer mask applied.');

                return _byteToPercent(desc.getInteger(prop.typeId));
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to set layer mask density: layer does not have a layer mask applied.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Prc'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'layerMaskFeather': {
            typeId: s2id('userMaskFeather'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: new UnitValue(0.0, 'px'),
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to get layer mask feather: layer does not have a layer mask applied.');

                return desc.getUnitDoubleValue(prop.typeId);
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasLayerMask'))
                    throw new Error('Unable to set layer mask feather: layer does not have a layer mask applied.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Pxl'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'hasVectorMask': { typeId: s2id('hasVectorMask'), type: DescValueType.BOOLEANTYPE, set: false, },

        'vectorMaskEnabled': {
            typeId: s2id('vectorMaskEnabled'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: true,
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasVectorMask'))
                    throw new Error('Unable to get layer mask enabled: layer does not have a layer mask applied.');

                return desc.getBoolean(prop.typeId);
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasVectorMask'))
                    throw new Error('Unable to set layer mask enabled: layer does not have a vector mask applied.');

                var desc = new ActionDescriptor();
                var ref = layers.ref(layerId);
                desc.putReference( c2id('null'), ref );
                    var descToggle = new ActionDescriptor();
                    descToggle.putBoolean( s2id( "vectorMaskEnabled" ), value );
                desc.putObject( c2id('T   '), c2id('Lyr '), descToggle );
                executeAction( c2id('setd'), desc, DialogModes.NO );}
            },

        'vectorMaskLinked': {
            typeId: s2id('vectorMaskLinked'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: true,
            get: function (prop, layerId, desc)
            {
                throw new Error('Layer property "vectorMaskLinked" can only be set, never read. It simply does not exist.');
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasVectorMask'))
                    throw new Error('Unable to set layer mask Linked: layer does not have a vector mask applied.');

                var desc = new ActionDescriptor();
                var ref = layers.ref(layerId);
                desc.putReference( c2id('null'), ref );
                    var descToggle = new ActionDescriptor();
                    descToggle.putBoolean( s2id( "vectorMaskLinked" ), value );
                desc.putObject( c2id('T   '), c2id('Lyr '), descToggle );
                executeAction( c2id('setd'), desc, DialogModes.NO );}
            },

        'vectorMaskDensity': {
            typeId: s2id('vectorMaskDensity'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: 100.0,
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasVectorMask'))
                    throw new Error('Unable to get vector mask density: layer does not have a vector mask applied.');

                return _byteToPercent(desc.getInteger(prop.typeId));
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasVectorMask'))
                    throw new Error('Unable to set vector mask density: layer does not have a vector mask applied.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Prc'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'vectorMaskFeather': {
            typeId: s2id('vectorMaskFeather'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: new UnitValue(0.0, 'px'),
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasVectorMask'))
                    throw new Error('Unable to get vector mask feather: layer does not have a vector mask applied.');

                return desc.getUnitDoubleValue(prop.typeId);
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasVectorMask'))
                    throw new Error('Unable to set vector mask feather: layer does not have a vector mask applied.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Pxl'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'hasFilterMask': { typeId: s2id('hasFilterMask'), type: DescValueType.BOOLEANTYPE, set: false, },

        'filterMaskDensity': {
            typeId: s2id('filterMaskDensity'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: 100.0,
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasFilterMask'))
                    throw new Error('Unable to get filter mask density: layer does not have a filter mask applied.');

                return _byteToPercent(desc.getInteger(prop.typeId));
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasFilterMask'))
                    throw new Error('Unable to set filter mask density: layer does not have a filter mask applied.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Prc'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'filterMaskFeather': {
            typeId: s2id('filterMaskFeather'),
            type: DescValueType.UNITDOUBLE,
            defaultValue: new UnitValue(0.0, 'px'),
            get: function (prop, layerId, desc)
            {
                if (!layers.prop(layerId, 'hasFilterMask'))
                    throw new Error('Unable to get filter mask feather: layer does not have a layer mask applied.');

                return desc.getUnitDoubleValue(prop.typeId);
            },
            set: function (prop, layerId, value)
            {
                if (!layers.prop(layerId, 'hasFilterMask'))
                    throw new Error('Unable to set filter mask feather: layer does not have a filter mask applied.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);
                var desc2 = new ActionDescriptor();
                desc2.putUnitDouble(prop.typeId, c2id('#Pxl'), value);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'allLocked': {
            typeId: s2id('layerLocking'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: false,
            get: function (prop, layerId, desc)
            {
                return desc.getObjectValue(prop.typeId).getBoolean(s2id('protectAll'));
            },
            set: function (prop, layerId, value)
            {
                if (layers.prop(layerId, 'isBackgroundLayer'))
                {
                    if (value)
                    {
                        // We tried to lock the background layer, throw error
                        throw new Error('Unable to set lock on background layer.');
                    }
                    else
                    {
                        // We tried to unlock the background layer, let's make it a normal layer (this changes active layer)
                        _wrapSwitchActive(layerId, layers.makeLayerFromBackground);
                    }
                }
                else
                {
                    // Target layer must be active to change its lock
                    _wrapSwitchActive(layerId, function ()
                    {
                        var ref = new ActionReference();
                        _getLayerIdRef(layerId, ref);
                        var desc = new ActionDescriptor();
                        desc.putReference(c2id('null'), ref);

                        // Set lock object
                        var lock = new ActionDescriptor();
                        lock.putBoolean(s2id('protectAll'), value);

                        var desc2 = new ActionDescriptor();
                        desc2.putObject(prop.typeId, prop.typeId, lock);
                        desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                        executeAction(c2id('setd'), desc, _dialogModesNo);
                    });
                }
            },
        },

        'pixelsLocked': {
            typeId: s2id('layerLocking'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: false,
            get: function (prop, layerId, desc)
            {
                return desc.getObjectValue(prop.typeId).getBoolean(s2id('protectComposite'));
            },
            set: function (prop, layerId, value)
            {
                if (layers.prop(layerId, 'isBackgroundLayer'))
                    throw new Error('Unable to set pixels lock on background layer.');

                if (layers.prop(layerId, 'type') !== LayerType.CONTENT)
                    throw new Error('Pixels lock can not be set on layer sets.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);

                // Set lock object
                var lock = new ActionDescriptor();
                lock.putBoolean(s2id('protectComposite'), value);

                var desc2 = new ActionDescriptor();
                desc2.putObject(prop.typeId, prop.typeId, lock);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'positionLocked': {
            typeId: s2id('layerLocking'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: false,
            get: function (prop, layerId, desc)
            {
                return desc.getObjectValue(prop.typeId).getBoolean(s2id('protectPosition'));
            },
            set: function (prop, layerId, value)
            {
                if (layers.prop(layerId, 'isBackgroundLayer'))
                    throw new Error('Unable to set position lock on background layer.');

                if (layers.prop(layerId, 'type') !== LayerType.CONTENT)
                    throw new Error('Position lock can not be set on layer sets.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);

                // Set lock object
                var lock = new ActionDescriptor();
                lock.putBoolean(s2id('protectPosition'), value);

                var desc2 = new ActionDescriptor();
                desc2.putObject(prop.typeId, prop.typeId, lock);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'transparentPixelsLocked': {
            typeId: s2id('layerLocking'),
            type: DescValueType.BOOLEANTYPE,
            defaultValue: false,
            get: function (prop, layerId, desc)
            {
                return desc.getObjectValue(prop.typeId).getBoolean(s2id('protectTransparency'));
            },
            set: function (prop, layerId, value)
            {
                if (layers.prop(layerId, 'isBackgroundLayer'))
                    throw new Error('Unable to set transparency lock on background layer.');

                if (layers.prop(layerId, 'type') !== LayerType.CONTENT)
                    throw new Error('Transparency lock can not be set on layer sets.');

                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);
                var desc = new ActionDescriptor();
                desc.putReference(c2id('null'), ref);

                // Set lock object
                var lock = new ActionDescriptor();
                lock.putBoolean(s2id('protectTransparency'), value);

                var desc2 = new ActionDescriptor();
                desc2.putObject(prop.typeId, prop.typeId, lock);
                desc.putObject(c2id('T   '), c2id('Lyr '), desc2);
                executeAction(c2id('setd'), desc, _dialogModesNo);
            },
        },

        'isBackgroundLayer': {
            typeId: c2id('Bckg'),
            type: DescValueType.BOOLEANTYPE,
            get: function (prop, layerId, desc)
            {
                return layerId === 0 || desc.getBoolean(prop.typeId);
            },
            set: false,
        },

        'xmpMetadata': { typeId: s2id('metadata'), type: DescValueType.OBJECTTYPE, set: false, },

        'lastModified': {
            typeId: s2id('metadata'), // lastModified is a child of xmpMetadata
            type: DescValueType.DOUBLETYPE,
            get: function (prop, layerId, desc)
            {
                var lastModified = new Date();
                lastModified.setTime(desc.getObjectValue(prop.typeId).getDouble(s2id('layerTime')) * 1000.0); // Time is stored in seconds
                return lastModified;
            },
            set: false,
        },

        'smartObject': {
            typeId: s2id('smartObject'),
            type: DescValueType.OBJECTTYPE,
            get: function (prop, layerId, desc)
            {
                if (desc.hasKey(prop.typeId))
                    return desc.getObjectValue(prop.typeId);
            },
            set: false,
        },

        'smartObjectMore': {
            typeId: s2id('smartObjectMore'),
            type: DescValueType.OBJECTTYPE,
            get: function (prop, layerId, desc)
            {
                if (desc.hasKey(prop.typeId))
                    return desc.getObjectValue(prop.typeId);
            },
            set: false,
        },

        'smartObject.link': {
            typeId: s2id('smartObject'),
            type: DescValueType.ALIASTYPE,
            get: function (prop, layerId, desc)
            {
                if (!desc.hasKey(prop.typeId))
                        return;

                // Linked == ALIASTYPE, cloud == OBJECTTYPE
                var soDesc = layers.prop(layerId, 'smartObject');
                if( soDesc && soDesc.hasKey(s2id('link')) && soDesc.getType(s2id('link')) == prop.type)
                    return String(soDesc.getPath(s2id('link')));
            },
            set: function (prop, layerId, value)
            {
                try{
                    var desc = new ActionDescriptor();
                    desc.putPath( c2id( "null" ), _ensureFile( value ) );
                    executeAction( s2id( "placedLayerRelinkToFile"), desc, DialogModes.NO );
                } catch (e) {
                    throw new Error('Can not relink smart object...'+e.message);
                }
            },
        },

        'smartObject.compsList': {
            typeId: s2id('smartObject'),
            type: DescValueType.OBJECTTYPE,
            get: function (prop, layerId, desc)
            {
                if (desc.hasKey(prop.typeId))
                {
                    var compsDesc = layers.prop(layerId, 'smartObject').getObjectValue(s2id('compsList'));
                    if(compsDesc && compsDesc.hasKey(s2id('compList')))
                    {
                        var compList = compsDesc.getList(s2id('compList'));
                        var compObj = {};

                        //Reverse order so our layers stack properly
                        for (var c = compList.count-1; c >= 0; c--) {
                            var compObjDesc = compList.getObjectValue(c);
                            var compObjID = compObjDesc.getInteger(s2id('ID'));
                            compObj[compObjID] = compObjDesc.getString(s2id('name'));
                        }
                        return compObj;
                    }
                }

            },
            set: false,
        },

        'smartObjectMore.comp': {
            typeId: s2id('smartObjectMore'),
            type: DescValueType.INTEGERTYPE,
            get: function (prop, layerId, desc)
            {
                if (desc.hasKey(prop.typeId))
                    return layers.prop(layerId, 'smartObjectMore').getInteger(s2id('comp'));
            },
            set: function (prop, layerId, value)
            {
                try {
                    value = (typeof value === "number" && value>=0 )? value:-1;
                    var ref = layers.ref(layerId);

                    if ( executeActionGet(ref).hasKey(prop.typeId) )
                    {
                        var desc = new ActionDescriptor();
                        desc.putReference(c2id('null'), ref);
                        desc.putInteger( s2id( "compID"), value );
                        executeAction( s2id( "setPlacedLayerComp" ), desc, DialogModes.NO );
                    }
                } catch(e) {
                    throw new Error('Can not set comp on smart object...'+e.message);
                }
            },
        },

        'smartObjectMore.resolution': {
            typeId: s2id('smartObjectMore'),
            type: DescValueType.UNITDOUBLE,
            get: function (prop, layerId, desc)
            {
                if (desc.hasKey(prop.typeId))
                    return layers.prop(layerId, 'smartObjectMore').getDouble(s2id('resolution'));
            },
            set: false,
        },
    };

    /**
     * Gets the number of layers contained in the currently active document.
     * Please note: layer count will be zero if *only* the background layer is present in the document.
     * @return Layer count of the currently active document.
     */
    layers.count = function ()
    {
        if (_cache.hasOwnProperty('layerCount'))
            return _cache['layerCount'];

        // Get base count
        var ref = new ActionReference();
        ref.putProperty(c2id('Prpr'), c2id('NmbL'));
        ref.putEnumerated(c2id('Dcmn'), c2id('Ordn'), c2id('Trgt'));
        var count = executeActionGet(ref).getInteger(c2id('NmbL'));

        // If document has background, add 1 to layer count
        if (count > 0)
        {
            if (_cache.hasOwnProperty('hasBackground'))
            {
                if (_cache['hasBackground'])
                    count++;
            }
            else
            {
                ref = new ActionReference();
                ref.putProperty(c2id('Prpr'), c2id('Bckg'));
                ref.putEnumerated(c2id('Lyr '), c2id('Ordn'), c2id('Back'));
                if (executeActionGet(ref).getBoolean(c2id('Bckg')))
                    count++;
            }
        }

        return count;
    };

    /**
     * Gets the LayerId of the layer identified by the passed ItemIndex.
     * @return {Number} LayerId of the specified layer.
     */
    layers.getLayerIdByItemIndex = function (itemIndex)
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Prpr'), c2id('LyrI'));
        _getItemIndexRef(itemIndex, ref);
        return executeActionGet(ref).getInteger(c2id('LyrI'));
    };

    /**
     * Gets whether a background layer currently exists.
     * @return {Boolean} True if a background layer is currently existing; otherwise, false.
     */
    layers.hasBackground = function ()
    {
        if (_cache.hasOwnProperty('hasBackground'))
            return _cache['hasBackground'];

        if (Lifter.layers.count() === 0)
        {
            // Layer count will be zero if *only* the background layer is
            // present in document
            return true;
        }
        else
        {
            var ref = new ActionReference();
            ref.putProperty( c2id("Prpr"), s2id( "hasBackgroundLayer" ));
            ref.putEnumerated(c2id( "Dcmn" ),c2id( "Ordn" ),c2id( "Trgt" ));
            var desc =  executeActionGet(ref);
            var res = desc.getBoolean(s2id( "hasBackgroundLayer" ));
            return res;
        }
    };

    /**
     * Adds a new layer to the currently active document.
     * @param {String} [name] Layer name. Pass null for default value.
     * @param {String} [opacity] Layer opacity. Pass null for default value.
     * @param {BlendMode, LifterBlendMode} blendMode Layer blend mode. Pass null for default value.
     * @param {LayerColor} color Layer color. Pass null for default value.
     * @return Chained reference to layer utilities.
     */
    layers.add = function (name, opacity, blendMode, color)
    {
        var ref = new ActionReference();
        ref.putClass(c2id('Lyr '));
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putObject(c2id('Usng'), c2id('Lyr '), _getMakeLayerDescriptor(name, opacity, blendMode, color));
        executeAction(c2id('Mk  '), desc, _dialogModesNo);
        return layers;
    };

    /**
     * Adds a new layer set to the currently active document.
     * @param {String} [name] Layer set name. Pass null for default value.
     * @param {String} [opacity] Layer set opacity. Pass null for default value.
     * @param {BlendMode, LifterBlendMode} blendMode Layer set blend mode. Pass null for default value.
     * @param {LayerColor} color Layer set color. Pass null for default value.
     * @return Chained reference to layer utilities.
     */
    layers.addLayerSet = function (name, opacity, blendMode, color)
    {
        var ref = new ActionReference();
        ref.putClass(s2id('layerSection'));
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putObject(c2id('Usng'), s2id('layerSection'), _getMakeLayerDescriptor(name, opacity, blendMode, color));
        executeAction(c2id('Mk  '), desc, _dialogModesNo);
        return layers;
    };

    /**
     * Removes the specified layer from the currently active document.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return Chained reference to layer utilities.
     */
    layers.remove = function (layerId)
    {
        var ref = new ActionReference();
        _getLayerIdRef(layerId, ref);
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        executeAction(c2id('Dlt '), desc, _dialogModesNo);

        // Chaining
        return layers;
    };

    /**
     * Transforms the background of the current document in a normal layer.
     * @param {String} [name] Layer set name. Pass null for default value.
     * @param {String} [opacity] Layer set opacity. Pass null for default value.
     * @param {BlendMode, LifterBlendMode} blendMode Layer set blend mode. Pass null for default value.
     * @param {LayerColor} color Layer set color. Pass null for default value.
     * @return Chained reference to layer utilities.
     */
    layers.makeLayerFromBackground = function (name, opacity, blendMode, color)
    {
        // Do nothing if we do not have a background
        if (!Lifter.layers.hasBackground())
            return;

        var ref = new ActionReference();
        ref.putProperty(c2id('Lyr '), c2id('Bckg'));
        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putObject(c2id('T   '), c2id('Lyr '), _getMakeLayerDescriptor(name, opacity, blendMode, color));
        executeAction(c2id('setd'), desc, _dialogModesNo);

        // Chaining
        return layers;
    };

    /**
     * Duplicates the specified layer into the specified document.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @param {Number} [documentId] Identifier of the document to copy the specified layer into. Defaults
     *                              to current document if null or not specified.
     * @return Chained reference to layer utilities.
     */
    layers.duplicate = function (layerId, documentId)
    {
        var ref = new ActionReference();
        _getLayerIdRef(layerId, ref);

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);

        if (documentId)
        {
            var ref2 = new ActionReference();
            ref.putIdentifier(c2id('Dcmn'), documentId);
            desc.putReference(c2id('T   '), ref2);
        }

        desc.putInteger(c2id('Vrsn'), 5);
        executeAction(c2id('Dplc'), desc, _dialogModesNo);

        // Chaining
        return layers;
    };

    /**
     * Applies the specified layer into another one.
     * @param {Number} [sourceDocumentId] Source document identifier, defaults to currently active document if null.
     * @param {Number} [sourceLayerId] Source layer identifier, defaults to currently active layer if null.
     * @param {ApplyImageChannel} [sourceLayerId=ApplyImageChannel.RGB] Source channel identifier.
     * @param {Boolean} [invert=false] Whether to invert the applied image.
     * @param {BlendMode, LifterBlendMode} [blendMode=LifterBlendMode.NORMAL] Blend mode.
     * @param {Number} [opacity=100] Blend opacity.
     * @param {Boolean} [preserveTransparency=true] Whether to preserve the transparency of the applied image.
     * @return Chained reference to layer utilities.
     */
    layers.applyImage = function (sourceDocumentId, sourceLayerId, sourceChannel, invert, blendMode, opacity, preserveTransparency)
    {
        if (!Lifter.documents)
            throw new Error('Lifter.layers.applyImage requires the Lifter.documents library.');

        // Validate parameters
        // Source document
        if (typeof sourceDocumentId !== 'number')
            sourceDocumentId = Lifter.documents.getActiveDocumentId();

        // Source layer
        if (sourceLayerId !== 'merged' && typeof sourceLayerId !== 'number')
            sourceLayerId = layers.stack.getActiveLayerId();

        // Source channel
        if (sourceChannel)
        {
            if (!Enumeration.contains(ApplyImageChannel, sourceChannel))
                throw new TypeError('Invalid sourceChannel:' + sourceChannel);
        }
        else
        {
            sourceChannel = ApplyImageChannel.RGB;
        }

        // Invert
        typeof invert === 'boolean' || (invert = false);

        // Blend mode
        (blendMode && blendMode.valueOf) || (blendMode = LifterBlendMode.NORMAL);
        blendMode = _ensureLifterBlendMode(blendMode);

        // Opacity and transparency
        typeof opacity === 'number' || (opacity = 100.0);
        typeof preserveTransparency === 'boolean' || (preserveTransparency = true);

        // Apply image
        // Source
        var ref = new ActionReference();
        ref.putEnumerated(c2id('Chnl'), c2id('Chnl'), sourceChannel.valueOf());

        if (sourceLayerId === 'merged')
        {
            ref.putEnumerated(c2id('Lyr '), c2id('Ordn'), c2id('Mrgd'));
        }
        else
        {
            // Check source document for background layer
            var activeDocId = Lifter.documents.getActiveDocumentId();
            Lifter.documents.makeActive(sourceDocId);

            if (layers.prop('isBackgroundLayer'))
                ref.putProperty(c2id('Lyr '), c2id('Bckg'));
            else
                ref.putIdentifier(c2id('Lyr '), sourceLayerId);

            Lifter.documents.makeActive(activeDocId);
        }

        ref.putIdentifier(c2id('Dcmn'), sourceDocumentId);

        var desc2 = new ActionDescriptor();
        desc2.putReference(c2id('T   '), ref);
        desc2.putEnumerated(c2id('Clcl'), c2id('Clcn'), blendMode.valueOf());
        desc2.putUnitDouble(c2id('Opct'), c2id('#Prc'), opacity);
        desc2.putBoolean(c2id('PrsT'), preserveTransparency);
        desc2.putBoolean(c2id('Invr'), invert);

        var desc = new ActionDescriptor();
        desc.putObject(c2id('With'), c2id('Clcl'), desc2);

        executeAction(c2id('AppI'), desc, _dialogModesNo);
        return layers;
    };

    /**
     * Inverts the specified layer.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return Chained reference to layer utilities.
     */
    layers.invert = function (layerId)
    {
        if (typeof layerId === 'number')
            layers.stack.makeActive(layerId);

        executeAction(c2id('Invr'), undefined, _dialogModesNo);
        return layers;
    };

    /**
     * Applies the specified layer into another one.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null.
     * @param {SolidColor} [fillColor] Fill color, defaults to background color if null.
     * @param {BlendMode, LifterBlendMode} [blendMode=LifterBlendMode.NORMAL] Blend mode.
     * @param {Number} [opacity=100] Blend opacity.
     * @return Chained reference to layer utilities.
     */
    layers.fill = function (layerId, fillColor, blendMode, opacity)
    {
        if (typeof layerId === 'number')
            layers.stack.makeActive(layerId);

        // Color
        (fillColor) || (fillColor = app.backgroundColor);

        if (!(fillColor instanceof SolidColor))
            throw new Error('Fill color must be a valid SolidColor: ' + fillColor);

        // Blend mode
        (blendMode && blendMode.valueOf) || (blendMode = LifterBlendMode.NORMAL);
        blendMode = _ensureLifterBlendMode(blendMode);

        // Opacity
        typeof opacity === 'number' || (opacity = 100.0);

        // Apply fill
        var desc = new ActionDescriptor();
        desc.putEnumerated(c2id('Usng'), c2id('FlCn'), c2id('Clr '));

        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(c2id('H   '), c2id('#Ang'), fillColor.hsb.hue);
        desc2.putDouble(c2id('Strt'), fillColor.hsb.saturation);
        desc2.putDouble(c2id('Brgh'), fillColor.hsb.brightness);
        desc.putObject(c2id('Clr '), c2id('HSBC'), desc2);

        desc.putUnitDouble(c2id('Opct'), c2id('#Prc'), opacity);
        desc.putEnumerated(c2id('Md  '), c2id('BlnM'), blendMode.valueOf());

        executeAction(c2id('Fl  '), desc, _dialogModesNo);

        return layers;
    };

    /**
     * Iterates over all layers contained in the current document, executing the specified callback on each element.
     * Please note: this iterates over ALL layers, including '</Layer group>', etc. Adding or removing layers
     * while iterating is not supported.
     * @param {Function} callback       Callback function. It is bound to context and invoked with two arguments (itemIndex, layerId).
     *                                  If callback returns true, iteration is stopped.
     * @param {Object} [context=null]   Callback function context.
     * @param {Boolean} [reverse=false] Whether to iterate from the end of the layer collection.
     * @return Chained reference to layer utilities.
     */
    layers.forEach = function (callback, context, reverse)
    {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a valid function.');

        var n, i;
        _cache.refresh();
        // // Cleanup cache
        // delete _cache['hasBackground'];
        // delete _cache['layerCount'];
        // // Cache some information to speed up the operation
        // _cache['hasBackground'] = layers.hasBackground();
        // _cache['layerCount'] = layers.count();

        if (reverse)
        {
            i = _cache['layerCount'] + 1;
            n = 0;

            while (--i > n)
            {
                if (callback.call(context, i, layers.getLayerIdByItemIndex(i)))
                    break;
            }
        }
        else
        {
            n = _cache['layerCount'] + 1;
            i = 0;

            while (++i < n)
            {
                if (callback.call(context, i, layers.getLayerIdByItemIndex(i)))
                    break;
            }
        }

        // refresh in case layers were moved around
        _cache.refresh();
        // // Cleanup cache
        // delete _cache['hasBackground'];
        // delete _cache['layerCount'];

        // Chaining
        return layers;
    };

    /**
     * Iterates over active layers, executing the specified callback on each element.
     * Please note: Adding or removing layers
     * while iterating is not supported.
     * @param {Function} callback       Callback function. It is bound to context and invoked with two arguments (itemIndex, layerId).
     *                                  If callback returns true, iteration is stopped.
     * @param {Object} [context=null]   Callback function context.
     * @param {Boolean} [reverse=false] Whether to iterate from the end of the layer collection.
     * @return Chained reference to layer utilities.
     */
    layers.forEachSelected = layers.forEachActive = function (callback, context, reverse)
    {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a valid function.');

        var n, i;
        var activeLayerIds = layers.stack.getActiveLayerIds();
        if (reverse)
        {
            i = activeLayerIds.length;
            n = 0;

            while (--i >= n)
            {
                if (callback.call(context, i, activeLayerIds[i]))
                    break;
            }
        }
        else
        {
            n = activeLayerIds.length;
            i = 0;

            while (i < n)
            {
                if (callback.call(context, i, activeLayerIds[i]))
                    break;
                i++;
            }
        }

        // Chaining
        return layers;
    };

    /**
     * Iterates over list of layer ids, executing the specified callback on each element.
     * Please note: Adding or removing layers
     * while iterating is not supported.
     * @param {Number[]} layerIds          Array of layer ids to iterate through.
     * @param {Function} callback       Callback function. It is bound to context and invoked with two arguments (itemIndex, layerId).
     *                                  If callback returns true, iteration is stopped.
     * @param {Object} [context=null]   Callback function context.
     * @param {Boolean} [reverse=false] Whether to iterate from the end of the layer collection.
     * @return Chained reference to layer utilities.
     */
    layers.forEachId = function (layerIds, callback, context, reverse)
    {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a valid function.');

        var n, i;
        if (reverse)
        {
            i = layerIds.length;
            n = 0;

            while (--i >= n)
            {
                if (callback.call(context, i, layerIds[i]))
                    break;
            }
        }
        else
        {
            n = layerIds.length;
            i = 0;

            while (i < n)
            {
                if (callback.call(context, i, layerIds[i]))
                    break;
                i++;
            }
        }

        // Chaining
        return layers;
    };

    /**
     * Gets or sets the property with the given name on the specified layer. If invoked with no arguments
     * gets a wrapped ActionDescriptor containing all the properties of the specified layer.
     * @param {Number} [layerId] Layer identifier, defaults to currently active document if null or not specified.
     * @param {String} [name] Property name.
     * @param {Any} [value] Property value.
     * @return {Any, ActionDescriptor, Object}  Property value when getting a property, a wrapped ActionDescriptor when invoked with no arguments
     *                                          or a chained reference to document utilities when setting a property.
     */
    layers.prop = function ()
    {
        // Parse args
        var layerId, name, value, ref, desc;

        if (typeof arguments[0] === 'number' ||
            (!arguments[0] && arguments.length > 1))
        {
            layerId = arguments[0];
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
            // Get wrapped action descriptor
            ref = new ActionReference();
            _getLayerIdRef(layerId, ref);
            desc = executeActionGet(ref);
            return _getWrappedActionDescriptor(desc, layers.supportedProperties, layerId || desc.getInteger(c2id('LyrI')));
        }
        else
        {
            // If unsupported, try generic getter
            if (!layers.supportedProperties.hasOwnProperty(name))
            {
                if (typeof value === 'undefined')
                {
                    try{
                        return _getDescPropByName(layers.desc(layerId), name);
                    } catch (e) {
                        log.warn(['Invalid layer property: "', name, '".'].join(''));
                        return;
                    }
                } else {
                    throw new Error(['Setting property "', name, '" is not supported by Lifter.'].join(''));
                }
            }

            var prop = layers.supportedProperties[name];

            if (typeof value === 'undefined')
            {
                // Get
                // Get ActionDescriptor for specified layer
                ref = new ActionReference();

                if (prop.typeId)
                    ref.putProperty(c2id('Prpr'), prop.typeId);

                _getLayerIdRef(layerId, ref);

                try {
                    desc = executeActionGet(ref);
                } catch (e) {
                    throw new Error('Unable to find '+typeIDToStringID(prop.typeId)+' on "' + layers.prop(layerId, 'name') + '": layers do not have that property or it is un-gettable.');
                }

                if (prop.get)
                {
                    // Use custom getter for this property
                    return prop.get.call(null, prop, layerId, desc);
                }
                else
                {
                    // Call getter for specific type
                    return _getDescriptorProperty(desc, prop.typeId, prop.type);
                }
            }
            else
            {
                // Set
                if (!prop.set)
                    throw new Error(['Property "', name, '" is read-only.'].join(''));

                if (layers.prop(layerId, 'type') === LayerType.SETEND)
                    throw new Error(['Setting properties on a layer of type ', LayerType.SETEND.toString(), ' is not supported.'].join(''));

                // Set value
                prop.set.call(null, prop, layerId, value);

                // Chaining
                return layers;
            }
        }
    };

    /**
     * Finds all the layers with names matching the string or RegExp.
     * @param {String, RegExp} Exact string or regular expression to search in name.
     * @return {Number[]} An array containing seach results.
     */
     layers.findAllByName = function ( search )
     {
         var regex = (typeof search === "string")?  new RegExp('^'+search+'$'):  new RegExp(search);

         var matchIDs = [];
         layers.forEach(function(itemIndex, layerId){
             if( layers.prop(layerId,"name").search( regex ) !== -1)
                 matchIDs.push(layerId);
         } );
         return matchIDs;
     };

    /**
     * Finds all the layers that match the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Array} An array containing find results.
     */
    layers.findAll = _find.bind(null, layers, 0);

    /**
     * Finds the first layer that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    layers.findFirst = _find.bind(null, layers, 1);

    /**
     * Finds the last layer that matches the specified patterns.
     * @param {Object, Function} patterns Either an hash object specifying search criteria or a custom search function.
     * @param {Object} [context] Context applied to search function.
     * @return {Object} Matching object, or null if no match was found.
     */
    layers.findLast = _find.bind(null, layers, 2);

    /**
     * Gets an id list of all parents of the active or specified layer (or topmost layer of active layers).
     * @param {Number} [layerId=Active layer] Layer to get parents from
     * @param {Boolean} [doAll] If true, returns entire parent heirarchy otherwise immediate parent only.
     * @return {Number[]} LayerIds of the all layer's parent groups in ordered list.
     */
    layers.getParentIds = function (inLayerId, doAll)
    {
        var n;
        var i;
        var layerId;
        var parentIds = [];
        var depth = 1;//if < 1, we are deeper in nested groups

        //allow for getParentIds(true);
        if (typeof inLayerId === 'boolean') { doAll = inLayerId; }
        if (typeof inLayerId !== 'number') { inLayerId = layers.prop('layerId'); }

        _cache.refresh();
        n = _cache['layerCount'] + 1;
        i = layers.prop(inLayerId, 'itemIndex');

        while (++i < n)
        {
            layerId = layers.getLayerIdByItemIndex(i);
            if ( layers.prop(layerId, "type") == LayerType.SETSTART ) {
                if(depth > 0) {
                    parentIds.push(layerId);
                    if(doAll) {
                        depth = 0;
                    } else {
                        break;
                    }
                }
                depth ++;
            } else if ( layers.prop(layerId, "type") == LayerType.SETEND ) {
                depth --;
            }
        }

        return parentIds;
    };

    /**
     * Gets an id list of all valid children of the active or specified layer set.
     * @param {(Number|null)} [layerId=Active layer] Layer identifier
     * @param {Boolean} [doSubsets] get ids from subsets (subfolders) can be passed as only arg to use active layer.
     * @return {Number[]} LayerId of the all layer set's child ids in ordered list.
     */
    layers.getChildIds = function (layerSetId, doAll)
    {
        var i;
        var n;
        var layerId;
        var depth = 1;// if >1 we are deeper in nested groups
        var childIDs = [];

        //allow for getChildIds(true);
        if (typeof layerSetId === 'boolean') { doAll = layerSetId; }
        if (typeof layerSetId !== 'number') { layerSetId = layers.prop('layerId'); }
        if(!layers.isGroup(layerSetId)) {
            throw new TypeError ('getChildIds() - ' + layers.prop(layerSetId, 'name') + ' is not a layer set.');
        }

        _cache.refresh();
        i = layers.prop(layerSetId, 'itemIndex');
        n = 0;

        // run in reverse so we can go "top to bottom"
        while (--i > n && depth > 0)
        {
            layerId = layers.getLayerIdByItemIndex(i);
            if ( layers.prop(layerId, "type") == LayerType.SETSTART ) {
                if(depth == 1 || doAll) { childIDs.push(layerId); }
                depth ++;
            }
            else if ( layers.prop(layerId, "type") == LayerType.SETEND ) {
                depth --;
                if(depth < 1) { break; }// we are at bottom of our target layer group
            }
            else {
                // log.log(i + ", " +layers.prop(layerId, "name"));
                if(depth == 1 || doAll) { childIDs.push(layerId); }
            }
        }

        return childIDs;
    };
    
    /**
     * Gets an id list of layers whos clipping mask is affected by the active or specified layer.
     * @param {Number} [layerId=Active layer] Layer or group to start from.
     * @param {Boolean} [doAll] If true, searches parent groups for clipped layers.
     * @return {Number[]} LayerIds of the all 'clipped' layers affected.
     */
     layers.getClippedIds = function (inLayerId, doAll)
     {
         var n;
         var i;
         var layerId;
         var layerType;
         var clippedIds = [];
         var depth = 1;//if < 1, we are deeper in nested groups
 
         //allow for getClippedIds(true);
         if (typeof inLayerId === 'boolean') { doAll = inLayerId; }
         if (typeof inLayerId !== 'number') { inLayerId = layers.prop('layerId'); }
 
         _cache.refresh();
         n = _cache['layerCount'] + 1;
         i = layers.prop(inLayerId, 'itemIndex');
 
         while (++i < n)
         {
             layerId = layers.getLayerIdByItemIndex(i);
             layerType = layers.prop(layerId, "type");
             // if group start, check depth, reset depth if doAll
             if ( layerType == LayerType.SETSTART ) {
                 if(depth > 0) {
                     if(doAll) {
                         depth = 0;
                     } else {
                         break;
                     }
                 }
                 depth ++;
             } else if ( layerType == LayerType.SETEND ) {
                 depth --;// setend indicates 'bottom' of a sibling group
             } else if (depth > 0) {
                 // ignore if not in same group or parent group
                 // escape if not 'clipped' or doAll
                 if(layers.prop(layerId, "group")) {
                    clippedIds.push(layerId);
                 } else if (!doAll) {
                     break;
                 }
             }
         }
 
         return clippedIds;
     };

    /**
     * Gets the identifier of all layers.
     * @return {Number[]} LayerIds of all layers.
     */
    layers.getAllLayerIds = function ()
    {
        var allIDs = [];
        layers.forEach(function(itemIndex, layerId){allIDs.push(layerId);} );
        return allIDs;
    };

    /**
     * Gets the identifier of all active layers.
     * @return {Number[]} LayerIds of the currently active layers.
     */
    layers.getAllActiveLayerIds = function ()
    {
        var activeLayerIds = [];
        // Filter selected layers
        var docRef = new ActionReference();
        docRef.putEnumerated( c2id("Dcmn"), c2id("Ordn"), c2id("Trgt") );
        var docDesc = executeActionGet(docRef);

        // Get target layer ids
        if ( docDesc.hasKey(s2id('targetLayersIDs'))) {
            targetLayersIDsDesc = docDesc.getList( s2id('targetLayersIDs'));

            for (var ii = 0; ii < targetLayersIDsDesc.count; ii++) {
                activeLayerIds.push(Number(targetLayersIDsDesc.getReference( ii ).getIdentifier()));
            }
        }

        return activeLayerIds;
    };

    // Stack
    /**
     * Provides methods to navigate across the layers stack.
     */
    layers.stack = {};
    layers.stack.getActiveLayerIds = layers.getAllActiveLayerIds;// alias
    _stackCache = {};// default for active is -1, default general is 0

    /**
     * Saves a list of layer ids to a cached stack list.
     * @method
     * @param  {Number} cacheId  cacheId to save stack to
     * @param  {Number[]}  layerIds list of layer ids to save
     * @return {Object}          this layers object for chaining
     */
    layers.stack.saveIdList = function (cacheId, layerIds)
    {
        // default and sanitize
        if (typeof cacheId !== "number"){ cacheId = 0; }
        if (typeof layerIds !== "object"){ layerIds = layers.getAllLayerIds(); }
        _stackCache[cacheId] = [].concat(layerIds);
        return layers;
    };

    /**
     * Saves ids of active layers to a cached stack list.
     * @method
     * @param  {Number} cacheId cacheId to save stack to
     * @return {Object}         this layers object for chaining
     */
    layers.stack.saveActiveIds = function (cacheId)
    {
        // default and sanitize
        if (typeof cacheId !== "number"){ cacheId = 0; }
        layers.stack.saveIdList( cacheId, layers.getAllActiveLayerIds() );
        return layers;
    };

    /**
     * Retrieves layer ids from a cached stack list.
     * @method
     * @param  {Number} cacheId cacheId to retrieve
     * @return {Array}          list of layers ids from cached stack
     */
    layers.stack.getIdList = function (cacheId)
    {
        // default and sanitize
        if (typeof cacheId !== "number"){ cacheId = 0; }
        return _stackCache[cacheId];
    };

    /**
     * Activates and deletes a cached stack list.
     * @method
     * @param  {Number} cacheId cacheId to activate and remove
     * @return {Object}         this layers object for chaining
     */
    layers.stack.restoreIdList = function (cacheId)
    {
        // default and sanitize
        if (typeof cacheId !== "number"){ cacheId = 0; }
        layers.stack.makeActive( layers.stack.getIdList( cacheId ) );
        delete _stackCache[cacheId];
        return layers;
    };

    /**
     * Gets the identifier of the currently active layer.
     * @return {Number} LayerId of the currently active layer.
     */
    layers.stack.getActiveLayerId = function ()
    {
        return layers.prop('layerId');
    };

    /**
     * Gets the identifier of the front layer.
     * @return {Number} LayerId of the front layer.
     */
    layers.stack.getFrontLayerId = _getStackId.bind(null, c2id('Frnt'));

    /**
     * Gets the identifier of the bottom/background layer.
     * @return {Number} LayerId of the bottom layer.
     */
    layers.stack.getBottomLayerId = _getStackId.bind(null, c2id('Back'));

    /**
     * Gets the identifier of the layer following the currently active one.
     * @return {Number} LayerId of the next layer.
     */
    layers.stack.getNextLayerId = _getStackId.bind(null, c2id('Frwr'));

    /**
     * Gets the identifier of the layer preceding the currently active one.
     * @return {Number} LayerId of the previous layer.
     */
    layers.stack.getPreviousLayerId = _getStackId.bind(null, c2id('Bckw'));

    /**
     * Gets the id of the next sibling layer of the currently active one in the,
     * heirarchy, skipping children if active layer is a group.
     * @return {Number} LayerId of the next sibling layer or -1 if bottom of group or stack
     */
    layers.stack.getNextSiblingLayerId = function stackGetNextSiblingLayerId(layerId) {
        var i = layers.prop(layerId, 'itemIndex');
        var newIndex = i - 1;
        var lastIndex = (layers.hasBackground())? 0 : 1;
        var depth = 1;// if >1 we are deeper in nested groups
        var targetId;

        // log.debug('getNextSiblingLayerId() of name: ' + layers.prop(layerId,'name'));

        _cache.refresh();

        //if next is group, find bottom of group
        if(layers.isGroup(layerId)) {
            // run in reverse so we can go "top to bottom"
            while (--i > 0 && depth > 0)
            {
                targetId = layers.getLayerIdByItemIndex(i);
                // log.debug('    depth: ' + depth + ', i: ' + i + ", " +layers.prop(targetId, "name"));
                if ( layers.prop(targetId, "type") == LayerType.SETSTART ) {
                    depth ++;
                }
                else if ( layers.prop(targetId, "type") == LayerType.SETEND ) {
                    depth --;
                    if(depth < 1) {
                        // we are at bottom of our target layer group
                        // jump past the SETEND layer for the group
                        newIndex = i - 1;
                        break;
                    }
                }
            }
        }

        // log.debug('  newIndex: ' + String(newIndex+1) + '/' + layers.count());
        //if not bottom of stack
        if(newIndex >= lastIndex) {
            targetId = layers.getLayerIdByItemIndex(newIndex);
            // log.log('  Next sibling layer: '+layers.prop(targetId,'name'));
            //if not bottom of group
            if(layers.prop(targetId, 'type') !== LayerType.SETEND) {
                return targetId;
            }
        }

        return -1;
    };

    /**
     * Gets the id of the previous sibling layer of the currently active one in the,
     * heirarchy, skipping children if target layer is a group.
     * @return {Number} LayerId of the previous sibling layer or -1 if top of group or stack
     */
    layers.stack.getPreviousSiblingLayerId = function stackGetPreviousSiblingLayerId(layerId) {
        // NOTE: return id or -1 for easier debug bc 'undefined' or null var passed into
        // layers.prop(undefinedVar) returns an ActionDescriptor instead of error
        var newIndex = layers.prop(layerId, 'itemIndex') + 1;
        var targetId;

        //abort if top of layer stack
        _cache.refresh();
        // log.debug('getPreviousSiblingLayerId - name: ' + layers.prop(layerId,'name') + ', index: ' + String(newIndex-1) + '/' + layers.count());
        if(newIndex > layers.count()) { return -1; }

        targetId = layers.getLayerIdByItemIndex(newIndex);

        //abort if top of group
        if(layers.isGroup(targetId)) { return -1; }
        //if prev is group, get parent of last child of that group
        else if(layers.prop(targetId, 'type') === LayerType.SETEND) {
            // log.debug(layers.prop(layerId,'name') + ' Prev is group...');
            newIndex ++;
            targetId = layers.getLayerIdByItemIndex(newIndex);
            // log.debug('Target inside: '+layers.prop(targetId,'name'));
            //edge case filter, don't get parent if it is empty group
            if(layers.isGroup(targetId)) {
                targetId = layers.getParentIds(targetId)[0];
                // log.debug('Target parent: '+layers.prop(targetId,'name'));
            }
        }

        return targetId;
    };

    /**
     * Sets the currently active layer to the one identified by the passed LayerId.
     * @param {(Number|Number[])} layerIdList Layer identifier or array of ids.
     * @param {Boolean} [makeVisible] Whether to make the layer RGB channels visible.
     * @param {Boolean} [add] Whether to add or replace active layer selection.
     * @return Chained reference to layer utilities.
     */
    layers.stack.makeActive = function (layerIdList, makeVisible, add)
    {
        var layerId;

        // clear active if not adding
        if ( add !== true )
            layers.stack.makeNoneActive();

        //support single layer selection
        layerIdList = [].concat(layerIdList);

        for (var i=0; i<layerIdList.length; i++) {
            layerId = layerIdList[i];
            if (typeof layerId !== 'number' || layerId < 1)
                throw new Error('Invalid layerId: ' + layerId);

            makeVisible === true || (makeVisible = false);

            var ref = new ActionReference();
            ref.putIdentifier(c2id('Lyr '), layerId);
            var desc = new ActionDescriptor();
            desc.putReference(c2id('null'), ref);
            desc.putBoolean(c2id('MkVs'), makeVisible);
            desc.putEnumerated( s2id( "selectionModifier" ), s2id( "selectionModifierType" ), s2id( "addToSelection" ) );

            executeAction(c2id('slct'), desc, _dialogModesNo);
        }
        return layers;
    };

    /**
     * Sets the currently active layer to the front layer.
     * @return Chained reference to layer utilities.
     */
    layers.stack.makeAllActive = function() {
        layers.stack.makeActive(layers.getAllLayerIds());
    };

    /**
     * Sets the currently active layer to the front layer.
     * @return Chained reference to layer utilities.
     */
    layers.stack.makeFrontActive = _traverseStack.bind(null, c2id('Frnt'));

    /**
     * Sets the currently active layer to the bottom/background layer.
     * @return Chained reference to layer utilities.
     */
    layers.stack.makeBottomActive = _traverseStack.bind(null, c2id('Back'));

    /**
     * Sets the currently active layer to the one following the currently active layer.
     * @return Chained reference to layer utilities.
     */
    layers.stack.makeNextActive = _traverseStack.bind(null, c2id('Frwr'));

    /**
     * Sets the currently active layer to the one preceding the currently active layer.
     * @return Chained reference to layer utilities.
     */
    layers.stack.makePreviousActive = _traverseStack.bind(null, c2id('Bckw'));

    /**
    * Clears active layers so none are active.
    * @return Chained reference to layer utilities.
    */
    layers.stack.makeNoneActive = function ()
    {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();

        ref.putEnumerated( c2id( "Lyr " ), c2id( 'Ordn' ), s2id( "targetEnum" ) );
        desc.putReference( c2id( 'null' ), ref );
        executeAction( s2id( 'selectNoLayers' ), desc, _dialogModesNo );

        return layers;
    };


    // Groups
    /**
     * Provides methods for manipulating layer groups (sets).
     */
    layers.groups = {};

    /**
     * Test if layer is a group
     * @method
     * @param  {Number} [layerId=active layer] Id of the layer to test
     * @return {Boolean} Layer is a group or not.
     */
    layers.groups.isGroup = function(layerId) {
        return layers.prop(layerId, 'type') == LayerType.SETSTART;
    };
    layers.isGroup = layers.groups.isGroup;// convenience alias


    /**
     * Get the index of the last item in a layer group.
     * @method
     * @param  {(Number|null)} [groupId=active layer] Id of the target group layer (defaults to selected)
     * @return Chained reference to layer utilities.
     */
    layers.groups.getEndIndex = function groupsGetBottomIndex (groupId) {
        var i;
        var n;
        var layerId;
        var depth = 1;// if >1 we are deeper in nested groups

        if (typeof groupId !== 'number') { groupId = layers.prop('layerId'); }

        // sanity check
        if(layers.isGroup(groupId) === false) {
            throw new Error('"'+layers.prop(groupId,'name')+'" is not a layer set (group).');
        }

        _cache.refresh();
        i = layers.prop(groupId, 'itemIndex');
        n = 0;

        // run in reverse so we can go "top to bottom"
        while (--i > n && depth > 0)
        {
            layerId = layers.getLayerIdByItemIndex(i);
            // add depth for new groups, subtract when we hit end of groups
            if( layers.prop(layerId, "type") == LayerType.SETSTART ) {
                depth ++;
            }
            else if( layers.prop(layerId, "type") == LayerType.SETEND ) {
                depth --;
                // are we at bottom of our target layer group?
                if(depth < 1) { break; }
            }
        }
        var name = layers.prop(layerId,'name');
        var isGroup = layers.isGroup(layerId);
        var prevId = layers.getLayerIdByItemIndex(i+1);
        var prevName = layers.prop(prevId,'name');
        // var isGroup = layers.isGroup(layerId);
        return i;
    };


    /**
     * Make a new group with option to add layers from selected or Id array
     * @method
     * @param  {String} name      Name for new group
     * @param  {Boolean} addLayers Add layers to group or not
     * @param  {Number,Array} layerIds  layer Id or Array of layer Ids
     * @return {Number} layer Id of new group.
     */
    layers.groups.make = function(name, addLayers, layerIds, color) {
        var idLyr = s2id( "layer" );
        var idOrdn = c2id( "Ordn" );
        var idTrgt = s2id( "targetEnum" );
        var idnull = c2id( "null" );
        var refLyr;

        var descMake = new ActionDescriptor();
        var refClass = new ActionReference();
        refClass.putClass( s2id( "layerSection" ) );
        descMake.putReference( idnull, refClass );

        if (typeof layerIds === "number"){
            layerIds = [layerIds];
        }

        if(addLayers)
        {
            if(Array.isArray(layerIds))
            {
                layers.stack.makeActive(layerIds);
            }
            refLyr = new ActionReference();
            refLyr.putEnumerated( idLyr, idOrdn, idTrgt );
            descMake.putReference( c2id( "From" ), refLyr );
        }

        executeAction( s2id( "make" ), descMake, DialogModes.NO );

        if(name !== undefined && name.length)
        {
           var descSet = new ActionDescriptor();
           refLyr = new ActionReference();
           refLyr.putEnumerated( idLyr, idOrdn, idTrgt );
           descSet.putReference( idnull, refLyr );
           var descName = new ActionDescriptor();
           descName.putString( s2id( "name" ), name );
           descSet.putObject( s2id( "to" ), idLyr, descName );
           executeAction( s2id( "set" ), descSet, DialogModes.NO );
        }
        _cache.refresh();
        return layers.prop('layerId');
    };

    /**
     * Merge (flatten) a layer group
     * @method
     * @param  {Number} [layerId=active layer] Id of the layer to flatten
     * @return Chained reference to layer utilities.
     */
    layers.groups.merge = function(layerId) {
        layers.stack.makeActive(layerId);
        executeAction(c2id("Mrg2"), undefined, DialogModes.NO);
        _cache.refresh();
        return layers;
    };


    /**
     * Move a number of layers into the top of a group.
     * @method
     * @param  {(Number|null)} [groupId=active layer] Id of the target group layer (defaults to selected)
     * @param  {Number[]} [layerIds=Active layers] Array of layer Ids to move
     * @return Chained reference to layer utilities.
     */
    layers.groups.prepend = function groupsPrepend(groupId, layerIds, ignoreHeirarchy) {
        // var newIndex = layers.prop(groupId, 'itemIndex');
        // sanity check
        if(layers.isGroup(groupId) === false) {
            throw new Error('"'+layers.prop(groupId,'name')+'" is not a layer set (group).');
        }

        layers.stack.makeActive(groupId);
        layers.move(layerIds, groupId, ElementPlacement.PLACEATBEGINNING, ignoreHeirarchy);
        //offset down one to be in top of group
        // layers.move(layerIds, newIndex, -1);
        return layers;
    };


    /**
     * Move a number of layers into the bottom of a group.
     * @method
     * @param  {(Number|null)} [groupId=active layer] Id of the target group layer (defaults to selected)
     * @param  {Number[]} [layerIds=Active layers] Array of layer Ids to move
     * @return Chained reference to layer utilities.
     */
    layers.groups.append = function groupsAppend(groupId, layerIds, ignoreHeirarchy) {
        // var groupDOM = layers.toDOM(groupId);
        // var layerDOM;
        // var i;
        // var iCount = layerIds.length;
        // // var newIndex;
        // // sanity check
        if(layers.isGroup(groupId) === false) {
            throw new Error('"'+layers.prop(groupId,'name')+'" is not a layer set (group).');
        }

        //
        // for (i = 0; i < iCount; i++) {
        //     layerDOM = layers.toDOM(layerIds[i]);
        //     groupDOM.move(layerDOM, ElementPlacement.PLACEATEND);
        // }

        layers.stack.makeActive(groupId);
        layers.move(layerIds, groupId, ElementPlacement.PLACEATEND, ignoreHeirarchy);
        // newIndex = layers.groups.getEndIndex(groupId);
        // layers.move(layerIds, newIndex);
        return layers;
    };


    /**
     * Move a number of layers before (above) the target layer in the stack.
     * @method
     * @param  {Number[]} layerIds Array of layer Ids to move
     * @param  {(Number|null)} [targetId=active layer] Id of the target layer (defaults to selected)
     * @return Chained reference to layer utilities.
     */
    layers.moveBefore = function moveBefore(layerIds, targetId, ignoreHeirarchy) {
        layers.stack.makeActive(targetId);
        layers.move(layerIds, targetId, ElementPlacement.PLACEBEFORE, ignoreHeirarchy);
        // var newIndex = layers.prop(targetId, 'itemIndex');
        // layers.move(layerIds, newIndex);
        return layers;
    };


    /**
     * Move a number of layers to after (below) the target layer in the stack.
     * @method
     * @param  {Number[]} layerIds Array of layer Ids to move
     * @param  {(Number|null)} [targetId=active layer] Id of the target layer (defaults to selected)
     * @return Chained reference to layer utilities.
     */
    layers.moveAfter = function moveAfter(layerIds, targetId, ignoreHeirarchy) {
        // var newIndex = layers.prop(layers.stack.getNextSiblingLayerId(targetId), 'itemIndex');
        layers.stack.makeActive(targetId);
        layers.move(layerIds, targetId, ElementPlacement.PLACEAFTER, ignoreHeirarchy);
        // layers.move(layerIds, newIndex);
        return layers;
    };


    /**
     * Move any number of layers to the target index in the stack, with optional
     * placement and index offset.
     * @method
     * @param  {Number[]} layerIds Array of layer Ids to move
     * @param  {(Number|null)} [targetId=active layer] Id of the target layer
     * @param  {ElementPlacement} [position] position relative to target index
     * @param  {Number} [indexOffset] Id of the target layer (defaults to selected)
     *                                       (ex. ElementPlacement.PLACEATEND)
     * @param  {Boolean} [ignoreHeirarchy] if true, will flatten heirarcy of layers being moved
     * @return Chained reference to layer utilities.
     */
    layers.move = function move(layerIds, targetId, placement, indexOffset, ignoreHeirarchy) {
        // use id so we can dynamically adjust index for multiple moves
        var targetIndex = layers.prop(targetId,'itemIndex');
        var newIndex;
        var moveIds;
        var i;
        var iCount;
        var layerId;
        var layerIndex;
        var children;
        var lastChildId;
        var lastChildIndex;
        var groupEndIndex;

        var targetDOM = layers.toDOM(targetId);
        var layerDOM;
        var tmpLayerDOM;
        var tmpLayerIndex;

        function _idFilter(id) { return !children.includes(id); }

        // default args
        indexOffset = (typeof indexOffset === 'number')? indexOffset : 0;
        placement = (isDef(placement))? placement : ElementPlacement.PLACEBEFORE;

        if(typeof targetId !== 'number') throw new Error('No invalid target index ' + targetIndex + ' .');

        // happy mutation helpers
        if (typeof layerIds === 'number') {
            layerIds = [layerIds];
        } else if (!L.isDef(layerIds)) {
            layerIds = layers.stack.getActiveLayerIds();
        }

        //1st pass filter out children and throw errors
        //avoids nested heirarchy getting flattened
        iCount = layerIds.length;
        moveIds = layerIds;
        newIndex = targetIndex + indexOffset;
        for (i = 0; i < iCount; i++) {
            layerId = layerIds[i];
            layerIndex = layers.prop(layerId, 'itemIndex');

            // we can skip filtered items!
            if(moveIds.includes(layerId) === false) {continue;}

            if (layers.isGroup(layerId)) {
                // can't put a group inside itself! native move() explodes
                groupEndIndex = layers.groups.getEndIndex(layerId);
                if (newIndex < layerIndex && newIndex >= groupEndIndex ) {
                    throw new Error('"' + layers.prop(layerId,'name') + '" can not be moved inside "' + layers.prop(targetId,'name') + '".');
                }

                //remove children so we don't flatten the heirarchy
                if(ignoreHeirarchy !== true) {
                    children = layers.getChildIds(layerId, true);
                    moveIds = moveIds.filter(_idFilter);
                }
            }
        }

        // 2nd pass do the actual move
        // but wait, it gets crazier
        iCount = moveIds.length;
        for (i = 0; i < iCount; i++) {
            layerId = moveIds[0];

            log.log('Moving ' + layers.prop(layerId,'name'));
            newIndex = layers.prop(targetId,'itemIndex') + indexOffset;

            // NOTE: Moving into layer sets is a headache
            // But moving layersets into others is literally BUGGED in the api.
            // But also manually moving to bottom of a set via itemIndex has
            // broken edgecases such as if there's an empty group as the child
            // of the target group. Nothing just works like it should.

            switch (placement) {
                case ElementPlacement.PLACEAFTER:
                    // if it's a group grab next sibling layer?
                    if(layers.isGroup(targetId)) {
                        // tmpLayerId = layers.stack.getNextSiblingLayerId(targetId);
                        newIndex = layers.groups.getEndIndex(targetId) - 1;
                        // newIndex = layers.prop(tmpLayerId, 'itemIndex');
                    } else {
                        newIndex --;
                    }
                    break;
                case ElementPlacement.PLACEATEND:
                    children = layers.getChildIds(targetId);
                    // extendscript: there's no reliable way to move to the bottom
                    // of a layer set.
                    // me: Hold my beer. Watch this.
                    if(children.length) {
                        layers.stack.makeActive(targetId);

                        // get last child in target group
                        lastChildId = children[children.length-1];
                        // var layerDOM = layers.toDOM(layerId);
                        // // var targetDOM = layers.toDOM(targetId);
                        // var lastChildDom = layers.toDOM(lastChildId);
                        // layerDOM.move(lastChildDom,ElementPlacement.PLACEAFTER);


                        lastChildIndex = layers.prop(lastChildId, 'itemIndex');

                        // add temp layer
                        tmpLayerId = layers.add().prop('layerId');

                        // move tmp layer above last child
                        layers.prop(tmpLayerId,'itemIndex',lastChildIndex);
                        tmpLayerIndex = layers.prop(tmpLayerId, 'itemIndex');

                        // now swap last child position with tmp layer
                        layers.prop(lastChildId, 'itemIndex', tmpLayerIndex);
                        tmpLayerIndex = layers.prop(tmpLayerId,'itemIndex');

                        // should now have very last actual index...
                        newIndex =  tmpLayerIndex - 1;

                        // Thanks! I hate it.
                        layers.remove(tmpLayerId);
                        
                    } else {
                        newIndex --;
                    }
                    break;
                case ElementPlacement.INSIDE:
                case ElementPlacement.PLACEATBEGINNING:
                    newIndex --;
                    break;
                case ElementPlacement.PLACEBEFORE:
                default:
                    //move to same index as target
                    break;
            }

            try {
                layers.prop(layerId, 'itemIndex', newIndex);
            } catch (e) {
                throw new Error('There was a problem moving "' + layers.prop(layerId,'name') + '" from index ' + layers.prop(layerId,'itemIndex') + ' to ' + newIndex);
            }
        }
        return layers;
    };

    // Smart Objects
    /**
     * Provides methods to work with smart objects.
     */
    layers.smartObjects = {};

    /**
     * Make smart object layer active since some SO operations can crash otherwise.
     * @method      _ensureSmartObjectIsActive
     * @param       {Number}  layerId layer id of the smart object
     * @private
     * @return      {Object}  the layers object for chaining
     */
    function _ensureSmartObjectIsActive(layerId) {

        // Make sure target layer is active
        if (typeof layerId === 'number')
            layers.stack.makeActive(layerId);

        if(layers.prop('kind')!==LayerKind.SMARTOBJECT)
            throw new Error('Layer '+layers.prop(null, 'name')+' must be a smart object.');

    }

    /**
     * Check to see if layer is embedded
     * @method isEmbedded
     * @param  {Number}    layerId layer to test
     * @return {Boolean}           if layer is embedded smart object
     */
    layers.smartObjects.isEmbedded = function isEmbedded(layerId) {
        var soDesc = layers.prop(layerId, 'smartObject');
        return (soDesc && soDesc.getBoolean(s2id('linked')) === false);
    };

    /**
     * Check to see if layer is a linked smart object
     * @method isLinked
     * @param  {Number}    layerId layer to test
     * @return {Boolean}           if layer is a linked smart object to a Cloud Library File
     */
    layers.smartObjects.isLinked = function isLinked(layerId) {
        var soDesc = layers.prop(layerId, 'smartObject');
        return  (soDesc && soDesc.hasKey(s2id('link')) && soDesc.getType(s2id('link')) == DescValueType.ALIASTYPE);
    };

    /**
     * Check to see if layer is a CC Library file (not same as Creative Cloud Document?)
     * @method isCloudFile
     * @param  {Number}    layerId layer to test
     * @return {Boolean}           if layer is a linked smart object to a Cloud Library File
     */
    layers.smartObjects.isCloudFile = function isCloudFile(layerId) {
        var soDesc = layers.prop(layerId, 'smartObject');
        var isCloudFile = (soDesc && soDesc.hasKey(s2id('link')) && soDesc.getType(s2id('link')) == DescValueType.OBJECTTYPE);
        return isCloudFile;
    };

    /**
     * Get the cached local file path for the CC Library object
     * @method getCloudFilePath
     * @param  {Number}         layerId layer id of a cloud smart object
     * @return {String}                 file path to linked cached file
     */
    layers.smartObjects.getCloudFilePath = function getCloudFilePath(layerId) {
        var soDesc = layers.prop(layerId, 'smartObject');
        var str;
        var lookUpFile = new File(Folder.userData + "/Adobe/Creative Cloud Libraries/LIBS/librarylookupfile");

        if (soDesc.getBoolean(s2id('linkMissing'))) {
            throw new Error("Link missing in Cloud assest. Bad permissions or deteted library.");
        }

        if (!lookUpFile.exists) {
            throw new Error("Lookup reference file for cloud assests not found.");
        }

        lookUpFile.open('r');
        str = lookUpFile.read();
        lookUpFile.close();

		var assetUrl = soDesc.getObjectValue(stringIDToTypeID('link')).getString(stringIDToTypeID('elementReference'));
        var refKeys = assetUrl.split("/adobe-libraries/")[1].split(";node=");

		var lookUpObj = eval('('+str+')');
		var pathToSo = lookUpObj.libraries[refKeys[0]].elements[refKeys[1]].reps[0].path;

		if(!pathToSo) {
            throw new Error("Cached cloud file not found in " + pathToSo);
        }

		return pathToSo;
	};

    /** TODO: coverage for these guys...if possible

        PSString._add("placedLayerConvertToEmbedded");//DONE
        PSString._add("placedLayerConvertToLinked");//DONE
        PSString._add("placedLayerMakeCopy");//DONE
        PSString._add("placedLayerEmbedAll");
        PSString._add("placedLayerExportContents");
        PSString._add("placedLayerRelinkToFile");//DONE:set smartobject.link property
        PSString._add("placedLayerRelinkToLibraries");
        PSString._add("placedLayerReplaceContents");
        PSString._add("placedLayerReplaceMissing");
        PSString._add("placedLayerRevealInOS");
        PSString._add("placedLayerUpdateAllModified");
        PSString._add("placedLayerUpdateModified");

    */

    /**
     * Converts the specified layer(s) to a smart object and makes it active.
     * @param {(Number|Array|null)} [layerId=Active layer] Layer id(s).
     * @param {Boolean} isLink If true, link instead of embedded smart object.
     * @param {String, File} imageFile Path or File to valid image.
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.make = function (layerId, isLink, imageFile)
    {
        _ensureSmartObjectIsActive(layerId);

        executeAction(s2id('newPlacedLayer'), undefined, _dialogModesNo);

        if(isLink)
            layers.smartObjects.convertToLinked(null, imageFile);

        return layers;
    };

    /**
     * Creates a "New Smart Object via Copy" for embedded or linked smart objects
     * @param {Number} [layerId=Active layer] Layer identifier.
     * @param {String} [newName] New name for layer or file.
     * @param {Boolean} [skipPrompt] If true, and no new name passed in, autocreate new file name.
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.makeCopy = function (layerId, newName, skipPrompt) {
        _ensureSmartObjectIsActive(layerId);

        var srcLinkPath =  layers.prop('smartObject.link');
        if( srcLinkPath ) {

            // get name info
            var srcFile = new File (srcLinkPath);
            var searchIdx = srcFile.name.lastIndexOf('.');

            var srcLinkExtension = srcFile.name.slice(searchIdx, srcFile.name.length);
            var srcLinkNameNumber;
            var newLinkFile;

            if (!newName) {
                newName = srcFile.name.slice(0,searchIdx);
                // try to increment name if numbered
                srcLinkNameNumber = newName.match(/\d*$/)[0];//get numbers off end of basename
                if(srcLinkNameNumber.length) {
                    newName = newName.substr(0,newName.length-srcLinkNameNumber.length);
                    newName += Number( Number(srcLinkNameNumber) + 1 ).pad( srcLinkNameNumber.length );
                } else {
                    newName += '_02';
                }
                // default ask for new file name with autofilled prompt
                if( !skipPrompt ) {
                    newName = prompt("Enter a name for the new file to be linked...", newName, "New File Name");
                    // sanity check and sanitize
                    if( typeof newName !== "string" ){return;}
                }
            }

            // New file name... assemble!
            newName = newName;
            if( newName.search(srcLinkExtension) === -1 ) {
                newName += srcLinkExtension;
            }

            newLinkFile = new File (srcFile.parent +"/"+ newName);
            if( newLinkFile.absoluteURI === srcFile.absoluteURI) {
                alert ("But... that's the same file... "+newName, "Nooooooo!");
                return;
            }

            // Existing file check and overwrite confirmation included in copy()
            newLinkFile = Lifter.system.files.copy(srcFile, newLinkFile)[0];

            // Verify
            if( typeof newLinkFile === "undefined" ){return;}
            if( !newLinkFile.exists ) {
                log.error('Error copying file. No file found at destination: '+newLinkFile.name);
                return;
            }

            // // ask smart object for "more" info
            var soMoreDesc = layers.prop('smartObjectMore');

            var compAppliedID = soMoreDesc.getInteger(s2id('comp'));

            // get SmartObject's inner canvas size
            var sizeKeyDesc = soMoreDesc.getObjectValue(c2id('Sz  '));
            var soWidthInner = sizeKeyDesc.getDouble(s2id('width'));
            var soHeightInner = sizeKeyDesc.getDouble(s2id('height'));

            //Get 'nonAffineTransform' for most accurate scale
            var soVertList = soMoreDesc.getList(s2id('nonAffineTransform'));
            var soX = soVertList.getDouble(0);
            var soY = soVertList.getDouble(1);
            var soWidthPlaced = soVertList.getDouble(2)-soVertList.getDouble(0);
            var soHeightPlaced = soVertList.getDouble(5)-soVertList.getDouble(1);

            var soDPIRatio = soMoreDesc.getDouble(s2id('resolution'))/app.activeDocument.resolution;
            var soScaleX = (soWidthPlaced/soWidthInner)*soDPIRatio;
            var soScaleY = (soHeightPlaced/soHeightInner)*soDPIRatio;
            // $.writeln(soX);
            // $.writeln(soY);
            // $.writeln(soScaleX);
            // $.writeln(soScaleY);
            layers.smartObjects.place(newLinkFile, true, soX, soY, soScaleX*100, soScaleY*100);


            layers.smartObjects.setComp(null, compAppliedID );
        } else {
            executeAction(s2id('placedLayerMakeCopy'), undefined, _dialogModesNo);
            if(typeof newName === 'string'){ layers.prop('name', newName); }
        }
        return layers;
    };

    /**
     * Opens smart object layer for editing.
     * @param {Number} [layerId=Active layer] Layer identifier.
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.edit = function (layerId)
    {
        _ensureSmartObjectIsActive(layerId);
        var desc = new ActionDescriptor();
        executeAction(s2id('placedLayerEditContents'), desc, DialogModes.NO);

        // Extra flush...cause editing doesn't update active doc properly.
        var activeDocId = Lifter.documents.getActiveDocumentId();
        Lifter.documents.makeActive(activeDocId);

        // Cleanup cache
        _cache.refresh();

        return layers;
    };

    /**
     * Place a smart object with for link instead
     * @param {(String|File)} imageFile Path or File to valid image.
     * @param {Boolean} [isLink] If true, link instead of embedded smart object.
     * @param {Number} [scaleX] Width scale to apply (as percentage SO's internal canvas size).
     * @param {Number} [scaleY] Height scale to apply (percentage SO's internal canvas size).
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.place = function (imageFile, isLink, posX, posY, scaleX, scaleY)
    {

        scaleX = (scaleX !== undefined)?scaleX:100;
        scaleY = (scaleY !== undefined)?scaleY:100;

        if( !imageFile ) {
            imageFile = File.openDialog();
            if(!imageFile)
                throw new ERROR('User aborted convert to linked object...');
        }

        try {
            // Place now, position and scale after.
            var descPlace = new ActionDescriptor();
            var idPrc = c2id( "#Prc" );
            descPlace.putPath( c2id( "null" ), _ensureFile(imageFile) );
            descPlace.putEnumerated( c2id( "FTcs" ), c2id( "QCSt" ), c2id( "Qcsa" ) );
            descPlace.putUnitDouble( c2id( "Wdth" ), c2id( "#Prc" ), scaleX );
            descPlace.putUnitDouble( c2id( "Hght" ), c2id( "#Prc" ), scaleY );

            if(isLink)
                descPlace.putBoolean( c2id( "Lnkd" ), true );

            executeAction( c2id( "Plc " ), descPlace, DialogModes.NO );

            var newLinkedLayer = app.activeDocument.activeLayer;

            // // ask smart object for "more" info
            var soMoreDesc = layers.prop('smartObjectMore');

            //Get 'nonAffineTransform' for most accurate scale
            var soVertList = soMoreDesc.getList(s2id('nonAffineTransform'));
            var soX = soVertList.getDouble(0);
            var soY = soVertList.getDouble(1);

            //NOTE: by using the "#Prc" in the place action above we sidestepped
            // all the resize crap. Only percent not pixels so adjust for dpi before

            // // get SmartObject's inner canvas size
            // var sizeKeyDesc = soMoreDesc.getObjectValue(c2id('Sz  '));
            // var soWidthInner = sizeKeyDesc.getDouble(s2id('width'));
            // var soHeightInner = sizeKeyDesc.getDouble(s2id('height'));
            // var soWidthPlaced = soVertList.getDouble(2)-soVertList.getDouble(0);
            // var soHeightPlaced = soVertList.getDouble(5)-soVertList.getDouble(1);

            // var tgtWidth = (scaleX/100)*soWidthInner;
            // var tgtHeight = (scaleY/100)*soHeightInner;

            // // Smart Object scaling is affected by SO internal DPI...
            // var soDPIRatio = soMoreDesc.getDouble(s2id('resolution'))/app.activeDocument.resolution;

            // var newScaleX = (tgtWidth/soWidthPlaced) / soDPIRatio;
            // var newScaleY = (tgtHeight/soHeightPlaced) / soDPIRatio;

            // newScaleX *= 100;
            // newScaleY *= 100;

            if( typeof posX == "number" && typeof posY == "number" ) {
                newLinkedLayer.translate( -( soX - posX ) + " px", -( soY - posY ) + " px" );
            }

            // newLinkedLayer.resize(newScaleX,newScaleY, AnchorPosition.TOPLEFT);
        } catch ( e ) {
            throw new Error('Can not place new smart object...'+e.message);
        }

        return layers;
    };

    /**
     * Convert a smart object to smart link
     * @param {(Number|Array|null)} [layerId=Active layer] Layer id(s).
     * @param {(String|File)} imageFile Path or File to valid image.
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.convertToLinked = function (layerId, imageFile)
    {

        // not already a single smart object? Let's do that first and come back...
        if( layers.prop('kind')!==LayerKind.SMARTOBJECT ) {
            layers.smartObjects.make(layerId, true, imageFile);
        } else {
            // should have a single smart object now

            if( !imageFile ) {
                imageFile = File.openDialog();
                if(!imageFile)
                    throw new ERROR('User aborted convert to linked object...');
            }

            try {
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);

                var desc = new ActionDescriptor();

                desc.putReference( c2id( "null" ), ref );
                desc.putPath( c2id( "Usng" ), _ensureFile(imageFile) );
                executeAction( s2id( "placedLayerConvertToLinked" ), desc, DialogModes.NO );
            } catch ( e ) {
                throw new Error('Can not convert to linked object...'+e.message);
            }
        }

        return layers;
    };

    /**
     * Relink existing smart object to a different external file.
     * @param {(Number|Array|null)} [layerId=Active layer] Layer id(s).
     * @param {(String|File)} imageFile Path or File to valid image.
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.reLinkToFile = function (layerId, imageFile)
    {

        // not already a single smart object? Let's do that first and come back...
        if( layers.prop('kind')!==LayerKind.SMARTOBJECT ) {
            layers.smartObjects.make(layerId, true, imageFile);
        } else {
            // should have a single smart object now

            if( !imageFile ) {
                imageFile = File.openDialog();
                if(!imageFile)
                    throw new ERROR('User aborted convert to linked object...');
            }

            try {
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);

                var desc = new ActionDescriptor();

                desc.putReference( c2id( "null" ), ref );
                desc.putPath( c2id( "Usng" ), _ensureFile(imageFile) );
                executeAction( s2id( "placedLayerConvertToLinked" ), desc, DialogModes.NO );
            } catch ( e ) {
                throw new Error('Can not convert to linked object...'+e.message);
            }
        }

        return layers;
    };

    /**
     * Embed an existing smart object
     * @param {(Number|Array|null)} [layerId=Active layer] Layer id(s).
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.convertToEmbedded = function (layerId)
    {

        // not already a single smart object? Let's do that first and come back...
        if( layers.prop(layerId, 'kind') === LayerKind.SMARTOBJECT && layers.prop(layerId, 'smartObject.link') ) {
            try {
                _ensureSmartObjectIsActive(layerId);

                executeAction(s2id('placedLayerConvertToEmbedded'), undefined, _dialogModesNo);
            } catch ( e ) {
                throw new Error('Can not convert to embedded object...'+e.message);
            }
        }

        return layers;
    };

    /**
     * Sets the layer comp for a Smart Object instance.
     * @param {(Number|null)} layerId Layer identifier, null = active layer.
     * @param {Number} compID The unique ID of the layer comp to set instance to.
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.setComp = function (layerId, compID)
    {
        var cacheId = new Date().getMilliseconds();
        layers.stack.saveActiveIds( cacheId );
        layers.prop(layerId, 'smartObjectMore.comp', compID);
        layers.stack.restoreIdList( cacheId );

        return layers;
    };

    // Masks
    /**
     * Provides methods to work with masks on layer and layer sets.
     */
    layers.masks = {};

    // convenience tests... mostly just aliases for layers.prop() calls.
    /**
     * Check for user or vector mask on the specified layer.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return {Boolean} True if user or vector mask present on layer.
     */
    layers.masks.hasMask = function (layerId)
    {
        // filter mask is not checked here. check separately.
        return (layers.prop(layerId, 'hasUserMask')||layers.prop(layerId, 'hasVectorMask'));
    };

    /**
     * Check for user (pixel) mask on the specified layer.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return {Boolean} True if user mask present on layer.
     */
    layers.masks.hasLayerMask = function (layerId)
    {
        // filter mask is not checked here. check separately.
        return layers.prop(layerId, 'hasUserMask');
    };

    /**
     * Check for vector mask on the specified layer.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return {Boolean} True if vector mask present on layer.
     */
    layers.masks.hasVectorMask = function (layerId)
    {
        // filter mask is not checked here. check separately.
        return layers.prop(layerId, 'hasVectorMask');
    };

    /**
     * Check for filter mask on the specified layer.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return {Boolean} True if filter mask present on layer.
     */
    layers.masks.hasFilterMask = function (layerId)
    {
        return layers.prop(layerId, 'hasFilterMask');
    };

    // add/remove masks

    /**
     * Adds a layer mask to the specified layer and makes it active.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return Chained reference to layer utilities.
     */
    layers.masks.addLayerMask = function (layerId)
    {

        // Abort if layer already has a layer mask
        if (layers.prop(layerId, 'hasLayerMask'))
            throw new Error('Unable to add layer mask: layer already has one.');

        // Make layer if we're targeting background
        if (layers.prop(layerId, 'isBackgroundLayer')) {

            layers.makeLayerFromBackground();
            layers.stack.makeBottomActive();
        }
        // Make sure target layer is active
        else if (typeof layerId === 'number') {
            layers.stack.makeActive(layerId);
        }

        var ref = new ActionReference();
        ref.putEnumerated(c2id('Chnl'), c2id('Chnl'), c2id('Msk '));

        var desc = new ActionDescriptor();
        desc.putClass(c2id('Nw  '), c2id('Chnl'));
        desc.putReference(c2id('At  '), ref);

        // selection.hasOwnProperty("bounds") returned true when no selection
        // but would throw errors if selection.bounds accessed
        try{
            tmpTest = app.activeDocument.selection.bounds.length;
            desc.putEnumerated(c2id('Usng'), c2id('UsrM'), c2id('RvlS'));
        }
        catch(err){
            desc.putEnumerated(c2id('Usng'), c2id('UsrM'), c2id('RvlA'));
        }

        executeAction(c2id('Mk  '), desc, _dialogModesNo);
        return layers;
    };

    /**
     * Adds a vector mask to the specified layer and makes it active.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return Chained reference to layer utilities.
     */
    layers.masks.addVectorMask = function (layerId)
    {
        // Abort if layer already has a vector mask
        if (layers.prop(layerId, 'hasVectorMask'))
            throw new Error('Unable to add vector mask: layer already has one.');

        // Make layer if we're targeting background
        if (layers.prop(layerId, 'isBackgroundLayer'))
            layers.makeLayerFromBackground();

        // Make sure target layer is active
        if (typeof layerId === 'number')
            layers.stack.makeActive(layerId);

        var ref = new ActionReference();
        ref.putClass(c2id('Path'));

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);

        var ref2 = new ActionReference();
        ref2.putEnumerated(c2id('Path'), c2id('Path'), s2id('vectorMask'));
        desc.putReference(c2id('At  '), ref2);
        desc.putEnumerated(c2id('Usng'), s2id('vectorMaskEnabled'), c2id('RvlA'));
        executeAction(c2id('Mk  '), desc, _dialogModesNo);
        return layers;
    };

    /**
     * Removes the layer mask from the specified layer, optionally applying it.
     * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
     * @param {Number} [layerId=Active layer] Layer id.
     * @param {Boolean} [apply] Whether to apply the mask to the layer.
     * @return Chained reference to layer utilities.
     */
    layers.masks.removeLayerMask = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, false);

        // Parse args
        var layerId = arguments[0],
            apply = arguments[1];

        var ref = new ActionReference();
        ref.putEnumerated(c2id('Chnl'), c2id('Chnl'), c2id('Msk '));
        _getLayerIdRef(layerId, ref);

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putBoolean(c2id('Aply'), apply);
        executeAction(c2id('Dlt '), desc, _dialogModesNo);
        return layers;
    };

    /**
     * Removes the vector mask from the specified layer. "apply" will either apply
     * to the existing layer mask or directly to the layer if no layer mask found.
     * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
     *
     * @param {Number} [layerId=Active layer] Layer id.
     * @param {Boolean} [apply] Whether to rasterize and apply the mask to the layer.
     * @return Chained reference to layer utilities.
     */
    layers.masks.removeVectorMask = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, false);

        // Parse args
        var layerId = arguments[0],
            apply = arguments[1],
            desc = new ActionDescriptor();

        if( apply ) {
            // No way to directly apply vector mask, so rasterize first
            // if existing layer mask, it intersects into that
            var hasUserMask = layers.masks.hasLayerMask(layerId);
            var rasterizeLayerId = s2id('rasterizeLayer');

            // save layer selection and activate target layer
            layers.stack.saveActiveIds(rasterizeLayerId);
            layers.stack.makeActive(layerId);

    		desc.putReference( c2id( "null" ), layers.ref(layerId) );
    		desc.putEnumerated( c2id( "What" ), s2id( "rasterizeItem" ), s2id( "vectorMask" ) );
    		executeAction( rasterizeLayerId, desc, DialogModes.NO );

            // don't delete if layer mask was already present
            if( !hasUserMask ) {
                layers.masks.removeLayerMask(layerId,true);
            }

            // restore original selection
            layers.stack.restoreIdList(rasterizeLayerId);

        } else {
            var ref = new ActionReference();
            ref.putEnumerated(c2id('Path'), c2id('Path'), s2id('vectorMask'));
            _getLayerIdRef(layerId, ref);

            desc.putReference(c2id('null'), ref);
            executeAction(c2id('Dlt '), desc, _dialogModesNo);
        }

        return layers;
    };

    /**
     * Switch whether user mask of the specified layer is active or not so that drawing operations
     * can be performed on it.
     *
     * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
     *
     * @param {Number} [layerId=Active layer] Layer id.
     * @param {Boolean} [active] Whether to make the layer mask active or not.
     * @return Chained reference to layer utilities.
     */
    layers.masks.makeLayerMaskActive = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, true);

        // Parse args
        var layerId = arguments[0],
            active = arguments[1];

        // mask or RGB (layer pixels) channel?
        var channel = ( active )? 'Msk ': 'RGB ';

        var ref = new ActionReference(),
            desc = new ActionDescriptor();

        ref.putEnumerated(c2id('Chnl'), c2id('Chnl'), c2id(channel));
        _getLayerIdRef(layerId, ref);

        desc.putReference(c2id('null'), ref);
        executeAction(c2id('slct'), desc, _dialogModesNo);

        return layers;
    };

    /**
     * Switch whether vector mask of the specified layer is active or not so that drawing operations
     * can be performed on it.
     *
     * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
     *
     * @param {Number} [layerId=Active layer] Layer id.
     * @param {Boolean} [active] Whether to make the vector mask active or inactive.
     * @return Chained reference to layer utilities.
     */
    layers.masks.makeVectorMaskActive = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, true);

        // Parse args
        var layerId = arguments[0],
            active = arguments[1];

        // different commands for activate and deactivate...
        var ref = new ActionReference(),
            desc = new ActionDescriptor(),
            execId;

        if (active)
        {
            ref.putEnumerated(c2id('Path'), c2id('Path'), s2id('vectorMask'));
            _getLayerIdRef(layerId, ref);
            execId = c2id('slct');
        }
        else
        {
            ref.putClass(c2id('Path'));
            _getLayerIdRef(layerId, ref);
            execId = c2id('Dslc');
        }

        // execute!
        desc.putReference(c2id('null'), ref);
        executeAction(execId, desc, _dialogModesNo);

        return layers;
    };


    /**
    * Switch whether user mask of the specified layer is active or not
    *
    * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
    *
    * @param {Number} [layerId=Active layer] Layer id.
    * @param {Boolean} [makeVisible] Whether to make the layer mask visible.
    * @return Chained reference to layer utilities.
    */
    layers.masks.makeLayerMaskVisible = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, true);

        // Parse args
        var layerId = arguments[0],
            visible = arguments[1];

        // different commands for activate and deactivate...
        var ref = new ActionReference(),
            desc = new ActionDescriptor();

        ref.putEnumerated(c2id('Chnl'), c2id('Chnl'), c2id('Msk '));
        _getLayerIdRef(layerId, ref);

        desc.putReference(c2id('null'), ref);
        desc.putBoolean(c2id('MkVs'), visible);
        executeAction(c2id('slct'), desc, _dialogModesNo);

        return layers;
    };


    /**
    * Switch whether the mask(s) of the specified layer are enabled or not
    *
    * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
    *
    * @param {Number} [layerId=Active layer] Layer id.
    * @param {Boolean} [enable] Whether to make the mask affect the layer.
    * @return Chained reference to layer utilities.
    */
    layers.masks.enable = function ()
    {
        // fake function overloading
        _overloadFunction_Number_Bool(arguments, undefined, true);

        // Parse args
        var layerId = arguments[0],
            enable = arguments[1];

        if(layers.masks.hasLayerMask(layerId)) {
            layers.masks.enableLayerMask(layerId, enable);
        }

        if(layers.masks.hasVectorMask(layerId)) {
            layers.masks.enableVectorMask(layerId, enable);
        }

        return layers;
    };


    /**
    * Switch whether user mask of the specified layer is enabled or not
    *
    * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
    *
    * @param {Number} [layerId=Active layer] Layer id.
    * @param {Boolean} [enable] Whether to make the mask affect the layer.
    * @return Chained reference to layer utilities.
    */
    layers.masks.enableLayerMask = function ()
    {
        // fake function overloading
        _overloadFunction_Number_Bool(arguments, undefined, true);

        // Parse args
        var layerId = arguments[0],
            enable = arguments[1];

        layers.prop(layerId,'layerMaskEnabled',enable);
        return layers;
    };


    /**
    * Switch whether user mask of the specified layer is enabled or not
    *
    * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
    *
    * @param {Number} [layerId=Active layer] Layer id.
    * @param {Boolean} [enable] Whether to make the mask affect the layer.
    * @return Chained reference to layer utilities.
    */
    layers.masks.enableVectorMask = function ()
    {
        // fake function overloading
        _overloadFunction_Number_Bool(arguments, undefined, true);

        // Parse args
        var layerId = arguments[0],
            enable = arguments[1];

        layers.prop(layerId,'vectorMaskEnabled', enable);

        return layers;
    };


    /**
     * Creates a selection from the layer mask of the specified layer.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return Chained reference to layer utilities.
     */
    layers.masks.selectLayerMask = function (layerId)
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Chnl'), c2id('fsel'));

        var ref2 = new ActionReference();
        ref2.putEnumerated(c2id('Chnl'), c2id('Chnl'), c2id('Msk '));
        _getLayerIdRef(layerId, ref);

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putReference(c2id('T   '), ref2);
        executeAction(c2id('setd'), desc, _dialogModesNo);

        return layers;
    };

    /**
     * Creates a selection from the vector mask of the specified layer.
     * @param {Number} [layerId=Active layer] Layer id.
     * @return Chained reference to layer utilities.
     */
    layers.masks.selectVectorMask = function (layerId)
    {
        var ref = new ActionReference();
        ref.putProperty(c2id('Chnl'), c2id('fsel'));

        var ref2 = new ActionReference();
        ref2.putEnumerated(c2id('Path'), c2id('Path'), s2id('vectorMask'));
        _getLayerIdRef(layerId, ref2);

        var desc = new ActionDescriptor();
        desc.putReference(c2id('null'), ref);
        desc.putReference(c2id('T   '), ref2);

        desc.putInteger(c2id('Vrsn'), 1);
        desc.putBoolean(s2id('vectorMaskParams'), true);
        executeAction(c2id('setd'), desc, _dialogModesNo);

        return layers;
    };

    /**
     * Set mask linked state for both layer and vector masks.
     *
     * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
     *
     * @param {Number} [layerId=Active layer] Layer id.
     * @return Chained reference to layer utilities.
     */
    layers.masks.setMaskLink = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, true);

        // Parse args
        var layerId = arguments[0],
            setLink = arguments[1];

        if(layers.masks.hasLayerMask(layerId)) {
            layers.masks.setLayerMaskLink(layerId, setLink);
        }

        if(layers.masks.hasVectorMask(layerId)) {
            layers.masks.setVectorMaskLink(layerId, setLink);
        }

        return layers;
        // // different commands for activate and deactivate...
        // var ref = new ActionReference(),
        //     desc = new ActionDescriptor();

        // //default to true unless explicitly false
        // setLink = setLink !== false;
        //
        // if( layers.masks.hasMask() )
        // {
        //     try{
        //         var maskTypeID = (layers.masks.hasUserMask())? c2id('Usrs'):c2id( "vectorMaskLinked");
        //         var desc = new ActionDescriptor();
        //         var ref = layers.ref(layerId);
        //         desc.putReference( c2id('null'), ref );
        //             var descToggle = new ActionDescriptor();
        //             descToggle.putBoolean( maskTypeID, setLink );
        //         desc.putObject( c2id('T   '), c2id('Lyr '), descToggle );
        //         executeAction( c2id('setd'), desc, DialogModes.NO );}
        //     catch(e){
        //         e.message = "Failed to set mask link: " + e.message;
        //         log.error( e );
        //     }
        // }
    };


    /**
     * Set mask linked state for layer mask.
     *
     * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
     *
     * @param {Number} [layerId=Active layer] Layer id.
     * @return Chained reference to layer utilities.
     */
    layers.masks.setLayerMaskLink = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, true);

        if(layers.masks.hasLayerMask(arguments[0])) {
            layers.prop(arguments[0], 'layerMaskLinked', arguments[1]);
        }
    };


    /**
     * Set mask linked state for vector mask
     *
     * Overloaded for 0, 1, and 2 args eg. fn(), fn(id), fn(true), fn(id, true)
     *
     * @param {Number} [layerId=Active layer] Layer id.
     * @return Chained reference to layer utilities.
     */
    layers.masks.setVectorMaskLink = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, true);

        if(layers.masks.hasLayerMask(arguments[0])) {
            layers.prop(arguments[0],'vectorMaskLinked', arguments[1]);
        }

        return layers;
    };


    /**
     * Refines layer mask of specified layer as per Refine Mask workspace
     * @method
     * @param {Number} [layerId=Active layer] Layer id
     * @param  {Number}  edgeBorderRadius   Edge border radius
     * @param  {Number}  edgeBorderContrast Edge border contrast
     * @param  {Number}  edgeSmooth         Edge smoothing
     * @param  {Number}  edgeFeatherRadius  Edge feather radius
     * @param  {Number}  edgeChoke          Edge choke
     * @param  {Bool}    edgeAutoRadius     Edge auto radius enabled
     * @param  {Boolean} edgeDecontaminate  Edge decontamination enabled
     * @return Chained reference to layer utilities.
     */
    layers.masks.refineLayerMask = function (layerId, edgeBorderRadius, edgeBorderContrast, edgeSmooth, edgeFeatherRadius, edgeChoke, edgeAutoRadius, edgeDecontaminate)
    {
        // Parse args
        typeof edgeBorderRadius === 'number' || (edgeBorderRadius = 0.0);
        typeof edgeBorderContrast === 'number' || (edgeBorderContrast = 0.0);
        typeof edgeSmooth === 'number' || (edgeSmooth = 0);
        typeof edgeFeatherRadius === 'number' || (edgeFeatherRadius = 0.0);
        typeof edgeChoke === 'number' || (edgeChoke = 0.0);
        typeof edgeAutoRadius === 'boolean' || (edgeAutoRadius = false);
        typeof edgeDecontaminate === 'boolean' || (edgeDecontaminate = false);

        var desc = new ActionDescriptor();
        desc.putReference( c2id( "null" ), layers.ref(layerId) );// super shortcut ref

        desc.putUnitDouble(s2id('refineEdgeBorderRadius'), c2id('#Pxl'), Math.abs(edgeBorderRadius));
        desc.putUnitDouble(s2id('refineEdgeBorderContrast'), idPrc, Math.abs(edgeBorderContrast));
        desc.putInteger(s2id('refineEdgeSmooth'), Math.abs(Math.ceil(edgeSmooth)));
        desc.putUnitDouble(s2id('refineEdgeFeatherRadius'), c2id('#Pxl'), Math.abs(edgeFeatherRadius));
        desc.putUnitDouble(s2id('refineEdgeChoke'), c2id('#Prc'), Math.abs(edgeChoke));
        desc.putBoolean(s2id('refineEdgeAutoRadius'), edgeAutoRadius);
        desc.putBoolean(s2id('refineEdgeDecontaminate'), edgeDecontaminate);
        desc.putEnumerated(s2id('refineEdgeOutput'), s2id('refineEdgeOutput'), s2id('refineEdgeOutputUserMask'));
        executeAction(s2id('refineSelectionEdge'), desc, _dialogModesNo);

        // Chaining
        return layers;
    };


    /**
     * Inverts the layer mask of the specified layer.
     * @param {Number} [layerId=Active layer] Layer id
     * @return Chained reference to layer utilities.
     */
    layers.masks.invertLayerMask = function (layerId)
    {
        layers.masks.makeLayerMaskVisible(layerId, true);
        executeAction( c2id('Invr'), undefined, DialogModes.NO );
        layers.masks.makeLayerMaskVisible(layerId, false);

        return layers;
    };


    // Shapes
    /**
     * Provides methods to work with masks on layer and layer sets.
     */
    layers.shapes = {};

    /**
     * Gets fill color of selected layer
     * @return {SolidColor} photoshop SolidColor object from the layer fill
     */
    layers.shapes.getFillColor = function () {
        var ref = new ActionReference();
        if (typeof layerId !== 'number' || layerId === 0) {
            ref.putEnumerated(s2id( 'contentLayer' ), c2id('Ordn'), c2id('Trgt'));
        } else {
            // Use layerId directly
            ref.putIdentifier(s2id( 'contentLayer' ), layerId);
        }
        var ref1 = executeActionGet( ref );
        var list = ref1.getList( c2id( "Adjs" ) );
        var solidColorLayer = list.getObjectValue( 0 );
        var color = solidColorLayer.getObjectValue( s2id( "color" ) );
        var fillColor = new SolidColor();
        fillColor.rgb.red = color.getDouble( c2id( 'Rd  ' ) );
        fillColor.rgb.green = color.getDouble( c2id( 'Grn ' ) );
        fillColor.rgb.blue = color.getDouble( c2id( 'Bl  ' ) );
        return fillColor;
    };

    /**
     * Sets fill color for selected layer
     * @param {*} [fillColor=Foreground color]  SolidColor object, 3 int array of 0-255 based RGB values or string (0,128,255)
     * @return Chained reference to layer utilities.
     */
    layers.shapes.setFillColor = function (layerId, fillColor) {
        fillColor = Lifter.colors.toSolidColor(fillColor);

        var ref = new ActionReference();
        if (typeof layerId !== 'number' || layerId === 0) {
            ref.putEnumerated(s2id( 'contentLayer' ), c2id('Ordn'), c2id('Trgt'));
        } else {
            // Use layerId directly
            ref.putIdentifier(s2id( 'contentLayer' ), layerId);
        }

        var descSet = new ActionDescriptor();
        var descColor = Lifter.colors.toActionDescriptor(fillColor);
        descSet.putReference( c2id( 'null' ), ref );
        descSet.putObject( s2id( "to" ), s2id( 'solidColorLayer' ), descColor );
        executeAction( s2id( "set" ), descSet, DialogModes.NO );

        return layers;
    };

    /**
     * Sets stroke color for selected layer
     * @param {Boolean} bEnabled    flag for enabled or disabling stroke
     * @param {*} [fillColor=Foreground color]  SolidColor object, 3 int array of 0-255 based RGB values or string (0,128,255)
     * @param {String} [sAlignment]    stroke alignment. Valid strings: "Center","Inside","Outside"
     * @param {Int}     [iWidth]      stroke width in pixels
     * @return Chained reference to layer utilities.
     */
    layers.shapes.setStroke = function shapeSetStroke( bEnabled, fillColor, iWidth, sAlignment ) {
        var ref = new ActionReference();
        if (typeof layerId !== 'number' || layerId === 0) {
            ref.putEnumerated(s2id( 'contentLayer' ), c2id('Ordn'), c2id('Trgt'));
        } else {
            // Use layerId directly
            ref.putIdentifier(s2id( 'contentLayer' ), layerId);
        }
        try {
            var descSet = new ActionDescriptor();
            ref.putEnumerated( s2id( "contentLayer" ), c2id( "Ordn" ), s2id( "targetEnum" ) );
            descSet.putReference( c2id( "null" ), ref );
            // style descriptors
            var descStroke = new ActionDescriptor();
            var descStrokeStyle = new ActionDescriptor();

            if ( typeof fillColor === 'object' || typeof fillColor === 'string' ) {
                var descColor = Lifter.colors.toActionDescriptor(fillColor);
                descStrokeStyle.putObject( s2id( "strokeStyleContent" ), s2id( "solidColorLayer" ), descColor );
            }

            if( typeof sAlignment !== "undefined" ) {
               var idstrokeStyleLineAlignment = s2id( "strokeStyleLineAlignment" );
               descStrokeStyle.putEnumerated( idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, s2id( "strokeStyleAlign"+sAlignment ) );
            }

            // descStrokeStyle.putInteger( s2id( "strokeStyleVersion" ), 2 );
            descStrokeStyle.putBoolean( s2id( "strokeEnabled" ), bEnabled );

            if ( typeof iWidth !== "undefined" ) {
               descStrokeStyle.putUnitDouble( s2id( "strokeStyleLineWidth" ), c2id( "#Pxl" ), iWidth );
            }

            descStroke.putObject( s2id( "strokeStyle" ), s2id( "strokeStyle" ), descStrokeStyle );
            descSet.putObject( s2id( "to" ), s2id( "shapeStyle" ), descStroke );

            executeAction( s2id( "set" ), descSet, DialogModes.NO );
        }
        catch ( e ) { log.error( e ); }

        return layers;
    };


    //TODO: this only does points no curves and untested
    layers.shapes.drawCustomShape =  function shapesDrawCustomShape( aAnchorPositions , color, opacity, name)
    {
        var oSubPath;
        var oPathItem;
        var aPathPoints = [];
        var y = aAnchorPositions.length;
        var i = 0;

        for (i = 0; i < y; i++) {
            aPathPoints[i] = new PathPointInfo();
            aPathPoints[i].kind = PointKind.CORNERPOINT;
            aPathPoints[i].anchor = aAnchorPositions[i];
            aPathPoints[i].leftDirection = aPathPoints[i].anchor;
            aPathPoints[i].rightDirection = aPathPoints[i].anchor;
        }

        oSubPath = new SubPathInfo();
        oSubPath.closed = true;
        oSubPath.operation = ShapeOperation.SHAPEADD;
        oSubPath.entireSubPath = aPathPoints;
        oPathItem = app.activeDocument.oPathItems.add("tmpPath", [oSubPath]);

        var descUsng = new ActionDescriptor();
        var descType = new ActionDescriptor();
        var descClr = new ActionDescriptor();
        var descRGB = Lifter.colors.toActionDescriptor(color);
        var refLyr = new ActionReference();

        refLyr.putClass(s2t("contentLayer"));
        descUsng.putReference(c2t("null"), refLyr);

        descClr.putObject(s2t( "color" ), s2t( "RGBColor" ), descRGB);
        descType.putObject(c2t("Type"), s2t("solidColorLayer"), descClr);
        descUsng.putObject(c2t("Usng"), s2t("contentLayer"), descType);

        // Set Name
        if( typeof name !== undefined && name.constructor.name === "String")
        {
            descClr.putString( charIDToTypeID( "Nm  " ), name );
        }

        // Set Opacity
        if( typeof opacity !== undefined && typeof opacity !== null)
        {
            descClr.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), opacity );
        }

        executeAction(s2t( "make" ), descUsng, DialogModes.NO);

        oPathItem.remove();
    };


    /**
     * Draw rectangular or circular shape layer
     * @param {String}    [shape="Rectangle"]    "Rectangle" or "Ellipse"
     * @param {Number}    x    X Position
     * @param {Number}    y    Y Position
     * @param {Number}    w    Width
     * @param {Number}    h    Height
     * @param {Object}    [opts] Optional arguments
     * @param {*}         [opts.color=Foreground color]  SolidColor object, 3 int array of 0-255 based RGB values or string (0,128,255)
     * @param {String}    [name] Name of new shape layer.
     * @param {Number}    [opacity=100] Blend opacity.
     * @param {Number[]}  [opts.corners]  curve amount of 4 corners [t,r,b,l]
     * @return {layerID}  layerId of new shape layer or undefined if failed.
     */
    layers.shapes.drawShape =  function shapesDrawShape(shape, x, y, w, h, options)
    {
        var shapeCID;
        var opts = (isDef(options))? options : {};
        var color = Lifter.colors.toArray(opts.color);
        var opacity = opts.opacity;
        var name = opts.name;
        var corners = opts.corners;
        if(typeof opts.corners === 'number') {
            corners = [opts.corners, opts.corners, opts.corners, opts.corners];
        } else if (opts.corners instanceof Array && opts.corners.length === 1) {
            corners = [opts.corners[0], opts.corners[0], opts.corners[0], opts.corners[0]];
        }

        // not sure if more shape options?
        switch (shape) {
            case "Ellipse":
            case "Elps":
                shapeCID = "Elps";
                break;
            case "Rectangle":
            case "Rctn":
            default:
                shapeCID = "Rctn";//default rectangle
                break;
        }

        // desc layer
        var descUsng = new ActionDescriptor();
            var refContentLayer = new ActionReference();
            refContentLayer.putClass( s2id( "contentLayer" ) );
        descUsng.putReference( c2id( "null" ), refContentLayer );
        var descColorLayer = new ActionDescriptor();

            // color
            var descColor = Lifter.colors.toActionDescriptor(color);
            descColorLayer.putObject( c2id( "Type" ), s2id( "solidColorLayer" ), descColor );

            // shape
            var descShape = new ActionDescriptor();
                var idPxl = c2id( "#Pxl" );
                descShape.putInteger( s2id( "unitValueQuadVersion" ), 1 );

                // Transform corners
                descShape.putUnitDouble( c2id( "Top " ), idPxl, y );
                descShape.putUnitDouble( c2id( "Left" ), idPxl, x );
                descShape.putUnitDouble( c2id( "Btom" ), idPxl, y+h );
                descShape.putUnitDouble( c2id( "Rght" ), idPxl, x+w );

                // Rounded corner values
                if( typeof corners !== 'undefined' && corners.length === 4) {
                    descShape.putUnitDouble( s2id( "topLeft" ), idPxl, corners[0] );
                    descShape.putUnitDouble( s2id( "topRight" ), idPxl, corners[1] );
                    descShape.putUnitDouble( s2id( "bottomRight" ), idPxl, corners[2] );
                    descShape.putUnitDouble( s2id( "bottomLeft" ), idPxl, corners[3] );
                }

            descColorLayer.putObject( c2id( "Shp " ), c2id( shapeCID ), descShape );

            // Set Opacity
            if( typeof opacity !== 'undefined' && typeof opacity !== null) {
                descColorLayer.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), opacity );
            }

        descUsng.putObject( c2id( "Usng" ), s2id( "contentLayer" ), descColorLayer );

        try {
            executeAction( c2id( "Mk  " ), descUsng, DialogModes.NO );
        }
        catch ( e ) { log.error( e ); return; }

        // Set Name
        if( isDef(name) && typeof name === "string") {
            layers.prop('name', name);
        }

        return layers.prop('layerId');
    };

    /**
     * Draw circular shape layer
     * @param {Number}    x    X Position
     * @param {Number}    y    Y Position
     * @param {Number}    w    Width
     * @param {Number}    h    Height
     * @param {Object}    [opts] Optional arguments
     * @param {*}         [opts.color=Foreground color]  SolidColor object, 3 int array of 0-255 based RGB values or string (0,128,255)
     * @param {Number}    [opacity=100] Blend opacity.
     * @param {Number[]}  [opts.corners]  curve amount of 4 corners [t,r,b,l]
     * @return {layerID}  layerId of new shape layer or undefined if failed.
     */
    layers.shapes.drawEllipse = function shapesDrawEllipse(x, y, w, h, opts)
    {
        return this.drawShape( "Ellipse", x, y, w, h, opts);
    };

    /**
     * Draw rectangular shape layer
     * @param {Number}    x    X Position
     * @param {Number}    y    Y Position
     * @param {Number}    w    Width
     * @param {Number}    h    Height
     * @param {Object}    [opts] Optional arguments
     * @param {*}         [opts.color=Foreground color]  SolidColor object, 3 int array of 0-255 based RGB values or string (0,128,255)
     * @param {Number}    [opacity=100] Blend opacity.
     * @param {Number[]}  [opts.corners]  curve amount of 4 corners [t,r,b,l]
     * @return {layerID}  layerId of new shape layer or undefined if failed.
     */
    layers.shapes.drawRect = function shapesDrawRect(x, y, w, h, opts)
    {
        return this.drawShape( "Rectangle", x, y, w, h, opts);
    };


    // Direct manipulation

    /**
     * Merges or rasterizes a layer group or smart object.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return Chained reference to layer utilities.
     */
    layers.rasterize = function (layerId)
    {
        var rasterizeLayerId = s2id('rasterizeLayer');

        layers.stack.saveActiveIds(rasterizeLayerId);
        layers.stack.makeActive(layerId);

        if( layers.isGroup(layerId) ) {
            layers.groups.merge(layerId);
        } else {
            var desc = new ActionDescriptor();
            desc.putReference(c2id('null'), layers.ref());
            executeAction(s2id('rasterizeLayer'), desc, _dialogModesNo);
        }

        layers.stack.restoreIdList(rasterizeLayerId);

        return layers;
    };

    /**
     * Locks or unlocks layers. Takes layer Id or uses active layers
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @param {Boolean} [setLocked] lock or don't lock.
     * @return Chained reference to layer utilities.
     */
    layers.setLocked = function (layerId, setLocked)
    {
        setLocked = (setLocked !== false);//lock by default
        layers.prop(layerId, 'allLocked', setLocked);
        return layers;
    };

    /**
     * Toggles visibility isolation on a layer (can't specify on/off only toggle)
     * @method
     * @param  {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return Chained reference to layer utilities.
     */
    layers.toggleIsolate = function (layerId)
    {
        var ref = new ActionReference();
        _getLayerIdRef(layerId, ref);
        var list = new ActionList();
        list.putReference(ref);
        var desc = new ActionDescriptor();
        desc.putList(c2id('null'), list);
        desc.putBoolean( c2id('TglO'), true );

        executeAction(c2id('Shw '), desc, _dialogModesNo);
        return layers;
    },

    // Public API
    /**
     * Contains low-level methods to work with layers without accessing Photoshop DOM.
     *
     * Layers are identified by two numbers in Photoshop: LayerId and ItemIndex.
     *
     *  - LayerId: progressive 1-based unique integer identifier that does not change when the document is
     *             modified, open, saved or closed. When a layer is deleted, its LayerId won't be re-assigned
     *             to new layers. Background LayerId is a special case and it's always '0' if only the background
     *             layer is present in the document.
     *  - ItemIndex: a 1-based integer index that depends on layer position in hierarchy. It changes every
     *               time the layer is moved.
     *
     * The functions below use LayerId to get a valid reference to a layer. LayerIds are easier to work
     * with than ItemIndexes because are unique and does not changed based on whether a background
     * layer is present in the document (see below).
     *
     * Most functions default a null or undefined value passed to a layer id argument to reference the currently
     * active layer. It is a huge convenience but also a debugging nightmare. Check your inputs and act accordingly.
     *
     * Some brief notes about ItemIndexes: they behave differently when the background layer
     * is present in the document:
     *
     *  - with background: 'Background' = 1, 'Layer 1' = 2 ('Background' accessed with 0, 'Layer 1' accessed with 1)
     *  - without background: 'Layer 0' = 1, 'Layer 1' = 2 ('Layer 0' accessed with 1, 'Layer 1' accessed with 2)
     *
     * Also, when *only* the background layer is present in the document, getting a
     * reference to it via ItemIndex results in an error: it must be get using
     * Lyr -> Ordn -> Trgt enumeration value. No special actions are required when only one
     * non-background layer is present in the document. This is true for LayerIds too.
     */
    Lifter.layers = layers;
    log.debug("Lifter.layers done...");
}());

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

log.log("Lifter is ready now.");
}).call($.global);
}// if(typeof Lifter !== "object")
/*!
 * LIFTER IS READY NOW
 */
