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

/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */

// vim: ts=4 sts=4 sw=4 expandtab

// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
;

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
    'use strict';

    /* global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {
    /**
     * Brings an environment as close to ECMAScript 5 compliance
     * as is possible with the facilities of erstwhile engines.
     *
     * Annotated ES5: http://es5.github.com/ (specific links below)
     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
     */

    // Shortcut to an often accessed properties, in order to avoid multiple
    // dereference that costs universally. This also holds a reference to known-good
    // functions.
    var $Array = Array;
    var ArrayPrototype = $Array.prototype;
    var $Object = Object;
    var ObjectPrototype = $Object.prototype;
    var $Function = Function;
    var FunctionPrototype = $Function.prototype;
    var $String = String;
    var StringPrototype = $String.prototype;
    var $Number = Number;
    var NumberPrototype = $Number.prototype;
    var array_slice = ArrayPrototype.slice;
    var array_splice = ArrayPrototype.splice;
    var array_push = ArrayPrototype.push;
    var array_unshift = ArrayPrototype.unshift;
    var array_concat = ArrayPrototype.concat;
    var array_join = ArrayPrototype.join;
    var call = FunctionPrototype.call;
    var apply = FunctionPrototype.apply;
    var max = Math.max;
    var min = Math.min;

    // Having a toString local variable name breaks in Opera so use to_string.
    var to_string = ObjectPrototype.toString;

    /* global Symbol */
    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };

    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

    /* inlined from http://npmjs.com/define-properties */
    var supportsDescriptors = $Object.defineProperty && (function () {
        try {
            var obj = {};
            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
                return false;
            }
            return obj.x === obj;
        } catch (e) { /* this is ES3 */
            return false;
        }
    }());
    var defineProperties = (function (has) {
        // Define configurable, writable, and non-enumerable props
        // if they don't exist.
        var defineProperty;
        if (supportsDescriptors) {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) {
                    return;
                }
                $Object.defineProperty(object, name, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: method
                });
            };
        } else {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) {
                    return;
                }
                object[name] = method;
            };
        }
        return function defineProperties(object, map, forceAssign) {
            for (var name in map) {
                if (has.call(map, name)) {
                    defineProperty(object, name, map[name], forceAssign);
                }
            }
        };
    }(ObjectPrototype.hasOwnProperty));

    //
    // Util
    // ======
    //

    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
    var isPrimitive = function isPrimitive(input) {
        var type = typeof input;
        return input === null || (type !== 'object' && type !== 'function');
    };

    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
        return x !== x;
    };

    var ES = {
        // ES5 9.4
        // http://es5.github.com/#x9.4
        // http://jsperf.com/to-integer
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
        ToInteger: function ToInteger(num) {
            var n = +num;
            if (isActualNaN(n)) {
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
            return n;
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
        ToPrimitive: function ToPrimitive(input) {
            var val, valueOf, toStr;
            if (isPrimitive(input)) {
                return input;
            }
            valueOf = input.valueOf;
            if (isCallable(valueOf)) {
                val = valueOf.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            toStr = input.toString;
            if (isCallable(toStr)) {
                val = toStr.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            throw new TypeError();
        },

        // ES5 9.9
        // http://es5.github.com/#x9.9
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
        ToObject: function (o) {
            if (o == null) { // this matches both null and undefined
                throw new TypeError("can't convert " + o + ' to object');
            }
            return $Object(o);
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
        ToUint32: function ToUint32(x) {
            return x >>> 0;
        }
    };

    //
    // Function
    // ========
    //

    // ES-5 15.3.4.5
    // http://es5.github.com/#x15.3.4.5

    var Empty = function Empty() {};

    defineProperties(FunctionPrototype, {
        bind: function bind(that) { // .length is 1
            // 1. Let Target be the this value.
            var target = this;
            // 2. If IsCallable(Target) is false, throw a TypeError exception.
            if (!isCallable(target)) {
                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
            }
            // 3. Let A be a new (possibly empty) internal list of all of the
            //   argument values provided after thisArg (arg1, arg2 etc), in order.
            // XXX slicedArgs will stand in for "A" if used
            var args = array_slice.call(arguments, 1); // for normal call
            // 4. Let F be a new native ECMAScript object.
            // 11. Set the [[Prototype]] internal property of F to the standard
            //   built-in Function prototype object as specified in 15.3.3.1.
            // 12. Set the [[Call]] internal property of F as described in
            //   15.3.4.5.1.
            // 13. Set the [[Construct]] internal property of F as described in
            //   15.3.4.5.2.
            // 14. Set the [[HasInstance]] internal property of F as described in
            //   15.3.4.5.3.
            var bound;
            var binder = function () {

                if (this instanceof bound) {
                    // 15.3.4.5.2 [[Construct]]
                    // When the [[Construct]] internal method of a function object,
                    // F that was created using the bind function is called with a
                    // list of arguments ExtraArgs, the following steps are taken:
                    // 1. Let target be the value of F's [[TargetFunction]]
                    //   internal property.
                    // 2. If target has no [[Construct]] internal method, a
                    //   TypeError exception is thrown.
                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Construct]] internal
                    //   method of target providing args as the arguments.

                    var result = apply.call(
                        target,
                        this,
                        array_concat.call(args, array_slice.call(arguments))
                    );
                    if ($Object(result) === result) {
                        return result;
                    }
                    return this;

                } else {
                    // 15.3.4.5.1 [[Call]]
                    // When the [[Call]] internal method of a function object, F,
                    // which was created using the bind function is called with a
                    // this value and a list of arguments ExtraArgs, the following
                    // steps are taken:
                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
                    //   property.
                    // 3. Let target be the value of F's [[TargetFunction]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Call]] internal method
                    //   of target providing boundThis as the this value and
                    //   providing args as the arguments.

                    // equiv: target.call(this, ...boundArgs, ...args)
                    return apply.call(
                        target,
                        that,
                        array_concat.call(args, array_slice.call(arguments))
                    );

                }

            };

            // 15. If the [[Class]] internal property of Target is "Function", then
            //     a. Let L be the length property of Target minus the length of A.
            //     b. Set the length own property of F to either 0 or L, whichever is
            //       larger.
            // 16. Else set the length own property of F to 0.

            var boundLength = max(0, target.length - args.length);

            // 17. Set the attributes of the length own property of F to the values
            //   specified in 15.3.5.1.
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
                array_push.call(boundArgs, '$' + i);
            }

            // XXX Build a dynamic function with desired amount of arguments is the only
            // way to set the length property of a function.
            // In environments where Content Security Policies enabled (Chrome extensions,
            // for ex.) all use of eval or Function costructor throws an exception.
            // However in all of these environments Function.prototype.bind exists
            // and so this code will never be executed.
            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                // Clean up dangling references.
                Empty.prototype = null;
            }

            // TODO
            // 18. Set the [[Extensible]] internal property of F to true.

            // TODO
            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
            // 20. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
            //   false.
            // 21. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
            //   and false.

            // TODO
            // NOTE Function objects created using Function.prototype.bind do not
            // have a prototype property or the [[Code]], [[FormalParameters]], and
            // [[Scope]] internal properties.
            // XXX can't delete prototype in pure-js.

            // 22. Return F.
            return bound;
        }
    });

    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
    // use it in defining shortcuts.
    var owns = call.bind(ObjectPrototype.hasOwnProperty);
    var toStr = call.bind(ObjectPrototype.toString);
    var arraySlice = call.bind(array_slice);
    var arraySliceApply = apply.bind(array_slice);
    var strSlice = call.bind(StringPrototype.slice);
    var strSplit = call.bind(StringPrototype.split);
    var strIndexOf = call.bind(StringPrototype.indexOf);
    var pushCall = call.bind(array_push);
    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
    var arraySort = call.bind(ArrayPrototype.sort);

    //
    // Array
    // =====
    //

    var isArray = $Array.isArray || function isArray(obj) {
        return toStr(obj) === '[object Array]';
    };

    // ES5 15.4.4.12
    // http://es5.github.com/#x15.4.4.13
    // Return len+argCount.
    // [bugfix, ielt8]
    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
    defineProperties(ArrayPrototype, {
        unshift: function () {
            array_unshift.apply(this, arguments);
            return this.length;
        }
    }, hasUnshiftReturnValueBug);

    // ES5 15.4.3.2
    // http://es5.github.com/#x15.4.3.2
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
    defineProperties($Array, { isArray: isArray });

    // The IsCallable() check in the Array functions
    // has been replaced with a strict check on the
    // internal class of the object to trap cases where
    // the provided function was actually a regular
    // expression literal, which in V8 and
    // JavaScriptCore is a typeof "function".  Only in
    // V8 are regular expression literals permitted as
    // reduce parameters, so it is desirable in the
    // general case for the shim to match the more
    // strict and common behavior of rejecting regular
    // expressions.

    // ES5 15.4.4.18
    // http://es5.github.com/#x15.4.4.18
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

    // Check failure of by-index access of string characters (IE < 9)
    // and failure of `0 in boxedString` (Rhino)
    var boxedString = $Object('a');
    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

    var properlyBoxesContext = function properlyBoxed(method) {
        // Check node 0.6.21 bug where third parameter is not boxed
        var properlyBoxesNonStrict = true;
        var properlyBoxesStrict = true;
        var threwException = false;
        if (method) {
            try {
                method.call('foo', function (_, __, context) {
                    if (typeof context !== 'object') {
                        properlyBoxesNonStrict = false;
                    }
                });

                method.call([1], function () {
                    'use strict';

                    properlyBoxesStrict = typeof this === 'string';
                }, 'x');
            } catch (e) {
                threwException = true;
            }
        }
        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
    };

    defineProperties(ArrayPrototype, {
        forEach: function forEach(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var i = -1;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.forEach callback must be a function');
            }

            while (++i < length) {
                if (i in self) {
                    // Invoke the callback function with call, passing arguments:
                    // context, property value, property key, thisArg object
                    if (typeof T === 'undefined') {
                        callbackfn(self[i], i, object);
                    } else {
                        callbackfn.call(T, self[i], i, object);
                    }
                }
            }
        }
    }, !properlyBoxesContext(ArrayPrototype.forEach));

    // ES5 15.4.4.19
    // http://es5.github.com/#x15.4.4.19
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
    defineProperties(ArrayPrototype, {
        map: function map(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var result = $Array(length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.map callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self) {
                    if (typeof T === 'undefined') {
                        result[i] = callbackfn(self[i], i, object);
                    } else {
                        result[i] = callbackfn.call(T, self[i], i, object);
                    }
                }
            }
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.map));

    // ES5 15.4.4.20
    // http://es5.github.com/#x15.4.4.20
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
    defineProperties(ArrayPrototype, {
        filter: function filter(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var result = [];
            var value;
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.filter callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self) {
                    value = self[i];
                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
                        pushCall(result, value);
                    }
                }
            }
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.filter));

    // ES5 15.4.4.16
    // http://es5.github.com/#x15.4.4.16
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
    defineProperties(ArrayPrototype, {
        every: function every(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.every callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                    return false;
                }
            }
            return true;
        }
    }, !properlyBoxesContext(ArrayPrototype.every));

    // ES5 15.4.4.17
    // http://es5.github.com/#x15.4.4.17
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
    defineProperties(ArrayPrototype, {
        some: function some(callbackfn/*, thisArg */) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.some callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                    return true;
                }
            }
            return false;
        }
    }, !properlyBoxesContext(ArrayPrototype.some));

    // ES5 15.4.4.21
    // http://es5.github.com/#x15.4.4.21
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
    var reduceCoercesToObject = false;
    if (ArrayPrototype.reduce) {
        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
            return list;
        }) === 'object';
    }
    defineProperties(ArrayPrototype, {
        reduce: function reduce(callbackfn/*, initialValue*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduce callback must be a function');
            }

            // no value to return if no initial value and an empty array
            if (length === 0 && arguments.length === 1) {
                throw new TypeError('reduce of empty array with no initial value');
            }

            var i = 0;
            var result;
            if (arguments.length >= 2) {
                result = arguments[1];
            } else {
                do {
                    if (i in self) {
                        result = self[i++];
                        break;
                    }

                    // if array contains no values, no initial value to return
                    if (++i >= length) {
                        throw new TypeError('reduce of empty array with no initial value');
                    }
                } while (true);
            }

            for (; i < length; i++) {
                if (i in self) {
                    result = callbackfn(result, self[i], i, object);
                }
            }

            return result;
        }
    }, !reduceCoercesToObject);

    // ES5 15.4.4.22
    // http://es5.github.com/#x15.4.4.22
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
    var reduceRightCoercesToObject = false;
    if (ArrayPrototype.reduceRight) {
        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
            return list;
        }) === 'object';
    }
    defineProperties(ArrayPrototype, {
        reduceRight: function reduceRight(callbackfn/*, initial*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduceRight callback must be a function');
            }

            // no value to return if no initial value, empty array
            if (length === 0 && arguments.length === 1) {
                throw new TypeError('reduceRight of empty array with no initial value');
            }

            var result;
            var i = length - 1;
            if (arguments.length >= 2) {
                result = arguments[1];
            } else {
                do {
                    if (i in self) {
                        result = self[i--];
                        break;
                    }

                    // if array contains no values, no initial value to return
                    if (--i < 0) {
                        throw new TypeError('reduceRight of empty array with no initial value');
                    }
                } while (true);
            }

            if (i < 0) {
                return result;
            }

            do {
                if (i in self) {
                    result = callbackfn(result, self[i], i, object);
                }
            } while (i--);

            return result;
        }
    }, !reduceRightCoercesToObject);

    // ES5 15.4.4.14
    // http://es5.github.com/#x15.4.4.14
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
    defineProperties(ArrayPrototype, {
        indexOf: function indexOf(searchElement/*, fromIndex */) {
            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
            var length = ES.ToUint32(self.length);

            if (length === 0) {
                return -1;
            }

            var i = 0;
            if (arguments.length > 1) {
                i = ES.ToInteger(arguments[1]);
            }

            // handle negative indices
            i = i >= 0 ? i : max(0, length + i);
            for (; i < length; i++) {
                if (i in self && self[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        }
    }, hasFirefox2IndexOfBug);

    // ES5 15.4.4.15
    // http://es5.github.com/#x15.4.4.15
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
    defineProperties(ArrayPrototype, {
        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
            var length = ES.ToUint32(self.length);

            if (length === 0) {
                return -1;
            }
            var i = length - 1;
            if (arguments.length > 1) {
                i = min(i, ES.ToInteger(arguments[1]));
            }
            // handle negative indices
            i = i >= 0 ? i : length - Math.abs(i);
            for (; i >= 0; i--) {
                if (i in self && searchElement === self[i]) {
                    return i;
                }
            }
            return -1;
        }
    }, hasFirefox2LastIndexOfBug);

    // ES5 15.4.4.12
    // http://es5.github.com/#x15.4.4.12
    var spliceNoopReturnsEmptyArray = (function () {
        var a = [1, 2];
        var result = a.splice();
        return a.length === 2 && isArray(result) && result.length === 0;
    }());
    defineProperties(ArrayPrototype, {
        // Safari 5.0 bug where .splice() returns undefined
        splice: function splice(start, deleteCount) {
            if (arguments.length === 0) {
                return [];
            } else {
                return array_splice.apply(this, arguments);
            }
        }
    }, !spliceNoopReturnsEmptyArray);

    var spliceWorksWithEmptyObject = (function () {
        var obj = {};
        ArrayPrototype.splice.call(obj, 0, 0, 1);
        return obj.length === 1;
    }());
    defineProperties(ArrayPrototype, {
        splice: function splice(start, deleteCount) {
            if (arguments.length === 0) {
                return [];
            }
            var args = arguments;
            this.length = max(ES.ToInteger(this.length), 0);
            if (arguments.length > 0 && typeof deleteCount !== 'number') {
                args = arraySlice(arguments);
                if (args.length < 2) {
                    pushCall(args, this.length - start);
                } else {
                    args[1] = ES.ToInteger(deleteCount);
                }
            }
            return array_splice.apply(this, args);
        }
    }, !spliceWorksWithEmptyObject);
    var spliceWorksWithLargeSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
        var arr = new $Array(1e5);
        // note: the index MUST be 8 or larger or the test will false pass
        arr[8] = 'x';
        arr.splice(1, 1);
        // note: this test must be defined *after* the indexOf shim
        // per https://github.com/es-shims/es5-shim/issues/313
        return arr.indexOf('x') === 7;
    }());
    var spliceWorksWithSmallSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Opera 12.15 breaks on this, no idea why.
        var n = 256;
        var arr = [];
        arr[n] = 'a';
        arr.splice(n + 1, 0, 'b');
        return arr[n] === 'a';
    }());
    defineProperties(ArrayPrototype, {
        splice: function splice(start, deleteCount) {
            var O = ES.ToObject(this);
            var A = [];
            var len = ES.ToUint32(O.length);
            var relativeStart = ES.ToInteger(start);
            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

            var k = 0;
            var from;
            while (k < actualDeleteCount) {
                from = $String(actualStart + k);
                if (owns(O, from)) {
                    A[k] = O[from];
                }
                k += 1;
            }

            var items = arraySlice(arguments, 2);
            var itemCount = items.length;
            var to;
            if (itemCount < actualDeleteCount) {
                k = actualStart;
                var maxK = len - actualDeleteCount;
                while (k < maxK) {
                    from = $String(k + actualDeleteCount);
                    to = $String(k + itemCount);
                    if (owns(O, from)) {
                        O[to] = O[from];
                    } else {
                        delete O[to];
                    }
                    k += 1;
                }
                k = len;
                var minK = len - actualDeleteCount + itemCount;
                while (k > minK) {
                    delete O[k - 1];
                    k -= 1;
                }
            } else if (itemCount > actualDeleteCount) {
                k = len - actualDeleteCount;
                while (k > actualStart) {
                    from = $String(k + actualDeleteCount - 1);
                    to = $String(k + itemCount - 1);
                    if (owns(O, from)) {
                        O[to] = O[from];
                    } else {
                        delete O[to];
                    }
                    k -= 1;
                }
            }
            k = actualStart;
            for (var i = 0; i < items.length; ++i) {
                O[k] = items[i];
                k += 1;
            }
            O.length = len - actualDeleteCount + itemCount;

            return A;
        }
    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);

    var originalJoin = ArrayPrototype.join;
    var hasStringJoinBug;
    try {
        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
    } catch (e) {
        hasStringJoinBug = true;
    }
    if (hasStringJoinBug) {
        defineProperties(ArrayPrototype, {
            join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
            }
        }, hasStringJoinBug);
    }

    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
    if (hasJoinUndefinedBug) {
        defineProperties(ArrayPrototype, {
            join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(this, sep);
            }
        }, hasJoinUndefinedBug);
    }

    var pushShim = function push(item) {
        var O = ES.ToObject(this);
        var n = ES.ToUint32(O.length);
        var i = 0;
        while (i < arguments.length) {
            O[n + i] = arguments[i];
            i += 1;
        }
        O.length = n + i;
        return n + i;
    };

    var pushIsNotGeneric = (function () {
        var obj = {};
        var result = Array.prototype.push.call(obj, undefined);
        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
    }());
    defineProperties(ArrayPrototype, {
        push: function push(item) {
            if (isArray(this)) {
                return array_push.apply(this, arguments);
            }
            return pushShim.apply(this, arguments);
        }
    }, pushIsNotGeneric);

    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
    var pushUndefinedIsWeird = (function () {
        var arr = [];
        var result = arr.push(undefined);
        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
    }());
    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

    // ES5 15.2.3.14
    // http://es5.github.io/#x15.4.4.10
    // Fix boxed string bug
    defineProperties(ArrayPrototype, {
        slice: function (start, end) {
            var arr = isString(this) ? strSplit(this, '') : this;
            return arraySliceApply(arr, arguments);
        }
    }, splitString);

    var sortIgnoresNonFunctions = (function () {
        try {
            [1, 2].sort(null);
            [1, 2].sort({});
            return true;
        } catch (e) {}
        return false;
    }());
    var sortThrowsOnRegex = (function () {
        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
        try {
            [1, 2].sort(/a/);
            return false;
        } catch (e) {}
        return true;
    }());
    var sortIgnoresUndefined = (function () {
        // applies in IE 8, for one.
        try {
            [1, 2].sort(undefined);
            return true;
        } catch (e) {}
        return false;
    }());
    defineProperties(ArrayPrototype, {
        sort: function sort(compareFn) {
            if (typeof compareFn === 'undefined') {
                return arraySort(this);
            }
            if (!isCallable(compareFn)) {
                throw new TypeError('Array.prototype.sort callback must be a function');
            }
            return arraySort(this, compareFn);
        }
    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

    //
    // Object
    // ======
    //

    // ES5 15.2.3.14
    // http://es5.github.com/#x15.2.3.14

    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString');
    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
    var hasStringEnumBug = !owns('x', '0');
    var equalsConstructorPrototype = function (o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
        $window: true,
        $console: true,
        $parent: true,
        $self: true,
        $frame: true,
        $frames: true,
        $frameElement: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $external: true,
        $width: true,
        $height: true
    };
    var hasAutomationEqualityBug = (function () {
        /* globals window */
        if (typeof window === 'undefined') {
            return false;
        }
        for (var k in window) {
            try {
                if (!excludedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
                    equalsConstructorPrototype(window[k]);
                }
            } catch (e) {
                return true;
            }
        }
        return false;
    }());
    var equalsConstructorPrototypeIfNotBuggy = function (object) {
        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(object);
        }
        try {
            return equalsConstructorPrototype(object);
        } catch (e) {
            return false;
        }
    };
    var dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    var dontEnumsLength = dontEnums.length;

    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
    // can be replaced with require('is-arguments') if we ever use a build process instead
    var isStandardArguments = function isArguments(value) {
        return toStr(value) === '[object Arguments]';
    };
    var isLegacyArguments = function isArguments(value) {
        return value !== null &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            value.length >= 0 &&
            !isArray(value) &&
            isCallable(value.callee);
    };
    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

    defineProperties($Object, {
        keys: function keys(object) {
            var isFn = isCallable(object);
            var isArgs = isArguments(object);
            var isObject = object !== null && typeof object === 'object';
            var isStr = isObject && isString(object);

            if (!isObject && !isFn && !isArgs) {
                throw new TypeError('Object.keys called on a non-object');
            }

            var theKeys = [];
            var skipProto = hasProtoEnumBug && isFn;
            if ((isStr && hasStringEnumBug) || isArgs) {
                for (var i = 0; i < object.length; ++i) {
                    pushCall(theKeys, $String(i));
                }
            }

            if (!isArgs) {
                for (var name in object) {
                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
                        pushCall(theKeys, $String(name));
                    }
                }
            }

            if (hasDontEnumBug) {
                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                for (var j = 0; j < dontEnumsLength; j++) {
                    var dontEnum = dontEnums[j];
                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
                        pushCall(theKeys, dontEnum);
                    }
                }
            }
            return theKeys;
        }
    });

    var keysWorksWithArguments = $Object.keys && (function () {
        // Safari 5.0 bug
        return $Object.keys(arguments).length === 2;
    }(1, 2));
    var keysHasArgumentsLengthBug = $Object.keys && (function () {
        var argKeys = $Object.keys(arguments);
        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
    }(1));
    var originalKeys = $Object.keys;
    defineProperties($Object, {
        keys: function keys(object) {
            if (isArguments(object)) {
                return originalKeys(arraySlice(object));
            } else {
                return originalKeys(object);
            }
        }
    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

    //
    // Date
    // ====
    //

    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
    var aNegativeTestDate = new Date(-1509842289600292);
    var aPositiveTestDate = new Date(1449662400000);
    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
    var hasToDateStringFormatBug;
    var hasToStringFormatBug;
    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
    if (timeZoneOffset < -720) {
        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
    } else {
        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
    }

    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
    var originalGetMonth = call.bind(Date.prototype.getMonth);
    var originalGetDate = call.bind(Date.prototype.getDate);
    var originalGetHours = call.bind(Date.prototype.getHours);
    var originalGetMinutes = call.bind(Date.prototype.getMinutes);
    var originalGetSeconds = call.bind(Date.prototype.getSeconds);
    var originalGetMilliseconds = call.bind(Date.prototype.getMilliseconds);
    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var daysInMonth = function daysInMonth(month, year) {
        return originalGetDate(new Date(year, month, 0));
    };
    // defineProperty(object, property, replacement, true);
    defineProperties(Date.prototype, {
        getHours: Date.prototype.getHours,
        getMinutes: Date.prototype.getMinutes,
        getSeconds: Date.prototype.getSeconds,
        getMilliseconds: Date.prototype.getMilliseconds,
    },true);

    defineProperties(Date.prototype, {
        getFullYear: function getFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            if (year < 0 && originalGetMonth(this) > 11) {
                return year + 1;
            }
            return year;
        },
        getMonth: function getMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            var month = originalGetMonth(this);
            if (year < 0 && month > 11) {
                return 0;
            }
            return month;
        },
        getDate: function getDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            var month = originalGetMonth(this);
            var date = originalGetDate(this);
            if (year < 0 && month > 11) {
                if (month === 12) {
                    return date;
                }
                var days = daysInMonth(0, year + 1);
                return (days - date) + 1;
            }
            return date;
        },
        getUTCFullYear: function getUTCFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            if (year < 0 && originalGetUTCMonth(this) > 11) {
                return year + 1;
            }
            return year;
        },
        getUTCMonth: function getUTCMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            var month = originalGetUTCMonth(this);
            if (year < 0 && month > 11) {
                return 0;
            }
            return month;
        },
        getUTCDate: function getUTCDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            var month = originalGetUTCMonth(this);
            var date = originalGetUTCDate(this);
            if (year < 0 && month > 11) {
                if (month === 12) {
                    return date;
                }
                var days = daysInMonth(0, year + 1);
                return (days - date) + 1;
            }
            return date;
        }
    }, hasNegativeMonthYearBug);

    defineProperties(Date.prototype, {
        toUTCString: function toUTCString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = originalGetUTCDay(this);
            var date = originalGetUTCDate(this);
            var month = originalGetUTCMonth(this);
            var year = originalGetUTCFullYear(this);
            var hour = originalGetUTCHours(this);
            var minute = originalGetUTCMinutes(this);
            var second = originalGetUTCSeconds(this);
            return dayName[day] + ', ' +
                (date < 10 ? '0' + date : date) + ' ' +
                monthName[month] + ' ' +
                year + ' ' +
                (hour < 10 ? '0' + hour : hour) + ':' +
                (minute < 10 ? '0' + minute : minute) + ':' +
                (second < 10 ? '0' + second : second) + ' GMT';
        }
    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

    // Opera 12 has `,`
    defineProperties(Date.prototype, {
        toDateString: function toDateString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = this.getDay();
            var date = this.getDate();
            var month = this.getMonth();
            var year = this.getFullYear();
            return dayName[day] + ' ' +
                monthName[month] + ' ' +
                (date < 10 ? '0' + date : date) + ' ' +
                year;
        }
    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

    // can't use defineProperties here because of toString enumeration issue in IE <= 8
    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
        Date.prototype.toString = function toString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = this.getDay();
            var date = this.getDate();
            var month = this.getMonth();
            var year = this.getFullYear();
            var hour = this.getHours();
            var minute = this.getMinutes();
            var second = this.getSeconds();
            var timezoneOffset = this.getTimezoneOffset();
            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
            return dayName[day] + ' ' +
                monthName[month] + ' ' +
                (date < 10 ? '0' + date : date) + ' ' +
                year + ' ' +
                (hour < 10 ? '0' + hour : hour) + ':' +
                (minute < 10 ? '0' + minute : minute) + ':' +
                (second < 10 ? '0' + second : second) + ' GMT' +
                (timezoneOffset > 0 ? '-' : '+') +
                (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) +
                (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
        };
        if (supportsDescriptors) {
            $Object.defineProperty(Date.prototype, 'toString', {
                configurable: true,
                enumerable: false,
                writable: true
            });
        }
    }

    // ES5 15.9.5.43
    // http://es5.github.com/#x15.9.5.43
    // This function returns a String value represent the instance in time
    // represented by this Date object. The format of the String is the Date Time
    // string format defined in 15.9.1.15. All fields are present in the String.
    // The time zone is always UTC, denoted by the suffix Z. If the time value of
    // this object is not a finite Number a RangeError exception is thrown.
    var negativeDate = -62198755200000;
    var negativeYearString = '-000001';
    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

    var getTime = call.bind(Date.prototype.getTime);

    defineProperties(Date.prototype, {
        toISOString: function toISOString() {
            if (!isFinite(this) || !isFinite(getTime(this))) {
                // Adope Photoshop requires the second check.
                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
            }

            var year = originalGetUTCFullYear(this);

            var month = originalGetUTCMonth(this);
            // see https://github.com/es-shims/es5-shim/issues/111
            year += Math.floor(month / 12);
            month = ((month % 12) + 12) % 12;

            // the date time string format is specified in 15.9.1.15.
            var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
            year = (
                (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
                strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
            );

            for (var i = 0; i < result.length; ++i) {
                // pad months, days, hours, minutes, and seconds to have two digits.
                result[i] = strSlice('00' + result[i], -2);
            }
            // pad milliseconds to have three digits.
            return (
                year + '-' + arraySlice(result, 0, 2).join('-') +
                'T' + arraySlice(result, 2).join(':') + '.' +
                strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
            );
        }
    }, hasNegativeDateBug || hasSafari51DateBug);

    // ES5 15.9.5.44
    // http://es5.github.com/#x15.9.5.44
    // This function provides a String representation of a Date object for use by
    // JSON.stringify (15.12.3).
    var dateToJSONIsSupported = (function () {
        try {
            return Date.prototype.toJSON &&
                new Date(NaN).toJSON() === null &&
                new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
                Date.prototype.toJSON.call({ // generic
                    toISOString: function () { return true; }
                });
        } catch (e) {
            return false;
        }
    }());
    if (!dateToJSONIsSupported) {
        Date.prototype.toJSON = function toJSON(key) {
            // When the toJSON method is called with argument key, the following
            // steps are taken:

            // 1.  Let O be the result of calling ToObject, giving it the this
            // value as its argument.
            // 2. Let tv be ES.ToPrimitive(O, hint Number).
            var O = $Object(this);
            var tv = ES.ToPrimitive(O);
            // 3. If tv is a Number and is not finite, return null.
            if (typeof tv === 'number' && !isFinite(tv)) {
                return null;
            }
            // 4. Let toISO be the result of calling the [[Get]] internal method of
            // O with argument "toISOString".
            var toISO = O.toISOString;
            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
            if (!isCallable(toISO)) {
                throw new TypeError('toISOString property is not callable');
            }
            // 6. Return the result of calling the [[Call]] internal method of
            //  toISO with O as the this value and an empty argument list.
            return toISO.call(O);

            // NOTE 1 The argument is ignored.

            // NOTE 2 The toJSON function is intentionally generic; it does not
            // require that its this value be a Date object. Therefore, it can be
            // transferred to other kinds of objects for use as a method. However,
            // it does require that any such object have a toISOString method. An
            // object is free to use the argument key to filter its
            // stringification.
        };
    }

    // ES5 15.9.4.2
    // http://es5.github.com/#x15.9.4.2
    // based on work shared by Daniel Friesen (dantman)
    // http://gist.github.com/303249
    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
        // XXX global assignment won't work in embeddings that use
        // an alternate object for the context.
        /* global Date: true */
        /* eslint-disable no-undef */
        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
        /* eslint-disable no-implicit-globals */
        Date = (function (NativeDate) {
        /* eslint-enable no-implicit-globals */
        /* eslint-enable no-undef */
            // Date.length === 7
            var DateShim = function Date(Y, M, D, h, m, s, ms) {
                var length = arguments.length;
                var date;
                if (this instanceof NativeDate) {
                    var seconds = s;
                    var millis = ms;
                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
                        // work around a Safari 8/9 bug where it treats the seconds as signed
                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                        var sToShift = Math.floor(msToShift / 1e3);
                        seconds += sToShift;
                        millis -= sToShift * 1e3;
                    }
                    date = length === 1 && $String(Y) === Y ? // isString(Y)
                        // We explicitly pass it through parse:
                        new NativeDate(DateShim.parse(Y)) :
                        // We have to manually make calls depending on argument
                        // length here
                        length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) :
                        length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) :
                        length >= 5 ? new NativeDate(Y, M, D, h, m) :
                        length >= 4 ? new NativeDate(Y, M, D, h) :
                        length >= 3 ? new NativeDate(Y, M, D) :
                        length >= 2 ? new NativeDate(Y, M) :
                        length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y) :
                                      new NativeDate();
                } else {
                    date = NativeDate.apply(this, arguments);
                }
                if (!isPrimitive(date)) {
                    // Prevent mixups with unfixed Date object
                    defineProperties(date, { constructor: DateShim }, true);
                }
                return date;
            };

            // 15.9.1.15 Date Time String Format.
            var isoDateExpression = new RegExp('^' +
                '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +
                                          // 6-digit extended year
                '(?:-(\\d{2})' + // optional month capture
                '(?:-(\\d{2})' + // optional day capture
                '(?:' + // capture hours:minutes:seconds.milliseconds
                    'T(\\d{2})' + // hours capture
                    ':(\\d{2})' + // minutes capture
                    '(?:' + // optional :seconds.milliseconds
                        ':(\\d{2})' + // seconds capture
                        '(?:(\\.\\d{1,}))?' + // milliseconds capture
                    ')?' +
                '(' + // capture UTC offset component
                    'Z|' + // UTC capture
                    '(?:' + // offset specifier +/-hours:minutes
                        '([-+])' + // sign capture
                        '(\\d{2})' + // hours offset capture
                        ':(\\d{2})' + // minutes offset capture
                    ')' +
                ')?)?)?)?' +
            '$');

            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

            var dayFromMonth = function dayFromMonth(year, month) {
                var t = month > 1 ? 1 : 0;
                return (
                    months[month] +
                    Math.floor((year - 1969 + t) / 4) -
                    Math.floor((year - 1901 + t) / 100) +
                    Math.floor((year - 1601 + t) / 400) +
                    (365 * (year - 1970))
                );
            };

            var toUTC = function toUTC(t) {
                var s = 0;
                var ms = t;
                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
                    // work around a Safari 8/9 bug where it treats the seconds as signed
                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                    var sToShift = Math.floor(msToShift / 1e3);
                    s += sToShift;
                    ms -= sToShift * 1e3;
                }
                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
            };

            // Copy any custom methods a 3rd party library may have added
            for (var key in NativeDate) {
                if (owns(NativeDate, key)) {
                    DateShim[key] = NativeDate[key];
                }
            }

            // Copy "native" methods explicitly; they may be non-enumerable
            defineProperties(DateShim, {
                now: NativeDate.now,
                UTC: NativeDate.UTC
            }, true);
            DateShim.prototype = NativeDate.prototype;
            defineProperties(DateShim.prototype, { constructor: DateShim }, true);

            // Upgrade Date.parse to handle simplified ISO 8601 strings
            var parseShim = function parse(string) {
                var match = isoDateExpression.exec(string);
                if (match) {
                    // parse months, days, hours, minutes, seconds, and milliseconds
                    // provide default values if necessary
                    // parse the UTC offset component
                    var year = $Number(match[1]),
                        month = $Number(match[2] || 1) - 1,
                        day = $Number(match[3] || 1) - 1,
                        hour = $Number(match[4] || 0),
                        minute = $Number(match[5] || 0),
                        second = $Number(match[6] || 0),
                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
                        // When time zone is missed, local offset should be used
                        // (ES 5.1 bug)
                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
                        isLocalTime = Boolean(match[4] && !match[8]),
                        signOffset = match[9] === '-' ? 1 : -1,
                        hourOffset = $Number(match[10] || 0),
                        minuteOffset = $Number(match[11] || 0),
                        result;
                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
                    if (
                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&
                        minute < 60 && second < 60 && millisecond < 1000 &&
                        month > -1 && month < 12 && hourOffset < 24 &&
                        minuteOffset < 60 && // detect invalid offsets
                        day > -1 &&
                        day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
                    ) {
                        result = (
                            ((dayFromMonth(year, month) + day) * 24) +
                            hour +
                            (hourOffset * signOffset)
                        ) * 60;
                        result = ((
                            ((result + minute + (minuteOffset * signOffset)) * 60) +
                            second
                        ) * 1000) + millisecond;
                        if (isLocalTime) {
                            result = toUTC(result);
                        }
                        if (-8.64e15 <= result && result <= 8.64e15) {
                            return result;
                        }
                    }
                    return NaN;
                }
                return NativeDate.parse.apply(this, arguments);
            };
            defineProperties(DateShim, { parse: parseShim });

            return DateShim;
        }(Date));
        /* global Date: false */
    }

    // ES5 15.9.4.4
    // http://es5.github.com/#x15.9.4.4
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    //
    // Number
    // ======
    //

    // ES5.1 15.7.4.5
    // http://es5.github.com/#x15.7.4.5
    var hasToFixedBugs = NumberPrototype.toFixed && (
      (0.00008).toFixed(3) !== '0.000' ||
      (0.9).toFixed(0) !== '1' ||
      (1.255).toFixed(2) !== '1.25' ||
      (1000000000000000128).toFixed(0) !== '1000000000000000128'
    );

    var toFixedHelpers = {
        base: 1e7,
        size: 6,
        data: [0, 0, 0, 0, 0, 0],
        multiply: function multiply(n, c) {
            var i = -1;
            var c2 = c;
            while (++i < toFixedHelpers.size) {
                c2 += n * toFixedHelpers.data[i];
                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
                c2 = Math.floor(c2 / toFixedHelpers.base);
            }
        },
        divide: function divide(n) {
            var i = toFixedHelpers.size;
            var c = 0;
            while (--i >= 0) {
                c += toFixedHelpers.data[i];
                toFixedHelpers.data[i] = Math.floor(c / n);
                c = (c % n) * toFixedHelpers.base;
            }
        },
        numToString: function numToString() {
            var i = toFixedHelpers.size;
            var s = '';
            while (--i >= 0) {
                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
                    var t = $String(toFixedHelpers.data[i]);
                    if (s === '') {
                        s = t;
                    } else {
                        s += strSlice('0000000', 0, 7 - t.length) + t;
                    }
                }
            }
            return s;
        },
        pow: function pow(x, n, acc) {
            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
        },
        log: function log(x) {
            var n = 0;
            var x2 = x;
            while (x2 >= 4096) {
                n += 12;
                x2 /= 4096;
            }
            while (x2 >= 2) {
                n += 1;
                x2 /= 2;
            }
            return n;
        }
    };

    var toFixedShim = function toFixed(fractionDigits) {
        var f, x, s, m, e, z, j, k;

        // Test for NaN and round fractionDigits down
        f = $Number(fractionDigits);
        f = isActualNaN(f) ? 0 : Math.floor(f);

        if (f < 0 || f > 20) {
            throw new RangeError('Number.toFixed called with invalid number of decimals');
        }

        x = $Number(this);

        if (isActualNaN(x)) {
            return 'NaN';
        }

        // If it is too big or small, return the string value of the number
        if (x <= -1e21 || x >= 1e21) {
            return $String(x);
        }

        s = '';

        if (x < 0) {
            s = '-';
            x = -x;
        }

        m = '0';

        if (x > 1e-21) {
            // 1e-21 < x < 1e21
            // -70 < log2(x) < 70
            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
            z *= 0x10000000000000; // Math.pow(2, 52);
            e = 52 - e;

            // -18 < e < 122
            // x = z / 2 ^ e
            if (e > 0) {
                toFixedHelpers.multiply(0, z);
                j = f;

                while (j >= 7) {
                    toFixedHelpers.multiply(1e7, 0);
                    j -= 7;
                }

                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
                j = e - 1;

                while (j >= 23) {
                    toFixedHelpers.divide(1 << 23);
                    j -= 23;
                }

                toFixedHelpers.divide(1 << j);
                toFixedHelpers.multiply(1, 1);
                toFixedHelpers.divide(2);
                m = toFixedHelpers.numToString();
            } else {
                toFixedHelpers.multiply(0, z);
                toFixedHelpers.multiply(1 << (-e), 0);
                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
            }
        }

        if (f > 0) {
            k = m.length;

            if (k <= f) {
                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
            } else {
                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
            }
        } else {
            m = s + m;
        }

        return m;
    };
    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

    var hasToPrecisionUndefinedBug = (function () {
        try {
            return Number("1.0").toPrecision(undefined) === '1';
        } catch (e) {
            return true;
        }
    }());
    var originalToPrecision = NumberPrototype.toPrecision;
    defineProperties(NumberPrototype, {
        toPrecision: function toPrecision(precision) {
            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
        }
    }, hasToPrecisionUndefinedBug);

    //
    // String
    // ======
    //

    // ES5 15.5.4.14
    // http://es5.github.com/#x15.5.4.14

    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
    // Many browsers do not split properly with regular expressions or they
    // do not perform the split correctly under obscure conditions.
    // See http://blog.stevenlevithan.com/archives/cross-browser-split
    // I've tested in many browsers and this seems to cover the deviant ones:
    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
    //       [undefined, "t", undefined, "e", ...]
    //    ''.split(/.?/) should be [], not [""]
    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

    if (
        'ab'.split(/(?:ab)*/).length !== 2 ||
        '.'.split(/(.?)(.?)/).length !== 4 ||
        'tesst'.split(/(s)*/)[1] === 't' ||
        'test'.split(/(?:)/, -1).length !== 4 ||
        ''.split(/.?/).length ||
        '.'.split(/()()/).length > 1
    ) {
        (function () {
            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
            var maxSafe32BitInt = Math.pow(2, 32) - 1;

            StringPrototype.split = function (separator, limit) {
                var string = String(this);
                if (typeof separator === 'undefined' && limit === 0) {
                    return [];
                }

                // If `separator` is not a regex, use native split
                if (!isRegex(separator)) {
                    return strSplit(this, separator, limit);
                }

                var output = [];
                var flags = (separator.ignoreCase ? 'i' : '') +
                            (separator.multiline ? 'm' : '') +
                            (separator.unicode ? 'u' : '') + // in ES6
                            (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2, match, lastIndex, lastLength;
                var separatorCopy = new RegExp(separator.source, flags + 'g');
                if (!compliantExecNpcg) {
                    // Doesn't need flags gy, but they don't hurt
                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
                }
                /* Values for `limit`, per the spec:
                 * If undefined: 4294967295 // maxSafe32BitInt
                 * If 0, Infinity, or NaN: 0
                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
                 * If other: Type-convert, then use the above rules
                 */
                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
                match = separatorCopy.exec(string);
                while (match) {
                    // `separatorCopy.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        pushCall(output, strSlice(string, lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match.length > 1) {
                            /* eslint-disable no-loop-func */
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (typeof arguments[i] === 'undefined') {
                                        match[i] = void 0;
                                    }
                                }
                            });
                            /* eslint-enable no-loop-func */
                        }
                        if (match.length > 1 && match.index < string.length) {
                            array_push.apply(output, arraySlice(match, 1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= splitLimit) {
                            break;
                        }
                    }
                    if (separatorCopy.lastIndex === match.index) {
                        separatorCopy.lastIndex++; // Avoid an infinite loop
                    }
                    match = separatorCopy.exec(string);
                }
                if (lastLastIndex === string.length) {
                    if (lastLength || !separatorCopy.test('')) {
                        pushCall(output, '');
                    }
                } else {
                    pushCall(output, strSlice(string, lastLastIndex));
                }
                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
            };
        }());

    // [bugfix, chrome]
    // If separator is undefined, then the result array contains just one String,
    // which is the this value (converted to a String). If limit is not undefined,
    // then the output array is truncated so that it contains no more than limit
    // elements.
    // "0".split(undefined, 0) -> []
    } else if ('0'.split(void 0, 0).length) {
        StringPrototype.split = function split(separator, limit) {
            if (typeof separator === 'undefined' && limit === 0) {
                return [];
            }
            return strSplit(this, separator, limit);
        };
    }

    var str_replace = StringPrototype.replace;
    var replaceReportsGroupsCorrectly = (function () {
        var groups = [];
        'x'.replace(/x(.)?/g, function (match, group) {
            pushCall(groups, group);
        });
        return groups.length === 1 && typeof groups[0] === 'undefined';
    }());

    if (!replaceReportsGroupsCorrectly) {
        StringPrototype.replace = function replace(searchValue, replaceValue) {
            var isFn = isCallable(replaceValue);
            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
            if (!isFn || !hasCapturingGroups) {
                return str_replace.call(this, searchValue, replaceValue);
            } else {
                var wrappedReplaceValue = function (match) {
                    var length = arguments.length;
                    var originalLastIndex = searchValue.lastIndex;
                    searchValue.lastIndex = 0;
                    var args = searchValue.exec(match) || [];
                    searchValue.lastIndex = originalLastIndex;
                    pushCall(args, arguments[length - 2], arguments[length - 1]);
                    return replaceValue.apply(this, args);
                };
                return str_replace.call(this, searchValue, wrappedReplaceValue);
            }
        };
    }

    // ECMA-262, 3rd B.2.3
    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
    // non-normative section suggesting uniform semantics and it should be
    // normalized across all browsers
    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
    var string_substr = StringPrototype.substr;
    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
    defineProperties(StringPrototype, {
        substr: function substr(start, length) {
            var normalizedStart = start;
            if (start < 0) {
                normalizedStart = max(this.length + start, 0);
            }
            return string_substr.call(this, normalizedStart, length);
        }
    }, hasNegativeSubstrBug);

    // ES5 15.5.4.20
    // whitespace from: http://es5.github.io/#x15.5.4.20
    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
        '\u2029\uFEFF';
    var zeroWidth = '\u200b';
    var wsRegexChars = '[' + ws + ']';
    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
    defineProperties(StringPrototype, {
        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
        // http://perfectionkills.com/whitespace-deviations/
        trim: function trim() {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
        }
    }, hasTrimWhitespaceBug);
    var trim = call.bind(String.prototype.trim);

    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
    defineProperties(StringPrototype, {
        lastIndexOf: function lastIndexOf(searchString) {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            var S = $String(this);
            var searchStr = $String(searchString);
            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
            var start = min(max(pos, 0), S.length);
            var searchLen = searchStr.length;
            var k = start + searchLen;
            while (k > 0) {
                k = max(0, k - searchLen);
                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
                if (index !== -1) {
                    return k + index;
                }
            }
            return -1;
        }
    }, hasLastIndexBug);

    var originalLastIndexOf = StringPrototype.lastIndexOf;
    defineProperties(StringPrototype, {
        lastIndexOf: function lastIndexOf(searchString) {
            return originalLastIndexOf.apply(this, arguments);
        }
    }, StringPrototype.lastIndexOf.length !== 1);

    // ES-5 15.1.2.2
    /* eslint-disable radix */
    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
    /* eslint-enable radix */
        /* global parseInt: true */
        parseInt = (function (origParseInt) {
            var hexRegex = /^[\-+]?0[xX]/;
            return function parseInt(str, radix) {
                var string = trim(String(str));
                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
                return origParseInt(string, defaultedRadix);
            };
        }(parseInt));
    }

    // https://es5.github.io/#x15.1.2.3
    if (1 / parseFloat('-0') !== -Infinity) {
        /* global parseFloat: true */
        parseFloat = (function (origParseFloat) {
            return function parseFloat(string) {
                var inputString = trim(String(string));
                var result = origParseFloat(inputString);
                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
            };
        }(parseFloat));
    }

    if (String(new RangeError('test')) !== 'RangeError: test') {
        var errorToStringShim = function toString() {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            var name = this.name;
            if (typeof name === 'undefined') {
                name = 'Error';
            } else if (typeof name !== 'string') {
                name = $String(name);
            }
            var msg = this.message;
            if (typeof msg === 'undefined') {
                msg = '';
            } else if (typeof msg !== 'string') {
                msg = $String(msg);
            }
            if (!name) {
                return msg;
            }
            if (!msg) {
                return name;
            }
            return name + ': ' + msg;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        Error.prototype.toString = errorToStringShim;
    }

    if (supportsDescriptors) {
        var ensureNonEnumerable = function (obj, prop) {
            if (isEnum(obj, prop)) {
                var desc = Object.getOwnPropertyDescriptor(obj, prop);
                if (desc.configurable) {
                    desc.enumerable = false;
                    Object.defineProperty(obj, prop, desc);
                }
            }
        };
        ensureNonEnumerable(Error.prototype, 'message');
        if (Error.prototype.message !== '') {
            Error.prototype.message = '';
        }
        ensureNonEnumerable(Error.prototype, 'name');
    }

    if (String(/a/mig) !== '/a/gim') {
        var regexToString = function toString() {
            var str = '/' + this.source + '/';
            if (this.global) {
                str += 'g';
            }
            if (this.ignoreCase) {
                str += 'i';
            }
            if (this.multiline) {
                str += 'm';
            }
            return str;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        RegExp.prototype.toString = regexToString;
    }
}));

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
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= (1 << 28)) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    while (count >>= 1) { // shift it by multiple of 2 because this is binary summation of series
       str += str; // binary summation
    }
    str += str.substring(0, str.length * count - str.length);
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

/*
    json2.js
    2015-05-03

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse. This file is provides the ES5 JSON capability to ES3 systems.
    If a project might run on IE8 or earlier, then this file should be included.
    This file does nothing on ES5 systems.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10
                            ? '0' + n
                            : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date
                    ? 'Date(' + this[key] + ')'
                    : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? '0' + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate()) + 'T' +
                        f(this.getUTCHours()) + ':' +
                        f(this.getUTCMinutes()) + ':' +
                        f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? '"' + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"'
            : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ': '
                                    : ':'
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (k !== "this")
                    {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                    gap
                                        ? ': '
                                        : ':'
                                ) + v);
                            }
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, '@')
                        .replace(rx_three, ']')
                        .replace(rx_four, '')
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

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


/* An extenscript compatable log library with shims for basic Console calls
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
}($.global, function (root, logType) {// IIFE straight into the UMD, attaching to the $.global space

    $.strict = true;
    $.writeln("Making extendscript LogFile...");

    var LogFile = { };

//helper functions

    // Make a folder and return a file handle.
    function _createLogFile(typeString) {
        var logFileDir = new Folder(_getDirString());
        if (!logFileDir.exists) {
            logFileDir.create();
        }

        var logFileName = _getISODate() + "-" + typeString + ".log";
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
                var nameSearch = myFile.name.search(typeString + ".log");
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
        return (File($.fileName).exists) ? File($.fileName).path + "/logs/" : Folder.desktop + "/ExtendScript_Log_UnsavedScripts/"; // account for un-saved or temp scripts
    }

    // Overly complex ISO date string constructor
    function _getISODate() {
        var myDate = new Date();
        // forward compatability with ES5 Shims
        if (typeof myDate.getFullYear !== "function") {
            myDate.getFullYear = function() {
                return (myDate.getYear + 1900); // offset from year 1900
            }
        }

        var myYear = myDate.getFullYear().toString();
        var myMonth = _zeroPad(myDate.getMonth() + 1, 2); // counts from 0
        var myDay = _zeroPad(myDate.getDate(), 2);
        var myHours = _zeroPad(myDate.getHours(), 2);
        var myMinutes = _zeroPad(myDate.getMinutes(), 2);
        var mySeconds = _zeroPad(myDate.getSeconds(), 2);

        return myYear + "-" + myMonth + "-" + myDay + "_" + myHours + myMinutes + mySeconds;
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

        return LogFile;
    }

    //primary method
    LogFile.writeln = LogFile.log = function (logMessage) {
        LogFile.file.open("a+");
        LogFile.file.writeln(new Date() + ": " + logMessage);
        LogFile.file.close();

        return LogFile;
    }

    //cleanup
    LogFile.clear = LogFile.log = function (logMessage) {
        LogFile.file.open("w");
        LogFile.file.close();

        return LogFile;
    }

    //remove this file
    LogFile.remove = function() {
        if(File(LogFile.file).exists) {
            LogFile.file.remove();
        }

        return LogFile;
    },

    // remove all similar files but this one
    LogFile.removeOld = function () {
        _removeLogFiles();
        return LogFile;
    },

    // remove all similar files
    LogFile.removeAll = function () {
        _removeLogFiles(false);
        return LogFile;
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
0  - trace
1  - debug
2  - info (also default if not specified)
3  - warn
10 - error

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
"new" constructor takes 4 optional arguments.
First arg is an alternate root object to tack on a 'log' and 'console' alias
By passing $.global as first arg, we get global log and console objects!

```
root = $.global;// root to add convenience alisases to
logName = "specialLog";// name other than "defualt"
logLevel = 2;// log level filter
useLogFile = true;// make a log file? Deafults to false
keepOldLogs = false;// keep or delete all but latest log file?

myLog = new ExtendScript_Log(root, logName, logLevel, useLogFile, keepOldLogs);
```

## Use the log

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
```log.error('Not a good thing', true);```

Third argument

# Bonus Features
## Log file:
Tries to make a log file in ./logs or to ~/Desktop/ExtendScript_Log_UnsavedScripts/
Needs [ExtendScript_LogFile](https://github.com/MaxJohnson/extendscript_logfile)
Note: Differnt logs get different log files, even if they all print to the same console.

## CEP event:
Tries to send type, level, label, and message as a packet in a custom event "ExtendScript_Log"
No JSON support needed in the script to send, but you have to un-strigify on receipt:
data string looks like: `{type: "default", level:2, label:"info", message:"Important things!"}`
Note: the "clear()" function sends a packet with "clear" label and log level 99.
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
}($.global, function (root, logName, logLevel, useLogFile , keepOldLogs) {// IIFE straight into the UMD, attaching to the $.global space

    $.strict = true;
    $.writeln("Making extendscript Log...");

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
            str += "\t" + $.stack;
        }
        return str;
    };

    // Safety wrapper and fallback for stringify attempt
    _stringifyMessage = function _stringifyMessage(message)
    {
        if(typeof message === "string") {return message;}
        try {
            return JSON.stringify(message);
        }
        catch (e) {
            return message.toString();
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
    Log.init = function(logName, logLevel, useLogFile, keepOldLogs) {
        Log.level = (typeof logLevel == "number") ? logLevel : 0;
        Log.type = (typeof logName == "string")? logName.toLowerCase():"";

        if (useLogFile && typeof ExtendScript_LogFile == "function") {

            if (!Log.logFile) {
                Log.logFile = new ExtendScript_LogFile(Log, logName);
                if (!keepOldLogs) {
                    Log.logFile.removeOld();
                }
            }
        }
        return Log;
    };


    /**
     * Master log function to filter log, print, send event, write to file.
     * @method log
     * @param   {*}         message   message to print to log
     * @param   {Number}    level     log level 0 being least urgent
     * @param   {String}    label     Label for log level ex. "info"
     * @param   {boolean}   useAlert  true to invoke blocking alert dialog
     * @return {Object}              self reference for chaining
     */
    Log.log = function log(message, level, label, useAlert) {
        var file;
        level = level || 2;
        // try to add label (ex. "[WARN] ")
        var prefix = (typeof label == "string" && label.length)? "["+label.toLowerCase()+"] ":'';

        // try to JSON strigify
        if(typeof message !=="string") { message = _stringifyMessage(message); }


        // reject by level
        if ( level < Log.level ) {
            return;
        }

        // Send message to Extendscript console
        if ($) {
            if (Log.type.length){
                $.writeln( Log.type.toLowerCase()+":"+prefix + message);
            } else {
                $.writeln( prefix + message);
            }
        }


        // Send message to CEP (panel) context via event packet
        // un-strigify on receipt for:
        // {type: "default", level:0, label:"log", message:"Important things!"}
        if(typeof _xLib !== "undefined")
        {
            if(typeof label !== 'string' || !label.length){ label = "log";}
            var eventObj = new CSXSEvent();
            eventObj.type = "ExtendScript_Log";
            eventObj.data = '{"type":"'+Log.type+'","level":"'+level+'","label":"'+label+'","message":"'+message+'"}';
            eventObj.dispatch();
        }

        // Write to log file
        if ( Log.logFile instanceof Object && Log.logFile.file instanceof File) {
            Log.logFile.writeln(prefix + message);
        }

        // Popup blocking alert
        if (useAlert) {
            alert(message);
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
            if(message instanceof Error) {
                message = _getExceptionMessage(message);
            }
            return Log.log(_stringifyMessage(message), level, name, useAlert);
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

    return Log.init(logName, logLevel, useLogFile, keepOldLogs);

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

// shim in log
try{ log.log; }
catch(e){
    log = {};
    log.log = function(i){ $.writeln(i); };
}

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
    }

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
            w.cbNoAskAgain.onClick = function(){ _UICache[id].skip = w.cbNoAskAgain.value };
        }
        return w;
    }

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

        for( btn in buttons )
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
    }

    /**
     * Get cached UI options object, if anyway
     * @param  {number} id ID number of the UI element
     * @return {Object}    Cached UI options object or undefined
     */
    Dialogs.getCached = function (id) {
        if(typeof id === "undefined"){id=-1};
        return _UICache[id];
    }

    /**
     * Get cached UI options object, if anyway
     * @param  {number} id ID number of the UI element
     * @return {Object}    Cached UI options object or undefined
     */
    Dialogs.clearCached = function (id){
        if(typeof id === "undefined"){id=-1};
        _UICache[id] = undefined;
    }

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
    }

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
        w.onShow = function(){ w.layout.resize (true); }
        w.onResize = function(){ if(w.message) w.message.size.width = w.size.width-10; }
        w.center();
        return w.show();
    }

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
        w.onShow = function(){ w.layout.resize (true); }
        w.onResize = function(){ if(w.message) w.message.size.width = w.size.width-10; }
        w.center();

        if( w.show() !== 0 )
        {
            return _UICache[args.id].value;
        }
    }

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
        w.onShow = function(){ w.layout.resize (true); }
        w.onResize = function(){ if(w.message) w.message.size.width = w.size.width-10; }
        w.center();

        if( w.show()!== 0 )
        {
            return _UICache[args.id].value;
        }
    }

    // mimic functionality from native JS dialogs...
    function alertNative (arg) {
        var args = (typeof arg == "object")? arg:{title:"Alert",id:-1,text:arg, buttons:["OK"]};
        Dialogs.alert(arg);
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
            try {
                root.alert = alertNative;
                root.confirm = confirmNative;
                root.prompt = promptNative;
            } catch(e) {
                log.log("[ERROR] "+e.message);
            }
        }
    }

    // replace native js dialogs with ours
    if(overrideNative === true) {
        $.sleep(200);// sleep or sometimes native alert is read-only...
        try {
            $.global.alert = alertNative;
            $.global.confirm = confirmNative;
            $.global.prompt = promptNative;
        } catch(e) {
            log.log("[ERROR] "+e.message);
        }
    }

    // return a reference
    return Dialogs;

}));


    $.writeln("Libs for shims, shams, polyfills, and party hats loaded...");
}// end dependency check
else {
    console.log("ES5 function [].map() found. Assume we already shim-shammed this party. Not reinitializing dependencies.");
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
            if (patterns[keys[j]] !== collection.prop(id, keys[j]))
                return false;
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
    log.log("Lifter.layers loading...");
    /**
     * @namespace
     * @alias Lifter.layers
     */
    var layers = {};

    /** Utility object used to temporary hold data during heavy operations. @private */
    var _cache = {};

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

        // NOTE: this does not indicate that a layer is a group or set. use 'type' prop for that.
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

        // Cleanup cache
        delete _cache['hasBackground'];
        delete _cache['layerCount'];
        // Cache some information to speed up the operation
        _cache['hasBackground'] = layers.hasBackground();
        _cache['layerCount'] = layers.count();

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

        // Cleanup cache
        delete _cache['hasBackground'];
        delete _cache['layerCount'];

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
                    throw new Error('Unable to find '+typeIDToStringID(prop.typeId)+': layers do not have that property or it is un-gettable.');
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
     * @return {Array} An array containing seach results.
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
     * Gets a list of all parents of the active or specified layer (or topmost layer of active layers).
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return {Array} LayerId of the all layer's parent groups in ordered list.
     */
    layers.getParentGroupIds = function (layerId)
    {
        var parentIDs = [];
        var tgtId = (typeof layerId == "number" )? layerId:layers.prop("layerId");
        // log.log(tgtId);

        // run in reverse so we can go "top to bottom"
        layers.forEach( function (itemIndex, layerId) {

            //log.log(itemIndex + ", " +layers.prop(layerId, "name"));

            if( layers.prop(layerId, "type") == LayerType.SETSTART )
            {
                parentIDs.push(layers.prop(layerId,"name"));
            }
            else if( layers.prop(layerId, "type") == LayerType.SETEND )
            {
                parentIDs.pop();
            }
            else if( layerId == tgtId )
            {
                // log.log(parentIDs);
                return parentIDs;
            }
        },null,true);

        return parentIDs;
    };

    /**
     * Gets the identifier of all layers.
     * @return {Array} LayerId of the all layers.
     */
    layers.getAllLayerIds = function ()
    {
        var allIDs = [];
        layers.forEach(function(itemIndex, layerId){allIDs.push(layerId);} );
        return allIDs;
    };

    /**
     * Gets the identifier of all active layers.
     * @return {Array} LayerIds of the currently active layers.
     */
    layers.getAllActiveLayerIds = function ()
    {
        var activeLayerIds = [];
        // Filter selected layers
        var docRef = new ActionReference();
        docRef.putEnumerated( c2id("Dcmn"), c2id("Ordn"), c2id("Trgt") );
        var docDesc = executeActionGet(docRef);

        // Get target layer ids
        if( docDesc.hasKey(s2id('targetLayersIDs'))) {
            targetLayersIDsDesc = docDesc.getList( s2id('targetLayersIDs'));

            for(var ii = 0; ii < targetLayersIDsDesc.count; ii++) {
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
     * @param  {Array}  layerIds list of layer ids to save
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
     * Sets the currently active layer to the one identified by the passed LayerId.
     * @param {Number,Array} layerIdList Layer identifier or array of ids.
     * @param {Boolean} [makeVisible] Whether to make the layer RGB channels visible.
     * @param {Boolean} [add] Whether to add or replace active layer selection.
     * @return Chained reference to layer utilities.
     */
    layers.stack.makeActive = function (layerIdList, makeVisible, add)
    {
        // clear active if not adding
        if ( add !== true )
            layers.stack.makeNoneActive();

        //support single layer selection
        layerIdList = [].concat(layerIdList);

        for(i=0; i<layerIdList.length; i++) {
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
     * Provides methods to navigate across the layers stack.
     */
    layers.groups = {};

    /**
     * Test if layer is a group
     * @method
     * @param  {Number} layerId Id of the layer to flatten
     * @return {Boolean} Layer is a group or not.
     */
    layers.groups.isGroup = function(layerId) {
        return layers.prop(layerId, 'type') == LayerType.SETSTART;
    },
    layers.isGroup = layers.groups.isGroup,// convenience alias


    /**
     * Make a new group with option to add layers from selected or Id array
     * @method
     * @param  {String} name      Name for new group
     * @param  {Boolean} addLayers Add layers to group or not
     * @param  {Number,Array} layerIds  layer Id or Array of layer Ids
     * @return Chained reference to layer utilities.
     */
    layers.groups.make = function(name, addLayers, layerIds, color)
    {
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
        return layers;
    },

    /**
     * Merge (flatten) a layer group
     * @method
     * @param  {Number} layerId Id of the layer to flatten
     * @return Chained reference to layer utilities.
     */
    layers.groups.merge = function(layerId) {
        layers.stack.makeActive(layerId);
        executeAction(c2id("Mrg2"), undefined, DialogModes.NO);
        return layers;
    },


    // Smart Objects
    /**
     * Provides methods to work with smart objects.
     */
    layers.smartObjects = {};

    function _ensureSmartObjectIsActive(layerId) {

        // Make sure target layer is active
        if (typeof layerId === 'number')
            layers.stack.makeActive(layerId);

        if(layers.prop('kind')!==LayerKind.SMARTOBJECT)
            throw new Error('Layer '+layers.prop(null, 'name')+' must be a smart object.');

    }

    /** TODO: coverage for these guys...if possible

        PSString._add("placedLayerConvertToEmbedded");
        PSString._add("placedLayerConvertToLinked");
        PSString._add("placedLayerMakeCopy");
        PSString._add("placedLayerEmbedAll");
        PSString._add("placedLayerExportContents");
        PSString._add("placedLayerRelinkToFile");
        PSString._add("placedLayerRelinkToLibraries");
        PSString._add("placedLayerReplaceContents");
        PSString._add("placedLayerReplaceMissing");
        PSString._add("placedLayerRevealInOS");
        PSString._add("placedLayerUpdateAllModified");
        PSString._add("placedLayerUpdateModified");

    */

    /**
     * Converts the specified layer(s) to a smart object and makes it active.
     * @param {Number,Array,null} layerId Layer identifier(s), defaults to currently active layer if null or not specified.
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
     * @param {Number,null} layerId Layer identifier, defaults to currently active layer if null or not specified.
     * @param {String, File} imageFile Path or File to valid image.
     * @param {Boolean} [skipPrompt] If true, and no image file passed in, autocreate new file name.
     * @return Chained reference to layer utilities.
     */
    layers.smartObjects.makeCopy = function (layerId, imageFile, skipPrompt)
    {
        _ensureSmartObjectIsActive(layerId);

        var srcLinkPath =  layers.prop('smartObject.link');
        if( srcLinkPath ) {

            // get name info
            var srcFile = new File (srcLinkPath);
            var searchIdx = srcFile.name.lastIndexOf('.');

            var srcLinkExtension = srcFile.name.slice(searchIdx, srcFile.name.length);
            var srcLinkBaseName = srcFile.name.slice(0,searchIdx);

            // try to increment name if numbered
            var srcLinkNameNumber = srcLinkBaseName.match(/\d*$/)[0];//get numbers off end of basename
            if(srcLinkNameNumber.length)
            {
                srcLinkBaseName = srcLinkBaseName.substr(0,srcLinkBaseName.length-srcLinkNameNumber.length);
                srcLinkBaseName += Number( Number(srcLinkNameNumber) + 1 ).pad( srcLinkNameNumber.length );
            }
            else
            {
                srcLinkBaseName += '_02';
            }

            // New file name... assemble!
            var newLinkName = srcLinkBaseName+srcLinkExtension;

            // default ask for new file name with autofilled prompt
            if( !skipPrompt ) {
                newLinkName = prompt("Enter a name for the new file to be linked...", newLinkName, "New File Name");
                // sanity check and sanitize
                if( typeof newLinkName !== "string" ){return;}

                if( newLinkName.search(srcLinkExtension) === -1 )
                {
                    newLinkName += srcLinkExtension;
                }
            }

            newLinkFile = new File (srcFile.parent +"/"+ newLinkName);
            if( newLinkFile.absoluteURI === srcFile.absoluteURI)
            {
                alert ("But... that's the same file... "+newLinkName, "Nooooooo!");
                return;
            }

            // Existing file check and overwrite confirmation included in copy()
            newLinkFile = Lifter.system.files.copy(srcFile, newLinkFile);

            // Verify
            if( typeof newLinkFile === "undefined" ){return;}
            if( !newLinkFile.exists )
            {
                log.error('Error copying file. No file found at destination: '+newLinkFile.name);
                return;
            }

            var newFilePath = newLinkFile.absoluteURI;

            // // ask smart object for "more" info
            var soMoreDesc = layers.prop('smartObjectMore');

            var compAppliedID = soMoreDesc.getInteger(s2id('comp'));

            // get SmartObject's inner canvas size
            // var sizeKeyDesc = getPropByName(soMoreDesc,'Sz  ');
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
            layers.smartObjects.place(newLinkFile, true, soX, soY, soScaleX, soScaleY);


            layers.smartObjects.setComp(null, compAppliedID );
        } else {
            executeAction(s2id('placedLayerMakeCopy'), undefined, _dialogModesNo);
        }
        return layers;
    };

    /**
     * Opens smart object layer for editing.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
        delete _cache['hasBackground'];
        delete _cache['layerCount'];

        return layers;
    };

    /**
     * Place a smart object with for link instead
     * @param {String, File} imageFile Path or File to valid image.
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

        try
        {
            // Place now, position and scale after.
            var descPlace = new ActionDescriptor();
            var idPrc = c2id( "#Prc" );
            descPlace.putPath( c2id( "null" ), _ensureFile(imageFile) );
            descPlace.putEnumerated( c2id( "FTcs" ), c2id( "QCSt" ), c2id( "Qcsa" ) );

            if(isLink)
                descPlace.putBoolean( c2id( "Lnkd" ), true );

            executeAction( c2id( "Plc " ), descPlace, DialogModes.NO );

            var newLinkedLayer = app.activeDocument.activeLayer;

            // ask smart object for "more" info
            var soMoreDesc = layers.prop('smartObjectMore');

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

            var tgtWidth = (scaleX/100)*soWidthInner;
            var tgtHeight = (scaleY/100)*soHeightInner;

            // Smart Object scaling is affected by SO internal DPI...
            var soDPIRatio = soMoreDesc.getDouble(s2id('resolution'))/app.activeDocument.resolution;

            var newScaleX = (tgtWidth/soWidthPlaced) / soDPIRatio;
            var newScaleY = (tgtHeight/soHeightPlaced) / soDPIRatio;

            newScaleX *= 100;
            newScaleY *= 100;

            if( typeof posX == "number" && typeof posY == "number" ) {
                newLinkedLayer.translate( -( soX - posX ) + " px", -( soY - posY ) + " px" );
            }

            newLinkedLayer.resize(newScaleX,newScaleY, AnchorPosition.TOPLEFT);
        }
        catch ( e )
        {
            throw new Error('Can not place new smart object...'+e.message);
        }

        return layers;
    };

    /**
     * Convert a smart object to smart link
     * @param {Number,Array,null} layerId Layer identifier(s), defaults to currently active layer if null or not specified.
     * @param {String, File} imageFile Path or File to valid image.
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

            try
            {
                var ref = new ActionReference();
                _getLayerIdRef(layerId, ref);

                var desc = new ActionDescriptor();

                desc.putReference( c2id( "null" ), ref );
                desc.putPath( c2id( "Usng" ), _ensureFile(imageFile) );
                executeAction( s2id( "placedLayerConvertToLinked" ), desc, DialogModes.NO );
            }
            catch ( e )
            {
                throw new Error('Can not convert to linked object...'+e.message);
            }
        }

        return layers;
    };

    /**
     * Sets the layer comp for a Smart Object instance.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @param {Number} [compID] The unique ID of the layer comp to set instance to.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return {Boolean} True if user or vector mask present on layer.
     */
    layers.masks.hasMask = function (layerId)
    {
        // filter mask is not checked here. check separately.
        return (layers.prop(layerId, 'hasUserMask')||layers.prop(layerId, 'hasVectorMask'));
    };

    /**
     * Check for user (pixel) mask on the specified layer.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return {Boolean} True if user mask present on layer.
     */
    layers.masks.hasLayerMask = function (layerId)
    {
        // filter mask is not checked here. check separately.
        return layers.prop(layerId, 'hasUserMask');
    };

    /**
     * Check for vector mask on the specified layer.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return {Boolean} True if vector mask present on layer.
     */
    layers.masks.hasVectorMask = function (layerId)
    {
        // filter mask is not checked here. check separately.
        return layers.prop(layerId, 'hasVectorMask');
    };

    /**
     * Check for filter mask on the specified layer.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return {Boolean} True if filter mask present on layer.
     */
    layers.masks.hasFilterMask = function (layerId)
    {
        return layers.prop(layerId, 'hasFilterMask');
    };

    // add/remove masks

    /**
     * Adds a layer mask to the specified layer and makes it active.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     *
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
    * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
    * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
    * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
    * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return Chained reference to layer utilities.
     */
    layers.masks.setLayerMaskLink = function ()
    {
        _overloadFunction_Number_Bool(arguments, undefined, true);

        if(layers.masks.hasLayerMask(arguments[0])) {
            layers.prop(arguments[0],'layerMaskLinked',arguments[1]);
        }
    };


    /**
     * Set mask linked state for vector mask
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
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
     * Refines the layer mask of the specified layer.
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null.
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
     * @param {Number} [layerId] Layer identifier, defaults to currently active layer if null or not specified.
     * @return Chained reference to layer utilities.
     */
    layers.masks.invertLayerMask = function (layerId)
    {
        layers.masks.makeLayerMaskVisible(layerId, true);
        executeAction( c2id('Invr'), undefined, DialogModes.NO );
        layers.masks.makeLayerMaskVisible(layerId, false);

        return layers;
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
    log.log("Lifter.layers done...");
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
    log.log("LOADING Lifter.selection ...");

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
    log.log("Lifter.selection done.");
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

log.log("Lifter is ready now.");
}).call($.global);
}// if(typeof Lifter !== "object")
/*!
 * LIFTER IS READY NOW
 */
