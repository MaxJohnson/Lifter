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
if( _DEVBUILD ) {
    Lifter.log = new ExtendScript_Log($.global, 0, "Lifter", true, false);
} else {
    Lifter.log = new ExtendScript_Log($.global, 4, "Lifter", false);
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

log.log("Lifter is ready now.");
}).call($.global);
}// if(typeof Lifter !== "object")
/*!
 * LIFTER IS READY NOW
 */
