System.register(["./color-legacy-40a5ac31.js","./balanced-match-legacy-2b291164.js"],(function(e,n){"use strict";var r,t;return{setters:[e=>{r=e.c},e=>{t=e.b}],execute:function(){var n,s,o=e("l",{}),a={exports:{}};function i(){if(s)return n;s=1;var e=1e3,r=60*e,t=60*r,o=24*t,a=7*o,i=365.25*o;
/**
      	 * Pluralization helper.
      	 */
function c(e,n,r,t){var s=n>=1.5*r;return Math.round(e/r)+" "+t+(s?"s":"")}
/**
      	 * Parse or format the given `val`.
      	 *
      	 * Options:
      	 *
      	 *  - `long` verbose formatting [false]
      	 *
      	 * @param {String|Number} val
      	 * @param {Object} [options]
      	 * @throws {Error} throw an error if val is not a non-empty string or a number
      	 * @return {String|Number}
      	 * @api public
      	 */return n=function(n,s){s=s||{};var u=typeof n;if("string"===u&&n.length>0)
/**
      	 * Parse the given `str` and return milliseconds.
      	 *
      	 * @param {String} str
      	 * @return {Number}
      	 * @api private
      	 */return function(n){if(!((n=String(n)).length>100)){var s=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(n);if(s){var c=parseFloat(s[1]);switch((s[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return c*i;case"weeks":case"week":case"w":return c*a;case"days":case"day":case"d":return c*o;case"hours":case"hour":case"hrs":case"hr":case"h":return c*t;case"minutes":case"minute":case"mins":case"min":case"m":return c*r;case"seconds":case"second":case"secs":case"sec":case"s":return c*e;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return c;default:return}}}}
/**
      	 * Short format for `ms`.
      	 *
      	 * @param {Number} ms
      	 * @return {String}
      	 * @api private
      	 */(n);if("number"===u&&isFinite(n))return s.long?
/**
      	 * Long format for `ms`.
      	 *
      	 * @param {Number} ms
      	 * @return {String}
      	 * @api private
      	 */
function(n){var s=Math.abs(n);return s>=o?c(n,s,o,"day"):s>=t?c(n,s,t,"hour"):s>=r?c(n,s,r,"minute"):s>=e?c(n,s,e,"second"):n+" ms"}(n):function(n){var s=Math.abs(n);return s>=o?Math.round(n/o)+"d":s>=t?Math.round(n/t)+"h":s>=r?Math.round(n/r)+"m":s>=e?Math.round(n/e)+"s":n+"ms"}(n);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(n))}}
/**
       * This is the common logic for both the Node.js and web browser
       * implementations of `debug()`.
       */var c=function(e){
/**
        * Selects a color for a debug namespace
        * @param {String} namespace The namespace string for the for the debug instance to be colored
        * @return {Number|String} An ANSI color code for the given namespace
        * @api private
        */
function n(e){for(var n=0,t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return r.colors[Math.abs(n)%r.colors.length]}
/**
        * Create a debugger with the given `namespace`.
        *
        * @param {String} namespace
        * @return {Function}
        * @api public
        */
function r(e){var o;function a(){// Disabled?
if(a.enabled){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var s=a,i=Number(new Date),c=i-(o||i);// Set `diff` timestamp
s.diff=c,s.prev=o,s.curr=i,o=i,n[0]=r.coerce(n[0]),"string"!=typeof n[0]&&// Anything else let's inspect with %O
n.unshift("%O");// Apply any `formatters` transformations
var u=0;n[0]=n[0].replace(/%([a-zA-Z%])/g,(function(e,t){// If we encounter an escaped % then don't increase the array index
if("%%"===e)return e;u++;var o=r.formatters[t];if("function"==typeof o){var a=n[u];e=o.call(s,a),// Now we need to remove `args[index]` since it's inlined in the `format`
n.splice(u,1),u--}return e})),// Apply env-specific formatting (colors, etc.)
r.formatArgs.call(s,n),(s.log||r.log).apply(s,n)}}return a.namespace=e,a.enabled=r.enabled(e),a.useColors=r.useColors(),a.color=n(e),a.destroy=t,a.extend=s,// Debug.formatArgs = formatArgs;
// debug.rawLog = rawLog;
// env-specific initialization logic for debug instances
"function"==typeof r.init&&r.init(a),r.instances.push(a),a}function t(){var e=r.instances.indexOf(this);return-1!==e&&(r.instances.splice(e,1),!0)}function s(e,n){return r(this.namespace+(void 0===n?":":n)+e)}
/**
        * Enables a debug mode by namespaces. This can include modes
        * separated by a colon and wildcards.
        *
        * @param {String} namespaces
        * @api public
        */return r.debug=r,r.default=r,r.coerce=
/**
        * Coerce `val`.
        *
        * @param {Mixed} val
        * @return {Mixed}
        * @api private
        */
function(e){return e instanceof Error?e.stack||e.message:e},r.disable=
/**
        * Disable debug output.
        *
        * @api public
        */
function(){r.enable("")}
/**
        * Returns true if the given mode name is enabled, false otherwise.
        *
        * @param {String} name
        * @return {Boolean}
        * @api public
        */,r.enable=function(e){var n;r.save(e),r.names=[],r.skips=[];var t=("string"==typeof e?e:"").split(/[\s,]+/),s=t.length;for(n=0;n<s;n++)t[n]&&("-"===(e=t[n].replace(/\*/g,".*?"))[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")));for(n=0;n<r.instances.length;n++){var o=r.instances[n];o.enabled=r.enabled(o.namespace)}},r.enabled=function(e){if("*"===e[e.length-1])return!0;var n,t;for(n=0,t=r.skips.length;n<t;n++)if(r.skips[n].test(e))return!1;for(n=0,t=r.names.length;n<t;n++)if(r.names[n].test(e))return!0;return!1},r.humanize=i(),Object.keys(e).forEach((function(n){r[n]=e[n]})),
/**
        * Active `debug` instances.
        */
r.instances=[],
/**
        * The currently active debug mode names, and names to skip.
        */
r.names=[],r.skips=[],
/**
        * Map of special "%n" handling functions, for the debug "format" argument.
        *
        * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
        */
r.formatters={},r.selectColor=n,r.enable(r.load()),r};!function(e,n){function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}/* eslint-env browser */
/**
      	 * This is the web browser implementation of `debug()`.
      	 */n.log=
/**
      	 * Invokes `console.log()` when available.
      	 * No-op when `console.log` is not a "function".
      	 *
      	 * @api public
      	 */
function(){var e;// This hackery is required for IE8/9, where
// the `console.log` function doesn't have 'apply'
return"object"===("undefined"==typeof console?"undefined":r(console))&&console.log&&(e=console).log.apply(e,arguments)}
/**
      	 * Save `namespaces`.
      	 *
      	 * @param {String} namespaces
      	 * @api private
      	 */,n.formatArgs=
/**
      	 * Colorize log arguments if enabled.
      	 *
      	 * @api public
      	 */
function(n){if(n[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+n[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),this.useColors){var r="color: "+this.color;n.splice(1,0,r,"color: inherit");// The final "%c" is somewhat tricky, because there could be other
// arguments passed either before or after the %c, so we need to
// figure out the correct index to insert the CSS into
var t=0,s=0;n[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(t++,"%c"===e&&(// We only are interested in the *last* %c
// (the user may have provided their own)
s=t))})),n.splice(s,0,r)}},n.save=function(e){try{e?n.storage.setItem("debug",e):n.storage.removeItem("debug")}catch(r){// Swallow
// XXX (@Qix-) should we be logging these?
}}
/**
      	 * Load `namespaces`.
      	 *
      	 * @return {String} returns the previously persisted debug modes
      	 * @api private
      	 */,n.load=function(){var e;try{e=n.storage.getItem("debug")}catch(r){}// Swallow
// XXX (@Qix-) should we be logging these?
// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
return!e&&"undefined"!=typeof process&&"env"in process&&(e={}.DEBUG),e}
/**
      	 * Localstorage attempts to return the localstorage.
      	 *
      	 * This is necessary because safari throws
      	 * when a user disables cookies/localstorage
      	 * and you attempt to access it.
      	 *
      	 * @return {LocalStorage}
      	 * @api private
      	 */,n.useColors=
/**
      	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
      	 * and the Firebug extension (any Firefox version) are known
      	 * to support "%c" CSS customizations.
      	 *
      	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
      	 */
// eslint-disable-next-line complexity
function(){// NB: In an Electron preload script, document will be defined but not fully
// initialized. Since we know we're in Chrome, we'll just detect this case
// explicitly
return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||// Internet Explorer and Edge do not support colors.
("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||// Is firebug? http://stackoverflow.com/a/398120/376773
"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||// Is firefox >= v31?
// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||// Double check webkit in userAgent just in case we are in a worker
"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},n.storage=function(){try{// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
// The Browser also has localStorage in the global context.
return localStorage}catch(e){// Swallow
// XXX (@Qix-) should we be logging these?
}}(),
/**
      	 * Colors.
      	 */
n.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.exports=c(n),
/**
      	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
      	 */
e.exports.formatters.j=function(e){try{return JSON.stringify(e)}catch(n){return"[UnexpectedJSONParseError]: "+n.message}}}(a,a.exports);var u=t,f=(0,a.exports)("css-color-function:parse"),l=
/**
       * Parse a CSS color function string.
       *
       * @param {String} string
       * @return {Array}
       */
function(e){
/**
         * Match the current position in the string against a `regexp`, returning the
         * match if one exists.
         *
         * @param {RegExp} regexp
         * @return {Undefined or Array}
         */
function n(n){var r=n.exec(e);if(r)return e=e.slice(r[0].length),r.slice(1)}
/**
         * Match whitespace.
         */function r(){n(/^\s+/)}
/**
         * Match a right parentheses.
         *
         * @return {Array or Undefined}
         */
/**
         * Match a modifier: '+' '-' '*'.
         *
         * @return {Object or Undefined}
         */
function t(){var e=n(/^([\+\-\*])/);if(e){var r={type:"modifier"};return r.value=e[0],f("modifier %o",r),r}}
/**
         * Match a generic number function argument.
         *
         * @return {Object or Undefined}
         */function s(){var e=n(/^([^\)\s]+)/);if(e){var r={type:"number"};return r.value=e[0],f("number %o",r),r}}
/**
         * Match a function's arguments.
         *
         * @return {Array}
         */
/**
         * Match an adjuster function.
         *
         * @return {Object or Undefined}
         */
function o(){var e=n(/^(\w+)\(/);if(e){r();var o={type:"function"};return o.name=e[0],o.arguments=function(){for(var e,n=[];e=t()||i()||s();)n.push(e),r();return f("args %o",n),n}(),function(){var e=n(/^\)/);e&&f("rparen")}(),f("adjuster %o",o),o}}
/**
         * Match a color.
         *
         * @return {Object}
         */function a(){var e={type:"color"},t=n(/([^\)\s]+)/)[0];return-1!=t.indexOf("(")&&(t+=n(/([^\)]*?\))/)[0]),e.value=t,r(),e}
/**
         * Match a color function, capturing the first color argument and any adjuster
         * functions after it.
         *
         * @return {Object or Undefined}
         */function i(){if(e.match(/^color\(/)){var n=u("(",")",e);if(!n)throw new SyntaxError("Missing closing parenthese for '"+e+"'");if(""===n.body)throw new SyntaxError("color() function cannot be empty");e=n.body,r();var t,s={type:"function",name:"color"};for(s.arguments=[i()||a()],f("function arguments %o",s.arguments);t=o();)s.arguments.push(t),r();// pass the rest of the string in case of recursive color()
return e=n.post,r(),f("function %o",s),s}}
/**
         * Return the parsed color function.
         */return"string"!=typeof e&&(e=e.toString()),f("string %s",e),i()},C={};!function(e){var n=r;
/**
      	 * Basic RGBA adjusters.
      	 */
/**
      	 * Generate a value or percentage of modifier.
      	 *
      	 * @param {String} prop
      	 * @return {Function}
      	 */
function t(e){return function(n,r){var t;"modifier"==r[0].type&&(t=r.shift().value);var s=r[0].value;-1!=s.indexOf("%")?(s=parseInt(s,10)/100,t?"*"!=t&&(s=n[e]()*s):s*="alpha"==e?1:255):s=Number(s),n[e](o(n[e](),s,t))}}
/**
      	 * Generate a basic HSLWB adjuster.
      	 *
      	 * @param {String} prop
      	 * @return {Function}
      	 */function s(e){return function(n,r){var t;"modifier"==r[0].type&&(t=r.shift().value);var s=parseFloat(r[0].value,10);n[e](o(n[e](),s,t))}}
/**
      	 * Modify a `val` by an `amount` with an optional `modifier`.
      	 *
      	 * @param {Number} val
      	 * @param {Number} amount
      	 * @param {String} modifier (optional)
      	 */function o(e,n,r){switch(r){case"+":return e+n;case"-":return e-n;case"*":return e*n;default:return n}}
/**
      	 * Return the color closest to `color` between `color` and `max` that has a contrast ratio higher than `minRatio`
      	 *  assumes `color` and `max` have identical hue
      	 *
      	 * @param {Number} minRatio
      	 * @param {Color} color
      	 * @param {Color} max
      	 **/e.red=t("red"),e.blue=t("blue"),e.green=t("green"),e.alpha=e.a=t("alpha"),
/**
      	 * RGB adjuster.
      	 */
e.rgb=function(){// TODO
},
/**
      	 * Basic HSLWB adjusters.
      	 */
e.hue=e.h=s("hue"),e.saturation=e.s=s("saturation"),e.lightness=e.l=s("lightness"),e.whiteness=e.w=s("whiteness"),e.blackness=e.b=s("blackness"),
/**
      	 * Blend adjuster.
      	 *
      	 * @param {Color} color
      	 * @param {Object} args
      	 */
e.blend=function(e,r){var t=e.alpha();// Reset the alpha value to one. This is required because color.mix mixes
// the alpha value as well as rgb values. For blend() purposes, that's not
// what we want.
e.alpha(1);var s=new n(r[0].value),o=1-parseInt(r[1].value,10)/100;// Finally set the alpha value of the mixed color to the target value.
e.mix(s,o).alpha(t)},
/**
      	 * Tint adjuster.
      	 *
      	 * @param {Color} color
      	 * @param {Object} args
      	 */
e.tint=function(n,r){r.unshift({type:"argument",value:"white"}),e.blend(n,r)},
/**
      	 * Share adjuster.
      	 *
      	 * @param {Color} color
      	 * @param {Object} args
      	 */
e.shade=function(n,r){r.unshift({type:"argument",value:"black"}),e.blend(n,r)},
/**
      	 * Contrast adjuster.
      	 *
      	 * @param {Color} color
      	 * @param {Object} args
      	 */
e.contrast=function(e,r){0==r.length&&r.push({type:"argument",value:"100%"});var t=1-parseInt(r[0].value,10)/100,s=e.luminosity()<.5?new n({h:e.hue(),w:100,b:0}):new n({h:e.hue(),w:0,b:100}),o=s;if(e.contrast(s)>4.5){o=function(e,n,r){n.hue();for(var t=n.clone(),s=n.whiteness(),o=n.blackness(),a=r.whiteness(),i=r.blackness();Math.abs(s-a)>1||Math.abs(o-i)>1;){var c=Math.round((a+s)/2),u=Math.round((i+o)/2);t.whiteness(c),t.blackness(u),t.contrast(n)>e?(a=c,i=u):(s=c,o=u)}return t}(4.5,e,s);var a=o.alpha();// Set the alpha to 1 to avoid mix()-ing the alpha value.
o.alpha(1),// mixes the colors then sets the alpha back to the target alpha.
o.mix(s,t).alpha(a)}e.hwb(o.hwb())}}(C);var d=t,h=r,p=l,m=C,g=
/**
       * Convert a color function CSS `string` into an RGB color string.
       *
       * @param {String} string
       * @return {String}
       */
function e(n){var r=n.indexOf("color(");if(-1==r)return n;if(n=n.slice(r),!(n=d("(",")",n)))throw new SyntaxError("Missing closing parenthese for '"+n+"'");return v(p("color("+n.body+")"))+e(n.post)}
/**
       * Given a color `ast` return an RGB color string.
       *
       * @param {Object} ast
       * @return {String}
       */;function v(e){var n=new h("function"==e.arguments[0].type?v(e.arguments[0]):e.arguments[0].value);return e.arguments.slice(1).forEach((function(e){var r=e.name;if(!m[r])throw new Error("Unknown <color-adjuster> '"+r+"'");// convert nested color functions
e.arguments.forEach((function(e){"function"==e.type&&"color"==e.name&&(e.value=v(e),e.type="color",delete e.name)})),// apply adjuster transformations
m[r](n,e.arguments)})),n.rgbString()}var y=g,F=l;
/**
       * Expose `convert`.
       */
o.convert=y,
/**
       * Expose `parse`.
       */
o.parse=F}}}));
