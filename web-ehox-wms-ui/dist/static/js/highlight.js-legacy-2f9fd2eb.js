System.register(["./@antv-legacy-5cb6425b.js"],(function(e,n){"use strict";var t;return{setters:[e=>{t=e.g}],execute:function(){/* eslint-disable no-multi-assign */function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),// Freeze self
Object.freeze(e),Object.getOwnPropertyNames(e).forEach((t=>{const i=e[t],r=typeof i;// Freeze prop if it is an object or function and also not already frozen
"object"!==r&&"function"!==r||Object.isFrozen(i)||n(i)})),e}/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */ /** @typedef {import('highlight.js').CompiledMode} CompiledMode */ /** @implements CallbackResponse */class i{
/**
         * @param {CompiledMode} mode
         */
constructor(e){// eslint-disable-next-line no-undefined
void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}
/**
       * @param {string} value
       * @returns {string}
       */function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}
/**
       * performs a shallow merge of multiple objects into one
       *
       * @template T
       * @param {T} original
       * @param {Record<string,any>[]} objects
       * @returns {T} a single new object
       */function o(e,...n){/** @type Record<string,any> */const t=Object.create(null);for(const i in e)t[i]=e[i];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),/** @type {T} */t}
/**
       * @typedef {object} Renderer
       * @property {(text: string) => void} addText
       * @property {(node: Node) => void} openNode
       * @property {(node: Node) => void} closeNode
       * @property {() => string} value
       */
/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */ /** @typedef {{walk: (r: Renderer) => void}} Tree */ /** */const s=e=>!!e.scope;
/**
       * Determines if a node needs to be wrapped in <span>
       *
       * @param {Node} node */ /** @type {Renderer} */class a{
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
         * @param {string} text */addText(e){this.buffer+=r(e)}
/**
         * Adds a node open to the output stream (if needed)
         *
         * @param {Node} node */openNode(e){if(!s(e))return;const n=((e,{prefix:n})=>{// sub-language
if(e.startsWith("language:"))return e.replace("language:","language-");// tiered scope: comment.line
if(e.includes(".")){const t=e.split(".");return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")}// simple scope
return`${n}${e}`})(e.scope,{prefix:this.classPrefix});this.span(n)}
/**
         * Adds a node close to the output stream (if needed)
         *
         * @param {Node} node */closeNode(e){s(e)&&(this.buffer+="</span>")}
/**
         * returns the accumulated buffer
        */value(){return this.buffer}// helpers
/**
         * Builds a span element
         *
         * @param {string} className */
span(e){this.buffer+=`<span class="${e}">`}}/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */ /** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */ /** @typedef {import('highlight.js').Emitter} Emitter */ /**  */ /** @returns {DataNode} */const c=(e={})=>{/** @type DataNode */const n={children:[]};return Object.assign(n,e),n};class l{constructor(){/** @type DataNode */this.rootNode=c(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}/** @param {Node} node */add(e){this.top.children.push(e)}/** @param {string} scope */openNode(e){/** @type Node */const n=c({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop();// eslint-disable-next-line no-undefined
}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}
/**
         * @typedef { import("./html_renderer").Renderer } Renderer
         * @param {Renderer} builder
         */walk(e){// this does not
return this.constructor._walk(e,this.rootNode);// this works
// return TokenTree._walk(builder, this.rootNode);
}
/**
         * @param {Renderer} builder
         * @param {Node} node
         */static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}
/**
         * @param {Node} node
         */static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?// node.text = node.children.join("");
// delete node.children;
e.children=[e.children.join("")]:e.children.forEach((e=>{l._collapse(e)})))}}
/**
        Currently this is all private API, but this is the minimal API necessary
        that an Emitter must implement to fully support the parser.

        Minimal interface:

        - addText(text)
        - __addSublanguage(emitter, subLanguageName)
        - startScope(scope)
        - endScope()
        - finalize()
        - toHTML()

      */
/**
       * @implements {Emitter}
       */class u extends l{
/**
         * @param {*} options
         */
constructor(e){super(),this.options=e}
/**
         * @param {string} text
         */addText(e){""!==e&&this.add(e)}/** @param {string} scope */startScope(e){this.openNode(e)}endScope(){this.closeNode()}
/**
         * @param {Emitter & {root: DataNode}} emitter
         * @param {string} name
         */__addSublanguage(e,n){/** @type DataNode */const t=e.root;n&&(t.scope=`language:${n}`),this.add(t)}toHTML(){return new a(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}
/**
       * @param {string} value
       * @returns {RegExp}
       * */
/**
       * @param {RegExp | string } re
       * @returns {string}
       */function g(e){return e?"string"==typeof e?e:e.source:null}
/**
       * @param {RegExp | string } re
       * @returns {string}
       */function d(e){return p("(?=",e,")")}
/**
       * @param {RegExp | string } re
       * @returns {string}
       */function h(e){return p("(?:",e,")*")}
/**
       * @param {RegExp | string } re
       * @returns {string}
       */function f(e){return p("(?:",e,")?")}
/**
       * @param {...(RegExp | string) } args
       * @returns {string}
       */function p(...e){return e.map((e=>g(e))).join("")}
/**
       * @param { Array<string | RegExp | Object> } args
       * @returns {object}
       */ /** @typedef { {capture?: boolean} } RegexEitherOptions */
/**
       * Any of the passed expresssions may match
       *
       * Creates a huge this | this | that | that match
       * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
       * @returns {string}
       */
function b(...e){/** @type { object & {capture?: boolean} }  */const n=function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e);return"("+(n.capture?"":"?:")+e.map((e=>g(e))).join("|")+")"}
/**
       * @param {RegExp | string} re
       * @returns {number}
       */function m(e){return new RegExp(e.toString()+"|").exec("").length-1}
/**
       * Does lexeme start with a regular expression match at the beginning
       * @param {RegExp} re
       * @param {string} lexeme
       */ // BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const E=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;// **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
       * @param {(string | RegExp)[]} regexps
       * @param {{joinWith: string}} opts
       * @returns {string}
       */function x(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t;let i=g(e),r="";for(;i.length>0;){const e=E.exec(i);if(!e){r+=i;break}r+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?// Adjust the backreference.
r+="\\"+String(Number(e[1])+n):(r+=e[0],"("===e[0]&&t++)}return r})).map((e=>`(${e})`)).join(n)}/** @typedef {import('highlight.js').Mode} Mode */ /** @typedef {import('highlight.js').ModeCallback} ModeCallback */ // Common regexps
const w="[a-zA-Z]\\w*",_="[a-zA-Z_]\\w*",y="\\b\\d+(\\.\\d+)?",O="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",S="\\b(0b[01]+)",v={begin:"\\\\[\\s\\S]",relevance:0},N={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[v]},M={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[v]},k=function(e,n,t={}){const i=o({scope:"comment",begin:e,end:n,contains:[]},t);i.contains.push({scope:"doctag",// hack to avoid the space from being included. the space is necessary to
// match here to prevent the plain text rule below from gobbling up doctags
begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const r=b(// list of common 1 and 2 letter words in English
"I","a","is","so","us","to","at","if","in","it","on",// note: this is not an exhaustive list of contractions, just popular ones
/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,// contractions - can't we'd they're let's, etc
/[A-Za-z]+[-][a-z]+/,// `no-way`, etc.
/[A-Za-z][a-z]{2,}/);// looking like plain text, more likely to be a comment
return i.contains.push({// TODO: how to include ", (, ) without breaking grammars that use these for
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
begin:p(/[ ]+/,// necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},R=k("//","$"),A=k("/\\*","\\*/"),j=k("#","$"),I={scope:"number",begin:y,relevance:0},T={scope:"number",begin:O,relevance:0},L={scope:"number",begin:S,relevance:0},B={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[v,{begin:/\[/,end:/\]/,relevance:0,contains:[v]}]},P={scope:"title",begin:w,relevance:0},H={scope:"title",begin:_,relevance:0},D={// excludes method names from keyword processing
begin:"\\.\\s*"+_,relevance:0};var C=Object.freeze({__proto__:null,APOS_STRING_MODE:N,BACKSLASH_ESCAPE:v,BINARY_NUMBER_MODE:L,BINARY_NUMBER_RE:S,COMMENT:k,C_BLOCK_COMMENT_MODE:A,C_LINE_COMMENT_MODE:R,C_NUMBER_MODE:T,C_NUMBER_RE:O,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{/** @type {ModeCallback} */"on:begin":(e,n)=>{n.data._beginMatch=e[1]},/** @type {ModeCallback} */"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})},HASH_COMMENT_MODE:j,IDENT_RE:w,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:D,NUMBER_MODE:I,NUMBER_RE:y,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:M,REGEXP_MODE:B,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=p(n,/.*\b/,e.binary,/\b.*/)),o({scope:"meta",begin:n,end:/$/,relevance:0,/** @type {ModeCallback} */"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},TITLE_MODE:P,UNDERSCORE_IDENT_RE:_,UNDERSCORE_TITLE_MODE:H});
/**
      @typedef {import('highlight.js').CallbackResponse} CallbackResponse
      @typedef {import('highlight.js').CompilerExt} CompilerExt
      */
// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833
// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.
// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.
// ------
// TODO: We need negative look-behind support to do this properly
/**
       * Skip a match if it has a preceding dot
       *
       * This is used for `beginKeywords` to prevent matching expressions such as
       * `bob.keyword.do()`. The mode compiler automatically wires this up as a
       * special _internal_ 'on:begin' callback for modes with `beginKeywords`
       * @param {RegExpMatchArray} match
       * @param {CallbackResponse} response
       */function $(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}
/**
       *
       * @type {CompilerExt}
       */function U(e,n){// eslint-disable-next-line no-undefined
void 0!==e.className&&(e.scope=e.className,delete e.className)}
/**
       * `beginKeywords` syntactic sugar
       * @type {CompilerExt}
       */function z(e,n){n&&e.beginKeywords&&(// for languages with keywords that include non-word characters checking for
// a word boundary is not sufficient, so instead we check for a word boundary
// or whitespace - this does no harm in any case since our keyword engine
// doesn't allow spaces in keywords anyways and we still check for the boundary
// first
e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=$,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,// prevents double relevance, the keywords themselves provide
// relevance, the mode doesn't need to double it
// eslint-disable-next-line no-undefined
void 0===e.relevance&&(e.relevance=0))}
/**
       * Allow `illegal` to contain an array of illegal values
       * @type {CompilerExt}
       */function W(e,n){Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}
/**
       * `match` to match a single expression for readability
       * @type {CompilerExt}
       */function X(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}
/**
       * provides the default 1 relevance to all modes
       * @type {CompilerExt}
       */function G(e,n){// eslint-disable-next-line no-undefined
void 0===e.relevance&&(e.relevance=1)}// allow beforeMatch to act as a "qualifier" for the match
// the full match begin must be [beforeMatch][begin]
const K=(e,n)=>{if(!e.beforeMatch)return;// starts conflicts with endsParent which we need to make sure the child
// rule is not matched multiple times
if(e.starts)throw new Error("beforeMatch cannot be used with starts");const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]})),e.keywords=t.keywords,e.begin=p(t.beforeMatch,d(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},Z=["of","and","for","in","not","or","if","then","parent",// common variable name
"list",// common variable name
"value"],F="keyword";// keywords that should have no default relevance value
/**
       * Given raw keywords from a language definition, compile them.
       *
       * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
       * @param {boolean} caseInsensitive
       */
function V(e,n,t=F){/** @type {import("highlight.js/private").KeywordDict} */const i=Object.create(null);// input can be a string of keywords, an array of keywords, or a object with
// named keys representing scopeName (which can then point to a string or array)
return"string"==typeof e?r(t,e.split(" ")):Array.isArray(e)?r(t,e):Object.keys(e).forEach((function(t){// collapse all our objects back into the parent object
Object.assign(i,V(e[t],n,t))})),i;// ---
/**
         * Compiles an individual list of keywords
         *
         * Ex: "for if when while|5"
         *
         * @param {string} scopeName
         * @param {Array<string>} keywordList
         */function r(e,t){n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((function(n){const t=n.split("|");i[t[0]]=[e,J(t[0],t[1])]}))}}
/**
       * Returns the proper score for a given keyword
       *
       * Also takes into account comment keywords, which will be scored 0 UNLESS
       * another score has been manually assigned.
       * @param {string} keyword
       * @param {string} [providedScore]
       */function J(e,n){// manual scores always win over common keywords
// so you can force a score of 1 if you really insist
return n?Number(n):
/**
       * Determines if a given keyword is common or not
       *
       * @param {string} keyword */
function(e){return Z.includes(e.toLowerCase())}
/*

      For the reasoning behind this please see:
      https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

      */
/**
       * @type {Record<string, boolean>}
       */(e)?0:1}const q={},Y=e=>{},Q=(e,n)=>{q[`${e}/${n}`]||(q[`${e}/${n}`]=!0)},ee=new Error;
/**
       * @param {string} message
       */
/**
       * Renumbers labeled scope names to account for additional inner match
       * groups that otherwise would break everything.
       *
       * Lets say we 3 match scopes:
       *
       *   { 1 => ..., 2 => ..., 3 => ... }
       *
       * So what we need is a clean match like this:
       *
       *   (a)(b)(c) => [ "a", "b", "c" ]
       *
       * But this falls apart with inner match groups:
       *
       * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
       *
       * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
       * What needs to happen is the numbers are remapped:
       *
       *   { 1 => ..., 2 => ..., 5 => ... }
       *
       * We also need to know that the ONLY groups that should be output
       * are 1, 2, and 5.  This function handles this behavior.
       *
       * @param {CompiledMode} mode
       * @param {Array<RegExp | string>} regexes
       * @param {{key: "beginScope"|"endScope"}} opts
       */
function ne(e,n,{key:t}){let i=0;const r=e[t],o={},s={};/** @type Record<number,boolean> */for(let a=1;a<=n.length;a++)s[a+i]=r[a],o[a+i]=!0,i+=m(n[a-1]);// we use _emit to keep track of which match groups are "top-level" to avoid double
// output from inside match groups
e[t]=s,e[t]._emit=o,e[t]._multi=!0}
/**
       * @param {CompiledMode} mode
       */
/**
       * @param {CompiledMode} mode
       */
function te(e){!
/**
       * this exists only to allow `scope: {}` to be used beside `match:`
       * Otherwise `beginScope` would necessary and that would look weird

        {
          match: [ /def/, /\w+/ ]
          scope: { 1: "keyword" , 2: "title" }
        }

       * @param {CompiledMode} mode
       */
function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Y("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ee;if("object"!=typeof e.beginScope||null===e.beginScope)throw Y("beginScope must be object"),ee;ne(e,e.begin,{key:"beginScope"}),e.begin=x(e.begin,{joinWith:""})}}
/**
       * @param {CompiledMode} mode
       */(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Y("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ee;if("object"!=typeof e.endScope||null===e.endScope)throw Y("endScope must be object"),ee;ne(e,e.end,{key:"endScope"}),e.end=x(e.end,{joinWith:""})}}(e)}
/**
      @typedef {import('highlight.js').Mode} Mode
      @typedef {import('highlight.js').CompiledMode} CompiledMode
      @typedef {import('highlight.js').Language} Language
      @typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
      @typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
      */
// compilation
/**
       * Compiles a language definition result
       *
       * Given the raw result of a language definition (Language), compiles this so
       * that it is ready for highlighting code.
       * @param {Language} language
       * @returns {CompiledLanguage}
       */function ie(e){
/**
         * Builds a regex with the case sensitivity of the current language
         *
         * @param {RegExp | string} value
         * @param {boolean} [global]
         */
function n(n,t){return new RegExp(g(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}
/**
          Stores multiple regular expressions and allows you to quickly search for
          them all in a string simultaneously - returning the first match.  It does
          this by creating a huge (a|b|c) regex - each individual item wrapped with ()
          and joined by `|` - using match groups to track position.  When a match is
          found checking which position in the array has content allows us to figure
          out which of the original regexes / match groups triggered the match.

          The match object itself (the result of `Regex.exec`) is returned but also
          enhanced by merging in any meta-data that was registered with the regex.
          This is how we keep track of which mode matched, and what type of rule
          (`illegal`, `begin`, end, etc).
        */class t{constructor(){this.matchIndexes={},// @ts-ignore
this.regexes=[],this.matchAt=1,this.position=0}// @ts-ignore
addRule(e,n){n.position=this.position++,// @ts-ignore
this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=m(e)+1}compile(){0===this.regexes.length&&(// avoids the need to check length every time exec is called
// @ts-ignore
this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(x(e,{joinWith:"|"}),!0),this.lastIndex=0}/** @param {string} s */exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;// eslint-disable-next-line no-undefined
const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t];// @ts-ignore
// trim off any earlier non-relevant match groups (ie, the other regex
// match groups that make up the multi-matcher)
return n.splice(0,t),Object.assign(n,i)}}
/*
          Created to solve the key deficiently with MultiRegex - there is no way to
          test for multiple matches at a single location.  Why would we need to do
          that?  In the future a more dynamic engine will allow certain matches to be
          ignored.  An example: if we matched say the 3rd regex in a large group but
          decided to ignore it - we'd need to started testing again at the 4th
          regex... but MultiRegex itself gives us no real way to do that.

          So what this class creates MultiRegexs on the fly for whatever search
          position they are needed.

          NOTE: These additional MultiRegex objects are created dynamically.  For most
          grammars most of the time we will never actually need anything more than the
          first MultiRegex - so this shouldn't have too much overhead.

          Say this is our search group, and we match regex3, but wish to ignore it.

            regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

          What we need is a new MultiRegex that only includes the remaining
          possibilities:

            regex4 | regex5                               ' ie, startAt = 3

          This class wraps all that complexity up in a simple API... `startAt` decides
          where in the array of expressions to start doing the matching. It
          auto-increments, so if a match is found at position 2, then startAt will be
          set to 3.  If the end is reached startAt will return to 0.

          MOST of the time the parser will be setting startAt manually to 0.
        */class i{constructor(){// @ts-ignore
this.rules=[],// @ts-ignore
this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}// @ts-ignore
getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}// @ts-ignore
addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}/** @param {string} s */exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);// The following is because we have no easy way to say "resume scanning at the
// existing position but also skip the current rule ONLY". What happens is
// all prior rules are also skipped which can result in matching the wrong
// thing. Example of matching "booger":
// our matcher is [string, "booger", number]

// ....booger....
// if "booger" is ignored then we'd really need a regex to scan from the
// SAME position for only: [string, number] but ignoring "booger" (if it
// was the first match), a simple resume would scan ahead who knows how
// far looking only for "number", ignoring potential string matches (or
// future "booger" matches that might be valid.)
// So what we do: We execute two matchers, one resuming at the same
// position, but the second full matcher starting at the position after:
//     /--- resume first regex match here (for [number])
//     |/---- full match here for [string, "booger", number]
//     vv
// ....booger....
// Which ever results in a match first is then used. So this 3-4 step
// process essentially allows us to say "match at this position, excluding
// a prior rule that was ignored".

// 1. Match "booger" first, ignore. Also proves that [string] does non match.
// 2. Resume matching for [number]
// 3. Match at index + 1 for [string, "booger", number]
// 4. If #2 and #3 result in matches, which came first?
if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{// use the second matcher result
const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&// wrap-around to considering all matches again
this.considerAll()),t}}
/**
         * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
         * the content and find matches.
         *
         * @param {CompiledMode} mode
         * @returns {ResumableMultiRegex}
         */ // self is not valid at the top-level
if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");// we need a null object, which inherit will guarantee
return e.classNameAliases=o(e.classNameAliases||{}),
/** skip vs abort vs ignore
         *
         * @skip   - The mode is still entered and exited normally (and contains rules apply),
         *           but all content is held and added to the parent buffer rather than being
         *           output when the mode ends.  Mostly used with `sublanguage` to build up
         *           a single large buffer than can be parsed by sublanguage.
         *
         *             - The mode begin ands ends normally.
         *             - Content matched is added to the parent mode buffer.
         *             - The parser cursor is moved forward normally.
         *
         * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
         *           never matched) but DOES NOT continue to match subsequent `contains`
         *           modes.  Abort is bad/suboptimal because it can result in modes
         *           farther down not getting applied because an earlier rule eats the
         *           content but then aborts.
         *
         *             - The mode does not begin.
         *             - Content matched by `begin` is added to the mode buffer.
         *             - The parser cursor is moved forward accordingly.
         *
         * @ignore - Ignores the mode (as if it never matched) and continues to match any
         *           subsequent `contains` modes.  Ignore isn't technically possible with
         *           the current parser implementation.
         *
         *             - The mode does not begin.
         *             - Content matched by `begin` is ignored.
         *             - The parser cursor is not moved forward.
         */
/**
         * Compiles an individual mode
         *
         * This can raise an error if the mode contains certain detectable known logic
         * issues.
         * @param {Mode} mode
         * @param {CompiledMode | null} [parent]
         * @returns {CompiledMode | never}
         */
function t(r,s){const a=/** @type CompiledMode */r;if(r.isCompiled)return a;[U,// do this early so compiler extensions generally don't have to worry about
// the distinction between match/begin
X,te,K].forEach((e=>e(r,s))),e.compilerExtensions.forEach((e=>e(r,s))),// __beforeBegin is considered private API, internal use only
r.__beforeBegin=null,[z,// do this later so compiler extensions that come earlier have access to the
// raw array if they wanted to perhaps manipulate it, etc.
W,// default to 1 relevance if not specified
G].forEach((e=>e(r,s))),r.isCompiled=!0;let c=null;return"object"==typeof r.keywords&&r.keywords.$pattern&&(// we need a copy because keywords might be compiled multiple times
// so we can't go deleting $pattern from the original on the first
// pass
r.keywords=Object.assign({},r.keywords),c=r.keywords.$pattern,delete r.keywords.$pattern),c=c||/\w+/,r.keywords&&(r.keywords=V(r.keywords,e.case_insensitive)),a.keywordPatternRe=n(c,!0),s&&(r.begin||(r.begin=/\B|\b/),a.beginRe=n(a.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),r.end&&(a.endRe=n(a.end)),a.terminatorEnd=g(a.end)||"",r.endsWithParent&&s.terminatorEnd&&(a.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(a.illegalRe=n(/** @type {RegExp | string} */r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((function(e){
/**
       * Expands a mode or clones it if necessary
       *
       * This is necessary for modes with parental dependenceis (see notes on
       * `dependencyOnParent`) and for nodes that have `variants` - which must then be
       * exploded into their own individual modes at compile time.
       *
       * @param {Mode} mode
       * @returns {Mode | Mode[]}
       * */return function(e){// EXPAND
// if we have variants then essentially "replace" the mode with the variants
// this happens in compileMode, where this function is called from
return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(n){return o(e,{variants:null},n)}))),e.cachedVariants?e.cachedVariants:// CLONE
// if we have dependencies on parents then we need a unique
// instance of ourselves, so we can be reused with many
// different parents without issue
re(e)?o(e,{starts:e.starts?o(e.starts):null}):Object.isFrozen(e)?o(e):e}("self"===e?r:e)}))),r.contains.forEach((function(e){t(/** @type Mode */e,a)})),r.starts&&t(r.starts,s),a.matcher=function(e){const n=new i;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(a),a}(/** @type Mode */e)}
/**
       * Determines if a mode has a dependency on it's parent or not
       *
       * If a mode does have a parent dependency then often we need to clone it if
       * it's used in multiple places so that each copy points to the correct parent,
       * where-as modes without a parent can often safely be re-used at the bottom of
       * a mode chain.
       *
       * @param {Mode | null} mode
       * @returns {boolean} - is there a dependency on the parent?
       * */function re(e){return!!e&&(e.endsWithParent||re(e.starts))}class oe extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}
/*
      Syntax highlighting with language autodetection.
      https://highlightjs.org/
      */
/**
      @typedef {import('highlight.js').Mode} Mode
      @typedef {import('highlight.js').CompiledMode} CompiledMode
      @typedef {import('highlight.js').CompiledScope} CompiledScope
      @typedef {import('highlight.js').Language} Language
      @typedef {import('highlight.js').HLJSApi} HLJSApi
      @typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
      @typedef {import('highlight.js').PluginEvent} PluginEvent
      @typedef {import('highlight.js').HLJSOptions} HLJSOptions
      @typedef {import('highlight.js').LanguageFn} LanguageFn
      @typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
      @typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
      @typedef {import('highlight.js/private').MatchType} MatchType
      @typedef {import('highlight.js/private').KeywordData} KeywordData
      @typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
      @typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
      @typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
      @typedef {import('highlight.js').HighlightOptions} HighlightOptions
      @typedef {import('highlight.js').HighlightResult} HighlightResult
      */const se=r,ae=o,ce=Symbol("nomatch"),le=function(e){// Global internal variables used within the highlight.js library.
/** @type {Record<string, Language>} */const t=Object.create(null),r=Object.create(null),o=[];/** @type {Record<string, string>} */ // safe/production mode - swallows more errors, tries to keep running
// even if a single syntax or parse hits a fatal error
let s=!0;const a="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};/** @type {Language} */ // Global options used when within external APIs. This is modified when
// calling the `hljs.configure` function.
/** @type HLJSOptions */let l={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,// beta configuration options, subject to change, welcome to discuss
// https://github.com/highlightjs/highlight.js/issues/1086
__emitter:u};/* Utility functions */
/**
         * Tests a language name to see if highlighting should be skipped
         * @param {string} languageName
         */function g(e){return l.noHighlightRe.test(e)}
/**
         * @param {HighlightedHTMLElement} block - the HTML element to determine language for
         */
/**
         * Core highlighting function.
         *
         * OLD API
         * highlight(lang, code, ignoreIllegals, continuation)
         *
         * NEW API
         * highlight(code, {lang, ignoreIllegals})
         *
         * @param {string} codeOrLanguageName - the language to use for highlighting
         * @param {string | HighlightOptions} optionsOrCode - the code to highlight
         * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
         *
         * @returns {HighlightResult} Result - an object that represents the result
         * @property {string} language - the language name
         * @property {number} relevance - the relevance score
         * @property {string} value - the highlighted HTML code
         * @property {string} code - the original raw code
         * @property {CompiledMode} top - top of the current mode stack
         * @property {boolean} illegal - indicates whether any illegal matches were found
        */
function m(e,n,t){let i="",r="";"object"==typeof n?(i=e,t=n.ignoreIllegals,r=n.language):(// old API
Q("10.7.0","highlight(lang, code, ...args) has been deprecated."),Q("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),r=e,i=n),// https://github.com/highlightjs/highlight.js/issues/3149
// eslint-disable-next-line no-undefined
void 0===t&&(t=!0)/** @type {BeforeHighlightContext} */;const o={code:i,language:r};// the plugin can change the desired language or the code to be highlighted
// just be changing the object it was passed
N("before:highlight",o);// a before plugin can usurp the result completely by providing it's own
// in which case we don't even need to call highlight
const s=o.result?o.result:E(o.language,o.code,t);return s.code=o.code,// the plugin can change anything in result to suite it
N("after:highlight",s),s}
/**
         * private highlight that's used internally and does not fire callbacks
         *
         * @param {string} languageName - the language to use for highlighting
         * @param {string} codeToHighlight - the code to highlight
         * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
         * @param {CompiledMode?} [continuation] - current continuation mode, if any
         * @returns {HighlightResult} - result of the highlight operation
        */function E(e,n,r,o){const c=Object.create(null);
/**
           * Return keyword data if a match is a keyword
           * @param {CompiledMode} mode - current mode
           * @param {string} matchText - the textual match
           * @returns {KeywordData | false}
           */function u(){if(!N.keywords)return void k.addText(R);let e=0;N.keywordPatternRe.lastIndex=0;let n=N.keywordPatternRe.exec(R),t="";for(;n;){t+=R.substring(e,n.index);const r=y.case_insensitive?n[0].toLowerCase():n[0],o=(i=r,N.keywords[i]);if(o){const[e,i]=o;if(k.addText(t),t="",c[r]=(c[r]||0)+1,c[r]<=7&&(A+=i),e.startsWith("_"))// _ implied for relevance only, do not highlight
// by applying a class name
t+=n[0];else{const t=y.classNameAliases[e]||e;d(n[0],t)}}else t+=n[0];e=N.keywordPatternRe.lastIndex,n=N.keywordPatternRe.exec(R)}var i;t+=R.substring(e),k.addText(t)}function g(){null!=N.subLanguage?function(){if(""===R)return;/** @type HighlightResult */let e=null;if("string"==typeof N.subLanguage){if(!t[N.subLanguage])return void k.addText(R);e=E(N.subLanguage,R,!0,M[N.subLanguage]),M[N.subLanguage]=/** @type {CompiledMode} */e._top}else e=x(R,N.subLanguage.length?N.subLanguage:null);// Counting embedded language score towards the host language may be disabled
// with zeroing the containing mode relevance. Use case in point is Markdown that
// allows XML everywhere and makes every XML snippet to have a much larger Markdown
// score.
N.relevance>0&&(A+=e.relevance),k.__addSublanguage(e._emitter,e.language)}():u(),R=""}
/**
           * @param {string} text
           * @param {string} scope
           */function d(e,n){""!==e&&(k.startScope(n),k.addText(e),k.endScope())}
/**
           * @param {CompiledScope} scope
           * @param {RegExpMatchArray} match
           */function h(e,n){let t=1;const i=n.length-1;for(;t<=i;){if(!e._emit[t]){t++;continue}const i=y.classNameAliases[e[t]]||e[t],r=n[t];i?d(r,i):(R=r,u(),R=""),t++}}
/**
           * @param {CompiledMode} mode - new mode to start
           * @param {RegExpMatchArray} match
           */function f(e,n){return e.scope&&"string"==typeof e.scope&&k.openNode(y.classNameAliases[e.scope]||e.scope),e.beginScope&&(// beginScope just wraps the begin match itself in a scope
e.beginScope._wrap?(d(R,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),R=""):e.beginScope._multi&&(// at this point modeBuffer should just be the match
h(e.beginScope,n),R="")),N=Object.create(e,{parent:{value:N}}),N}
/**
           * @param {CompiledMode } mode - the mode to potentially end
           * @param {RegExpMatchArray} match - the latest match
           * @param {string} matchPlusRemainder - match plus remainder of content
           * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
           */function p(e,n,t){let r=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,t);if(r){if(e["on:end"]){const t=new i(e);e["on:end"](n,t),t.isMatchIgnored&&(r=!1)}if(r){for(;e.endsParent&&e.parent;)e=e.parent;return e}}// even if on:end fires an `ignore` it's still possible
// that we might trigger the end node because of a parent mode
if(e.endsWithParent)return p(e.parent,n,t)}
/**
           * Handle matching but then ignoring a sequence of text
           *
           * @param {string} lexeme - string containing full match text
           */function b(e){return 0===N.matcher.regexIndex?(// no more regexes to potentially match here, so we move the cursor forward one
// space
R+=e[0],1):(// no need to move the cursor, we still have additional regexes to try and
// match at this very spot
T=!0,0)}
/**
           * Handle the start of a new potential mode match
           *
           * @param {EnhancedMatch} match - the current match
           * @returns {number} how far to advance the parse cursor
           */
/**
           * Handle the potential end of mode
           *
           * @param {RegExpMatchArray} match - the current match
           */
function m(e){const t=e[0],i=n.substring(e.index),r=p(N,e,i);if(!r)return ce;const o=N;N.endScope&&N.endScope._wrap?(g(),d(t,N.endScope._wrap)):N.endScope&&N.endScope._multi?(g(),h(N.endScope,e)):o.skip?R+=t:(o.returnEnd||o.excludeEnd||(R+=t),g(),o.excludeEnd&&(R=t));do{N.scope&&k.closeNode(),N.skip||N.subLanguage||(A+=N.relevance),N=N.parent}while(N!==r.parent);return r.starts&&f(r.starts,e),o.returnEnd?0:t.length}/** @type {{type?: MatchType, index?: number, rule?: Mode}}} */let w={};
/**
           *  Process an individual match
           *
           * @param {string} textBeforeMatch - text preceding the match (since the last match)
           * @param {EnhancedMatch} [match] - the match itself
           */function _(t,o){const a=o&&o[0];// add non-matched text to the current mode buffer
if(R+=t,null==a)return g(),0;// we've found a 0 width match and we're stuck, so we need to advance
// this happens when we have badly behaved rules that have optional matchers to the degree that
// sometimes they can end up matching nothing at all
// Ref: https://github.com/highlightjs/highlight.js/issues/2140
if("begin"===w.type&&"end"===o.type&&w.index===o.index&&""===a){if(// spit the "skipped" character that our regex choked on back into the output sequence
R+=n.slice(o.index,o.index+1),!s){/** @type {AnnotatedError} */const n=new Error(`0 width match regex (${e})`);throw n.languageName=e,n.badRule=w.rule,n}return 1}if(w=o,"begin"===o.type)return function(e){const n=e[0],t=e.rule,r=new i(t),o=[t.__beforeBegin,t["on:begin"]];for(const i of o)if(i&&(i(e,r),r.isMatchIgnored))return b(n);return t.skip?R+=n:(t.excludeBegin&&(R+=n),g(),t.returnBegin||t.excludeBegin||(R=n)),f(t,e),t.returnBegin?0:n.length}(o);// edge case for when illegal matches $ (end of line) which is technically
// a 0 width match but not a begin/end match so it's not caught by the
// first handler (when ignoreIllegals is true)
if("illegal"===o.type&&!r){// illegal match, we do not continue processing
/** @type {AnnotatedError} */const e=new Error('Illegal lexeme "'+a+'" for mode "'+(N.scope||"<unnamed>")+'"');throw e.mode=N,e}if("end"===o.type){const e=m(o);if(e!==ce)return e}if("illegal"===o.type&&""===a)// advance so we aren't stuck in an infinite loop
return 1;// infinite loops are BAD, this is a last ditch catch all. if we have a
// decent number of iterations yet our index (cursor position in our
// parsing) still 3x behind our index then something is very wrong
// so we bail
if(I>1e5&&I>3*o.index)throw new Error("potential infinite loop, way more iterations than matches");
/*
            Why might be find ourselves here?  An potential end match that was
            triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
            (this could be because a callback requests the match be ignored, etc)

            This causes no real harm other than stopping a few times too many.
            */return R+=a,a.length}const y=O(e);if(!y)throw Y(a.replace("{}",e)),new Error('Unknown language: "'+e+'"');const S=ie(y);let v="",N=o||S;/** @type {CompiledMode} */ /** @type Record<string,CompiledMode> */const M={},k=new l.__emitter(l);// keep continuations for sub-languages
!function(){const e=[];for(let n=N;n!==y;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach((e=>k.openNode(e)))}();let R="",A=0,j=0,I=0,T=!1;try{if(y.__emitTokens)y.__emitTokens(n,k);else{for(N.matcher.considerAll();;){I++,T?// only regexes not matched previously will now be
// considered for a potential match
T=!1:N.matcher.considerAll(),N.matcher.lastIndex=j;const e=N.matcher.exec(n);// console.log("match", match[0], match.rule && match.rule.begin)
if(!e)break;const t=_(n.substring(j,e.index),e);j=e.index+t}_(n.substring(j))}return k.finalize(),v=k.toHTML(),{language:e,value:v,relevance:A,illegal:!1,_emitter:k,_top:N}}catch(L){if(L.message&&L.message.includes("Illegal"))return{language:e,value:se(n),illegal:!0,relevance:0,_illegalBy:{message:L.message,index:j,context:n.slice(j-100,j+100),mode:L.mode,resultSoFar:v},_emitter:k};if(s)return{language:e,value:se(n),illegal:!1,relevance:0,errorRaised:L,_emitter:k,_top:N};throw L}}
/**
         * returns a valid highlight result, without actually doing any actual work,
         * auto highlight starts with this and it's possible for small snippets that
         * auto-detection may not find a better match
         * @param {string} code
         * @returns {HighlightResult}
         */
/**
        Highlighting with language detection. Accepts a string with the code to
        highlight. Returns an object with the following properties:

        - language (detected language)
        - relevance (int)
        - value (an HTML string with highlighting markup)
        - secondBest (object with the same structure for second-best heuristically
          detected language, may be absent)

          @param {string} code
          @param {Array<string>} [languageSubset]
          @returns {AutoHighlightResult}
        */
function x(e,n){n=n||l.languages||Object.keys(t);const i=function(e){const n={value:se(e),illegal:!1,relevance:0,_top:c,_emitter:new l.__emitter(l)};return n._emitter.addText(e),n}(e),r=n.filter(O).filter(v).map((n=>E(n,e,!1)));r.unshift(i);// plaintext is always an option
const o=r.sort(((e,n)=>{// sort base on relevance
if(e.relevance!==n.relevance)return n.relevance-e.relevance;// always award the tie to the base language
// ie if C++ and Arduino are tied, it's more likely to be C++
if(e.language&&n.language){if(O(e.language).supersetOf===n.language)return 1;if(O(n.language).supersetOf===e.language)return-1}// otherwise say they are equal, which has the effect of sorting on
// relevance while preserving the original ordering - which is how ties
// have historically been settled, ie the language that comes first always
// wins in the case of a tie
return 0})),[s,a]=o,u=s;return u.secondBest=a,u}
/**
         * Builds new class name for block given the language name
         *
         * @param {HTMLElement} element
         * @param {string} [currentLang]
         * @param {string} [resultLang]
         */
/**
         * Applies highlighting to a DOM node containing code.
         *
         * @param {HighlightedHTMLElement} element - the HTML element to highlight
        */
function w(e){/** @type HTMLElement */let n=null;const t=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";// language-* takes precedence over non-prefixed class names.
const t=l.languageDetectRe.exec(n);if(t){const e=O(t[1]);return e||a.replace("{}",t[1]),e?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>g(e)||O(e)))}(e);if(g(t))return;if(N("before:highlightElement",{el:e,language:t}),e.dataset.highlighted)return;// we should be all text, no child nodes (unescaped HTML) - this is possibly
// an HTML injection attack - it's likely too late if this is already in
// production (the code has likely already done its damage by the time
// we're seeing it)... but we yell loudly about this so that hopefully it's
// more likely to be caught in development before making it to production
if(e.children.length>0&&(l.ignoreUnescapedHTML,l.throwUnescapedHTML))throw new oe("One of your code blocks includes unescaped HTML.",e.innerHTML);n=e;const i=n.textContent,o=t?m(i,{language:t,ignoreIllegals:!0}):x(i);e.innerHTML=o.value,e.dataset.highlighted="yes",function(e,n,t){const i=n&&r[n]||t;e.classList.add("hljs"),e.classList.add(`language-${i}`)}(e,t,o.language),e.result={language:o.language,// TODO: remove with version 11.0
re:o.relevance,relevance:o.relevance},o.secondBest&&(e.secondBest={language:o.secondBest.language,relevance:o.secondBest.relevance}),N("after:highlightElement",{el:e,result:o,text:i})}
/**
         * Updates highlight.js global options with the passed options
         *
         * @param {Partial<HLJSOptions>} userOptions
         */let _=!1;
/**
         * auto-highlights all pre>code elements on the page
         */function y(){// if we are called too early in the loading process
"loading"!==document.readyState?document.querySelectorAll(l.cssSelector).forEach(w):_=!0}
/**
         * @param {string} name - name of the language to retrieve
         * @returns {Language | undefined}
         */
function O(e){return e=(e||"").toLowerCase(),t[e]||t[r[e]]}
/**
         *
         * @param {string|string[]} aliasList - single alias or list of aliases
         * @param {{languageName: string}} opts
         */function S(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{r[e.toLowerCase()]=n}))}
/**
         * Determines if a given language has auto-detection enabled
         * @param {string} name - name of the language
         */function v(e){const n=O(e);return n&&!n.disableAutodetect}
/**
         * Upgrades the old highlightBlock plugins to the new
         * highlightElement API
         * @param {HLJSPlugin} plugin
         */
/**
         *
         * @param {PluginEvent} event
         * @param {any} args
         */
function N(e,n){const t=e;o.forEach((function(e){e[t]&&e[t](n)}))}
/**
         * DEPRECATED
         * @param {HighlightedHTMLElement} el
         */ // make sure we are in the browser environment
"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){// if a highlight was requested before DOM was loaded, do now
_&&y()}),!1)
/**
         * Register a language grammar module
         *
         * @param {string} languageName
         * @param {LanguageFn} languageDefinition
         */,/* Interface definition */Object.assign(e,{highlight:m,highlightAuto:x,highlightAll:y,highlightElement:w,// TODO: Remove with v12 API
highlightBlock:function(e){return Q("10.7.0","highlightBlock will be removed entirely in v12.0"),Q("10.7.0","Please use highlightElement now."),w(e)},configure:function(e){l=ae(l,e)}// TODO: remove v12, deprecated
,initHighlighting:()=>{y(),Q("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:// TODO: remove v12, deprecated
function(){y(),Q("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(n,i){let r=null;try{r=i(e)}catch(o){// hard or soft error
if(Y("Language definition for '{}' could not be registered.".replace("{}",n)),!s)throw o;// languages that have serious errors are replaced with essentially a
// "plaintext" stand-in so that the code blocks will still get normal
// css classes applied to them - and one bad language won't break the
// entire highlighter
Y(o),r=c}// give it a temporary name if it doesn't have one in the meta-data
r.name||(r.name=n),t[n]=r,r.rawDefinition=i.bind(null,e),r.aliases&&S(r.aliases,{languageName:n})}
/**
         * Remove a language grammar module
         *
         * @param {string} languageName
         */,unregisterLanguage:function(e){delete t[e];for(const n of Object.keys(r))r[n]===e&&delete r[n]}
/**
         * @returns {string[]} List of language internal names
         */,listLanguages:function(){return Object.keys(t)},getLanguage:O,registerAliases:S,autoDetection:v,inherit:ae,addPlugin:
/**
         * @param {HLJSPlugin} plugin
         */
function(e){!function(e){// TODO: remove with v12
e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{e["before:highlightBlock"](Object.assign({block:n.el},n))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{e["after:highlightBlock"](Object.assign({block:n.el},n))})}(e),o.push(e)}
/**
         * @param {HLJSPlugin} plugin
         */,removePlugin:function(e){const n=o.indexOf(e);-1!==n&&o.splice(n,1)}}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="11.9.0",e.regex={concat:p,lookahead:d,either:b,optional:f,anyNumberOfTimes:h};for(const i in C)// @ts-ignore
"object"==typeof C[i]&&// @ts-ignore
n(C[i]);// merge all the modes/regexes into our main object
return Object.assign(e,C),e},ue=le({});// returns a new instance of the highlighter to be used for extensions
// check https://github.com/wooorm/lowlight/issues/47
ue.newInstance=()=>le({});var ge=ue;ue.HighlightJS=ue,ue.default=ue,e("H",t(ge))}}}));
