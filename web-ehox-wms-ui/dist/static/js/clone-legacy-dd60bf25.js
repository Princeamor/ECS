System.register([],(function(e,t){"use strict";return{execute:function(){var t={exports:{}};!function(e){var t=function(){
/**
      	 * Clones (copies) an Object using deep copying.
      	 *
      	 * This function supports circular references by default, but if you are certain
      	 * there are no circular references in your object, you can save some CPU time
      	 * by calling clone(obj, false).
      	 *
      	 * Caution: if `circular` is false and `parent` contains circular references,
      	 * your program may enter an infinite loop and crash.
      	 *
      	 * @param `parent` - the object to be cloned
      	 * @param `circular` - set to true if the object to be cloned may contain
      	 *    circular references. (optional - true by default)
      	 * @param `depth` - set to a number if the object is only to be cloned to
      	 *    a particular depth. (optional - defaults to Infinity)
      	 * @param `prototype` - sets the prototype to be used when cloning an object.
      	 *    (optional - defaults to parent prototype).
      	*/
function e(t,n,o,f){"object"==typeof n&&(o=n.depth,f=n.prototype,n.filter,n=n.circular);// maintain two arrays for circular references, where corresponding parents
// and children have the same index
var u=[],i=[],c="undefined"!=typeof Buffer;return void 0===n&&(n=!0),void 0===o&&(o=1/0),// recurse this function so we don't reset allParents and allChildren
function t(o,l){// cloning null always returns null
if(null===o)return null;if(0==l)return o;var a,s;if("object"!=typeof o)return o;if(e.__isArray(o))a=[];else if(e.__isRegExp(o))a=new RegExp(o.source,r(o)),o.lastIndex&&(a.lastIndex=o.lastIndex);else if(e.__isDate(o))a=new Date(o.getTime());else{if(c&&Buffer.isBuffer(o))// Node.js >= 4.5.0
return a=Buffer.allocUnsafe?Buffer.allocUnsafe(o.length):new Buffer(o.length),o.copy(a),a;void 0===f?(s=Object.getPrototypeOf(o),a=Object.create(s)):(a=Object.create(f),s=f)}if(n){var p=u.indexOf(o);if(-1!=p)return i[p];u.push(o),i.push(a)}for(var g in o){var y;s&&(y=Object.getOwnPropertyDescriptor(s,g)),y&&null==y.set||(a[g]=t(o[g],l-1))}return a}(t,o)}
/**
      	 * Simple flat clone using prototype, accepts only objects, usefull for property
      	 * override on FLAT configuration object (no nested props).
      	 *
      	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
      	 * works.
      	 */ // private utility functions
function t(e){return Object.prototype.toString.call(e)}function r(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}return e.clonePrototype=function(e){if(null===e)return null;var t=function(){};return t.prototype=e,new t},e.__objToStr=t,e.__isDate=function(e){return"object"==typeof e&&"[object Date]"===t(e)},e.__isArray=function(e){return"object"==typeof e&&"[object Array]"===t(e)},e.__isRegExp=function(e){return"object"==typeof e&&"[object RegExp]"===t(e)},e.__getRegExpFlags=r,e}();e.exports&&(e.exports=t)}(t),e("c",t.exports)}}}));
