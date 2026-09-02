System.register([],(function(t,i){"use strict";return{execute:function(){// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function i(t,i){if((n=(t=i?t.toExponential(i-1):t.toExponential()).indexOf("e"))<0)return null;// NaN, ±Infinity
var n,r=t.slice(0,n);// The string returned by toExponential either has the form \d\.\d+e[-+]\d+
// (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
return[r.length>1?r[0]+r.slice(2):r,+t.slice(n+1)]}// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var n,r=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function e(t){if(!(i=r.exec(t)))throw new Error("invalid format: "+t);var i;return new o({fill:i[1],align:i[2],sign:i[3],symbol:i[4],zero:i[5],width:i[6],comma:i[7],precision:i[8]&&i[8].slice(1),trim:i[9],type:i[10]})}// instanceof
function o(t){this.fill=void 0===t.fill?" ":t.fill+"",this.align=void 0===t.align?">":t.align+"",this.sign=void 0===t.sign?"-":t.sign+"",this.symbol=void 0===t.symbol?"":t.symbol+"",this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?"":t.type+""}function a(t,n){var r=i(t,n);if(!r)return t+"";var e=r[0],o=r[1];return o<0?"0."+new Array(-o).join("0")+e:e.length>o+1?e.slice(0,o+1)+"."+e.slice(o+1):e+new Array(o-e.length+2).join("0")}e.prototype=o.prototype,o.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};const s={"%":(t,i)=>(100*t).toFixed(i),b:t=>Math.round(t).toString(2),c:t=>t+"",d:function(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)},e:(t,i)=>t.toExponential(i),f:(t,i)=>t.toFixed(i),g:(t,i)=>t.toPrecision(i),o:t=>Math.round(t).toString(8),p:(t,i)=>a(100*t,i),r:a,s:function(t,r){var e=i(t,r);if(!e)return t+"";var o=e[0],a=e[1],s=a-(n=3*Math.max(-8,Math.min(8,Math.floor(a/3))))+1,c=o.length;return s===c?o:s>c?o+new Array(s-c+1).join("0"):s>0?o.slice(0,s)+"."+o.slice(s):"0."+new Array(1-s).join("0")+i(t,Math.max(0,r+s-1))[0];// less than 1y!
},X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function c(t){return t}var l,h,u=Array.prototype.map,f=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function d(t){var r,o,a=void 0===t.grouping||void 0===t.thousands?c:(r=u.call(t.grouping,Number),o=t.thousands+"",function(t,i){for(var n=t.length,e=[],a=0,s=r[0],c=0;n>0&&s>0&&(c+s+1>i&&(s=Math.max(1,i-c)),e.push(t.substring(n-=s,n+s)),!((c+=s+1)>i));)s=r[a=(a+1)%r.length];return e.reverse().join(o)}),l=void 0===t.currency?"":t.currency[0]+"",h=void 0===t.currency?"":t.currency[1]+"",d=void 0===t.decimal?".":t.decimal+"",g=void 0===t.numerals?c:function(t){return function(i){return i.replace(/[0-9]/g,(function(i){return t[+i]}))}}(u.call(t.numerals,String)),m=void 0===t.percent?"%":t.percent+"",p=void 0===t.minus?"−":t.minus+"",v=void 0===t.nan?"NaN":t.nan+"";function y(t){var i=(t=e(t)).fill,r=t.align,o=t.sign,c=t.symbol,u=t.zero,y=t.width,M=t.comma,b=t.precision,x=t.trim,w=t.type;// The "n" type is an alias for ",g".
"n"===w?(M=!0,w="g"):s[w]||(void 0===b&&(b=12),x=!0,w="g"),// If zero fill is specified, padding goes after sign and before digits.
(u||"0"===i&&"="===r)&&(u=!0,i="0",r="=");// Compute the prefix and suffix.
// For SI-prefix, the suffix is lazily computed.
var S="$"===c?l:"#"===c&&/[boxX]/.test(w)?"0"+w.toLowerCase():"",k="$"===c?h:/[%p]/.test(w)?m:"",z=s[w],A=/[defgprs%]/.test(w);// What format function should we use?
// Is this an integer type?
// Can this type generate exponential notation?
function N(t){var e,s,c,l=S,h=k;if("c"===w)h=z(t)+h,t="";else{// Determine the sign. -0 is not less than 0, but 1 / -0 is!
var m=(t=+t)<0||1/t<0;// Perform the initial formatting.
// Break the formatted value into the integer “value” part that can be
// grouped, and fractional or exponential “suffix” part that is not.
if(t=isNaN(t)?v:z(Math.abs(t),b),// Trim insignificant zeros.
x&&(t=// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function(t){t:for(var i,n=t.length,r=1,e=-1;r<n;++r)switch(t[r]){case".":e=i=r;break;case"0":0===e&&(e=r),i=r;break;default:if(!+t[r])break t;e>0&&(e=0)}return e>0?t.slice(0,e)+t.slice(i+1):t}(t)),// If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
m&&0==+t&&"+"!==o&&(m=!1),// Compute the prefix and suffix.
l=(m?"("===o?o:p:"-"===o||"("===o?"":o)+l,h=("s"===w?f[8+n/3]:"")+h+(m&&"("===o?")":""),A)for(e=-1,s=t.length;++e<s;)if(48>(c=t.charCodeAt(e))||c>57){h=(46===c?d+t.slice(e+1):t.slice(e))+h,t=t.slice(0,e);break}}// If the fill character is not "0", grouping is applied before padding.
M&&!u&&(t=a(t,1/0));// Compute the padding.
var N=l.length+t.length+h.length,j=N<y?new Array(y-N+1).join(i):"";// If the fill character is "0", grouping is applied after padding.
// Reconstruct the final output based on the desired alignment.
switch(M&&u&&(t=a(j+t,j.length?y-h.length:1/0),j=""),r){case"<":t=l+t+h+j;break;case"=":t=l+j+t+h;break;case"^":t=j.slice(0,N=j.length>>1)+l+t+h+j.slice(N);break;default:t=j+l+t+h}return g(t)}// Set the default precision if not specified,
// or clamp the specified precision to the supported range.
// For significant precision, it must be in [1, 21].
// For fixed precision, it must be in [0, 20].
return b=void 0===b?6:/[gprs]/.test(w)?Math.max(1,Math.min(21,b)):Math.max(0,Math.min(20,b)),N.toString=function(){return t+""},N}return{format:y,formatPrefix:function(t,n){var r,o=y(((t=e(t)).type="f",t)),a=3*Math.max(-8,Math.min(8,Math.floor((r=n,((r=i(Math.abs(r)))?r[1]:NaN)/3)))),s=Math.pow(10,-a),c=f[8+a/3];return function(t){return o(s*t)+c}}}}t("f",h),l=d({thousands:",",grouping:[3],currency:["$",""]}),t("f",h=l.format),l.formatPrefix}}}));
