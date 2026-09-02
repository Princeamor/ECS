System.register([],(function(e,r){"use strict";return{execute:function(){var e={exports:{}};!function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}(e);var r,t,a=e.exports,n={exports:{}},f={exports:{}},o={exports:{}};function u(){return r||(r=1,function(e){e.exports=function(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,a=new Array(r);t<r;t++)a[t]=e[t];return a},e.exports.__esModule=!0,e.exports.default=e.exports}(o)),o.exports}function i(){return t||(t=1,function(e){var r=u();e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.__esModule=!0,e.exports.default=e.exports}(f)),f.exports}var l,d={exports:{}};function c(){return l||(l=1,function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports}(d)),d.exports}var s,b={exports:{}};function g(){return s||(s=1,function(e){var r=u();e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?r(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports}(b)),b.exports}var p,m,h={exports:{}};function y(){return p||(p=1,function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports}(h)),h.exports}var v,x={};!function(e){var r=a;Object.defineProperty(e,"__esModule",{value:!0}),e.getRgbValue=s,e.getRgbaValue=b,e.getOpacity=p,e.toRgb=h,e.toHex=k,e.getColorFromRgbValue=w,e.darken=F,e.lighten=_,e.fade=M,e.default=void 0;var t=r((m||(m=1,function(e){var r=i(),t=c(),a=g(),n=y();e.exports=function(e){return r(e)||t(e)||a(e)||n()},e.exports.__esModule=!0,e.exports.default=e.exports}(n)),n.exports)),f=r((v||(v=1,function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=new Map([["transparent","rgba(0,0,0,0)"],["black","#000000"],["silver","#C0C0C0"],["gray","#808080"],["white","#FFFFFF"],["maroon","#800000"],["red","#FF0000"],["purple","#800080"],["fuchsia","#FF00FF"],["green","#008000"],["lime","#00FF00"],["olive","#808000"],["yellow","#FFFF00"],["navy","#000080"],["blue","#0000FF"],["teal","#008080"],["aqua","#00FFFF"],["aliceblue","#f0f8ff"],["antiquewhite","#faebd7"],["aquamarine","#7fffd4"],["azure","#f0ffff"],["beige","#f5f5dc"],["bisque","#ffe4c4"],["blanchedalmond","#ffebcd"],["blueviolet","#8a2be2"],["brown","#a52a2a"],["burlywood","#deb887"],["cadetblue","#5f9ea0"],["chartreuse","#7fff00"],["chocolate","#d2691e"],["coral","#ff7f50"],["cornflowerblue","#6495ed"],["cornsilk","#fff8dc"],["crimson","#dc143c"],["cyan","#00ffff"],["darkblue","#00008b"],["darkcyan","#008b8b"],["darkgoldenrod","#b8860b"],["darkgray","#a9a9a9"],["darkgreen","#006400"],["darkgrey","#a9a9a9"],["darkkhaki","#bdb76b"],["darkmagenta","#8b008b"],["darkolivegreen","#556b2f"],["darkorange","#ff8c00"],["darkorchid","#9932cc"],["darkred","#8b0000"],["darksalmon","#e9967a"],["darkseagreen","#8fbc8f"],["darkslateblue","#483d8b"],["darkslategray","#2f4f4f"],["darkslategrey","#2f4f4f"],["darkturquoise","#00ced1"],["darkviolet","#9400d3"],["deeppink","#ff1493"],["deepskyblue","#00bfff"],["dimgray","#696969"],["dimgrey","#696969"],["dodgerblue","#1e90ff"],["firebrick","#b22222"],["floralwhite","#fffaf0"],["forestgreen","#228b22"],["gainsboro","#dcdcdc"],["ghostwhite","#f8f8ff"],["gold","#ffd700"],["goldenrod","#daa520"],["greenyellow","#adff2f"],["grey","#808080"],["honeydew","#f0fff0"],["hotpink","#ff69b4"],["indianred","#cd5c5c"],["indigo","#4b0082"],["ivory","#fffff0"],["khaki","#f0e68c"],["lavender","#e6e6fa"],["lavenderblush","#fff0f5"],["lawngreen","#7cfc00"],["lemonchiffon","#fffacd"],["lightblue","#add8e6"],["lightcoral","#f08080"],["lightcyan","#e0ffff"],["lightgoldenrodyellow","#fafad2"],["lightgray","#d3d3d3"],["lightgreen","#90ee90"],["lightgrey","#d3d3d3"],["lightpink","#ffb6c1"],["lightsalmon","#ffa07a"],["lightseagreen","#20b2aa"],["lightskyblue","#87cefa"],["lightslategray","#778899"],["lightslategrey","#778899"],["lightsteelblue","#b0c4de"],["lightyellow","#ffffe0"],["limegreen","#32cd32"],["linen","#faf0e6"],["magenta","#ff00ff"],["mediumaquamarine","#66cdaa"],["mediumblue","#0000cd"],["mediumorchid","#ba55d3"],["mediumpurple","#9370db"],["mediumseagreen","#3cb371"],["mediumslateblue","#7b68ee"],["mediumspringgreen","#00fa9a"],["mediumturquoise","#48d1cc"],["mediumvioletred","#c71585"],["midnightblue","#191970"],["mintcream","#f5fffa"],["mistyrose","#ffe4e1"],["moccasin","#ffe4b5"],["navajowhite","#ffdead"],["oldlace","#fdf5e6"],["olivedrab","#6b8e23"],["orange","#ffa500"],["orangered","#ff4500"],["orchid","#da70d6"],["palegoldenrod","#eee8aa"],["palegreen","#98fb98"],["paleturquoise","#afeeee"],["palevioletred","#db7093"],["papayawhip","#ffefd5"],["peachpuff","#ffdab9"],["peru","#cd853f"],["pink","#ffc0cb"],["plum","#dda0dd"],["powderblue","#b0e0e6"],["rosybrown","#bc8f8f"],["royalblue","#4169e1"],["saddlebrown","#8b4513"],["salmon","#fa8072"],["sandybrown","#f4a460"],["seagreen","#2e8b57"],["seashell","#fff5ee"],["sienna","#a0522d"],["skyblue","#87ceeb"],["slateblue","#6a5acd"],["slategray","#708090"],["slategrey","#708090"],["snow","#fffafa"],["springgreen","#00ff7f"],["steelblue","#4682b4"],["tan","#d2b48c"],["thistle","#d8bfd8"],["tomato","#ff6347"],["turquoise","#40e0d0"],["violet","#ee82ee"],["wheat","#f5deb3"],["whitesmoke","#f5f5f5"],["yellowgreen","#9acd32"]]);e.default=r}(x)),x)),o=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,u=/^(rgb|rgba|RGB|RGBA)/,l=/^(rgba|RGBA)/;
/**
      	 * @description Color validator
      	 * @param {String} color Hex|Rgb|Rgba color or color keyword
      	 * @return {String|Boolean} Valid color Or false
      	 */
function d(e){var r,t=o.test(e),a=u.test(e);return t||a?e:(e=!!(r=e)&&!!f.default.has(r)&&f.default.get(r))||!1}
/**
      	 * @description Get color by keyword
      	 * @param {String} keyword Color keyword like red, green and etc.
      	 * @return {String|Boolean} Hex or rgba color (Invalid keyword will return false)
      	 */
/**
      	 * @description Get the Rgb value of the color
      	 * @param {String} color Hex|Rgb|Rgba color or color keyword
      	 * @return {Array<Number>|Boolean} Rgb value of the color (Invalid input will return false)
      	 */
function s(e){if(!e)return!1;if(!(e=d(e)))return!1;var r=o.test(e),t=u.test(e),a=e.toLowerCase();return r?
/**
      	 * @description Get the rgb value of the hex color
      	 * @param {String} color Hex color
      	 * @return {Array<Number>} Rgb value of the color
      	 */
function(e){return 3===(e=e.replace("#","")).length&&(e=Array.from(e).map((function(e){return e+e})).join("")),e=e.split(""),new Array(3).fill(0).map((function(r,t){return parseInt("0x".concat(e[2*t]).concat(e[2*t+1]))}))}
/**
      	 * @description Get the rgb value of the rgb/rgba color
      	 * @param {String} color Hex color
      	 * @return {Array} Rgb value of the color
      	 */(a):t?function(e){return e.replace(/rgb\(|rgba\(|\)/g,"").split(",").slice(0,3).map((function(e){return parseInt(e)}))}
/**
      	 * @description Get the Rgba value of the color
      	 * @param {String} color Hex|Rgb|Rgba color or color keyword
      	 * @return {Array<Number>|Boolean} Rgba value of the color (Invalid input will return false)
      	 */(a):void 0}function b(e){if(!e)return!1;var r=s(e);return!!r&&(r.push(p(e)),r)}
/**
      	 * @description Get the opacity of color
      	 * @param {String} color Hex|Rgb|Rgba color or color keyword
      	 * @return {Number|Boolean} Color opacity (Invalid input will return false)
      	 */function p(e){return!!e&&!!(e=d(e))&&(l.test(e)?(e=e.toLowerCase(),Number(e.split(",").slice(-1)[0].replace(/[)|\s]/g,""))):1)}
/**
      	 * @description Convert color to Rgb|Rgba color
      	 * @param {String} color   Hex|Rgb|Rgba color or color keyword
      	 * @param {Number} opacity The opacity of color
      	 * @return {String|Boolean} Rgb|Rgba color (Invalid input will return false)
      	 */function h(e,r){if(!e)return!1;var t=s(e);return!!t&&("number"==typeof r?"rgba("+t.join(",")+",".concat(r,")"):"rgb("+t.join(",")+")")}
/**
      	 * @description Convert color to Hex color
      	 * @param {String} color Hex|Rgb|Rgba color or color keyword
      	 * @return {String|Boolean} Hex color (Invalid input will return false)
      	 */function k(e){return!!e&&(o.test(e)?e:!!(e=s(e))&&"#"+e.map((function(e){return Number(e).toString(16)})).map((function(e){return"0"===e?"00":e})).join(""))}
/**
      	 * @description Get Color from Rgb|Rgba value
      	 * @param {Array<Number>} value Rgb|Rgba color value
      	 * @return {String|Boolean} Rgb|Rgba color (Invalid input will return false)
      	 */function w(e){if(!e)return!1;var r=e.length;if(3!==r&&4!==r)return!1;var t=3===r?"rgb(":"rgba(";return t+=e.join(",")+")"}
/**
      	 * @description Deepen color
      	 * @param {String} color Hex|Rgb|Rgba color or color keyword
      	 * @return {Number} Percent of Deepen (1-100)
      	 * @return {String|Boolean} Rgba color (Invalid input will return false)
      	 */function F(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!e)return!1;var t=b(e);return!!t&&w(t=t.map((function(e,t){return 3===t?e:e-Math.ceil(2.55*r)})).map((function(e){return e<0?0:e})))}
/**
      	 * @description Brighten color
      	 * @param {String} color Hex|Rgb|Rgba color or color keyword
      	 * @return {Number} Percent of brighten (1-100)
      	 * @return {String|Boolean} Rgba color (Invalid input will return false)
      	 */function _(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!e)return!1;var t=b(e);return!!t&&w(t=t.map((function(e,t){return 3===t?e:e+Math.ceil(2.55*r)})).map((function(e){return e>255?255:e})))}
/**
      	 * @description Adjust color opacity
      	 * @param {String} color   Hex|Rgb|Rgba color or color keyword
      	 * @param {Number} Percent of opacity
      	 * @return {String|Boolean} Rgba color (Invalid input will return false)
      	 */function M(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(!e)return!1;var a=s(e);return!!a&&w([].concat((0,t.default)(a),[r/100]))}var A={fade:M,toHex:k,toRgb:h,darken:F,lighten:_,getOpacity:p,getRgbValue:s,getRgbaValue:b,getColorFromRgbValue:w};e.default=A}({})}}}));
