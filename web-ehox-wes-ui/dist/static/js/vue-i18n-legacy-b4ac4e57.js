!function(){function e(e,t,n,a,l,o,r){try{var s=e[o](r),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(a,l)}System.register(["./@intlify-legacy-3d528a38.js","./@vue-legacy-c264fb29.js"],(function(t,n){"use strict";var a,l,o,r,s,c,u,i,_,f,m,p,g,v,b,d,E,L,O,I,R,T,y,N,k,h,P,F,D,S,C,U,M,w,A,V,W,j,x,Y,H,$,B,G,X,q,J,Q,z,K,Z,ee,te,ne,ae,le,oe,re,se,ce;return{setters:[e=>{a=e.a,l=e.i,o=e.c,r=e.b,s=e.d,c=e.e,u=e.f,i=e.r,_=e.g,f=e.h,m=e.j,p=e.s,g=e.C,v=e.k,b=e.m,d=e.D,E=e.l,L=e.n,O=e.o,I=e.p,R=e.u,T=e.q,y=e.N,N=e.t,k=e.v,h=e.w,P=e.x,F=e.y,D=e.z,S=e.A,C=e.B,U=e.E,M=e.F,w=e.G,A=e.H,V=e.I,W=e.J,j=e.M,x=e.K,Y=e.L,H=e.O,$=e.P,B=e.Q,G=e.R,X=e.S},e=>{q=e.d,J=e.h,Q=e.f,z=e.ak,K=e.m,Z=e.i,ee=e.E,te=e.b,ne=e.w,ae=e.I,le=e.j,oe=e.r,re=e.s,se=e.O,ce=e._}],execute:function(){t({c:// eslint-disable-next-line @typescript-eslint/no-explicit-any
function(t={}){// prettier-ignore
const n=!c(t.globalInjection)||t.globalInjection,a=new Map,[l,o]=function(e,t){const n=z(),a=n.run((()=>ke(e)));if(null==a)throw ie(ue.UNEXPECTED_ERROR);return[n,a]}(t),r=b("");const s={// mode
get mode(){return"composition"},// install plugin
install(t,...a){return(l=function*(){// set composer & vuei18n extend hook options from plugin options
if(// setup global provider
t.__VUE_I18N_SYMBOL__=r,t.provide(t.__VUE_I18N_SYMBOL__,s),L(a[0])){const e=a[0];s.__composerExtend=e.__composerExtend,s.__vueI18nExtend=e.__vueI18nExtend}// global method and properties injection for Composition API
let e=null;n&&(e=function(e,t){const n=Object.create(null);Ae.forEach((e=>{const a=Object.getOwnPropertyDescriptor(t,e);if(!a)throw ie(ue.UNEXPECTED_ERROR);const l=le(a.value)?{get:()=>a.value.value,// eslint-disable-next-line @typescript-eslint/no-explicit-any
set(e){a.value.value=e}}:{get:()=>a.get&&a.get()};Object.defineProperty(n,e,l)})),e.config.globalProperties.$i18n=n,Ve.forEach((n=>{const a=Object.getOwnPropertyDescriptor(t,n);if(!a||!a.value)throw ie(ue.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${n}`,a)}));const a=()=>{// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete e.config.globalProperties.$i18n,Ve.forEach((t=>{// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete e.config.globalProperties[`$${t}`]}))};return a}(t,s.global)),function(e,t,...n){const a=L(n[0])?n[0]:{};c(a.globalInstall)&&!a.globalInstall||([Fe.name,"I18nT"].forEach((t=>e.component(t,Fe))),[Se.name,"I18nN"].forEach((t=>e.component(t,Se))),[We.name,"I18nD"].forEach((t=>e.component(t,We)))),e.directive("t",
/**
       * @deprecated will be removed at vue-i18n v12
       */
function(e){const t=t=>{const{instance:n,value:a}=t;/* istanbul ignore if */if(!n||!n.$)throw ie(ue.UNEXPECTED_ERROR);const l=function(e,t){const n=e;if("composition"===e.mode)return n.__getInstance(t)||e.global;{const a=n.__getInstance(t);return null!=a?a.__composer:e.global.__composer}}(e,n.$),o=Ce(a);return[Reflect.apply(l.t,l,[...Ue(o)]),l]},n=(n,a)=>{const[l,o]=t(a);T&&e.global===o&&(// global scope only
n.__i18nWatcher=ne(o.locale,(()=>{a.instance&&a.instance.$forceUpdate()}))),n.__composer=o,n.textContent=l};return{created:n,unmounted:e=>{T&&e.__i18nWatcher&&(e.__i18nWatcher(),e.__i18nWatcher=void 0,delete e.__i18nWatcher),e.__composer&&(e.__composer=void 0,delete e.__composer)},beforeUpdate:(e,{value:t})=>{if(e.__composer){const n=e.__composer,a=Ce(t);e.textContent=Reflect.apply(n.t,n,[...Ue(a)])}},getSSRProps:e=>{const[n]=t(e);return{textContent:n}}}}(t));// install directive
}
/**
       * Injection key for {@link useI18n}
       *
       * @remarks
       * The global injection key for I18n instances with `useI18n`. this injection key is used in Web Components.
       * Specify the i18n instance created by {@link createI18n} together with `provide` function.
       *
       * @VueI18nGeneral
       */(t,s,...a);// install built-in components and directive
// release global scope
const l=t.unmount;t.unmount=()=>{e&&e(),s.dispose(),l()}},function(){var t=this,n=arguments;return new Promise((function(a,o){var r=l.apply(t,n);function s(t){e(r,a,o,s,c,"next",t)}function c(t){e(r,a,o,s,c,"throw",t)}s(void 0)}))})();var l},// global accessor
get global(){return o},dispose(){l.stop()},// @internal
__instances:a,// @internal
__getInstance:function(e){return a.get(e)||null},// @internal
__setInstance:function(e,t){a.set(e,t)},// @internal
__deleteInstance:function(e){a.delete(e)}};return s},u:we});
/*!
        * vue-i18n v11.0.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
/**
       * Vue I18n Version
       *
       * @remarks
       * Semver format. Same format as the package.json `version` field.
       *
       * @VueI18nGeneral
       */
const n="11.0.1";
/**
       * This is only called in esm-bundler builds.
       * istanbul-ignore-next
       */const ue={// composer module errors
UNEXPECTED_RETURN_TYPE:g,// 24
// legacy module errors
INVALID_ARGUMENT:25,// i18n module errors
MUST_BE_CALL_SETUP_TOP:26,NOT_INSTALLED:27,// directive module errors
REQUIRED_VALUE:28,INVALID_VALUE:29,// vue-devtools errors
CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:30,NOT_INSTALLED_WITH_PROVIDE:31,// unexpected error
UNEXPECTED_ERROR:32,// not compatible legacy vue-i18n constructor
NOT_COMPATIBLE_LEGACY_VUE_I18N:33,// Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
NOT_AVAILABLE_COMPOSITION_IN_LEGACY:34};function ie(e,...t){return v(e,null,void 0)}const _e=b("__translateVNode"),fe=b("__datetimeParts"),me=b("__numberParts"),pe=b("__setPluralRules"),ge=b("__injectWithOption"),ve=b("__dispose");/* eslint-disable @typescript-eslint/no-explicit-any */
/**
       * Transform flat json in obj to normal json in obj
       */
function be(e){// check obj
if(!s(e))return e;for(const t in e)// check key
if(D(e,t))// handle for normal json
if(t.includes(".")){// go to the last object
const n=t.split("."),a=n.length-1;let l=e,r=!1;for(let e=0;e<a;e++){if(n[e]in l||(l[n[e]]=o()),!s(l[n[e]])){r=!0;break}l=l[n[e]]}// update last object value, delete old property
r||(l[n[a]]=e[t],delete e[t]),// recursive process value if value is also a object
s(l[n[a]])&&be(l[n[a]])}else// recursive process value if value is also a object
s(e[t])&&be(e[t]);return e}function de(e,t){const{messages:n,__i18n:a,messageResolver:l,flatJson:s}=t,c=L(n)?n:E(a)?o():{[e]:o()};// prettier-ignore
// handle messages for flat json
if(// merge locale messages of i18n custom block
E(a)&&a.forEach((e=>{if("locale"in e&&"resource"in e){const{locale:t,resource:n}=e;t?(c[t]=c[t]||o(),F(n,c[t])):F(n,c)}else r(e)&&F(JSON.parse(e),c)})),null==l&&s)for(const o in c)D(c,o)&&be(c[o]);return c}function Ee(e){return e.type}function Le(e){return se(ce,null,e,0)}/* eslint-disable @typescript-eslint/no-explicit-any */ // extend VNode interface
const Oe="__INTLIFY_META__",Ie=()=>[],Re=()=>!1;let Te=0;function ye(e){return(t,n,a,l)=>e(n,a,Q()||void 0,l)}// for Intlify DevTools
/* #__NO_SIDE_EFFECTS__ */const Ne=()=>{const e=Q();let t=null;return e&&(t=Ee(e)[Oe])?{[Oe]:t}:null};
/**
       * Create composer interface factory
       *
       * @internal
       */function ke(e={}){const{__root:t,__injectWithOption:o}=e,u=void 0===t,i=e.flatJson,_=T?oe:re;let f=!c(e.inheritLocale)||e.inheritLocale;const m=_(// prettier-ignore
t&&f?t.locale.value:r(e.locale)?e.locale:d),p=_(// prettier-ignore
t&&f?t.fallbackLocale.value:r(e.fallbackLocale)||E(e.fallbackLocale)||L(e.fallbackLocale)||!1===e.fallbackLocale?e.fallbackLocale:m.value),g=_(de(m.value,e)),v=_(L(e.datetimeFormats)?e.datetimeFormats:{[m.value]:{}}),b=_(L(e.numberFormats)?e.numberFormats:{[m.value]:{}});// warning suppress options
// prettier-ignore
let y=t?t.missingWarn:!c(e.missingWarn)&&!O(e.missingWarn)||e.missingWarn,N=t?t.fallbackWarn:!c(e.fallbackWarn)&&!O(e.fallbackWarn)||e.fallbackWarn,k=t?t.fallbackRoot:!c(e.fallbackRoot)||e.fallbackRoot,h=!!e.fallbackFormat,q=I(e.missing)?e.missing:null,J=I(e.missing)?ye(e.missing):null,Q=I(e.postTranslation)?e.postTranslation:null,z=t?t.warnHtmlMessage:!c(e.warnHtmlMessage)||e.warnHtmlMessage,K=!!e.escapeParameter;// prettier-ignore
// custom linked modifiers
// prettier-ignore
const Z=t?t.modifiers:L(e.modifiers)?e.modifiers:{};// pluralRules
let ee,ae=e.pluralRules||t&&t.pluralRules;// runtime context
// eslint-disable-next-line prefer-const
ee=(()=>{u&&X(null);const t={version:n,locale:m.value,fallbackLocale:p.value,messages:g.value,modifiers:Z,pluralRules:ae,missing:null===J?void 0:J,missingWarn:y,fallbackWarn:N,fallbackFormat:h,unresolving:!0,postTranslation:null===Q?void 0:Q,warnHtmlMessage:z,escapeParameter:K,messageResolver:e.messageResolver,messageCompiler:e.messageCompiler,__meta:{framework:"vue"}};t.datetimeFormats=v.value,t.numberFormats=b.value,t.__datetimeFormatters=L(ee)?ee.__datetimeFormatters:void 0,t.__numberFormatters=L(ee)?ee.__numberFormatters:void 0;const a=S(t);return u&&X(a),a})(),R(ee,m.value,p.value);// locale
const le=te({get:()=>m.value,set:e=>{m.value=e,ee.locale=m.value}}),se=te({get:()=>p.value,set:e=>{p.value=e,ee.fallbackLocale=p.value,R(ee,m.value,e)}}),ce=te((()=>g.value)),ve=te((()=>v.value)),Ee=te((()=>b.value));// fallbackLocale
const Oe=(e,n,a,o,r,s)=>{// track reactive dependency
// NOTE: experimental !!
let c;m.value,p.value,g.value,v.value,b.value;try{__INTLIFY_PROD_DEVTOOLS__&&M(Ne()),u||(ee.fallbackContext=t?w():void 0),c=e(ee)}finally{__INTLIFY_PROD_DEVTOOLS__,u||(ee.fallbackContext=void 0)}if("translate exists"!==a&&// for not `te` (e.g `t`)
l(c)&&c===A||"translate exists"===a&&!c){const[e,a]=n();return t&&k?o(t):r(e)}if(s(c))return c;/* istanbul ignore next */throw ie(ue.UNEXPECTED_RETURN_TYPE)};// t
function ke(...e){return Oe((t=>Reflect.apply(W,null,[t,...e])),(()=>V(...e)),"translate",(t=>Reflect.apply(t.t,t,[...e])),(e=>e),(e=>r(e)))}// rt
const he={normalize:// for custom processor
function(e){return e.map((e=>r(e)||l(e)||c(e)?Le(String(e)):e))},interpolate:e=>e,type:"vnode"};// getLocaleMessage
function Pe(e){return g.value[e]||{}}// setLocaleMessage
// for debug
Te++,// watch root locale & fallbackLocale
t&&T&&(ne(t.locale,(e=>{f&&(m.value=e,ee.locale=e,R(ee,m.value,p.value))})),ne(t.fallbackLocale,(e=>{f&&(p.value=e,ee.fallbackLocale=e,R(ee,m.value,p.value))})));// define basic composition API!
const Fe={id:Te,locale:le,fallbackLocale:se,get inheritLocale(){return f},set inheritLocale(e){f=e,e&&t&&(m.value=t.locale.value,p.value=t.fallbackLocale.value,R(ee,m.value,p.value))},get availableLocales(){return Object.keys(g.value).sort()},messages:ce,get modifiers(){return Z},get pluralRules(){return ae||{}},get isGlobal(){return u},get missingWarn(){return y},set missingWarn(e){y=e,ee.missingWarn=y},get fallbackWarn(){return N},set fallbackWarn(e){N=e,ee.fallbackWarn=N},get fallbackRoot(){return k},set fallbackRoot(e){k=e},get fallbackFormat(){return h},set fallbackFormat(e){h=e,ee.fallbackFormat=h},get warnHtmlMessage(){return z},set warnHtmlMessage(e){z=e,ee.warnHtmlMessage=e},get escapeParameter(){return K},set escapeParameter(e){K=e,ee.escapeParameter=e},t:ke,getLocaleMessage:Pe,setLocaleMessage:function(e,t){if(i){const n={[e]:t};for(const e in n)D(n,e)&&be(n[e]);t=n[e]}g.value[e]=t,ee.messages=g.value}// mergeLocaleMessage
,mergeLocaleMessage:function(e,t){g.value[e]=g.value[e]||{};const n={[e]:t};if(i)for(const a in n)D(n,a)&&be(n[a]);F(t=n[e],g.value[e]),ee.messages=g.value}// getDateTimeFormat
,getPostTranslationHandler:// getPostTranslationHandler
function(){return I(Q)?Q:null}// setPostTranslationHandler
,setPostTranslationHandler:function(e){Q=e,ee.postTranslation=e}// getMissingHandler
,getMissingHandler:function(){return q}// setMissingHandler
,setMissingHandler:function(e){null!==e&&(J=ye(e)),q=e,ee.missing=J},[pe]:function(e){ae=e,ee.pluralRules=ae}// te
};return Fe.datetimeFormats=ve,Fe.numberFormats=Ee,Fe.rt=function(...e){const[t,n,l]=e;if(l&&!s(l))throw ie(ue.INVALID_ARGUMENT);return ke(t,n,a({resolvedMessage:!0},l||{}))}// d
,Fe.te=function(e,t){return Oe((()=>{if(!e)return!1;const n=Pe(r(t)?t:m.value),a=ee.messageResolver(n,e);return B(a)||G(a)||r(a)}),(()=>[e]),"translate exists",(n=>Reflect.apply(n.te,n,[e,t])),Re,(e=>c(e)))},Fe.tm=// tm
function(e){const n=function(e){let t=null;const n=P(ee,p.value,m.value);for(let a=0;a<n.length;a++){const l=g.value[n[a]]||{},o=ee.messageResolver(l,e);if(null!=o){t=o;break}}return t}(e);// prettier-ignore
return null!=n?n:t&&t.tm(e)||{}},Fe.d=function(...e){return Oe((t=>Reflect.apply(Y,null,[t,...e])),(()=>x(...e)),"datetime format",(t=>Reflect.apply(t.d,t,[...e])),(()=>j),(e=>r(e)))}// n
,Fe.n=function(...e){return Oe((t=>Reflect.apply($,null,[t,...e])),(()=>H(...e)),"number format",(t=>Reflect.apply(t.n,t,[...e])),(()=>j),(e=>r(e)))},Fe.getDateTimeFormat=function(e){return v.value[e]||{}}// setDateTimeFormat
,Fe.setDateTimeFormat=function(e,t){v.value[e]=t,ee.datetimeFormats=v.value,C(ee,e,t)}// mergeDateTimeFormat
,Fe.mergeDateTimeFormat=function(e,t){v.value[e]=a(v.value[e]||{},t),ee.datetimeFormats=v.value,C(ee,e,t)}// getNumberFormat
,Fe.getNumberFormat=function(e){return b.value[e]||{}}// setNumberFormat
,Fe.setNumberFormat=function(e,t){b.value[e]=t,ee.numberFormats=b.value,U(ee,e,t)}// mergeNumberFormat
,Fe.mergeNumberFormat=function(e,t){b.value[e]=a(b.value[e]||{},t),ee.numberFormats=b.value,U(ee,e,t)},Fe[ge]=o,Fe[_e]=// translateVNode, using for `i18n-t` component
function(...e){return Oe((t=>{let n;const a=t;try{a.processor=he,n=Reflect.apply(W,null,[a,...e])}finally{a.processor=null}return n}),(()=>V(...e)),"translate",(t=>t[_e](...e)),(e=>[Le(e)]),(e=>E(e)))}// numberParts, using for `i18n-n` component
,Fe[fe]=// datetimeParts, using for `i18n-d` component
function(...e){return Oe((t=>Reflect.apply(Y,null,[t,...e])),(()=>x(...e)),"datetime format",(t=>t[fe](...e)),Ie,(e=>r(e)||E(e)))},Fe[me]=function(...e){return Oe((t=>Reflect.apply($,null,[t,...e])),(()=>H(...e)),"number format",(t=>t[me](...e)),Ie,(e=>r(e)||E(e)))},Fe}const he={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,// NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
validator:e/* ComponentI18nScope */=>"parent"===e||"global"===e,default:"parent"/* ComponentI18nScope */},i18n:{type:Object}};// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Pe(){return ae}const Fe=q({/* eslint-disable */name:"i18n-t",props:a({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>l(e)||!isNaN(e)}},he),/* eslint-enable */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
setup(e,t){const{slots:n,attrs:l}=t,c=e.i18n||we({useScope:e.scope,__useComponent:!0});// NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
return()=>{const u=Object.keys(n).filter((e=>"_"!==e)),i=o();e.locale&&(i.locale=e.locale),void 0!==e.plural&&(i.plural=r(e.plural)?+e.plural:e.plural);const _=function(// eslint-disable-next-line @typescript-eslint/no-explicit-any
{slots:e},// SetupContext,
t){if(1===t.length&&"default"===t[0])// eslint-disable-next-line @typescript-eslint/no-explicit-any
return(e.default?e.default():[]).reduce(((e,t)=>[...e,// prettier-ignore
...t.type===ae?t.children:[t]]),[]);// named slots
return t.reduce(((t,n)=>{const a=e[n];return a&&(t[n]=a()),t}),o())}(t,u),f=c[_e](e.keypath,_,i),m=a(o(),l),p=r(e.tag)||s(e.tag)?e.tag:Pe();// eslint-disable-next-line @typescript-eslint/no-explicit-any
return J(p,m,f)}}});
/**
       * export the public type for h/tsx inference
       * also to avoid inline import() in generated d.ts files
       */
/**
       * Translation Component
       *
       * @remarks
       * See the following items for property about details
       *
       * @VueI18nSee [TranslationProps](component#translationprops)
       * @VueI18nSee [BaseFormatProps](component#baseformatprops)
       * @VueI18nSee [Component Interpolation](../guide/advanced/component)
       *
       * @example
       * ```html
       * <div id="app">
       *   <!-- ... -->
       *   <i18n keypath="term" tag="label" for="tos">
       *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
       *   </i18n>
       *   <!-- ... -->
       * </div>
       * ```
       * ```js
       * import { createApp } from 'vue'
       * import { createI18n } from 'vue-i18n'
       *
       * const messages = {
       *   en: {
       *     tos: 'Term of Service',
       *     term: 'I accept xxx {0}.'
       *   },
       *   ja: {
       *     tos: '利用規約',
       *     term: '私は xxx の{0}に同意します。'
       *   }
       * }
       *
       * const i18n = createI18n({
       *   locale: 'en',
       *   messages
       * })
       *
       * const app = createApp({
       *   data: {
       *     url: '/term'
       *   }
       * }).use(i18n).mount('#app')
       * ```
       *
       * @VueI18nComponent
       */function De(e,t,n,l){const{slots:c,attrs:u}=t;return()=>{const t={part:!0};let i=o();e.locale&&(t.locale=e.locale),r(e.format)?t.key=e.format:s(e.format)&&(// eslint-disable-next-line @typescript-eslint/no-explicit-any
r(e.format.key)&&(// eslint-disable-next-line @typescript-eslint/no-explicit-any
t.key=e.format.key),// Filter out number format options only
i=Object.keys(e.format).reduce(((t,l)=>n.includes(l)?a(o(),t,{[l]:e.format[l]}):t),o()));const _=l(e.value,t,i);let f=[t.key];E(_)?f=_.map(((e,t)=>{const n=c[e.type],a=n?n({[e.type]:e.value,index:t,parts:_}):[e.value];var l;return E(l=a)&&!r(l[0])&&(a[0].key=`${e.type}-${t}`),a})):r(_)&&(f=[_]);const m=a(o(),u),p=r(e.tag)||s(e.tag)?e.tag:Pe();return J(p,m,f)}}const Se=q({/* eslint-disable */name:"i18n-n",props:a({value:{type:Number,required:!0},format:{type:[String,Object]}},he),/* eslint-enable */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
setup(e,t){const n=e.i18n||we({useScope:e.scope,__useComponent:!0});return De(e,t,y,((...e)=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
n[me](...e)))}});
/**
       * export the public type for h/tsx inference
       * also to avoid inline import() in generated d.ts files
       */
/**
       * Number Format Component
       *
       * @remarks
       * See the following items for property about details
       *
       * @VueI18nSee [FormattableProps](component#formattableprops)
       * @VueI18nSee [BaseFormatProps](component#baseformatprops)
       * @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
       *
       * @VueI18nDanger
       * Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
       *
       * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
       *
       * @VueI18nComponent
       */function Ce(e){if(r(e))return{path:e};if(L(e)){if(!("path"in e))throw ie(ue.REQUIRED_VALUE);return e}throw ie(ue.INVALID_VALUE)}function Ue(e){const{path:t,locale:n,args:a,choice:o,plural:s}=e,c={},u=a||{};return r(n)&&(c.locale=n),l(o)&&(c.plural=o),l(s)&&(c.plural=s),[t,u,c]}const Me=b("global-vue-i18n");function we(e={}){const t=Q();if(null==t)throw ie(ue.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&null!=t.appContext.app&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw ie(ue.NOT_INSTALLED);const n=function(e){const t=K(e.isCE?Me:e.appContext.app.__VUE_I18N_SYMBOL__);/* istanbul ignore if */if(!t)throw ie(e.isCE?ue.NOT_INSTALLED_WITH_PROVIDE:ue.UNEXPECTED_ERROR);return t}// eslint-disable-next-line @typescript-eslint/no-explicit-any
(t),l=function(e){// prettier-ignore
return"composition"===e.mode?e.global:e.global.__composer}(n),r=Ee(t),c=function(e,t){// prettier-ignore
return u(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}(e,r);if("global"===c)return function(e,t,n){// prettier-ignore
let a=s(t.messages)?t.messages:o();"__i18nGlobal"in n&&(a=de(e.locale.value,{messages:a,__i18n:n.__i18nGlobal}));// merge locale messages
const l=Object.keys(a);// merge datetime formats
if(l.length&&l.forEach((t=>{e.mergeLocaleMessage(t,a[t])})),s(t.datetimeFormats)){const n=Object.keys(t.datetimeFormats);n.length&&n.forEach((n=>{e.mergeDateTimeFormat(n,t.datetimeFormats[n])}))}// merge number formats
if(s(t.numberFormats)){const n=Object.keys(t.numberFormats);n.length&&n.forEach((n=>{e.mergeNumberFormat(n,t.numberFormats[n])}))}}(l,e,r),l;if("parent"===c){// eslint-disable-next-line @typescript-eslint/no-explicit-any
let a=function(e,t,n=!1){let a=null;const l=t.root;let o=function(e,t=!1){if(null==e)return null;// if `useComponent: true` will be specified, we get lexical scope owner instance for use-case slots
return t&&e.vnode.ctx||e.parent;// eslint-disable-line @typescript-eslint/no-explicit-any
}(t,n);for(;null!=o;){const t=e;if("composition"===e.mode&&(a=t.__getInstance(o)),null!=a)break;if(l===o)break;o=o.parent}return a}(n,t,e.__useComponent);return null==a&&(a=l),a}const i=n;let _=i.__getInstance(t);if(null==_){const n=a({},e);"__i18n"in r&&(n.__i18n=r.__i18n),l&&(n.__root=l),_=ke(n),i.__composerExtend&&(_[ve]=i.__composerExtend(_)),function(e,t,n){Z((()=>{}),t),ee((()=>{// eslint-disable-next-line @typescript-eslint/no-explicit-any
const a=n;e.__deleteInstance(t);// dispose extended resources
const l=a[ve];l&&(l(),delete a[ve])}),t)}(i,t,_),i.__setInstance(t,_)}return _}const Ae=["locale","fallbackLocale","availableLocales"],Ve=["t","rt","d","n","tm","te"];const We=q({/* eslint-disable */name:"i18n-d",props:a({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},he),/* eslint-enable */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
setup(e,t){const n=e.i18n||we({useScope:e.scope,__useComponent:!0});return De(e,t,N,((...e)=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
n[fe](...e)))}});
/**
       * Datetime Format Component
       *
       * @remarks
       * See the following items for property about details
       *
       * @VueI18nSee [FormattableProps](component#formattableprops)
       * @VueI18nSee [BaseFormatProps](component#baseformatprops)
       * @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
       *
       * @VueI18nDanger
       * Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
       *
       * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
       *
       * @VueI18nComponent
       */ // NOTE: experimental !!
if("boolean"!=typeof __INTLIFY_PROD_DEVTOOLS__&&(m().__INTLIFY_PROD_DEVTOOLS__=!1),// register message compiler for jit compilation
i(k),// register message resolver at vue-i18n
_(h),// register fallback locale at vue-i18n
f(P),__INTLIFY_PROD_DEVTOOLS__){const e=m();e.__INTLIFY__=!0,p(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}}}}))}();
