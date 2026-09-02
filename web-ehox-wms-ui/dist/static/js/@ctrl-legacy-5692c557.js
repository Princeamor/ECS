System.register([],(function(t,r){"use strict";return{execute:function(){
/**
             * Take input from [0, n] and return it as [0, 1]
             * @hidden
             */
function r(t,r){(
/**
             * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
             * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
             * @hidden
             */
function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)}
/**
             * Check to see if string passed in is a percentage
             * @hidden
             */)(t)&&(t="100%");var e=function(t){return"string"==typeof t&&-1!==t.indexOf("%")}
/**
             * Return a valid alpha value [0,1] with all invalid values being set to 1
             * @hidden
             */(t);// Handle floating point rounding errors
return t=360===r?t:Math.min(r,Math.max(0,parseFloat(t))),// Automatically convert percentage into number
e&&(t=parseInt(String(t*r),10)/100),Math.abs(t-r)<1e-6?1:// Convert into [0, 1] range if it isn't already
// If n is a hue given in degrees,
// wrap around out-of-range values into [0, 360] range
// then convert into [0, 1].
t=360===r?(t<0?t%r+r:t%r)/parseFloat(String(r)):t%r/parseFloat(String(r))}
/**
             * Force a number between 0 and 1
             * @hidden
             */function e(t){return Math.min(1,Math.max(0,t))}function a(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}
/**
             * Replace a decimal with it's percentage value
             * @hidden
             */function n(t){return t<=1?"".concat(100*Number(t),"%"):t}
/**
             * Force a hex value to have 2 characters
             * @hidden
             */function o(t){return 1===t.length?"0"+t:String(t)}// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
             * Handle bounds / percentage checking to conform to CSS color spec
             * <http://www.w3.org/TR/css3-color/>
             * *Assumes:* r, g, b in [0, 255] or [0, 1]
             * *Returns:* { r, g, b } in [0, 255]
             */
/**
             * Converts an RGB color value to HSL.
             * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
             * *Returns:* { h, s, l } in [0,1]
             */
function i(t,e,a){t=r(t,255),e=r(e,255),a=r(a,255);var n=Math.max(t,e,a),o=Math.min(t,e,a),i=0,h=0,s=(n+o)/2;if(n===o)h=0,i=0;else{var f=n-o;switch(h=s>.5?f/(2-n-o):f/(n+o),n){case t:i=(e-a)/f+(e<a?6:0);break;case e:i=(a-t)/f+2;break;case a:i=(t-e)/f+4}i/=6}return{h:i,s:h,l:s}}function h(t,r,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+6*e*(r-t):e<.5?r:e<2/3?t+(r-t)*(2/3-e)*6:t}
/**
             * Converts an HSL color value to RGB.
             *
             * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
             * *Returns:* { r, g, b } in the set [0, 255]
             */
/**
             * Converts an RGB color value to HSV
             *
             * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
             * *Returns:* { h, s, v } in [0,1]
             */
function s(t,e,a){t=r(t,255),e=r(e,255),a=r(a,255);var n=Math.max(t,e,a),o=Math.min(t,e,a),i=0,h=n,s=n-o,f=0===n?0:s/n;if(n===o)i=0;// achromatic
else{switch(n){case t:i=(e-a)/s+(e<a?6:0);break;case e:i=(a-t)/s+2;break;case a:i=(t-e)/s+4}i/=6}return{h:i,s:f,v:h}}
/**
             * Converts an HSV color value to RGB.
             *
             * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
             * *Returns:* { r, g, b } in the set [0, 255]
             */
/**
             * Converts an RGB color to hex
             *
             * Assumes r, g, and b are contained in the set [0, 255]
             * Returns a 3 or 6 character hex
             */
function f(t,r,e,a){var n=[o(Math.round(t).toString(16)),o(Math.round(r).toString(16)),o(Math.round(e).toString(16))];// Return a 3 character hex if possible
return a&&n[0].startsWith(n[0].charAt(1))&&n[1].startsWith(n[1].charAt(1))&&n[2].startsWith(n[2].charAt(1))?n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0):n.join("")}
/**
             * Converts an RGBA color plus alpha transparency to hex
             *
             * Assumes r, g, b are contained in the set [0, 255] and
             * a in [0, 1]. Returns a 4 or 8 character rgba hex
             */
// eslint-disable-next-line max-params
/** Converts a hex value to a decimal */function c(t){return u(t)/255}/** Parse a base-16 hex value into a base-10 integer */function u(t){return parseInt(t,16)}// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
             * @hidden
             */
var g={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/**
             * Given a string or object, convert that input to RGB
             *
             * Possible string inputs:
             * ```
             * "red"
             * "#f00" or "f00"
             * "#ff0000" or "ff0000"
             * "#ff000000" or "ff000000"
             * "rgb 255 0 0" or "rgb (255, 0, 0)"
             * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
             * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
             * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
             * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
             * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
             * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
             * ```
             */function d(t){var e,o,i,s={r:0,g:0,b:0},f=1,d=null,l=null,b=null,p=!1,y=!1;return"string"==typeof t&&(t=
/**
             * Permissive string parsing.  Take in a number of formats, and output an object
             * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
             */
function(t){if(0===(t=t.trim().toLowerCase()).length)return!1;var r=!1;if(g[t])t=g[t],r=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};// Try to match string input using regular expressions.
// Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
// Just return an object and let the conversion functions handle that.
// This way the result will be the same whether the tinycolor is initialized with string or object.
var e=m.rgb.exec(t);return e?{r:e[1],g:e[2],b:e[3]}:(e=m.rgba.exec(t))?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=m.hsl.exec(t))?{h:e[1],s:e[2],l:e[3]}:(e=m.hsla.exec(t))?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=m.hsv.exec(t))?{h:e[1],s:e[2],v:e[3]}:(e=m.hsva.exec(t))?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=m.hex8.exec(t))?{r:u(e[1]),g:u(e[2]),b:u(e[3]),a:c(e[4]),format:r?"name":"hex8"}:(e=m.hex6.exec(t))?{r:u(e[1]),g:u(e[2]),b:u(e[3]),format:r?"name":"hex"}:(e=m.hex4.exec(t))?{r:u(e[1]+e[1]),g:u(e[2]+e[2]),b:u(e[3]+e[3]),a:c(e[4]+e[4]),format:r?"name":"hex8"}:!!(e=m.hex3.exec(t))&&{r:u(e[1]+e[1]),g:u(e[2]+e[2]),b:u(e[3]+e[3]),format:r?"name":"hex"}}
/**
             * Check to see if it looks like a CSS unit
             * (see `matchers` above for definition).
             */(t)),"object"==typeof t&&(v(t.r)&&v(t.g)&&v(t.b)?(e=t.r,o=t.g,i=t.b,s={r:255*r(e,255),g:255*r(o,255),b:255*r(i,255)},p=!0,y="%"===String(t.r).substr(-1)?"prgb":"rgb"):v(t.h)&&v(t.s)&&v(t.v)?(d=n(t.s),l=n(t.v),s=function(t,e,a){t=6*r(t,360),e=r(e,100),a=r(a,100);var n=Math.floor(t),o=t-n,i=a*(1-e),h=a*(1-o*e),s=a*(1-(1-o)*e),f=n%6;return{r:255*[a,h,i,i,s,a][f],g:255*[s,a,a,h,i,i][f],b:255*[i,i,s,a,a,h][f]}}(t.h,d,l),p=!0,y="hsv"):v(t.h)&&v(t.s)&&v(t.l)&&(d=n(t.s),b=n(t.l),s=function(t,e,a){var n,o,i;if(t=r(t,360),e=r(e,100),a=r(a,100),0===e)// achromatic
o=a,i=a,n=a;else{var s=a<.5?a*(1+e):a+e-a*e,f=2*a-s;n=h(f,s,t+1/3),o=h(f,s,t),i=h(f,s,t-1/3)}return{r:255*n,g:255*o,b:255*i}}(t.h,d,b),p=!0,y="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(f=t.a)),f=a(f),{ok:p,format:t.format||y,r:Math.min(255,Math.max(s.r,0)),g:Math.min(255,Math.max(s.g,0)),b:Math.min(255,Math.max(s.b,0)),a:f}}// <http://www.w3.org/TR/css3-values/#integers>
var l="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),b="[\\s|\\(]+(".concat(l,")[,|\\s]+(").concat(l,")[,|\\s]+(").concat(l,")\\s*\\)?"),p="[\\s|\\(]+(".concat(l,")[,|\\s]+(").concat(l,")[,|\\s]+(").concat(l,")[,|\\s]+(").concat(l,")\\s*\\)?"),m={CSS_UNIT:new RegExp(l),rgb:new RegExp("rgb"+b),rgba:new RegExp("rgba"+p),hsl:new RegExp("hsl"+b),hsla:new RegExp("hsla"+p),hsv:new RegExp("hsv"+b),hsva:new RegExp("hsva"+p),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};// <http://www.w3.org/TR/css3-values/#number-value>
function v(t){return Boolean(m.CSS_UNIT.exec(String(t)))}t("T",/** @class */function(){function t(r,e){var a;// If input is already a tinycolor, return itself
if(void 0===r&&(r=""),void 0===e&&(e={}),r instanceof t)// eslint-disable-next-line no-constructor-return
return r;"number"==typeof r&&(r=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(r)),this.originalInput=r;var n=d(r);this.originalInput=r,this.r=n.r,this.g=n.g,this.b=n.b,this.a=n.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(a=e.format)&&void 0!==a?a:n.format,this.gradientType=e.gradientType,// Don't let the range of [0,255] come back in [0,1].
// Potentially lose a little bit of precision here, but will fix issues where
// .5 gets interpreted as half of the total, instead of half of 1
// If it was supposed to be 128, this was already taken care of by `inputToRgb`
this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=n.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},
/**
                 * Returns the perceived brightness of the color, from 0-255.
                 */
t.prototype.getBrightness=function(){// http://www.w3.org/TR/AERT#color-contrast
var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},
/**
                 * Returns the perceived luminance of a color, from 0-1.
                 */
t.prototype.getLuminance=function(){// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
var t=this.toRgb(),r=t.r/255,e=t.g/255,a=t.b/255;return.2126*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.7152*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.0722*(a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4))},
/**
                 * Returns the alpha value of a color, from 0-1.
                 */
t.prototype.getAlpha=function(){return this.a},
/**
                 * Sets the alpha value on the current color.
                 *
                 * @param alpha - The new alpha value. The accepted range is 0-1.
                 */
t.prototype.setAlpha=function(t){return this.a=a(t),this.roundA=Math.round(100*this.a)/100,this},
/**
                 * Returns whether the color is monochrome.
                 */
t.prototype.isMonochrome=function(){return 0===this.toHsl().s},
/**
                 * Returns the object as a HSVA object.
                 */
t.prototype.toHsv=function(){var t=s(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},
/**
                 * Returns the hsva values interpolated into a string with the following format:
                 * "hsva(xxx, xxx, xxx, xx)".
                 */
t.prototype.toHsvString=function(){var t=s(this.r,this.g,this.b),r=Math.round(360*t.h),e=Math.round(100*t.s),a=Math.round(100*t.v);return 1===this.a?"hsv(".concat(r,", ").concat(e,"%, ").concat(a,"%)"):"hsva(".concat(r,", ").concat(e,"%, ").concat(a,"%, ").concat(this.roundA,")")},
/**
                 * Returns the object as a HSLA object.
                 */
t.prototype.toHsl=function(){var t=i(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},
/**
                 * Returns the hsla values interpolated into a string with the following format:
                 * "hsla(xxx, xxx, xxx, xx)".
                 */
t.prototype.toHslString=function(){var t=i(this.r,this.g,this.b),r=Math.round(360*t.h),e=Math.round(100*t.s),a=Math.round(100*t.l);return 1===this.a?"hsl(".concat(r,", ").concat(e,"%, ").concat(a,"%)"):"hsla(".concat(r,", ").concat(e,"%, ").concat(a,"%, ").concat(this.roundA,")")},
/**
                 * Returns the hex value of the color.
                 * @param allow3Char will shorten hex value to 3 char if possible
                 */
t.prototype.toHex=function(t){return void 0===t&&(t=!1),f(this.r,this.g,this.b,t)},
/**
                 * Returns the hex value of the color -with a # prefixed.
                 * @param allow3Char will shorten hex value to 3 char if possible
                 */
t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},
/**
                 * Returns the hex 8 value of the color.
                 * @param allow4Char will shorten hex value to 4 char if possible
                 */
t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,r,e,a,n){var i,h=[o(Math.round(t).toString(16)),o(Math.round(r).toString(16)),o(Math.round(e).toString(16)),o((i=a,Math.round(255*parseFloat(i)).toString(16)))];// Return a 4 character hex if possible
return n&&h[0].startsWith(h[0].charAt(1))&&h[1].startsWith(h[1].charAt(1))&&h[2].startsWith(h[2].charAt(1))&&h[3].startsWith(h[3].charAt(1))?h[0].charAt(0)+h[1].charAt(0)+h[2].charAt(0)+h[3].charAt(0):h.join("")}/** Converts a decimal to a hex value */(this.r,this.g,this.b,this.a,t)},
/**
                 * Returns the hex 8 value of the color -with a # prefixed.
                 * @param allow4Char will shorten hex value to 4 char if possible
                 */
t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},
/**
                 * Returns the shorter hex value of the color depends on its alpha -with a # prefixed.
                 * @param allowShortChar will shorten hex value to 3 or 4 char if possible
                 */
t.prototype.toHexShortString=function(t){return void 0===t&&(t=!1),1===this.a?this.toHexString(t):this.toHex8String(t)},
/**
                 * Returns the object as a RGBA object.
                 */
t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},
/**
                 * Returns the RGBA values interpolated into a string with the following format:
                 * "RGBA(xxx, xxx, xxx, xx)".
                 */
t.prototype.toRgbString=function(){var t=Math.round(this.r),r=Math.round(this.g),e=Math.round(this.b);return 1===this.a?"rgb(".concat(t,", ").concat(r,", ").concat(e,")"):"rgba(".concat(t,", ").concat(r,", ").concat(e,", ").concat(this.roundA,")")},
/**
                 * Returns the object as a RGBA object.
                 */
t.prototype.toPercentageRgb=function(){var t=function(t){return"".concat(Math.round(100*r(t,255)),"%")};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},
/**
                 * Returns the RGBA relative values interpolated into a string
                 */
t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*r(t,255))};return 1===this.a?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")")},
/**
                 * The 'real' name of the color -if there is one.
                 */
t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+f(this.r,this.g,this.b,!1),r=0,e=Object.entries(g);r<e.length;r++){var a=e[r],n=a[0];if(t===a[1])return n}return!1},t.prototype.toString=function(t){var r=Boolean(t);t=null!=t?t:this.format;var e=!1,a=this.a<1&&this.a>=0;return r||!a||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(e=this.toRgbString()),"prgb"===t&&(e=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(e=this.toHexString()),"hex3"===t&&(e=this.toHexString(!0)),"hex4"===t&&(e=this.toHex8String(!0)),"hex8"===t&&(e=this.toHex8String()),"name"===t&&(e=this.toName()),"hsl"===t&&(e=this.toHslString()),"hsv"===t&&(e=this.toHsvString()),e||this.toHexString()):// Special case for "transparent", all other non-alpha formats
// will return rgba when there is transparency.
"name"===t&&0===this.a?this.toName():this.toRgbString()},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},
/**
                 * Lighten the color a given amount. Providing 100 will always return white.
                 * @param amount - valid between 1-100
                 */
t.prototype.lighten=function(r){void 0===r&&(r=10);var a=this.toHsl();return a.l+=r/100,a.l=e(a.l),new t(a)},
/**
                 * Brighten the color a given amount, from 0 to 100.
                 * @param amount - valid between 1-100
                 */
t.prototype.brighten=function(r){void 0===r&&(r=10);var e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(-r/100*255))),e.g=Math.max(0,Math.min(255,e.g-Math.round(-r/100*255))),e.b=Math.max(0,Math.min(255,e.b-Math.round(-r/100*255))),new t(e)},
/**
                 * Darken the color a given amount, from 0 to 100.
                 * Providing 100 will always return black.
                 * @param amount - valid between 1-100
                 */
t.prototype.darken=function(r){void 0===r&&(r=10);var a=this.toHsl();return a.l-=r/100,a.l=e(a.l),new t(a)},
/**
                 * Mix the color with pure white, from 0 to 100.
                 * Providing 0 will do nothing, providing 100 will always return white.
                 * @param amount - valid between 1-100
                 */
t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},
/**
                 * Mix the color with pure black, from 0 to 100.
                 * Providing 0 will do nothing, providing 100 will always return black.
                 * @param amount - valid between 1-100
                 */
t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},
/**
                 * Desaturate the color a given amount, from 0 to 100.
                 * Providing 100 will is the same as calling greyscale
                 * @param amount - valid between 1-100
                 */
t.prototype.desaturate=function(r){void 0===r&&(r=10);var a=this.toHsl();return a.s-=r/100,a.s=e(a.s),new t(a)},
/**
                 * Saturate the color a given amount, from 0 to 100.
                 * @param amount - valid between 1-100
                 */
t.prototype.saturate=function(r){void 0===r&&(r=10);var a=this.toHsl();return a.s+=r/100,a.s=e(a.s),new t(a)},
/**
                 * Completely desaturates a color into greyscale.
                 * Same as calling `desaturate(100)`
                 */
t.prototype.greyscale=function(){return this.desaturate(100)},
/**
                 * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
                 * Values outside of this range will be wrapped into this range.
                 */
t.prototype.spin=function(r){var e=this.toHsl(),a=(e.h+r)%360;return e.h=a<0?360+a:a,new t(e)},
/**
                 * Mix the current color a given amount with another color, from 0 to 100.
                 * 0 means no mixing (return current color).
                 */
t.prototype.mix=function(r,e){void 0===e&&(e=50);var a=this.toRgb(),n=new t(r).toRgb(),o=e/100;return new t({r:(n.r-a.r)*o+a.r,g:(n.g-a.g)*o+a.g,b:(n.b-a.b)*o+a.b,a:(n.a-a.a)*o+a.a})},t.prototype.analogous=function(r,e){void 0===r&&(r=6),void 0===e&&(e=30);var a=this.toHsl(),n=360/e,o=[this];for(a.h=(a.h-(n*r>>1)+720)%360;--r;)a.h=(a.h+n)%360,o.push(new t(a));return o},
/**
                 * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
                 */
t.prototype.complement=function(){var r=this.toHsl();return r.h=(r.h+180)%360,new t(r)},t.prototype.monochromatic=function(r){void 0===r&&(r=6);for(var e=this.toHsv(),a=e.h,n=e.s,o=e.v,i=[],h=1/r;r--;)i.push(new t({h:a,s:n,v:o})),o=(o+h)%1;return i},t.prototype.splitcomplement=function(){var r=this.toHsl(),e=r.h;return[this,new t({h:(e+72)%360,s:r.s,l:r.l}),new t({h:(e+216)%360,s:r.s,l:r.l})]},
/**
                 * Compute how the color would appear on a background
                 */
t.prototype.onBackground=function(r){var e=this.toRgb(),a=new t(r).toRgb(),n=e.a+a.a*(1-e.a);return new t({r:(e.r*e.a+a.r*a.a*(1-e.a))/n,g:(e.g*e.a+a.g*a.a*(1-e.a))/n,b:(e.b*e.a+a.b*a.a*(1-e.a))/n,a:n})},
/**
                 * Alias for `polyad(3)`
                 */
t.prototype.triad=function(){return this.polyad(3)},
/**
                 * Alias for `polyad(4)`
                 */
t.prototype.tetrad=function(){return this.polyad(4)},
/**
                 * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
                 * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
                 */
t.prototype.polyad=function(r){for(var e=this.toHsl(),a=e.h,n=[this],o=360/r,i=1;i<r;i++)n.push(new t({h:(a+i*o)%360,s:e.s,l:e.l}));return n},
/**
                 * compare color vs current color
                 */
t.prototype.equals=function(r){return this.toRgbString()===new t(r).toRgbString()},t}())}}}));
