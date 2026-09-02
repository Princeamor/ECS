!function(){function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?e(Object(o),!0).forEach((function(e){n(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function n(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}System.register([],(function(e,n){"use strict";return{execute:function(){function n(e,t){return function(){return e.apply(t,arguments)}}// utils is a library of generic helper functions non-specific to axios
const{toString:r}=Object.prototype,{getPrototypeOf:o}=Object,i=(s=Object.create(null),e=>{const t=r.call(e);return s[t]||(s[t]=t.slice(8,-1).toLowerCase())});var s;const a=e=>(e=e.toLowerCase(),t=>i(t)===e),c=e=>t=>typeof t===e
/**
       * Determine if a value is an Array
       *
       * @param {Object} val The value to test
       *
       * @returns {boolean} True if value is an Array, otherwise false
       */,{isArray:u}=Array,l=c("undefined");
/**
       * Determine if a value is an ArrayBuffer
       *
       * @param {*} val The value to test
       *
       * @returns {boolean} True if value is an ArrayBuffer, otherwise false
       */
const f=a("ArrayBuffer");
/**
       * Determine if a value is a view on an ArrayBuffer
       *
       * @param {*} val The value to test
       *
       * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
       */
/**
       * Determine if a value is a String
       *
       * @param {*} val The value to test
       *
       * @returns {boolean} True if value is a String, otherwise false
       */
const d=c("string"),p=c("function"),h=c("number"),m=e=>null!==e&&"object"==typeof e
/**
       * Determine if a value is a Boolean
       *
       * @param {*} thing The value to test
       * @returns {boolean} True if value is a Boolean, otherwise false
       */,y=e=>{if("object"!==i(e))return!1;const t=o(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},b=a("Date"),g=a("File"),O=a("Blob"),w=a("FileList"),E=a("URLSearchParams");
/**
       * Determine if a value is a Function
       *
       * @param {*} val The value to test
       * @returns {boolean} True if value is a Function, otherwise false
       */
/**
       * Iterate over an Array or an Object invoking a function for each item.
       *
       * If `obj` is an Array callback will be called passing
       * the value, index, and complete array for each item.
       *
       * If 'obj' is an Object callback will be called passing
       * the value, key, and complete object for each property.
       *
       * @param {Object|Array} obj The object to iterate
       * @param {Function} fn The callback to invoke for each item
       *
       * @param {Boolean} [allOwnKeys = false]
       * @returns {any}
       */
function S(e,t,{allOwnKeys:n=!1}={}){// Don't bother if no value provided
if(null==e)return;let r,o;if(// Force an array if not already something iterable
"object"!=typeof e&&(/*eslint no-param-reassign:0*/e=[e]),u(e))// Iterate over array values
for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{// Iterate over object keys
const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let s;for(r=0;r<i;r++)s=o[r],t.call(null,e[s],s,e)}}function R(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const A=/*eslint no-undef:0*/"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,j=e=>!l(e)&&e!==A
/**
       * Accepts varargs expecting each argument to be an object, then
       * immutably merges the properties of each object and returns result.
       *
       * When multiple objects contain the same key the later object in
       * the arguments list will take precedence.
       *
       * Example:
       *
       * ```js
       * var result = merge({foo: 123}, {foo: 456});
       * console.log(result.foo); // outputs 456
       * ```
       *
       * @param {Object} obj1 Object to merge
       *
       * @returns {Object} Result of all merge properties
       */;
/**
       * Extends object a by mutably adding to it the properties of object b.
       *
       * @param {Object} a The object to be extended
       * @param {Object} b The object to copy properties from
       * @param {Object} thisArg The object to bind function to
       *
       * @param {Boolean} [allOwnKeys]
       * @returns {Object} The resulting value of object a
       */
const T=(v="undefined"!=typeof Uint8Array&&o(Uint8Array),e=>v&&e instanceof v);
/**
       * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
       *
       * @param {string} content with BOM
       *
       * @returns {string} content value without BOM
       */var v;
/**
       * For each entry in the object, call the function with the key and value.
       *
       * @param {Object<any, any>} obj - The object to iterate over.
       * @param {Function} fn - The function to call for each entry.
       *
       * @returns {void}
       */
const P=a("HTMLFormElement"),N=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),C=a("RegExp"),x=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};S(n,((n,o)=>{let i;!1!==(i=t(n,o,e))&&(r[o]=i||n)})),Object.defineProperties(e,r)},_="abcdefghijklmnopqrstuvwxyz",F="0123456789",U={DIGIT:F,ALPHA:_,ALPHA_DIGIT:_+_.toUpperCase()+F};
/**
       * It takes a regular expression and a string, and returns an array of all the matches
       *
       * @param {string} regExp - The regular expression to match against.
       * @param {string} str - The string to search.
       *
       * @returns {Array<boolean>}
       */const D=a("AsyncFunction"),B={isArray:u,isArrayBuffer:f,isBuffer:
/**
       * Determine if a value is a Buffer
       *
       * @param {*} val The value to test
       *
       * @returns {boolean} True if value is a Buffer, otherwise false
       */
function(e){return null!==e&&!l(e)&&null!==e.constructor&&!l(e.constructor)&&p(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||p(e.append)&&("formdata"===(t=i(e))||// detect form-data instance
"object"===t&&p(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&f(e.buffer),t},isString:d,isNumber:h,isBoolean:e=>!0===e||!1===e
/**
       * Determine if a value is a plain Object
       *
       * @param {*} val The value to test
       *
       * @returns {boolean} True if value is a plain Object, otherwise false
       */,isObject:m,isPlainObject:y,isUndefined:l,isDate:b,isFile:g,isBlob:O,isRegExp:C,isFunction:p,isStream:e=>m(e)&&p(e.pipe)
/**
       * Determine if a value is a FormData
       *
       * @param {*} thing The value to test
       *
       * @returns {boolean} True if value is an FormData, otherwise false
       */,isURLSearchParams:E,isTypedArray:T,isFileList:w,forEach:S,merge:function e(){const{caseless:t}=j(this)&&this||{},n={},r=(r,o)=>{const i=t&&R(n,o)||o;y(n[i])&&y(r)?n[i]=e(n[i],r):y(r)?n[i]=e({},r):u(r)?n[i]=r.slice():n[i]=r};for(let o=0,i=arguments.length;o<i;o++)arguments[o]&&S(arguments[o],r);return n},extend:(e,t,r,{allOwnKeys:o}={})=>(S(t,((t,o)=>{r&&p(t)?e[o]=n(t,r):e[o]=t}),{allOwnKeys:o}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let i,s,a;const c={};// eslint-disable-next-line no-eq-null,eqeqeq
if(t=t||{},null==e)return t;do{for(i=Object.getOwnPropertyNames(e),s=i.length;s-- >0;)a=i[s],r&&!r(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==n&&o(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:i,kindOfTest:a,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(u(e))return e;let t=e.length;if(!h(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:P,hasOwnProperty:N,hasOwnProp:N,// an alias to avoid ESLint no-prototype-builtins detection
reduceDescriptors:x,freezeMethods:e=>{x(e,((t,n)=>{// skip restricted props in strict mode
if(p(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];p(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return u(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:R,global:A,isContextDefined:j,ALPHABET:U,generateString:(e=16,t=U.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:
/**
       * If the thing is a FormData object, return true, otherwise return false.
       *
       * @param {unknown} thing - The thing to check.
       *
       * @returns {boolean}
       */
function(e){return!!(e&&p(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(m(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=u(e)?[]:{};return S(e,((e,t)=>{const i=n(e,r+1);!l(i)&&(o[t]=i)})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:D,isThenable:e=>e&&(m(e)||p(e))&&p(e.then)&&p(e.catch)};
/**
       * Create an Error with the specified message, config, error code, request and response.
       *
       * @param {string} message The error message.
       * @param {string} [code] The error code (for example, 'ECONNABORTED').
       * @param {Object} [config] The config.
       * @param {Object} [request] The request.
       * @param {Object} [response] The response.
       *
       * @returns {Error} The created error.
       */
function L(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}B.inherits(L,Error,{toJSON:function(){return{// Standard
message:this.message,name:this.name,// Microsoft
description:this.description,number:this.number,// Mozilla
fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,// Axios
config:B.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const k=L.prototype,q={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{q[e]={value:e}})),Object.defineProperties(L,q),Object.defineProperty(k,"isAxiosError",{value:!0}),// eslint-disable-next-line func-names
L.from=(e,t,n,r,o,i)=>{const s=Object.create(k);return B.toFlatObject(e,s,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),L.call(s,e.message,t,n,r,o),s.cause=e,s.name=e.name,i&&Object.assign(s,i),s};
/**
       * Determines if the given thing is a array or js object.
       *
       * @param {string} thing - The object or array to be visited.
       *
       * @returns {boolean}
       */
function I(e){return B.isPlainObject(e)||B.isArray(e)}
/**
       * It removes the brackets from the end of a string
       *
       * @param {string} key - The key of the parameter.
       *
       * @returns {string} the key without the brackets.
       */function z(e){return B.endsWith(e,"[]")?e.slice(0,-2):e}
/**
       * It takes a path, a key, and a boolean, and returns a string
       *
       * @param {string} path - The path to the current key.
       * @param {string} key - The key of the current object being iterated over.
       * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
       *
       * @returns {string} The path to the current key.
       */function M(e,t,n){return e?e.concat(t).map((function(e,t){// eslint-disable-next-line no-param-reassign
return e=z(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}
/**
       * If the array is an array and none of its elements are visitable, then it's a flat array.
       *
       * @param {Array<any>} arr - The array to check
       *
       * @returns {boolean}
       */const H=B.toFlatObject(B,{},null,(function(e){return/^is[A-Z]/.test(e)}));
/**
       * Convert a data object to FormData
       *
       * @param {Object} obj
       * @param {?Object} [formData]
       * @param {?Object} [options]
       * @param {Function} [options.visitor]
       * @param {Boolean} [options.metaTokens = true]
       * @param {Boolean} [options.dots = false]
       * @param {?Boolean} [options.indexes = false]
       *
       * @returns {Object}
       **/
/**
       * It converts an object into a FormData object
       *
       * @param {Object<any, any>} obj - The object to convert to form data.
       * @param {string} formData - The FormData object to append to.
       * @param {Object<string, any>} options
       *
       * @returns
       */function J(e,t,n){if(!B.isObject(e))throw new TypeError("target must be an object");// eslint-disable-next-line no-param-reassign
t=t||new FormData;const r=(// eslint-disable-next-line no-param-reassign
n=B.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){// eslint-disable-next-line no-eq-null,eqeqeq
return!B.isUndefined(t[e])}))).metaTokens,o=n.visitor||u,i=n.dots,s=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&B.isSpecCompliantForm(t);// eslint-disable-next-line no-use-before-define
if(!B.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return"";if(B.isDate(e))return e.toISOString();if(!a&&B.isBlob(e))throw new L("Blob is not supported. Use a Buffer instead.");return B.isArrayBuffer(e)||B.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}
/**
         * Default visitor.
         *
         * @param {*} value
         * @param {String|Number} key
         * @param {Array<String|Number>} path
         * @this {FormData}
         *
         * @returns {boolean} return true to visit the each prop of the value recursively
         */function u(e,n,o){let a=e;if(e&&!o&&"object"==typeof e)if(B.endsWith(n,"{}"))// eslint-disable-next-line no-param-reassign
n=r?n:n.slice(0,-2),// eslint-disable-next-line no-param-reassign
e=JSON.stringify(e);else if(B.isArray(e)&&function(e){return B.isArray(e)&&!e.some(I)}(e)||(B.isFileList(e)||B.endsWith(n,"[]"))&&(a=B.toArray(e)))// eslint-disable-next-line no-param-reassign
return n=z(n),a.forEach((function(e,r){!B.isUndefined(e)&&null!==e&&t.append(// eslint-disable-next-line no-nested-ternary
!0===s?M([n],r,i):null===s?n:n+"[]",c(e))})),!1;return!!I(e)||(t.append(M(o,n,i),c(e)),!1)}const l=[],f=Object.assign(H,{defaultVisitor:u,convertValue:c,isVisitable:I});if(!B.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!B.isUndefined(n)){if(-1!==l.indexOf(n))throw Error("Circular reference detected in "+r.join("."));l.push(n),B.forEach(n,(function(n,i){!0===(!(B.isUndefined(n)||null===n)&&o.call(t,n,B.isString(i)?i.trim():i,r,f))&&e(n,r?r.concat(i):[i])})),l.pop()}}(e),t}
/**
       * It encodes a string by replacing all characters that are not in the unreserved set with
       * their percent-encoded equivalents
       *
       * @param {string} str - The string to encode.
       *
       * @returns {string} The encoded string.
       */function W(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}
/**
       * It takes a params object and converts it to a FormData object
       *
       * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
       * @param {Object<string, any>} options - The options object passed to the Axios constructor.
       *
       * @returns {void}
       */function K(e,t){this._pairs=[],e&&J(e,this,t)}const V=K.prototype;
/**
       * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
       * URI encoded counterparts
       *
       * @param {string} val The value to be encoded.
       *
       * @returns {string} The encoded value.
       */
function G(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}
/**
       * Build a URL by appending params to the end
       *
       * @param {string} url The base of the url (e.g., http://www.google.com)
       * @param {object} [params] The params to be appended
       * @param {?object} options
       *
       * @returns {string} The formatted url
       */function $(e,t,n){/*eslint no-param-reassign:0*/if(!t)return e;const r=n&&n.encode||G,o=n&&n.serialize;let i;if(i=o?o(t,n):B.isURLSearchParams(t)?t.toString():new K(t,n).toString(r),i){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}V.append=function(e,t){this._pairs.push([e,t])},V.toString=function(e){const t=e?function(t){return e.call(this,t,W)}:W;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const X=class{constructor(){this.handlers=[]}
/**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         *
         * @return {Number} An ID used to remove interceptor later
         */use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}
/**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         *
         * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
         */eject(e){this.handlers[e]&&(this.handlers[e]=null)}
/**
         * Clear all interceptors from the stack
         *
         * @returns {void}
         */clear(){this.handlers&&(this.handlers=[])}
/**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         *
         * @returns {void}
         */forEach(e){B.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},Q={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Z={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:K,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},Y="undefined"!=typeof window&&"undefined"!=typeof document,ee=(te="undefined"!=typeof navigator&&navigator.product,Y&&["ReactNative","NativeScript","NS"].indexOf(te)<0);var te;
/**
       * Determine if we're running in a standard browser webWorker environment
       *
       * Although the `isStandardBrowserEnv` method indicates that
       * `allows axios to run in a web worker`, the WebWorker will still be
       * filtered out due to its judgment standard
       * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
       * This leads to a problem when axios post `FormData` in webWorker
       */
const ne="undefined"!=typeof WorkerGlobalScope&&// eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,re=t(t({},Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Y,hasStandardBrowserEnv:ee,hasStandardBrowserWebWorkerEnv:ne},Symbol.toStringTag,{value:"Module"}))),Z);
/**
       * It takes a FormData object and returns a JavaScript object
       *
       * @param {string} formData The FormData object to convert to JSON.
       *
       * @returns {Object<string, any> | null} The converted object.
       */
function oe(e){function t(e,n,r,o){let i=e[o++];const s=Number.isFinite(+i),a=o>=e.length;if(i=!i&&B.isArray(r)?r.length:i,a)return B.hasOwnProp(r,i)?r[i]=[r[i],n]:r[i]=n,!s;r[i]&&B.isObject(r[i])||(r[i]=[]);return t(e,n,r[i],o)&&B.isArray(r[i])&&(r[i]=
/**
       * Convert an array to an object.
       *
       * @param {Array<any>} arr - The array to convert to an object.
       *
       * @returns An object with the same keys and values as the array.
       */
function(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}(r[i])),!s}if(B.isFormData(e)&&B.isFunction(e.entries)){const n={};return B.forEachEntry(e,((e,r)=>{t(
/**
       * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
       *
       * @param {string} name - The name of the property to get.
       *
       * @returns An array of strings.
       */
function(e){// foo[x][y][z]
// foo.x.y.z
// foo-x-y-z
// foo x y z
return B.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null}
/**
       * It takes a string, tries to parse it, and if it fails, it returns the stringified version
       * of the input
       *
       * @param {any} rawValue - The value to be stringified.
       * @param {Function} parser - A function that parses a string into a JavaScript object.
       * @param {Function} encoder - A function that takes a value and returns a string.
       *
       * @returns {string} A stringified version of the rawValue.
       */const ie={transitional:Q,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=B.isObject(e);o&&B.isHTMLForm(e)&&(e=new FormData(e));if(B.isFormData(e))return r&&r?JSON.stringify(oe(e)):e;if(B.isArrayBuffer(e)||B.isBuffer(e)||B.isStream(e)||B.isFile(e)||B.isBlob(e))return e;if(B.isArrayBufferView(e))return e.buffer;if(B.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return J(e,new re.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return re.isNode&&B.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((i=B.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return J(i?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(B.isString(e))try{return(t||JSON.parse)(e),B.trim(e)}catch(r){if("SyntaxError"!==r.name)throw r}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||ie.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&B.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(o){if(n){if("SyntaxError"===o.name)throw L.from(o,L.ERR_BAD_RESPONSE,this,null,this.response);throw o}}}return e}],
/**
         * A timeout in milliseconds to abort a request. If set to 0 (default) a
         * timeout is not created.
         */
timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:re.classes.FormData,Blob:re.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};B.forEach(["delete","get","head","post","put","patch"],(e=>{ie.headers[e]={}}));const se=ie,ae=B.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ce=Symbol("internals");// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
function ue(e){return e&&String(e).trim().toLowerCase()}function le(e){return!1===e||null==e?e:B.isArray(e)?e.map(le):String(e)}function fe(e,t,n,r,o){return B.isFunction(r)?r.call(this,t,n):(o&&(t=n),B.isString(t)?B.isString(r)?-1!==t.indexOf(r):B.isRegExp(r)?r.test(t):void 0:void 0)}class de{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function o(e,t,n){const o=ue(t);if(!o)throw new Error("header name must be a non-empty string");const i=B.findKey(r,o);(!i||void 0===r[i]||!0===n||void 0===n&&!1!==r[i])&&(r[i||t]=le(e))}const i=(e,t)=>B.forEach(e,((e,n)=>o(e,n,t)));return B.isPlainObject(e)||e instanceof this.constructor?i(e,t):B.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?i((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&ae[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t):null!=e&&o(t,e,n),this}get(e,t){if(e=ue(e)){const n=B.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(B.isFunction(t))return t.call(this,e,n);if(B.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=ue(e)){const n=B.findKey(this,e);return!(!n||void 0===this[n]||t&&!fe(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function o(e){if(e=ue(e)){const o=B.findKey(n,e);!o||t&&!fe(0,n[o],o,t)||(delete n[o],r=!0)}}return B.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!fe(0,this[o],o,e,!0)||(delete this[o],r=!0)}return r}normalize(e){const t=this,n={};return B.forEach(this,((r,o)=>{const i=B.findKey(n,o);if(i)return t[i]=le(r),void delete t[o];const s=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();s!==o&&delete t[o],t[s]=le(r),n[s]=!0})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return B.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&B.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach((e=>n.set(e))),n}static accessor(e){const t=(this[ce]=this[ce]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=ue(e);t[r]||(!function(e,t){const n=B.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0})}))}(n,e),t[r]=!0)}return B.isArray(e)?e.forEach(r):r(e),this}}de.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),// reserved names hotfix
B.reduceDescriptors(de.prototype,(({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);// map `set` => `Set`
return{get:()=>e,set(e){this[n]=e}}})),B.freezeMethods(de);const pe=de;
/**
       * Transform the data for a request or a response
       *
       * @param {Array|Function} fns A single function or Array of functions
       * @param {?Object} response The response object
       *
       * @returns {*} The resulting transformed data
       */function he(e,t){const n=this||se,r=t||n,o=pe.from(r.headers);let i=r.data;return B.forEach(e,(function(e){i=e.call(n,i,o.normalize(),t?t.status:void 0)})),o.normalize(),i}function me(e){return!(!e||!e.__CANCEL__)}
/**
       * A `CanceledError` is an object that is thrown when an operation is canceled.
       *
       * @param {string=} message The message.
       * @param {Object=} config The config.
       * @param {Object=} request The request.
       *
       * @returns {CanceledError} The created error.
       */function ye(e,t,n){// eslint-disable-next-line no-eq-null,eqeqeq
L.call(this,null==e?"canceled":e,L.ERR_CANCELED,t,n),this.name="CanceledError"}B.inherits(ye,L,{__CANCEL__:!0});const be=re.hasStandardBrowserEnv?// Standard browser envs support document.cookie
{write(e,t,n,r,o,i){const s=[e+"="+encodeURIComponent(t)];B.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),B.isString(r)&&s.push("path="+r),B.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:// Non-standard browser env (web workers, react-native) lack needed support.
{write(){},read:()=>null,remove(){}};
/**
       * Determines whether the specified URL is absolute
       *
       * @param {string} url The URL to test
       *
       * @returns {boolean} True if the specified URL is absolute, otherwise false
       */
/**
       * Creates a new URL by combining the baseURL with the requestedURL,
       * only when the requestedURL is not already an absolute URL.
       * If the requestURL is absolute, this function returns the requestedURL untouched.
       *
       * @param {string} baseURL The base URL
       * @param {string} requestedURL Absolute or relative URL to combine
       *
       * @returns {string} The combined full path
       */
function ge(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?
/**
       * Creates a new URL by combining the specified URLs
       *
       * @param {string} baseURL The base URL
       * @param {string} relativeURL The relative URL
       *
       * @returns {string} The combined URL
       */
function(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const Oe=re.hasStandardBrowserEnv?// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;
/**
          * Parse a URL to discover its components
          *
          * @param {String} url The URL to be parsed
          * @returns {Object}
          */function r(n){let r=n;// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
return e&&(// IE needs attribute set twice to normalize properties
t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}
/**
          * Determine if a URL shares the same origin as the current location
          *
          * @param {String} requestURL The URL to test
          * @returns {boolean} True if URL shares the same origin, otherwise false
          */
return n=r(window.location.href),function(e){const t=B.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return!0};function we(e,t){let n=0;const r=
/**
       * Calculate data maxRate
       * @param {Number} [samplesCount= 10]
       * @param {Number} [min= 1000]
       * @returns {Function}
       */
function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,i=0,s=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[s];o||(o=c),n[i]=a,r[i]=c;let l=s,f=0;for(;l!==i;)f+=n[l++],l%=e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),c-o<t)return;const d=u&&c-u;return d?Math.round(1e3*f/d):void 0}}(50,250);return o=>{const i=o.loaded,s=o.lengthComputable?o.total:void 0,a=i-n,c=r(a);n=i;const u={loaded:i,total:s,progress:s?i/s:void 0,bytes:a,rate:c||void 0,estimated:c&&s&&i<=s?(s-i)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u)}}const Ee={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const o=pe.from(e.headers).normalize();let i,s,{responseType:a,withXSRFToken:c}=e;function u(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i)}if(B.isFormData(r))if(re.hasStandardBrowserEnv||re.hasStandardBrowserWebWorkerEnv)o.setContentType(!1);// Let the browser set it
else if(!1!==(s=o.getContentType())){// fix semicolon duplication issue for ReactNative FormData implementation
const[e,...t]=s?s.split(";").map((e=>e.trim())).filter(Boolean):[];o.setContentType([e||"multipart/form-data",...t].join("; "))}let l=new XMLHttpRequest;// HTTP basic authentication
if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+n))}const f=ge(e.baseURL,e.url);function d(){if(!l)return;// Prepare the response
const r=pe.from("getAllResponseHeaders"in l&&l.getAllResponseHeaders());!
/**
       * Resolve or reject a Promise based on response status.
       *
       * @param {Function} resolve A function that resolves the promise.
       * @param {Function} reject A function that rejects the promise.
       * @param {object} response The response.
       *
       * @returns {object} The response.
       */
function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new L("Request failed with status code "+n.status,[L.ERR_BAD_REQUEST,L.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}((function(e){t(e),u()}),(function(e){n(e),u()}),{data:a&&"text"!==a&&"json"!==a?l.response:l.responseText,status:l.status,statusText:l.statusText,headers:r,config:e,request:l}),// Clean up request
l=null}// Add xsrf header
// This is only done if running in a standard browser environment.
// Specifically not if we're in a web worker, or react-native.
if(l.open(e.method.toUpperCase(),$(f,e.params,e.paramsSerializer),!0),// Set the request timeout in MS
l.timeout=e.timeout,"onloadend"in l?// Use onloadend if available
l.onloadend=d:// Listen for ready state to emulate onloadend
l.onreadystatechange=function(){l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))&&// readystate handler is calling before onerror or ontimeout handlers,
// so we should call onloadend on the next 'tick'
setTimeout(d);// The request errored out and we didn't get a response, this will be
// handled by onerror instead
// With one exception: request that using file: protocol, most browsers
// will return status as 0 even though it's a successful request
},// Handle browser request cancellation (as opposed to a manual cancellation)
l.onabort=function(){l&&(n(new L("Request aborted",L.ECONNABORTED,e,l)),// Clean up request
l=null)},// Handle low level network errors
l.onerror=function(){// Real errors are hidden from us by the browser
// onerror should only fire if it's a network error
n(new L("Network Error",L.ERR_NETWORK,e,l)),// Clean up request
l=null},// Handle timeout
l.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||Q;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new L(t,r.clarifyTimeoutError?L.ETIMEDOUT:L.ECONNABORTED,e,l)),// Clean up request
l=null},re.hasStandardBrowserEnv&&(c&&B.isFunction(c)&&(c=c(e)),c||!1!==c&&Oe(f))){// Add xsrf header
const t=e.xsrfHeaderName&&e.xsrfCookieName&&be.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t)}// Remove Content-Type if data is undefined
void 0===r&&o.setContentType(null),// Add headers to the request
"setRequestHeader"in l&&B.forEach(o.toJSON(),(function(e,t){l.setRequestHeader(t,e)})),// Add withCredentials to request if needed
B.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),// Add responseType to request if needed
a&&"json"!==a&&(l.responseType=e.responseType),// Handle progress if needed
"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",we(e.onDownloadProgress,!0)),// Not all browsers support upload events
"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",we(e.onUploadProgress)),(e.cancelToken||e.signal)&&(// Handle cancellation
// eslint-disable-next-line func-names
i=t=>{l&&(n(!t||t.type?new ye(null,e,l):t),l.abort(),l=null)},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const p=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(f);p&&-1===re.protocols.indexOf(p)?n(new L("Unsupported protocol "+p+":",L.ERR_BAD_REQUEST,e)):// Send the request
l.send(r||null)}))}};B.forEach(Ee,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(n){// eslint-disable-next-line no-empty
}Object.defineProperty(e,"adapterName",{value:t})}}));const Se=e=>`- ${e}`,Re=e=>B.isFunction(e)||null===e||!1===e,Ae=e=>{e=B.isArray(e)?e:[e];const{length:t}=e;let n,r;const o={};for(let i=0;i<t;i++){let t;if(n=e[i],r=n,!Re(n)&&(r=Ee[(t=String(n)).toLowerCase()],void 0===r))throw new L(`Unknown adapter '${t}'`);if(r)break;o[t||"#"+i]=r}if(!r){const e=Object.entries(o).map((([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build")));throw new L("There is no suitable adapter to dispatch the request "+(t?e.length>1?"since :\n"+e.map(Se).join("\n"):" "+Se(e[0]):"as no adapter specified"),"ERR_NOT_SUPPORT")}return r};
/**
       * Throws a `CanceledError` if cancellation has been requested.
       *
       * @param {Object} config The config that is to be used for the request
       *
       * @returns {void}
       */
function je(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ye(null,e)}
/**
       * Dispatch a request to the server using the configured adapter.
       *
       * @param {object} config The config that is to be used for the request
       *
       * @returns {Promise} The Promise to be fulfilled
       */function Te(e){je(e),e.headers=pe.from(e.headers),// Transform request data
e.data=he.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return Ae(e.adapter||se.adapter)(e).then((function(t){return je(e),// Transform response data
t.data=he.call(e,e.transformResponse,t),t.headers=pe.from(t.headers),t}),(function(t){return me(t)||(je(e),// Transform response data
t&&t.response&&(t.response.data=he.call(e,e.transformResponse,t.response),t.response.headers=pe.from(t.response.headers))),Promise.reject(t)}))}const ve=e=>e instanceof pe?e.toJSON():e
/**
       * Config-specific merge-function which creates a new config-object
       * by merging two configuration objects together.
       *
       * @param {Object} config1
       * @param {Object} config2
       *
       * @returns {Object} New object resulting from merging config2 to config1
       */;function Pe(e,t){// eslint-disable-next-line no-param-reassign
t=t||{};const n={};function r(e,t,n){return B.isPlainObject(e)&&B.isPlainObject(t)?B.merge.call({caseless:n},e,t):B.isPlainObject(t)?B.merge({},t):B.isArray(t)?t.slice():t}// eslint-disable-next-line consistent-return
function o(e,t,n){return B.isUndefined(t)?B.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}// eslint-disable-next-line consistent-return
function i(e,t){if(!B.isUndefined(t))return r(void 0,t)}// eslint-disable-next-line consistent-return
function s(e,t){return B.isUndefined(t)?B.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}// eslint-disable-next-line consistent-return
function a(n,o,i){return i in t?r(n,o):i in e?r(void 0,n):void 0}const c={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(e,t)=>o(ve(e),ve(t),!0)};return B.forEach(Object.keys(Object.assign({},e,t)),(function(r){const i=c[r]||o,s=i(e[r],t[r],r);B.isUndefined(s)&&i!==a||(n[r]=s)})),n}const Ne="1.6.3",Ce={};// eslint-disable-next-line func-names
["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Ce[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const xe={};
/**
       * Transitional option validator
       *
       * @param {function|boolean?} validator - set to false if the transitional option has been removed
       * @param {string?} version - deprecated version / removed since version
       * @param {string?} message - some message with additional info
       *
       * @returns {function}
       */Ce.transitional=function(e,t,n){// eslint-disable-next-line func-names
return(r,o,i)=>{if(!1===e)throw new L(function(e,t){return"[Axios v1.6.3] Transitional option '"+e+"'"+t+(n?". "+n:"")}(o," has been removed"+(t?" in "+t:"")),L.ERR_DEPRECATED);return t&&!xe[o]&&(xe[o]=!0),!e||e(r,o,i)}};const _e={assertOptions:
/**
       * Assert object's properties type
       *
       * @param {object} options
       * @param {object} schema
       * @param {boolean?} allowUnknown
       *
       * @returns {object}
       */
function(e,t,n){if("object"!=typeof e)throw new L("options must be an object",L.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const i=r[o],s=t[i];if(s){const t=e[i],n=void 0===t||s(t,i,e);if(!0!==n)throw new L("option "+i+" must be "+n,L.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new L("Unknown option "+i,L.ERR_BAD_OPTION)}},validators:Ce},Fe=_e.validators;
/**
       * Create a new instance of Axios
       *
       * @param {Object} instanceConfig The default config for the instance
       *
       * @return {Axios} A new instance of Axios
       */
class Ue{constructor(e){this.defaults=e,this.interceptors={request:new X,response:new X}}
/**
         * Dispatch a request
         *
         * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
         * @param {?Object} config
         *
         * @returns {Promise} The Promise to be fulfilled
         */request(e,t){/*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
"string"==typeof e?(t=t||{}).url=e:t=e||{},t=Pe(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;void 0!==n&&_e.assertOptions(n,{silentJSONParsing:Fe.transitional(Fe.boolean),forcedJSONParsing:Fe.transitional(Fe.boolean),clarifyTimeoutError:Fe.transitional(Fe.boolean)},!1),null!=r&&(B.isFunction(r)?t.paramsSerializer={serialize:r}:_e.assertOptions(r,{encode:Fe.function,serialize:Fe.function},!0)),// Set config.method
t.method=(t.method||this.defaults.method||"get").toLowerCase();// Flatten headers
let i=o&&B.merge(o.common,o[t.method]);o&&B.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=pe.concat(i,o);// filter out skipped interceptors
const s=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,s.unshift(e.fulfilled,e.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)}));let l,f=0;if(!a){const e=[Te.bind(this),void 0];for(e.unshift.apply(e,s),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);f<l;)u=u.then(e[f++],e[f++]);return u}l=s.length;let d=t;for(f=0;f<l;){const e=s[f++],t=s[f++];try{d=e(d)}catch(p){t.call(this,p);break}}try{u=Te.call(this,d)}catch(p){return Promise.reject(p)}for(f=0,l=c.length;f<l;)u=u.then(c[f++],c[f++]);return u}getUri(e){return $(ge((e=Pe(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}// Provide aliases for supported request methods
B.forEach(["delete","get","head","options"],(function(e){/*eslint func-names:0*/Ue.prototype[e]=function(t,n){return this.request(Pe(n||{},{method:e,url:t,data:(n||{}).data}))}})),B.forEach(["post","put","patch"],(function(e){/*eslint func-names:0*/function t(t){return function(n,r,o){return this.request(Pe(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Ue.prototype[e]=t(),Ue.prototype[e+"Form"]=t(!0)}));const De=Ue;
/**
       * A `CancelToken` is an object that can be used to request cancellation of an operation.
       *
       * @param {Function} executor The executor function.
       *
       * @returns {CancelToken}
       */class Be{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;// eslint-disable-next-line func-names
this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),// eslint-disable-next-line func-names
this.promise.then=e=>{let t;// eslint-disable-next-line func-names
const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,o){n.reason||(n.reason=new ye(e,r,o),t(n.reason))}))}
/**
         * Throws a `CanceledError` if cancellation has been requested.
         */throwIfRequested(){if(this.reason)throw this.reason}
/**
         * Subscribe to the cancel signal
         */subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}
/**
         * Unsubscribe from the cancel signal
         */unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}
/**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */static source(){let e;return{token:new Be((function(t){e=t})),cancel:e}}}const Le=Be;
/**
       * Syntactic sugar for invoking a function and expanding an array for arguments.
       *
       * Common use case would be to use `Function.prototype.apply`.
       *
       *  ```js
       *  function f(x, y, z) {}
       *  var args = [1, 2, 3];
       *  f.apply(null, args);
       *  ```
       *
       * With `spread` this example can be re-written.
       *
       *  ```js
       *  spread(function(x, y, z) {})([1, 2, 3]);
       *  ```
       *
       * @param {Function} callback
       *
       * @returns {Function}
       */const ke={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ke).forEach((([e,t])=>{ke[t]=e}));const qe=ke;
/**
       * Create an instance of Axios
       *
       * @param {Object} defaultConfig The default config for the instance
       *
       * @returns {Axios} A new instance of Axios
       */ // Create the default instance to be exported
const Ie=function e(t){const r=new De(t),o=n(De.prototype.request,r);// Copy axios.prototype to instance
return B.extend(o,De.prototype,r,{allOwnKeys:!0}),// Copy context to instance
B.extend(o,r,null,{allOwnKeys:!0}),// Factory for creating new instances
o.create=function(n){return e(Pe(t,n))},o}(se);// Expose Axios class to allow class inheritance
Ie.Axios=De,// Expose Cancel & CancelToken
Ie.CanceledError=ye,Ie.CancelToken=Le,Ie.isCancel=me,Ie.VERSION=Ne,Ie.toFormData=J,// Expose AxiosError class
Ie.AxiosError=L,// alias for CanceledError for backward compatibility
Ie.Cancel=Ie.CanceledError,// Expose all/spread
Ie.all=function(e){return Promise.all(e)},Ie.spread=function(e){return function(t){return e.apply(null,t)}}
/**
       * Determines whether the payload is an error thrown by Axios
       *
       * @param {*} payload The value to test
       *
       * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
       */,// Expose isAxiosError
Ie.isAxiosError=function(e){return B.isObject(e)&&!0===e.isAxiosError},// Expose mergeConfig
Ie.mergeConfig=Pe,Ie.AxiosHeaders=pe,Ie.formToJSON=e=>oe(B.isHTMLForm(e)?new FormData(e):e),Ie.getAdapter=Ae,Ie.HttpStatusCode=qe,Ie.default=Ie;// this module should only have a default export
e("a",Ie)}}}))}();
