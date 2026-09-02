import{g as e}from"./@antv-d25b8d60.js";function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((t=>{const i=e[t],o=typeof i;"object"!==o&&"function"!==o||Object.isFrozen(i)||n(i)})),e}class t{
/**
   * @param {CompiledMode} mode
   */
constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function o(e,...n){const t=Object.create(null);for(const i in e)t[i]=e[i];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),
/** @type {T} */t}const r=e=>!!e.scope;class s{
/**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}
/**
   * Adds texts to the output stream
   *
   * @param {string} text */addText(e){this.buffer+=i(e)}
/**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */openNode(e){if(!r(e))return;const n=((e,{prefix:n})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const t=e.split(".");return["".concat(n).concat(t.shift()),...t.map(((e,n)=>"".concat(e).concat("_".repeat(n+1))))].join(" ")}return"".concat(n).concat(e)})(e.scope,{prefix:this.classPrefix});this.span(n)}
/**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */closeNode(e){r(e)&&(this.buffer+="</span>")}
/**
   * returns the accumulated buffer
  */value(){return this.buffer}
// helpers
/**
   * Builds a span element
   *
   * @param {string} className */
span(e){this.buffer+='<span class="'.concat(e,'">')}}const a=(e={})=>{const n={children:[]};return Object.assign(n,e),n};class c{constructor(){this.rootNode=a(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}
/** @param {Node} node */add(e){this.top.children.push(e)}
/** @param {string} scope */openNode(e){const n=a({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}
/**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */walk(e){return this.constructor._walk(e,this.rootNode)}
/**
   * @param {Renderer} builder
   * @param {Node} node
   */static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}
/**
   * @param {Node} node
   */static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class l extends c{
/**
   * @param {*} options
   */
constructor(e){super(),this.options=e}
/**
   * @param {string} text
   */addText(e){""!==e&&this.add(e)}
/** @param {string} scope */startScope(e){this.openNode(e)}endScope(){this.closeNode()}
/**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */__addSublanguage(e,n){const t=e.root;n&&(t.scope="language:".concat(n)),this.add(t)}toHTML(){return new s(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function u(e){return e?"string"==typeof e?e:e.source:null}function g(e){return f("(?=",e,")")}function d(e){return f("(?:",e,")*")}function h(e){return f("(?:",e,")?")}function f(...e){return e.map((e=>u(e))).join("")}function p(...e){const n=function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e);return"("+(n.capture?"":"?:")+e.map((e=>u(e))).join("|")+")"}function b(e){return new RegExp(e.toString()+"|").exec("").length-1}const m=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function E(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t;let i=u(e),o="";for(;i.length>0;){const e=m.exec(i);if(!e){o+=i;break}o+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?o+="\\"+String(Number(e[1])+n):(o+=e[0],"("===e[0]&&t++)}return o})).map((e=>"(".concat(e,")"))).join(n)}const x="[a-zA-Z]\\w*",w="[a-zA-Z_]\\w*",_="\\b\\d+(\\.\\d+)?",y="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",O="\\b(0b[01]+)",S={begin:"\\\\[\\s\\S]",relevance:0},v={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[S]},N={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[S]},M=function(e,n,t={}){const i=o({scope:"comment",begin:e,end:n,contains:[]},t);i.contains.push({scope:"doctag",
// hack to avoid the space from being included. the space is necessary to
// match here to prevent the plain text rule below from gobbling up doctags
begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const r=p(
// list of common 1 and 2 letter words in English
"I","a","is","so","us","to","at","if","in","it","on",
// note: this is not an exhaustive list of contractions, just popular ones
/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
// contractions - can't we'd they're let's, etc
/[A-Za-z]+[-][a-z]+/,
// `no-way`, etc.
/[A-Za-z][a-z]{2,}/);return i.contains.push({
// TODO: how to include ", (, ) without breaking grammars that use these for
// comment delimiters?
// begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
// ---
// this tries to find sequences of 3 english words in a row (without any
// "programming" type syntax) this gives us a strong signal that we've
// TRULY found a comment - vs perhaps scanning with the wrong language.
// It's possible to find something that LOOKS like the start of the
// comment - but then if there is no readable text - good chance it is a
// false match and not a comment.
// for a visual example please see:
// https://github.com/highlightjs/highlight.js/issues/2827
begin:f(/[ ]+/,
// necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},k=M("//","$"),R=M("/\\*","\\*/"),A=M("#","$"),j={scope:"number",begin:_,relevance:0},I={scope:"number",begin:y,relevance:0},T={scope:"number",begin:O,relevance:0},L={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[S,{begin:/\[/,end:/\]/,relevance:0,contains:[S]}]},B={scope:"title",begin:x,relevance:0},P={scope:"title",begin:w,relevance:0},H={
// excludes method names from keyword processing
begin:"\\.\\s*"+w,relevance:0};var D=Object.freeze({__proto__:null,APOS_STRING_MODE:v,BACKSLASH_ESCAPE:S,BINARY_NUMBER_MODE:T,BINARY_NUMBER_RE:O,COMMENT:M,C_BLOCK_COMMENT_MODE:R,C_LINE_COMMENT_MODE:k,C_NUMBER_MODE:I,C_NUMBER_RE:y,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{
/** @type {ModeCallback} */
"on:begin":(e,n)=>{n.data._beginMatch=e[1]},
/** @type {ModeCallback} */
"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})},HASH_COMMENT_MODE:A,IDENT_RE:x,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:H,NUMBER_MODE:j,NUMBER_RE:_,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:N,REGEXP_MODE:L,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=f(n,/.*\b/,e.binary,/\b.*/)),o({scope:"meta",begin:n,end:/$/,relevance:0,
/** @type {ModeCallback} */
"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},TITLE_MODE:B,UNDERSCORE_IDENT_RE:w,UNDERSCORE_TITLE_MODE:P});function C(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}function U(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function z(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=C,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function W(e,n){Array.isArray(e.illegal)&&(e.illegal=p(...e.illegal))}function X(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function G(e,n){void 0===e.relevance&&(e.relevance=1)}const K=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]})),e.keywords=t.keywords,e.begin=f(t.beforeMatch,g(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},Z=["of","and","for","in","not","or","if","then","parent",
// common variable name
"list",
// common variable name
"value"],$="keyword";function F(e,n,t=$){const i=Object.create(null);return"string"==typeof e?o(t,e.split(" ")):Array.isArray(e)?o(t,e):Object.keys(e).forEach((function(t){Object.assign(i,F(e[t],n,t))})),i;function o(e,t){n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((function(n){const t=n.split("|");i[t[0]]=[e,V(t[0],t[1])]}))}}function V(e,n){return n?Number(n):function(e){return Z.includes(e.toLowerCase())}(e)?0:1}const J={},q=e=>{},Y=(e,n)=>{J["".concat(e,"/").concat(n)]||(J["".concat(e,"/").concat(n)]=!0)},Q=new Error;function ee(e,n,{key:t}){let i=0;const o=e[t],r={},s={};for(let a=1;a<=n.length;a++)s[a+i]=o[a],r[a+i]=!0,i+=b(n[a-1]);e[t]=s,e[t]._emit=r,e[t]._multi=!0}function ne(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw q("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Q;if("object"!=typeof e.beginScope||null===e.beginScope)throw q("beginScope must be object"),Q;ee(e,e.begin,{key:"beginScope"}),e.begin=E(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw q("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Q;if("object"!=typeof e.endScope||null===e.endScope)throw q("endScope must be object"),Q;ee(e,e.end,{key:"endScope"}),e.end=E(e.end,{joinWith:""})}}(e)}function te(e){function n(n,t){return new RegExp(u(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}
// @ts-ignore
addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=b(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(E(e,{joinWith:"|"}),!0),this.lastIndex=0}
/** @param {string} s */exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,i)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}
// @ts-ignore
getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}
// @ts-ignore
addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}
/** @param {string} s */exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=o(e.classNameAliases||{}),function t(r,s){const a=
/** @type CompiledMode */r;if(r.isCompiled)return a;[U,
// do this early so compiler extensions generally don't have to worry about
// the distinction between match/begin
X,ne,K].forEach((e=>e(r,s))),e.compilerExtensions.forEach((e=>e(r,s))),r.__beforeBegin=null,[z,
// do this later so compiler extensions that come earlier have access to the
// raw array if they wanted to perhaps manipulate it, etc.
W,
// default to 1 relevance if not specified
G].forEach((e=>e(r,s))),r.isCompiled=!0;let c=null;return"object"==typeof r.keywords&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),c=r.keywords.$pattern,delete r.keywords.$pattern),c=c||/\w+/,r.keywords&&(r.keywords=F(r.keywords,e.case_insensitive)),a.keywordPatternRe=n(c,!0),s&&(r.begin||(r.begin=/\B|\b/),a.beginRe=n(a.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),r.end&&(a.endRe=n(a.end)),a.terminatorEnd=u(a.end)||"",r.endsWithParent&&s.terminatorEnd&&(a.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(a.illegalRe=n(
/** @type {RegExp | string} */
r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(n){return o(e,{variants:null},n)})));if(e.cachedVariants)return e.cachedVariants;if(ie(e))return o(e,{starts:e.starts?o(e.starts):null});if(Object.isFrozen(e))return o(e);return e}("self"===e?r:e)}))),r.contains.forEach((function(e){t(
/** @type Mode */
e,a)})),r.starts&&t(r.starts,s),a.matcher=function(e){const n=new i;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(a),a}(
/** @type Mode */
e)}function ie(e){return!!e&&(e.endsWithParent||ie(e.starts))}class oe extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const re=i,se=o,ae=Symbol("nomatch"),ce=function(e){const i=Object.create(null),o=Object.create(null),r=[];let s=!0;const a="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let u={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,
// beta configuration options, subject to change, welcome to discuss
// https://github.com/highlightjs/highlight.js/issues/1086
__emitter:l};function b(e){return u.noHighlightRe.test(e)}function m(e,n,t){let i="",o="";"object"==typeof n?(i=e,t=n.ignoreIllegals,o=n.language):(Y("10.7.0","highlight(lang, code, ...args) has been deprecated."),Y("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),o=e,i=n),void 0===t&&(t=!0);const r={code:i,language:o};N("before:highlight",r);const s=r.result?r.result:E(r.language,r.code,t);return s.code=r.code,N("after:highlight",s),s}function E(e,n,o,r){const c=Object.create(null);function l(){if(!N.keywords)return void k.addText(R);let e=0;N.keywordPatternRe.lastIndex=0;let n=N.keywordPatternRe.exec(R),t="";for(;n;){t+=R.substring(e,n.index);const o=y.case_insensitive?n[0].toLowerCase():n[0],r=(i=o,N.keywords[i]);if(r){const[e,i]=r;if(k.addText(t),t="",c[o]=(c[o]||0)+1,c[o]<=7&&(A+=i),e.startsWith("_"))t+=n[0];else{const t=y.classNameAliases[e]||e;d(n[0],t)}}else t+=n[0];e=N.keywordPatternRe.lastIndex,n=N.keywordPatternRe.exec(R)}var i;t+=R.substring(e),k.addText(t)}function g(){null!=N.subLanguage?function(){if(""===R)return;let e=null;if("string"==typeof N.subLanguage){if(!i[N.subLanguage])return void k.addText(R);e=E(N.subLanguage,R,!0,M[N.subLanguage]),M[N.subLanguage]=/** @type {CompiledMode} */
e._top}else e=x(R,N.subLanguage.length?N.subLanguage:null);N.relevance>0&&(A+=e.relevance),k.__addSublanguage(e._emitter,e.language)}():l(),R=""}function d(e,n){""!==e&&(k.startScope(n),k.addText(e),k.endScope())}function h(e,n){let t=1;const i=n.length-1;for(;t<=i;){if(!e._emit[t]){t++;continue}const i=y.classNameAliases[e[t]]||e[t],o=n[t];i?d(o,i):(R=o,l(),R=""),t++}}function f(e,n){return e.scope&&"string"==typeof e.scope&&k.openNode(y.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(d(R,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),R=""):e.beginScope._multi&&(h(e.beginScope,n),R="")),N=Object.create(e,{parent:{value:N}}),N}function p(e,n,i){let o=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,i);if(o){if(e["on:end"]){const i=new t(e);e["on:end"](n,i),i.isMatchIgnored&&(o=!1)}if(o){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return p(e.parent,n,i)}function b(e){return 0===N.matcher.regexIndex?(R+=e[0],1):(T=!0,0)}function m(e){const t=e[0],i=n.substring(e.index),o=p(N,e,i);if(!o)return ae;const r=N;N.endScope&&N.endScope._wrap?(g(),d(t,N.endScope._wrap)):N.endScope&&N.endScope._multi?(g(),h(N.endScope,e)):r.skip?R+=t:(r.returnEnd||r.excludeEnd||(R+=t),g(),r.excludeEnd&&(R=t));do{N.scope&&k.closeNode(),N.skip||N.subLanguage||(A+=N.relevance),N=N.parent}while(N!==o.parent);return o.starts&&f(o.starts,e),r.returnEnd?0:t.length}let w={};function _(i,r){const a=r&&r[0];if(R+=i,null==a)return g(),0;if("begin"===w.type&&"end"===r.type&&w.index===r.index&&""===a){if(R+=n.slice(r.index,r.index+1),!s){const n=new Error("0 width match regex (".concat(e,")"));throw n.languageName=e,n.badRule=w.rule,n}return 1}if(w=r,"begin"===r.type)return function(e){const n=e[0],i=e.rule,o=new t(i),r=[i.__beforeBegin,i["on:begin"]];for(const t of r)if(t&&(t(e,o),o.isMatchIgnored))return b(n);return i.skip?R+=n:(i.excludeBegin&&(R+=n),g(),i.returnBegin||i.excludeBegin||(R=n)),f(i,e),i.returnBegin?0:n.length}(r);if("illegal"===r.type&&!o){const e=new Error('Illegal lexeme "'+a+'" for mode "'+(N.scope||"<unnamed>")+'"');throw e.mode=N,e}if("end"===r.type){const e=m(r);if(e!==ae)return e}if("illegal"===r.type&&""===a)return 1;if(I>1e5&&I>3*r.index){throw new Error("potential infinite loop, way more iterations than matches")}return R+=a,a.length}const y=O(e);if(!y)throw q(a.replace("{}",e)),new Error('Unknown language: "'+e+'"');const S=te(y);let v="",N=r||S;const M={},k=new u.__emitter(u);!function(){const e=[];for(let n=N;n!==y;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach((e=>k.openNode(e)))}();let R="",A=0,j=0,I=0,T=!1;try{if(y.__emitTokens)y.__emitTokens(n,k);else{for(N.matcher.considerAll();;){I++,T?T=!1:N.matcher.considerAll(),N.matcher.lastIndex=j;const e=N.matcher.exec(n);if(!e)break;const t=_(n.substring(j,e.index),e);j=e.index+t}_(n.substring(j))}return k.finalize(),v=k.toHTML(),{language:e,value:v,relevance:A,illegal:!1,_emitter:k,_top:N}}catch(L){if(L.message&&L.message.includes("Illegal"))return{language:e,value:re(n),illegal:!0,relevance:0,_illegalBy:{message:L.message,index:j,context:n.slice(j-100,j+100),mode:L.mode,resultSoFar:v},_emitter:k};if(s)return{language:e,value:re(n),illegal:!1,relevance:0,errorRaised:L,_emitter:k,_top:N};throw L}}function x(e,n){n=n||u.languages||Object.keys(i);const t=function(e){const n={value:re(e),illegal:!1,relevance:0,_top:c,_emitter:new u.__emitter(u)};return n._emitter.addText(e),n}(e),o=n.filter(O).filter(v).map((n=>E(n,e,!1)));o.unshift(t);const r=o.sort(((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(O(e.language).supersetOf===n.language)return 1;if(O(n.language).supersetOf===e.language)return-1}return 0})),[s,a]=r,l=s;return l.secondBest=a,l}function w(e){let n=null;const t=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=u.languageDetectRe.exec(n);if(t){const e=O(t[1]);return e||a.replace("{}",t[1]),e?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>b(e)||O(e)))}(e);if(b(t))return;if(N("before:highlightElement",{el:e,language:t}),e.dataset.highlighted)return;if(e.children.length>0&&(u.ignoreUnescapedHTML,u.throwUnescapedHTML)){throw new oe("One of your code blocks includes unescaped HTML.",e.innerHTML)}n=e;const i=n.textContent,r=t?m(i,{language:t,ignoreIllegals:!0}):x(i);e.innerHTML=r.value,e.dataset.highlighted="yes",function(e,n,t){const i=n&&o[n]||t;e.classList.add("hljs"),e.classList.add("language-".concat(i))}(e,t,r.language),e.result={language:r.language,
// TODO: remove with version 11.0
re:r.relevance,relevance:r.relevance},r.secondBest&&(e.secondBest={language:r.secondBest.language,relevance:r.secondBest.relevance}),N("after:highlightElement",{el:e,result:r,text:i})}let _=!1;function y(){if("loading"===document.readyState)return void(_=!0);document.querySelectorAll(u.cssSelector).forEach(w)}function O(e){return e=(e||"").toLowerCase(),i[e]||i[o[e]]}function S(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{o[e.toLowerCase()]=n}))}function v(e){const n=O(e);return n&&!n.disableAutodetect}function N(e,n){const t=e;r.forEach((function(e){e[t]&&e[t](n)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){_&&y()}),!1),Object.assign(e,{highlight:m,highlightAuto:x,highlightAll:y,highlightElement:w,
// TODO: Remove with v12 API
highlightBlock:function(e){return Y("10.7.0","highlightBlock will be removed entirely in v12.0"),Y("10.7.0","Please use highlightElement now."),w(e)},configure:function(e){u=se(u,e)},initHighlighting:()=>{y(),Y("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){y(),Y("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(n,t){let o=null;try{o=t(e)}catch(r){if(q("Language definition for '{}' could not be registered.".replace("{}",n)),!s)throw r;q(r),o=c}o.name||(o.name=n),i[n]=o,o.rawDefinition=t.bind(null,e),o.aliases&&S(o.aliases,{languageName:n})},unregisterLanguage:function(e){delete i[e];for(const n of Object.keys(o))o[n]===e&&delete o[n]},listLanguages:function(){return Object.keys(i)},getLanguage:O,registerAliases:S,autoDetection:v,inherit:se,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{e["before:highlightBlock"](Object.assign({block:n.el},n))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{e["after:highlightBlock"](Object.assign({block:n.el},n))})}(e),r.push(e)},removePlugin:function(e){const n=r.indexOf(e);-1!==n&&r.splice(n,1)}}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="11.9.0",e.regex={concat:f,lookahead:g,either:p,optional:h,anyNumberOfTimes:d};for(const t in D)"object"==typeof D[t]&&n(D[t]);return Object.assign(e,D),e},le=ce({});le.newInstance=()=>ce({});var ue=le;le.HighlightJS=le,le.default=le;const ge=e(ue);export{ge as H};
