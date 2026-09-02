!function(){function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?e(Object(o),!0).forEach((function(e){n(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function n(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}System.register([],(function(e,n){"use strict";return{execute:function(){e({A:function(e={}){// setup options
const t=h(e.onWarn)?e.onWarn:A,n=L(e.version)?e.version:De,r=L(e.locale)||h(e.locale)?e.locale:we,o=h(r)?we:r,c=E(e.fallbackLocale)||T(e.fallbackLocale)||L(e.fallbackLocale)||!1===e.fallbackLocale?e.fallbackLocale:o,a=T(e.messages)?e.messages:Xe(o),u=T(e.datetimeFormats)?e.datetimeFormats:Xe(o),f=T(e.numberFormats)?e.numberFormats:Xe(o),m=i(l(),e.modifiers,{upper:(e,t)=>"text"===t&&L(e)?e.toUpperCase():"vnode"===t&&N(e)&&"__v_isVNode"in e?e.children.toUpperCase():e,lower:(e,t)=>"text"===t&&L(e)?e.toLowerCase():"vnode"===t&&N(e)&&"__v_isVNode"in e?e.children.toLowerCase():e,capitalize:(e,t)=>"text"===t&&L(e)?xe(e):"vnode"===t&&N(e)&&"__v_isVNode"in e?xe(e.children):e}),d=e.pluralRules||l(),p=h(e.missing)?e.missing:null,_=!k(e.missingWarn)&&!s(e.missingWarn)||e.missingWarn,y=!k(e.fallbackWarn)&&!s(e.fallbackWarn)||e.fallbackWarn,b=!!e.fallbackFormat,g=!!e.unresolving,C=h(e.postTranslation)?e.postTranslation:null,O=T(e.processor)?e.processor:null,I=!k(e.warnHtmlMessage)||e.warnHtmlMessage,S=!!e.escapeParameter,P=h(e.messageCompiler)?e.messageCompiler:Re,D=h(e.messageResolver)?e.messageResolver:Ue||Pe,v=h(e.localeFallbacker)?e.localeFallbacker:Me||be,w=N(e.fallbackContext)?e.fallbackContext:void 0,x=e,R=N(x.__datetimeFormatters)?x.__datetimeFormatters:new Map,U=N(x.__numberFormatters)?x.__numberFormatters:new Map,M=N(x.__meta)?x.__meta:{};je++;const F={version:n,cid:je,locale:r,fallbackLocale:c,messages:a,modifiers:m,pluralRules:d,missing:p,missingWarn:_,fallbackWarn:y,fallbackFormat:b,unresolving:g,postTranslation:C,processor:O,warnHtmlMessage:I,escapeParameter:S,messageCompiler:P,messageResolver:D,localeFallbacker:v,fallbackContext:w,onWarn:t,__meta:M};// NOTE: experimental !!
F.datetimeFormats=u,F.numberFormats=f,F.__datetimeFormatters=R,F.__numberFormatters=U,__INTLIFY_PROD_DEVTOOLS__&&function(e,t,n){// TODO: queue if devtools is undefined
pe&&pe.emit("i18n:init",{timestamp:Date.now(),i18n:e,version:t,meta:n})}(F,n,M);return F},B:/** @internal */function(e,t,n){const r=e;for(const o in n){const e=`${t}__${o}`;r.__datetimeFormatters.has(e)&&r.__datetimeFormatters.delete(e)}}// implementation of `number` function
,E:/** @internal */function(e,t,n){const r=e;for(const o in n){const e=`${t}__${o}`;r.__numberFormatters.has(e)&&r.__numberFormatters.delete(e)}},I:ct,J:// implementation of `translate` function
function(e,...t){const{fallbackFormat:n,postTranslation:r,unresolving:c,messageCompiler:s,fallbackLocale:a,messages:u}=e,[f,m]=ct(...t),p=k(m.missingWarn)?m.missingWarn:e.missingWarn,_=k(m.fallbackWarn)?m.fallbackWarn:e.fallbackWarn,y=k(m.escapeParameter)?m.escapeParameter:e.escapeParameter,b=!!m.resolvedMessage,g=L(m.default)||k(m.default)?k(m.default)?s?f:()=>f:m.default:n?s?f:()=>f:null,C=n||null!=g&&(L(g)||h(g)),A=ke(e,m);// escape params
y&&function(e){E(e.list)?e.list=e.list.map((e=>L(e)?d(e):e)):N(e.named)&&Object.keys(e.named).forEach((t=>{L(e.named[t])&&(e.named[t]=d(e.named[t]))}))}(m);// resolve message format
// eslint-disable-next-line prefer-const
let[O,I,S]=b?[f,A,u[A]||l()]:rt(e,f,A,a,_,p),P=O,D=f;// NOTE:
//  Fix to work around `ssrTransfrom` bug in Vite.
//  https://github.com/vitejs/vite/issues/4306
//  To get around this, use temporary variables.
//  https://github.com/nuxt/framework/issues/1461#issuecomment-954606243
b||L(P)||de(P)||nt(P)||C&&(P=g,D=P);// checking message format and target locale
if(!(b||(L(P)||de(P)||nt(P))&&L(I)))return c?ve:f;// setup compile error detecting
let v=!1;const w=nt(P)?P:ot(e,f,I,P,D,(()=>{v=!0}));// compile message format
// if occurred compile error, return the message format
if(v)return P;// evaluate message with context
const x=function(e={}){const t=e.locale,n=function(e){// prettier-ignore
const t=o(e.pluralIndex)?e.pluralIndex:-1;// prettier-ignore
return e.named&&(o(e.named.count)||o(e.named.n))?o(e.named.count)?e.named.count:o(e.named.n)?e.named.n:t:t}(e),r=N(e.pluralRules)&&L(t)&&h(e.pluralRules[t])?e.pluralRules[t]:et,c=N(e.pluralRules)&&L(t)&&h(e.pluralRules[t])?et:void 0,s=e=>e[r(n,e.length,c)],a=e.list||[],u=e=>a[e]// eslint-disable-next-line @typescript-eslint/no-explicit-any
,f=e.named||l();o(e.pluralIndex)&&function(e,t){t.count||(t.count=e);t.n||(t.n=e)}(n,f);const m=e=>f[e];function d(t,n){// prettier-ignore
const r=h(e.messages)?e.messages(t,!!n):!!N(e.messages)&&e.messages[t];return r||(e.parent?e.parent.message(t):Je)}const p=t=>e.modifiers?e.modifiers[t]:Be,_=T(e.processor)&&h(e.processor.normalize)?e.processor.normalize:Ze,k=T(e.processor)&&h(e.processor.interpolate)?e.processor.interpolate:qe,y=T(e.processor)&&L(e.processor.type)?e.processor.type:Qe,b=(e,...t)=>{const[n,r]=t;let o="text",c="";1===t.length?N(n)?(c=n.modifier||c,o=n.type||o):L(n)&&(c=n||c):2===t.length&&(L(n)&&(c=n||c),L(r)&&(o=r||o));const s=d(e,!0)(g),a=// The message in vnode resolved with linked are returned as an array by processor.nomalize
"vnode"===o&&E(s)&&c?s[0]:s;return c?p(c)(a,o):a},g={list:u,named:m,plural:s,linked:b,message:d,type:y,interpolate:k,normalize:_,values:i(l(),a,f)};return g}(function(e,t,n,r){const{modifiers:c,pluralRules:s,messageResolver:a,fallbackLocale:i,fallbackWarn:u,missingWarn:l,fallbackContext:f}=e,m=(r,o)=>{let c=a(n,r);// fallback
if(null==c&&(f||o)){const[,,n]=rt(f||e,// NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
r,t,i,u,l);c=a(n,r)}if(L(c)||de(c)){let n=!1;const o=ot(e,r,t,c,r,(()=>{n=!0}));return n?tt:o}return nt(c)?c:tt},d={locale:t,modifiers:c,pluralRules:s,messages:m};e.processor&&(d.processor=e.processor);r.list&&(d.list=r.list);r.named&&(d.named=r.named);o(r.plural)&&(d.pluralIndex=r.plural);return d}(e,I,S,m)),R=function(e,t,n){const r=t(n);return r}/** @internal */(0,w,x),U=r?r(R,f):R;// NOTE: experimental !!
if(__INTLIFY_PROD_DEVTOOLS__){// prettier-ignore
const t={timestamp:Date.now(),key:L(f)?f:nt(P)?P.key:"",locale:I||(nt(P)?P.locale:""),format:L(P)?P:nt(P)?P.source:"",message:U};t.meta=i({},e.__meta,$e()||{}),_e(t)}return U},K:Ke,L:// implementation of `datetime` function
function(e,...t){const{datetimeFormats:n,unresolving:r,fallbackLocale:o,onWarn:c,localeFallbacker:s}=e,{__datetimeFormatters:u}=e,[l,f,m,d]=Ke(...t),p=k(m.missingWarn)?m.missingWarn:e.missingWarn;k(m.fallbackWarn)?m.fallbackWarn:e.fallbackWarn;const _=!!m.part,E=ke(e,m),h=s(e,// eslint-disable-line @typescript-eslint/no-explicit-any
o,E);if(!L(l)||""===l)return new Intl.DateTimeFormat(E,d).format(f);// resolve format
let N,y={},b=null;for(let a=0;a<h.length&&(N=h[a],y=n[N]||{},b=y[l],!T(b));a++)Ye(e,l,N,p,"datetime format");// checking format and target locale
if(!T(b)||!L(N))return r?ve:l;let g=`${N}__${l}`;a(d)||(g=`${g}__${JSON.stringify(d)}`);let C=u.get(g);C||(C=new Intl.DateTimeFormat(N,i({},b,d)),u.set(g,C));return _?C.formatToParts(f):C.format(f)}/** @internal */,O:ze,P:function(e,...t){const{numberFormats:n,unresolving:r,fallbackLocale:o,onWarn:c,localeFallbacker:s}=e,{__numberFormatters:u}=e,[l,f,m,d]=ze(...t),p=k(m.missingWarn)?m.missingWarn:e.missingWarn;k(m.fallbackWarn)?m.fallbackWarn:e.fallbackWarn;const _=!!m.part,E=ke(e,m),h=s(e,// eslint-disable-line @typescript-eslint/no-explicit-any
o,E);if(!L(l)||""===l)return new Intl.NumberFormat(E,d).format(f);// resolve format
let N,y={},b=null;for(let a=0;a<h.length&&(N=h[a],y=n[N]||{},b=y[l],!T(b));a++)Ye(e,l,N,p,"number format");// checking format and target locale
if(!T(b)||!L(N))return r?ve:l;let g=`${N}__${l}`;a(d)||(g=`${g}__${JSON.stringify(d)}`);let C=u.get(g);C||(C=new Intl.NumberFormat(N,i({},b,d)),u.set(g,C));return _?C.formatToParts(f):C.format(f)}/** @internal */,Q:de,g:
/**
       * Register the message resolver
       *
       * @param resolver - A {@link MessageResolver} function
       *
       * @VueI18nGeneral
       */
function(e){Ue=e},h:
/**
       * Register the locale fallbacker
       *
       * @param fallbacker - A {@link LocaleFallbacker} function
       *
       * @VueI18nGeneral
       */
function(e){Me=e}// Additional Meta for Intlify DevTools
,k:P,r:function(e){Re=e},s:function(e){pe=e},u:/** @internal */function(e,t,n){e.__localeChainCache=new Map,e.localeFallbacker(e,n,t)}/** @internal */,v:/* #__NO_SIDE_EFFECTS__ */function(e,n){if(L(e)){// check HTML message
!k(n.warnHtmlMessage)||n.warnHtmlMessage;// check caches
const r=(n.onCacheKey||fe)(e),o=me[r];if(o)return o;// compile with JIT mode
const{ast:c,detectError:s}=function(e,n={}){// error detecting on compile
let r=!1;const o=n.onError||D;// compile with mesasge-compiler
return n.onError=e=>{r=!0,o(e)},t(t({},function(e,t={}){const n=i({},t),r=!!n.jit,o=!!n.minify,c=null==n.optimize||n.optimize,s=function(e={}){const t=!1!==e.location,{onError:n}=e;function r(e,r,o,c,...s){const a=e.currentPosition();if(a.offset+=c,a.column+=c,n){const e=P(r,t?I(o,a):null,{domain:W,args:s});n(e)}}function o(e,n,r){const o={type:e};return t&&(o.start=n,o.end=n,o.loc={start:r,end:r}),o}function c(e,n,r,o){t&&(e.end=n,e.loc&&(e.loc.end=r))}function s(e,t){const n=e.context(),r=o(3/* NodeTypes.Text */,n.offset,n.startLoc);return r.value=t,c(r,e.currentOffset(),e.currentPosition()),r}function a(e,t){const n=e.context(),{lastOffset:r,lastStartLoc:s}=n,a=o(5/* NodeTypes.List */,r,s);return a.index=parseInt(t,10),e.nextToken(),// skip brach right
c(a,e.currentOffset(),e.currentPosition()),a}function u(e,t){const n=e.context(),{lastOffset:r,lastStartLoc:s}=n,a=o(4/* NodeTypes.Named */,r,s);return a.key=t,e.nextToken(),// skip brach right
c(a,e.currentOffset(),e.currentPosition()),a}function l(e,t){const n=e.context(),{lastOffset:r,lastStartLoc:s}=n,a=o(9/* NodeTypes.Literal */,r,s);return a.value=t.replace(j,X),e.nextToken(),// skip brach right
c(a,e.currentOffset(),e.currentPosition()),a}function f(e){const t=e.nextToken(),n=e.context(),{lastOffset:s,lastStartLoc:a}=n,i=o(8/* NodeTypes.LinkedModifier */,s,a);return 11/* TokenTypes.LinkedModifier */!==t.type?(// empty modifier
r(e,S.UNEXPECTED_EMPTY_LINKED_MODIFIER,n.lastStartLoc,0),i.value="",c(i,s,a),{nextConsumeToken:t,node:i}):(// check token
null==t.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,n.lastStartLoc,0,Y(t)),i.value=t.value||"",c(i,e.currentOffset(),e.currentPosition()),{node:i})}function m(e,t){const n=e.context(),r=o(7/* NodeTypes.LinkedKey */,n.offset,n.startLoc);return r.value=t,c(r,e.currentOffset(),e.currentPosition()),r}function d(e){const t=e.context(),n=o(6/* NodeTypes.Linked */,t.offset,t.startLoc);let s=e.nextToken();if(8/* TokenTypes.LinkedDot */===s.type){const t=f(e);n.modifier=t.node,s=t.nextConsumeToken||e.nextToken()}// asset check token
switch(9/* TokenTypes.LinkedDelimiter */!==s.type&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(s)),s=e.nextToken(),// skip brace left
2/* TokenTypes.BraceLeft */===s.type&&(s=e.nextToken()),s.type){case 10/* TokenTypes.LinkedKey */:null==s.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(s)),n.key=m(e,s.value||"");break;case 4/* TokenTypes.Named */:null==s.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(s)),n.key=u(e,s.value||"");break;case 5/* TokenTypes.List */:null==s.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(s)),n.key=a(e,s.value||"");break;case 6/* TokenTypes.Literal */:null==s.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(s)),n.key=l(e,s.value||"");break;default:{// empty key
r(e,S.UNEXPECTED_EMPTY_LINKED_KEY,t.lastStartLoc,0);const a=e.context(),i=o(7/* NodeTypes.LinkedKey */,a.offset,a.startLoc);return i.value="",c(i,a.offset,a.startLoc),n.key=i,c(n,a.offset,a.startLoc),{nextConsumeToken:s,node:n}}}return c(n,e.currentOffset(),e.currentPosition()),{node:n}}function p(e){const t=e.context(),n=o(2/* NodeTypes.Message */,1/* TokenTypes.Pipe */===t.currentType?e.currentOffset():t.offset,1/* TokenTypes.Pipe */===t.currentType?t.endLoc:t.startLoc);n.items=[];let i=null;do{const o=i||e.nextToken();switch(i=null,o.type){case 0/* TokenTypes.Text */:null==o.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(o)),n.items.push(s(e,o.value||""));break;case 5/* TokenTypes.List */:null==o.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(o)),n.items.push(a(e,o.value||""));break;case 4/* TokenTypes.Named */:null==o.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(o)),n.items.push(u(e,o.value||""));break;case 6/* TokenTypes.Literal */:null==o.value&&r(e,S.UNEXPECTED_LEXICAL_ANALYSIS,t.lastStartLoc,0,Y(o)),n.items.push(l(e,o.value||""));break;case 7/* TokenTypes.LinkedAlias */:{const t=d(e);n.items.push(t.node),i=t.nextConsumeToken||null;break}}}while(13/* TokenTypes.EOF */!==t.currentType&&1/* TokenTypes.Pipe */!==t.currentType);// adjust message node loc
return c(n,1/* TokenTypes.Pipe */===t.currentType?t.lastOffset:e.currentOffset(),1/* TokenTypes.Pipe */===t.currentType?t.lastEndLoc:e.currentPosition()),n}function _(e,t,n,s){const a=e.context();let i=0===s.items.length;const u=o(1/* NodeTypes.Plural */,t,n);u.cases=[],u.cases.push(s);do{const t=p(e);i||(i=0===t.items.length),u.cases.push(t)}while(13/* TokenTypes.EOF */!==a.currentType);return i&&r(e,S.MUST_HAVE_MESSAGES_IN_PLURAL,n,0),c(u,e.currentOffset(),e.currentPosition()),u}function E(e){const t=e.context(),{offset:n,startLoc:r}=t,o=p(e);return 13/* TokenTypes.EOF */===t.currentType?o:_(e,n,r,o)}function h(n){const s=function(e,t={}){const n=!1!==t.location,r=function(e){const t=e;let n=0,r=1,o=1,c=0;const s=e=>t[e]===w&&t[e+1]===x,a=e=>t[e]===x,i=e=>t[e]===U,u=e=>t[e]===R,l=e=>s(e)||a(e)||i(e)||u(e),f=e=>s(e)||i(e)||u(e)?x:t[e],m=()=>f(n),d=()=>f(n+c);function p(){return c=0,l(n)&&(r++,o=0),s(n)&&n++,n++,o++,t[n]}function _(){return s(n+c)&&c++,c++,t[n+c]}function E(){n=0,r=1,o=1,c=0}function h(e=0){c=e}function L(){const e=n+c;for(;e!==n;)p();c=0}return{index:()=>n,line:()=>r,column:()=>o,peekOffset:()=>c,charAt:f,currentChar:m,currentPeek:d,next:p,peek:_,reset:E,resetPeek:h,skipToPeek:L}}(e),o=()=>r.index(),c=()=>{return e=r.line(),t=r.column(),n=r.index(),{line:e,column:t,offset:n};
/*!
        * message-compiler v11.0.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
var e,t,n},s=c(),a=o(),i={currentType:13/* TokenTypes.EOF */,offset:a,startLoc:s,endLoc:s,lastType:13/* TokenTypes.EOF */,lastOffset:a,lastStartLoc:s,lastEndLoc:s,braceNest:0,inLinked:!1,text:""},u=()=>i,{onError:l}=t;function f(e,t,r,...o){const c=u();if(t.column+=r,t.offset+=r,l){const r=P(e,n?I(c.startLoc,t):null,{domain:$,args:o});l(r)}}function m(e,t,r){e.endLoc=c(),e.currentType=t;const o={type:t};return n&&(o.loc=I(e.startLoc,e.endLoc)),null!=r&&(o.value=r),o}const d=e=>m(e,13/* TokenTypes.EOF */);function p(e,t){return e.currentChar()===t?(e.next(),t):(f(S.EXPECTED_TOKEN,c(),0,t),"")}function _(e){let t="";for(;e.currentPeek()===v||e.currentPeek()===x;)t+=e.currentPeek(),e.peek();return t}function E(e){const t=_(e);return e.skipToPeek(),t}function h(e){if(e===M)return!1;const t=e.charCodeAt(0);return t>=97&&t<=122||// a-z
t>=65&&t<=90||// A-Z
95===t}function L(e){if(e===M)return!1;const t=e.charCodeAt(0);return t>=48&&t<=57;// 0-9
}function k(e,t){const{currentType:n}=t;if(2/* TokenTypes.BraceLeft */!==n)return!1;_(e);const r=h(e.currentPeek());return e.resetPeek(),r}function N(e,t){const{currentType:n}=t;if(2/* TokenTypes.BraceLeft */!==n)return!1;_(e);const r=L("-"===e.currentPeek()?e.peek():e.currentPeek());return e.resetPeek(),r}function y(e,t){const{currentType:n}=t;if(2/* TokenTypes.BraceLeft */!==n)return!1;_(e);const r=e.currentPeek()===F;return e.resetPeek(),r}function b(e,t){const{currentType:n}=t;if(7/* TokenTypes.LinkedAlias */!==n)return!1;_(e);const r="."/* TokenChars.LinkedDot */===e.currentPeek();return e.resetPeek(),r}function g(e,t){const{currentType:n}=t;if(8/* TokenTypes.LinkedDot */!==n)return!1;_(e);const r=h(e.currentPeek());return e.resetPeek(),r}function T(e,t){const{currentType:n}=t;if(7/* TokenTypes.LinkedAlias */!==n&&11/* TokenTypes.LinkedModifier */!==n)return!1;_(e);const r=":"/* TokenChars.LinkedDelimiter */===e.currentPeek();return e.resetPeek(),r}function C(e,t){const{currentType:n}=t;if(9/* TokenTypes.LinkedDelimiter */!==n)return!1;const r=()=>{const t=e.currentPeek();return"{"/* TokenChars.BraceLeft */===t?h(e.peek()):!("@"/* TokenChars.LinkedAlias */===t||"|"/* TokenChars.Pipe */===t||":"/* TokenChars.LinkedDelimiter */===t||"."/* TokenChars.LinkedDot */===t||t===v||!t)&&(t===x?(e.peek(),r()):O(e,!1))},o=r();return e.resetPeek(),o}function A(e){_(e);const t="|"/* TokenChars.Pipe */===e.currentPeek();return e.resetPeek(),t}function O(e,t=!0){const n=(t=!1,r="")=>{const o=e.currentPeek();return"{"/* TokenChars.BraceLeft */===o?t:"@"/* TokenChars.LinkedAlias */!==o&&o?"|"/* TokenChars.Pipe */===o?!(r===v||r===x):o===v?(e.peek(),n(!0,v)):o!==x||(e.peek(),n(!0,x)):t},r=n();return t&&e.resetPeek(),r}function D(e,t){const n=e.currentChar();return n===M?M:t(n)?(e.next(),n):null}function W(e){const t=e.charCodeAt(0);return t>=97&&t<=122||// a-z
t>=65&&t<=90||// A-Z
t>=48&&t<=57||// 0-9
95===t||// _
36===t}function j(e){return D(e,W)}function X(e){const t=e.charCodeAt(0);return t>=97&&t<=122||// a-z
t>=65&&t<=90||// A-Z
t>=48&&t<=57||// 0-9
95===t||// _
36===t||// $
45===t}function Y(e){return D(e,X)}function V(e){const t=e.charCodeAt(0);return t>=48&&t<=57;// 0-9
}function G(e){return D(e,V)}function K(e){const t=e.charCodeAt(0);return t>=48&&t<=57||// 0-9
t>=65&&t<=70||// A-F
t>=97&&t<=102;// a-f
}function H(e){return D(e,K)}function z(e){let t="",n="";for(;t=G(e);)n+=t;return n}function B(e){let t="";for(;;){const n=e.currentChar();if("{"/* TokenChars.BraceLeft */===n||"}"/* TokenChars.BraceRight */===n||"@"/* TokenChars.LinkedAlias */===n||"|"/* TokenChars.Pipe */===n||!n)break;if(n===v||n===x)if(O(e))t+=n,e.next();else{if(A(e))break;t+=n,e.next()}else t+=n,e.next()}return t}function J(e){E(e);let t="",n="";for(;t=Y(e);)n+=t;return e.currentChar()===M&&f(S.UNTERMINATED_CLOSING_BRACE,c(),0),n}function Q(e){E(e);let t="";return"-"===e.currentChar()?(e.next(),t+=`-${z(e)}`):t+=z(e),e.currentChar()===M&&f(S.UNTERMINATED_CLOSING_BRACE,c(),0),t}function Z(e){return e!==F&&e!==x}function q(e){E(e),// eslint-disable-next-line no-useless-escape
p(e,"'");let t="",n="";for(;t=D(e,Z);)n+="\\"===t?ee(e):t;const r=e.currentChar();return r===x||r===M?(f(S.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER,c(),0),// TODO: Is it correct really?
r===x&&(e.next(),// eslint-disable-next-line no-useless-escape
p(e,"'")),n):(// eslint-disable-next-line no-useless-escape
p(e,"'"),n)}function ee(e){const t=e.currentChar();switch(t){case"\\":case"'":// eslint-disable-line no-useless-escape
return e.next(),`\\${t}`;case"u":return te(e,t,4);case"U":return te(e,t,6);default:return f(S.UNKNOWN_ESCAPE_SEQUENCE,c(),0,t),""}}function te(e,t,n){p(e,t);let r="";for(let o=0;o<n;o++){const n=H(e);if(!n){f(S.INVALID_UNICODE_ESCAPE_SEQUENCE,c(),0,`\\${t}${r}${e.currentChar()}`);break}r+=n}return`\\${t}${r}`}function ne(e){return"{"/* TokenChars.BraceLeft */!==e&&"}"/* TokenChars.BraceRight */!==e&&e!==v&&e!==x}function re(e){E(e);let t="",n="";for(;t=D(e,ne);)n+=t;return n}function oe(e){let t="",n="";for(;t=j(e);)n+=t;return n}function ce(e){const t=n=>{const r=e.currentChar();return"{"/* TokenChars.BraceLeft */!==r&&"@"/* TokenChars.LinkedAlias */!==r&&"|"/* TokenChars.Pipe */!==r&&"("/* TokenChars.ParenLeft */!==r&&")"/* TokenChars.ParenRight */!==r&&r?r===v?n:(n+=r,e.next(),t(n)):n};return t("")}function se(e){E(e);const t=p(e,"|"/* TokenChars.Pipe */);return E(e),t}// TODO: We need refactoring of token parsing ...
function ae(e,t){let n=null;switch(e.currentChar()){case"{"/* TokenChars.BraceLeft */:return t.braceNest>=1&&f(S.NOT_ALLOW_NEST_PLACEHOLDER,c(),0),e.next(),n=m(t,2/* TokenTypes.BraceLeft */,"{"/* TokenChars.BraceLeft */),E(e),t.braceNest++,n;case"}"/* TokenChars.BraceRight */:return t.braceNest>0&&2/* TokenTypes.BraceLeft */===t.currentType&&f(S.EMPTY_PLACEHOLDER,c(),0),e.next(),n=m(t,3/* TokenTypes.BraceRight */,"}"/* TokenChars.BraceRight */),t.braceNest--,t.braceNest>0&&E(e),t.inLinked&&0===t.braceNest&&(t.inLinked=!1),n;case"@"/* TokenChars.LinkedAlias */:return t.braceNest>0&&f(S.UNTERMINATED_CLOSING_BRACE,c(),0),n=ie(e,t)||d(t),t.braceNest=0,n;default:{let r=!0,o=!0,s=!0;if(A(e))return t.braceNest>0&&f(S.UNTERMINATED_CLOSING_BRACE,c(),0),n=m(t,1/* TokenTypes.Pipe */,se(e)),// reset
t.braceNest=0,t.inLinked=!1,n;if(t.braceNest>0&&(4/* TokenTypes.Named */===t.currentType||5/* TokenTypes.List */===t.currentType||6/* TokenTypes.Literal */===t.currentType))return f(S.UNTERMINATED_CLOSING_BRACE,c(),0),t.braceNest=0,ue(e,t);if(r=k(e,t))return n=m(t,4/* TokenTypes.Named */,J(e)),E(e),n;if(o=N(e,t))return n=m(t,5/* TokenTypes.List */,Q(e)),E(e),n;if(s=y(e,t))return n=m(t,6/* TokenTypes.Literal */,q(e)),E(e),n;if(!r&&!o&&!s)// TODO: we should be re-designed invalid cases, when we will extend message syntax near the future ...
return n=m(t,12/* TokenTypes.InvalidPlace */,re(e)),f(S.INVALID_TOKEN_IN_PLACEHOLDER,c(),0,n.value),E(e),n;break}}return n}// TODO: We need refactoring of token parsing ...
function ie(e,t){const{currentType:n}=t;let r=null;const o=e.currentChar();switch(7/* TokenTypes.LinkedAlias */!==n&&8/* TokenTypes.LinkedDot */!==n&&11/* TokenTypes.LinkedModifier */!==n&&9/* TokenTypes.LinkedDelimiter */!==n||o!==x&&o!==v||f(S.INVALID_LINKED_FORMAT,c(),0),o){case"@"/* TokenChars.LinkedAlias */:return e.next(),r=m(t,7/* TokenTypes.LinkedAlias */,"@"/* TokenChars.LinkedAlias */),t.inLinked=!0,r;case"."/* TokenChars.LinkedDot */:return E(e),e.next(),m(t,8/* TokenTypes.LinkedDot */,"."/* TokenChars.LinkedDot */);case":"/* TokenChars.LinkedDelimiter */:return E(e),e.next(),m(t,9/* TokenTypes.LinkedDelimiter */,":"/* TokenChars.LinkedDelimiter */);default:return A(e)?(r=m(t,1/* TokenTypes.Pipe */,se(e)),// reset
t.braceNest=0,t.inLinked=!1,r):b(e,t)||T(e,t)?(E(e),ie(e,t)):g(e,t)?(E(e),m(t,11/* TokenTypes.LinkedModifier */,oe(e))):C(e,t)?(E(e),"{"/* TokenChars.BraceLeft */===o?ae(e,t)||r:m(t,10/* TokenTypes.LinkedKey */,ce(e))):(7/* TokenTypes.LinkedAlias */===n&&f(S.INVALID_LINKED_FORMAT,c(),0),t.braceNest=0,t.inLinked=!1,ue(e,t))}}// TODO: We need refactoring of token parsing ...
function ue(e,t){let n={type:13/* TokenTypes.EOF */};if(t.braceNest>0)return ae(e,t)||d(t);if(t.inLinked)return ie(e,t)||d(t);switch(e.currentChar()){case"{"/* TokenChars.BraceLeft */:return ae(e,t)||d(t);case"}"/* TokenChars.BraceRight */:return f(S.UNBALANCED_CLOSING_BRACE,c(),0),e.next(),m(t,3/* TokenTypes.BraceRight */,"}"/* TokenChars.BraceRight */);case"@"/* TokenChars.LinkedAlias */:return ie(e,t)||d(t);default:if(A(e))return n=m(t,1/* TokenTypes.Pipe */,se(e)),// reset
t.braceNest=0,t.inLinked=!1,n;if(O(e))return m(t,0/* TokenTypes.Text */,B(e))}return n}function le(){const{currentType:e,offset:t,startLoc:n,endLoc:s}=i;return i.lastType=e,i.lastOffset=t,i.lastStartLoc=n,i.lastEndLoc=s,i.offset=o(),i.startLoc=c(),r.currentChar()===M?m(i,13/* TokenTypes.EOF */):ue(r,i)}return{nextToken:le,currentOffset:o,currentPosition:c,context:u}}(n,i({},e)),a=s.context(),u=o(0/* NodeTypes.Resource */,a.offset,a.startLoc);return t&&u.loc&&(u.loc.source=n),u.body=E(s),e.onCacheKey&&(u.cacheKey=e.onCacheKey(n)),// assert whether achieved to EOF
13/* TokenTypes.EOF */!==a.currentType&&r(s,S.UNEXPECTED_LEXICAL_ANALYSIS,a.lastStartLoc,0,n[a.offset]||""),c(u,s.currentOffset(),s.currentPosition()),u}return{parse:h}}(n).parse(e);return r?(// optimize ASTs
c&&function(e){const t=e.body;2/* NodeTypes.Message */===t.type?K(t):t.cases.forEach((e=>K(e)))}(s),// minimize ASTs
o&&H(s),{ast:s,code:""}):(// transform ASTs
// transform AST
function(e,t={}){const n=function(e,t={}){const n={ast:e,helpers:new Set},r=()=>n;return{context:r,helper:e=>(n.helpers.add(e),e)}}(e);n.helper("normalize"/* HelperNameMap.NORMALIZE */),// traverse
e.body&&G(e.body,n);// set meta information
const r=n.context();e.helpers=Array.from(r.helpers)}(s,n),B(s,n))}
/*!
        * core-base v11.0.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
/**
       * This is only called in esm-bundler builds.
       * istanbul-ignore-next
       */(e,n)),{},{detectError:r})}(e,t(t({},n),{},{location:!1,jit:!0})),a=J(c);// compose message function from AST
// if occurred compile error, don't cache
return s?a:me[r]=a}{// AST case (passed from bundler)
const t=e.cacheKey;if(t){const n=me[t];return n||(me[t]=J(e));// compose message function from message (AST)
}return J(e)}},w:
/**
       * message resolver
       *
       * @remarks
       * Resolves messages. messages with a hierarchical structure such as objects can be resolved. This resolver is used in VueI18n as default.
       *
       * @param obj - A target object to be resolved with path
       * @param path - A {@link Path | path} to resolve the value of message
       *
       * @returns A resolved {@link PathValue | path value}
       *
       * @VueI18nGeneral
       */
function(e,t){// check object
if(!N(e))return null;// parse path
let n=Se.get(t);n||(n=
/**
       * Parse a string path into an array of segments
       */
function(e){const t=[];let n,r,o,c,s,a,i,u=-1,l=0/* States.BEFORE_PATH */,f=0;const m=[];function d(){const t=e[u+1];if(5/* States.IN_SINGLE_QUOTE */===l&&"'"/* PathCharTypes.SINGLE_QUOTE */===t||6/* States.IN_DOUBLE_QUOTE */===l&&'"'/* PathCharTypes.DOUBLE_QUOTE */===t)return u++,o="\\"+t,m[0/* Actions.APPEND */](),!0}m[0/* Actions.APPEND */]=()=>{void 0===r?r=o:r+=o},m[1/* Actions.PUSH */]=()=>{void 0!==r&&(t.push(r),r=void 0)},m[2/* Actions.INC_SUB_PATH_DEPTH */]=()=>{m[0/* Actions.APPEND */](),f++},m[3/* Actions.PUSH_SUB_PATH */]=()=>{if(f>0)f--,l=4/* States.IN_SUB_PATH */,m[0/* Actions.APPEND */]();else{if(f=0,void 0===r)return!1;if(r=
/**
       * Format a subPath, return its plain form if it is
       * a literal string or number. Otherwise prepend the
       * dynamic indicator (*).
       */
function(e){const t=e.trim();// invalid leading 0
if("0"===e.charAt(0)&&isNaN(parseInt(e)))return!1;return n=t,Oe.test(n)?
/**
       * Strip quotes from a string
       */
function(e){const t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t!==n||34!==t&&39!==t?e:e.slice(1,-1)}
/**
       * Determine the type of a character in a keypath.
       */(t):"*"/* PathCharTypes.ASTARISK */+t;var n}(r),!1===r)return!1;m[1/* Actions.PUSH */]()}};for(;null!==l;)if(u++,n=e[u],"\\"!==n||!d()){// check parse error
if(c=Ie(n),i=Ae[l],s=i[c]||i.l||8/* States.ERROR */,8/* States.ERROR */===s)return;if(l=s[0],void 0!==s[1]&&(a=m[s[1]],a&&(o=n,!1===a())))return;// check parse finish
if(7/* States.AFTER_PATH */===l)return t}}// path token cache
(t),n&&Se.set(t,n));// check hit
if(!n)return null;// resolve path value
const r=n.length;let o=e,c=0;for(;c<r;){const e=o[n[c]];if(void 0===e)return null;if(h(o))return null;o=e,c++}return o}/* eslint-disable @typescript-eslint/no-explicit-any */
/**
       * Intlify core-base version
       * @internal
       */,x:
/**
       * Fallback with locale chain
       *
       * @remarks
       * A fallback locale function implemented with a fallback chain algorithm. It's used in VueI18n as default.
       *
       * @param ctx - A {@link CoreContext | context}
       * @param fallback - A {@link FallbackLocale | fallback locale}
       * @param start - A starting {@link Locale | locale}
       *
       * @returns Fallback locales
       *
       * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
       *
       * @VueI18nGeneral
       */
function(e,t,n){const r=L(n)?n:we,o=e;o.__localeChainCache||(o.__localeChainCache=new Map);let c=o.__localeChainCache.get(r);if(!c){c=[];// first block defined by start
let e=[n];// while any intervening block found
for(;E(e);)e=ge(c,e,t);// prettier-ignore
// last block defined by default
const s=E(t)||!T(t)?t:t.default?t.default:null;// convert defaults to array
e=L(s)?[s]:s,E(e)&&ge(c,e,!1),o.__localeChainCache.set(r,c)}return c},y:// eslint-disable-next-line @typescript-eslint/no-explicit-any
function(e,t){// src and des should both be objects, and none of them can be a array
if(O(e)||O(t))throw new Error("Invalid value");const n=[{src:e,des:t}];for(;n.length;){const{src:e,des:t}=n.pop();// using `Object.keys` which skips prototype properties
Object.keys(e).forEach((r=>{"__proto__"!==r&&(// if src[key] is an object/array, set des[key]
// to empty object/array to prevent setting by reference
N(e[r])&&!N(t[r])&&(t[r]=Array.isArray(e[r])?[]:l()),O(t[r])||O(e[r])?// replace with src[key] when:
// src[key] or des[key] is not an object, or
// src[key] or des[key] is an array
t[r]=e[r]:// src[key] and des[key] are both objects, merge them
n.push({src:e[r],des:t[r]}))}))}},z:_});
/*!
        * shared v11.0.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
/**
       * Original Utilities
       * written by kazuya kawaguchi
       */
e("q","undefined"!=typeof window),e("m",((e,t=!1)=>t?Symbol.for(e):Symbol(e)));const n=(e,t,n)=>r({l:e,k:t,s:n}),r=e=>JSON.stringify(e).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/\u0027/g,"\\u0027"),o=e("i",(e=>"number"==typeof e&&isFinite(e))),c=e=>"[object Date]"===g(e),s=e("o",(e=>"[object RegExp]"===g(e))),a=e("f",(e=>T(e)&&0===Object.keys(e).length)),i=e("a",Object.assign),u=Object.create,l=e("c",((e=null)=>u(e)));let f;const m=e("j",(()=>f||(f="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:l())));function d(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const p=Object.prototype.hasOwnProperty;function _(e,t){return p.call(e,t)}/* eslint-enable */
/**
       * Useful Utilities By Evan you
       * Modified by kazuya kawaguchi
       * MIT License
       * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
       * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
       */const E=e("l",Array.isArray),h=e("p",(e=>"function"==typeof e)),L=e("b",(e=>"string"==typeof e)),k=e("e",(e=>"boolean"==typeof e)),N=e("d",(e=>null!==e&&"object"==typeof e)),y=e=>N(e)&&h(e.then)&&h(e.catch),b=Object.prototype.toString,g=e=>b.call(e),T=e("n",(e=>"[object Object]"===g(e)));function C(e,t=""){return e.reduce(((e,n,r)=>0===r?e+n:e+t+n),"")}function A(e,t){}const O=e=>!N(e)||E(e);function I(e,t,n){const r={start:e,end:t};return null!=n&&(r.source=n),r}const S={// tokenizer error codes
EXPECTED_TOKEN:1,INVALID_TOKEN_IN_PLACEHOLDER:2,UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER:3,UNKNOWN_ESCAPE_SEQUENCE:4,INVALID_UNICODE_ESCAPE_SEQUENCE:5,UNBALANCED_CLOSING_BRACE:6,UNTERMINATED_CLOSING_BRACE:7,EMPTY_PLACEHOLDER:8,NOT_ALLOW_NEST_PLACEHOLDER:9,INVALID_LINKED_FORMAT:10,// parser error codes
MUST_HAVE_MESSAGES_IN_PLURAL:11,UNEXPECTED_EMPTY_LINKED_MODIFIER:12,UNEXPECTED_EMPTY_LINKED_KEY:13,UNEXPECTED_LEXICAL_ANALYSIS:14,// generator error codes
UNHANDLED_CODEGEN_NODE_TYPE:15,// minifier error codes
UNHANDLED_MINIFIER_NODE_TYPE:16};// Special value for higher-order compilers to pick up the last code
// to avoid collision of error codes.
// This should always be kept as the last item.
function P(e,t,n={}){const{domain:r,messages:o,args:c}=n,s=new SyntaxError(String(e));return s.code=e,t&&(s.location=t),s.domain=r,s}/** @internal */function D(e){throw e}const v=" ",w="\r",x="\n",R=String.fromCharCode(8232),U=String.fromCharCode(8233);const M=void 0,F="'",$="tokenizer";const W="parser",j=/(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;// Backslash backslash, backslash quote, uHHHH, UHHHHHH.
function X(e,t,n){switch(e){case"\\\\":return"\\";// eslint-disable-next-line no-useless-escape
case"\\'":// eslint-disable-next-line no-useless-escape
return"'";default:{const e=parseInt(t||n,16);return e<=55295||e>=57344?String.fromCodePoint(e):"�";// invalid ...
// Replace them with U+FFFD REPLACEMENT CHARACTER.
}}}function Y(e){if(13/* TokenTypes.EOF */===e.type)return"EOF";const t=(e.value||"").replace(/\r?\n/gu,"\\n");return t.length>10?t.slice(0,9)+"…":t}function V(e,t){for(let n=0;n<e.length;n++)G(e[n],t)}function G(e,t){// TODO: if we need pre-hook of transform, should be implemented to here
switch(e.type){case 1/* NodeTypes.Plural */:V(e.cases,t),t.helper("plural"/* HelperNameMap.PLURAL */);break;case 2/* NodeTypes.Message */:V(e.items,t);break;case 6/* NodeTypes.Linked */:G(e.key,t),t.helper("linked"/* HelperNameMap.LINKED */),t.helper("type"/* HelperNameMap.TYPE */);break;case 5/* NodeTypes.List */:t.helper("interpolate"/* HelperNameMap.INTERPOLATE */),t.helper("list"/* HelperNameMap.LIST */);break;case 4/* NodeTypes.Named */:t.helper("interpolate"/* HelperNameMap.INTERPOLATE */),t.helper("named"/* HelperNameMap.NAMED */)}// TODO: if we need post-hook of transform, should be implemented to here
}function K(e){if(1===e.items.length){const t=e.items[0];3/* NodeTypes.Text */!==t.type&&9/* NodeTypes.Literal */!==t.type||(e.static=t.value,delete t.value)}else{const t=[];for(let n=0;n<e.items.length;n++){const r=e.items[n];if(3/* NodeTypes.Text */!==r.type&&9/* NodeTypes.Literal */!==r.type)break;if(null==r.value)break;t.push(r.value)}if(t.length===e.items.length){e.static=C(t);for(let t=0;t<e.items.length;t++){const n=e.items[t];3/* NodeTypes.Text */!==n.type&&9/* NodeTypes.Literal */!==n.type||delete n.value}}}}/* eslint-disable @typescript-eslint/no-explicit-any */function H(e){switch(e.t=e.type,e.type){case 0/* NodeTypes.Resource */:{const t=e;H(t.body),t.b=t.body,delete t.body;break}case 1/* NodeTypes.Plural */:{const t=e,n=t.cases;for(let e=0;e<n.length;e++)H(n[e]);t.c=n,delete t.cases;break}case 2/* NodeTypes.Message */:{const t=e,n=t.items;for(let e=0;e<n.length;e++)H(n[e]);t.i=n,delete t.items,t.static&&(t.s=t.static,delete t.static);break}case 3/* NodeTypes.Text */:case 9/* NodeTypes.Literal */:case 8/* NodeTypes.LinkedModifier */:case 7/* NodeTypes.LinkedKey */:{const t=e;t.value&&(t.v=t.value,delete t.value);break}case 6/* NodeTypes.Linked */:{const t=e;H(t.key),t.k=t.key,delete t.key,t.modifier&&(H(t.modifier),t.m=t.modifier,delete t.modifier);break}case 5/* NodeTypes.List */:{const t=e;t.i=t.index,delete t.index;break}case 4/* NodeTypes.Named */:{const t=e;t.k=t.key,delete t.key;break}}delete e.type}function z(e,t){const{helper:n}=e;switch(t.type){case 0/* NodeTypes.Resource */:!function(e,t){t.body?z(e,t.body):e.push("null")}(e,t);break;case 1/* NodeTypes.Plural */:!function(e,t){const{helper:n,needIndent:r}=e;if(t.cases.length>1){e.push(`${n("plural"/* HelperNameMap.PLURAL */)}([`),e.indent(r());const o=t.cases.length;for(let n=0;n<o&&(z(e,t.cases[n]),n!==o-1);n++)e.push(", ");e.deindent(r()),e.push("])")}}(e,t);break;case 2/* NodeTypes.Message */:!function(e,t){const{helper:n,needIndent:r}=e;e.push(`${n("normalize"/* HelperNameMap.NORMALIZE */)}([`),e.indent(r());const o=t.items.length;for(let c=0;c<o&&(z(e,t.items[c]),c!==o-1);c++)e.push(", ");e.deindent(r()),e.push("])")}(e,t);break;case 6/* NodeTypes.Linked */:!function(e,t){const{helper:n}=e;e.push(`${n("linked"/* HelperNameMap.LINKED */)}(`),z(e,t.key),t.modifier?(e.push(", "),z(e,t.modifier),e.push(", _type")):e.push(", undefined, _type"),e.push(")")}(e,t);break;case 8/* NodeTypes.LinkedModifier */:case 7/* NodeTypes.LinkedKey */:case 9/* NodeTypes.Literal */:case 3/* NodeTypes.Text */:e.push(JSON.stringify(t.value),t);break;case 5/* NodeTypes.List */:e.push(`${n("interpolate"/* HelperNameMap.INTERPOLATE */)}(${n("list"/* HelperNameMap.LIST */)}(${t.index}))`,t);break;case 4/* NodeTypes.Named */:e.push(`${n("interpolate"/* HelperNameMap.INTERPOLATE */)}(${n("named"/* HelperNameMap.NAMED */)}(${JSON.stringify(t.key)}))`,t)}}// generate code from AST
const B=(e,t={})=>{const n=L(t.mode)?t.mode:"normal",r=L(t.filename)?t.filename:"message.intl",o=!!t.sourceMap,c=null!=t.breakLineCode?t.breakLineCode:"arrow"===n?";":"\n",s=t.needIndent?t.needIndent:"arrow"!==n,a=e.helpers||[],i=function(e,t){const{sourceMap:n,filename:r,breakLineCode:o,needIndent:c}=t,s=!1!==t.location,a={filename:r,code:"",column:1,line:1,offset:0,map:void 0,breakLineCode:o,needIndent:c,indentLevel:0};function i(e,t){a.code+=e}function u(e,t=!0){const n=t?o:"";i(c?n+"  ".repeat(e):n)}return s&&e.loc&&(a.source=e.loc.source),{context:()=>a,push:i,indent:function(e=!0){const t=++a.indentLevel;e&&u(t)},deindent:function(e=!0){const t=--a.indentLevel;e&&u(t)},newline:function(){u(a.indentLevel)},helper:e=>`_${e}`,needIndent:()=>a.needIndent}}(e,{mode:n,filename:r,sourceMap:o,breakLineCode:c,needIndent:s});i.push("normal"===n?"function __msg__ (ctx) {":"(ctx) => {"),i.indent(s),a.length>0&&(i.push(`const { ${C(a.map((e=>`${e}: _${e}`)),", ")} } = ctx`),i.newline()),i.push("return "),z(i,e),i.deindent(s),i.push("}"),delete e.helpers;const{code:u,map:l}=i.context();return{ast:e,code:u,map:l?l.toJSON():void 0}};function J(e){return t=>function(e,t){const n=(r=t,ue(r,Q));var r;if(null==n)throw le(0/* NodeTypes.Resource */);if(1/* NodeTypes.Plural */===oe(n)){const t=function(e){return ue(e,Z,[])}(n);return e.plural(t.reduce(((t,n)=>[...t,q(e,n)]),[]))}return q(e,n)}(t,e)}const Q=["b","body"];const Z=["c","cases"];function q(e,t){const n=function(e){return ue(e,ee)}(t);if(null!=n)return"text"===e.type?n:e.normalize([n]);{const n=function(e){return ue(e,te,[])}(t).reduce(((t,n)=>[...t,ne(e,n)]),[]);return e.normalize(n)}}const ee=["s","static"];const te=["i","items"];function ne(e,t){const n=oe(t);switch(n){case 3/* NodeTypes.Text */:case 9/* NodeTypes.Literal */:case 7/* NodeTypes.LinkedKey */:case 8/* NodeTypes.LinkedModifier */:return se(t,n);case 4/* NodeTypes.Named */:{const r=t;if(_(r,"k")&&r.k)return e.interpolate(e.named(r.k));if(_(r,"key")&&r.key)return e.interpolate(e.named(r.key));throw le(n)}case 5/* NodeTypes.List */:{const r=t;if(_(r,"i")&&o(r.i))return e.interpolate(e.list(r.i));if(_(r,"index")&&o(r.index))return e.interpolate(e.list(r.index));throw le(n)}case 6/* NodeTypes.Linked */:{const n=t,r=function(e){return ue(e,ae)}(n),o=function(e){const t=ue(e,ie);if(t)return t;throw le(6/* NodeTypes.Linked */)}(n);return e.linked(ne(e,o),r?ne(e,r):void 0,e.type)}default:throw new Error(`unhandled node on format message part: ${n}`)}}const re=["t","type"];function oe(e){return ue(e,re)}const ce=["v","value"];function se(e,t){const n=ue(e,ce);if(n)return n;throw le(t)}const ae=["m","modifier"];const ie=["k","key"];function ue(e,t,n){for(let r=0;r<t.length;r++){const n=t[r];// eslint-disable-next-line @typescript-eslint/no-explicit-any
if(_(e,n)&&null!=e[n])// eslint-disable-next-line @typescript-eslint/no-explicit-any
return e[n]}return n}function le(e){return new Error(`unhandled node type: ${e}`)}const fe=e=>e;let me=l();function de(e){return N(e)&&0===oe(e)&&(_(e,"b")||_(e,"body"))}let pe=null;const _e=Ee("function:translate");function Ee(e){return t=>pe&&pe.emit(e,t)}const he={INVALID_ARGUMENT:17,// 17
INVALID_DATE_ARGUMENT:18,INVALID_ISO_DATE_ARGUMENT:19,NOT_SUPPORT_NON_STRING_MESSAGE:20,NOT_SUPPORT_LOCALE_PROMISE_VALUE:21,NOT_SUPPORT_LOCALE_ASYNC_FUNCTION:22,NOT_SUPPORT_LOCALE_TYPE:23};e("C",24);function Le(e){return P(e,null,void 0)}/** @internal */function ke(e,t){return null!=t.locale?ye(t.locale):ye(e.locale)}let Ne;/** @internal */function ye(e){if(L(e))return e;if(h(e)){if(e.resolvedOnce&&null!=Ne)return Ne;if("Function"===e.constructor.name){const t=e();if(y(t))throw Le(he.NOT_SUPPORT_LOCALE_PROMISE_VALUE);return Ne=t}throw Le(he.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION)}throw Le(he.NOT_SUPPORT_LOCALE_TYPE)}
/**
       * Fallback with simple implemenation
       *
       * @remarks
       * A fallback locale function implemented with a simple fallback algorithm.
       *
       * Basically, it returns the value as specified in the `fallbackLocale` props, and is processed with the fallback inside intlify.
       *
       * @param ctx - A {@link CoreContext | context}
       * @param fallback - A {@link FallbackLocale | fallback locale}
       * @param start - A starting {@link Locale | locale}
       *
       * @returns Fallback locales
       *
       * @VueI18nGeneral
       */function be(e,t,n){// prettier-ignore
return[...new Set([n,...E(t)?t:N(t)?Object.keys(t):L(t)?[t]:[n]])]}function ge(e,t,n){let r=!0;for(let o=0;o<t.length&&k(r);o++){const c=t[o];L(c)&&(r=Te(e,t[o],n))}return r}function Te(e,t,n){let r;const o=t.split("-");do{r=Ce(e,o.join("-"),n),o.splice(-1,1)}while(o.length&&!0===r);return r}function Ce(e,t,n){let r=!1;if(!e.includes(t)&&(r=!0,t)){r="!"!==t[t.length-1];const o=t.replace(/!/g,"");e.push(o),(E(n)||T(n))&&n[o]&&(// eslint-disable-next-line @typescript-eslint/no-explicit-any
r=n[o])}return r}const Ae=[];Ae[0/* States.BEFORE_PATH */]={w:[0/* States.BEFORE_PATH */],i:[3/* States.IN_IDENT */,0/* Actions.APPEND */],"[":[4/* States.IN_SUB_PATH */],o:[7/* States.AFTER_PATH */]},Ae[1/* States.IN_PATH */]={w:[1/* States.IN_PATH */],".":[2/* States.BEFORE_IDENT */],"[":[4/* States.IN_SUB_PATH */],o:[7/* States.AFTER_PATH */]},Ae[2/* States.BEFORE_IDENT */]={w:[2/* States.BEFORE_IDENT */],i:[3/* States.IN_IDENT */,0/* Actions.APPEND */],0:[3/* States.IN_IDENT */,0/* Actions.APPEND */]},Ae[3/* States.IN_IDENT */]={i:[3/* States.IN_IDENT */,0/* Actions.APPEND */],0:[3/* States.IN_IDENT */,0/* Actions.APPEND */],w:[1/* States.IN_PATH */,1/* Actions.PUSH */],".":[2/* States.BEFORE_IDENT */,1/* Actions.PUSH */],"[":[4/* States.IN_SUB_PATH */,1/* Actions.PUSH */],o:[7/* States.AFTER_PATH */,1/* Actions.PUSH */]},Ae[4/* States.IN_SUB_PATH */]={"'":[5/* States.IN_SINGLE_QUOTE */,0/* Actions.APPEND */],'"':[6/* States.IN_DOUBLE_QUOTE */,0/* Actions.APPEND */],"[":[4/* States.IN_SUB_PATH */,2/* Actions.INC_SUB_PATH_DEPTH */],"]":[1/* States.IN_PATH */,3/* Actions.PUSH_SUB_PATH */],o:8/* States.ERROR */,l:[4/* States.IN_SUB_PATH */,0/* Actions.APPEND */]},Ae[5/* States.IN_SINGLE_QUOTE */]={"'":[4/* States.IN_SUB_PATH */,0/* Actions.APPEND */],o:8/* States.ERROR */,l:[5/* States.IN_SINGLE_QUOTE */,0/* Actions.APPEND */]},Ae[6/* States.IN_DOUBLE_QUOTE */]={'"':[4/* States.IN_SUB_PATH */,0/* Actions.APPEND */],o:8/* States.ERROR */,l:[6/* States.IN_DOUBLE_QUOTE */,0/* Actions.APPEND */]};
/**
       * Check if an expression is a literal value.
       */
const Oe=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function Ie(e){if(null==e)return"o"/* PathCharTypes.END_OF_FAIL */;switch(e.charCodeAt(0)){case 91:// [
case 93:// ]
case 46:// .
case 34:// "
case 39:// '
return e;case 95:// _
case 36:// $
case 45:// -
return"i"/* PathCharTypes.IDENT */;case 9:// Tab (HT)
case 10:// Newline (LF)
case 13:// Return (CR)
case 160:// No-break space (NBSP)
case 65279:// Byte Order Mark (BOM)
case 8232:// Line Separator (LS)
case 8233:// Paragraph Separator (PS)
return"w"/* PathCharTypes.WORKSPACE */}return"i"/* PathCharTypes.IDENT */}const Se=new Map;
/**
       * key-value message resolver
       *
       * @remarks
       * Resolves messages with the key-value structure. Note that messages with a hierarchical structure such as objects cannot be resolved
       *
       * @param obj - A target object to be resolved with path
       * @param path - A {@link Path | path} to resolve the value of message
       *
       * @returns A resolved {@link PathValue | path value}
       *
       * @VueI18nGeneral
       */function Pe(e,t){return N(e)?e[t]:null}const De="11.0.1",ve=e("H",-1),we=e("D","en-US"),xe=(e("M",""),e=>`${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`);let Re,Ue,Me;let Fe=null;/* #__NO_SIDE_EFFECTS__ */e("F",(e=>{Fe=e}));/* #__NO_SIDE_EFFECTS__ */const $e=()=>Fe;let We=null;e("S",(e=>{We=e})),e("G",(()=>We));// ID for CoreContext
let je=0;const Xe=e=>({[e]:l()})/** @internal */;function Ye(e,t,n,r,o){const{missing:c,onWarn:s}=e;if(null!==c){const r=c(e,n,t,o);return L(r)?r:t}return t}/** @internal */function Ve(e,t){const n=t.indexOf(e);if(-1===n)return!1;for(let c=n+1;c<t.length;c++)if(r=e,o=t[c],r!==o&&r.split("-")[0]===o.split("-")[0])return!0;var r,o;return!1}const Ge=e("t",["localeMatcher","weekday","era","year","month","day","hour","minute","second","timeZoneName","formatMatcher","hour12","timeZone","dateStyle","timeStyle","calendar","dayPeriod","numberingSystem","hourCycle","fractionalSecondDigits"]);/** @internal */function Ke(...e){const[t,n,r,s]=e,a=l();let i,u=l();if(L(t)){// Only allow ISO strings - other date formats are often supported,
// but may cause different results in different browsers.
const e=t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);if(!e)throw Le(he.INVALID_ISO_DATE_ARGUMENT);// Some browsers can not parse the iso datetime separated by space,
// this is a compromise solution by replace the 'T'/' ' with 'T'
const n=e[3]?e[3].trim().startsWith("T")?`${e[1].trim()}${e[3].trim()}`:`${e[1].trim()}T${e[3].trim()}`:e[1].trim();i=new Date(n);try{// This will fail if the date is not valid
i.toISOString()}catch(f){throw Le(he.INVALID_ISO_DATE_ARGUMENT)}}else if(c(t)){if(isNaN(t.getTime()))throw Le(he.INVALID_DATE_ARGUMENT);i=t}else{if(!o(t))throw Le(he.INVALID_ARGUMENT);i=t}return L(n)?a.key=n:T(n)&&Object.keys(n).forEach((e=>{Ge.includes(e)?u[e]=n[e]:a[e]=n[e]})),L(r)?a.locale=r:T(r)&&(u=r),T(s)&&(u=s),[a.key||"",i,a,u]}const He=e("N",["localeMatcher","style","currency","currencyDisplay","currencySign","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","notation","signDisplay","unit","unitDisplay","roundingMode","roundingPriority","roundingIncrement","trailingZeroDisplay"]);/** @internal */function ze(...e){const[t,n,r,c]=e,s=l();let a=l();if(!o(t))throw Le(he.INVALID_ARGUMENT);const i=t;return L(n)?s.key=n:T(n)&&Object.keys(n).forEach((e=>{He.includes(e)?a[e]=n[e]:s[e]=n[e]})),L(r)?s.locale=r:T(r)&&(a=r),T(c)&&(a=c),[s.key||"",i,s,a]}const Be=e=>e,Je=e=>""// eslint-disable-line
,Qe="text",Ze=e=>0===e.length?"":C(e),qe=e=>null==e?"":E(e)||T(e)&&e.toString===b?JSON.stringify(e,null,2):String(e);function et(e,t){return e=Math.abs(e),2===t?e?e>1?1:0:1:e?Math.min(e,2):0}const tt=()=>"",nt=e("R",(e=>h(e)));function rt(e,t,n,r,o,c){const{messages:s,onWarn:a,messageResolver:i,localeFallbacker:u}=e,f=u(e,r,n);// eslint-disable-line @typescript-eslint/no-explicit-any
let m,d=l(),p=null;for(let _=0;_<f.length&&(m=f[_],d=s[m]||l(),null===(p=i(d,t))&&(// if null, resolve with object key path
p=d[t]),!(L(p)||de(p)||nt(p)));_++)if(!Ve(m,f)){const n=Ye(e,// eslint-disable-line @typescript-eslint/no-explicit-any
t,m,0,"translate");n!==t&&(p=n)}return[p,m,d]}function ot(e,t,r,o,c,s){const{messageCompiler:a,warnHtmlMessage:i}=e;if(nt(o)){const e=o;return e.locale=e.locale||r,e.key=e.key||t,e}if(null==a){const e=()=>o;return e.locale=r,e.key=t,e}const u=a(o,function(e,t,r,o,c,s){return{locale:t,key:r,warnHtmlMessage:c,onError:e=>{throw s&&s(e),e},onCacheKey:e=>n(t,r,e)}}(0,r,c,0,i,s));return u.locale=r,u.key=t,u.source=o,u}function ct(...e){const[t,n,r]=e,c=l();if(!(L(t)||o(t)||nt(t)||de(t)))throw Le(he.INVALID_ARGUMENT);// prettier-ignore
const s=o(t)?String(t):(nt(t),t);return o(n)?c.plural=n:L(n)?c.default=n:T(n)&&!a(n)?c.named=n:E(n)&&(c.list=n),o(r)?c.plural=r:L(r)?c.default=r:T(r)&&i(c,r),[s,c]}"boolean"!=typeof __INTLIFY_PROD_DEVTOOLS__&&(m().__INTLIFY_PROD_DEVTOOLS__=!1)}}}))}();
