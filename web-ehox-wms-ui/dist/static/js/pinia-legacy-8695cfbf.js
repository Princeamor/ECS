System.register(["./vue-demi-legacy-97cfbb01.js","./@vue-legacy-c264fb29.js"],(function(t,e){"use strict";var n,s,o,c,a,r,i,u,f,l,p,h,y,d,v,b;return{setters:[t=>{n=t.i},t=>{s=t.ak,o=t.r,c=t.aj,a=t.au,r=t.m,i=t.w,u=t.W,f=t.j,l=t.av,p=t.a9,h=t.g,y=t.e,d=t.n,v=t.ab,b=t.b}],execute:function(){
/*!
             * pinia v2.1.7
             * (c) 2023 Eduardo San Martin Morote
             * @license MIT
             */
/**
             * setActivePinia must be called to handle SSR at the top of functions like
             * `fetch`, `setup`, `serverPrefetch` and others
             */
let e;
/**
             * Sets or unsets the active pinia. Used in SSR and internally when calling
             * actions and getters
             *
             * @param pinia - Pinia instance
             */
// @ts-expect-error: cannot constrain the type of the return
t({c:
/**
             * Creates a Pinia instance to be used by the application
             */
function(){const t=s(!0),e=t.run((()=>o({})));// NOTE: here we could check the window object for a state and directly set it
// if there is anything like it with Vue 3 SSR
let a=[],r=[];// plugins added before calling app.use(pinia)
const i=c({install(t){// this allows calling useStore() outside of a component setup after
// installing pinia's plugin
_(i),i._a=t,t.provide(j,i),t.config.globalProperties.$pinia=i,r.forEach((t=>a.push(t))),r=[]},use(t){return this._a||n?a.push(t):r.push(t),this},_p:a,// it's actually undefined here
// @ts-expect-error
_a:null,_e:t,_s:new Map,state:e});return i},d:function(// TODO: add proper types from above
t,n,s){let o,i;const u="function"==typeof n;function f(t,s){const f=a();// StoreGeneric cannot be casted towards Store
return(t=// in test mode, ignore the argument provided as we can always retrieve a
// pinia instance with getActivePinia()
t||(f?r(j,null):null))&&_(t),(t=e)._s.has(o)||(// creating the store registers it in `pinia._s`
u?I(o,n,i,t):function(t,e,n,s){const{state:o,actions:a,getters:r}=e,i=n.state.value[t];let u;function f(){i||(n.state.value[t]=o?o():{});// avoid creating a state in pinia.state.value
const e=v(n.state.value[t]);return x(e,a,Object.keys(r||{}).reduce(((e,s)=>(e[s]=c(b((()=>{_(n);// it was created just before
const e=n._s.get(t);// @ts-expect-error
// return getters![name].call(context, context)
// TODO: avoid reading the getter while assigning with a global variable
return r[s].call(e,e)}))),e)),{}))}u=I(t,f,e,n,0,!0)}(o,i,t)),t._s.get(o)}return"string"==typeof t?(o=t,// the option store setup will contain the actual options in this case
i=u?s:n):(i=t,o=t.id),f.$id=o,f}});const _=t=>e=t,j=/* istanbul ignore next */Symbol();function g(// eslint-disable-next-line @typescript-eslint/no-explicit-any
t){return t&&"object"==typeof t&&"[object Object]"===Object.prototype.toString.call(t)&&"function"!=typeof t.toJSON}// type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
// TODO: can we change these to numbers?
/**
             * Possible types for SubscriptionCallback
             */var O;!function(t){
/**
                 * Direct mutation of the state:
                 *
                 * - `store.name = 'new name'`
                 * - `store.$state.name = 'new name'`
                 * - `store.list.push('new item')`
                 */
t.direct="direct",
/**
                 * Mutated the state with `$patch` and an object
                 *
                 * - `store.$patch({ name: 'newName' })`
                 */
t.patchObject="patch object",
/**
                 * Mutated the state with `$patch` and a function
                 *
                 * - `store.$patch(state => state.name = 'newName')`
                 */
t.patchFunction="patch function"}(O||(O={}));const $=()=>{};function m(t,e,n,s=$){t.push(e);const o=()=>{const n=t.indexOf(e);n>-1&&(t.splice(n,1),s())};return!n&&h()&&y(o),o}function S(t,...e){t.slice().forEach((t=>{t(...e)}))}const P=t=>t();function w(t,e){// Handle Map instances
t instanceof Map&&e instanceof Map&&e.forEach(((e,n)=>t.set(n,e))),// Handle Set instances
t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);// no need to go through symbols because they cannot be serialized anyway
for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],o=t[n];g(o)&&g(s)&&t.hasOwnProperty(n)&&!f(s)&&!l(s)?// NOTE: here I wanted to warn about inconsistent types but it's not possible because in setup stores one might
// start the value of a property as a certain type e.g. a Map, and then for some reason, during SSR, change that
// to `undefined`. When trying to hydrate, we want to override the Map with `undefined`.
t[n]=w(o,s):// @ts-expect-error: subPatch is a valid value
t[n]=s}return t}const E=/* istanbul ignore next */Symbol(),{assign:x}=Object;
/**
             * Returns whether a value should be hydrated
             *
             * @param obj - target variable
             * @returns true if `obj` should be hydrated
             */function I(t,e,n={},c,a,r){let h;const y=x({actions:{}},n),v={deep:!0};// watcher options for $subscribe
// internal state
let b,j,I,M=[],W=[];// set to true at the end
const k=c.state.value[t];// avoid setting the state for option stores if it is set
// by the setup
// avoid triggering too many listeners
// https://github.com/vuejs/pinia/issues/1129
let A;function F(e){let n;b=j=!1,"function"==typeof e?(e(c.state.value[t]),n={type:O.patchFunction,storeId:t,events:I}):(w(c.state.value[t],e),n={type:O.patchObject,payload:e,storeId:t,events:I});const s=A=Symbol();d().then((()=>{A===s&&(b=!0)})),j=!0,// because we paused the watcher, we need to manually call the subscriptions
S(M,n,c.state.value[t])}r||k||(c.state.value[t]={}),o({});const C=r?function(){const{state:t}=n,e=t?t():{};// we use a patch to group all changes into one single subscription
this.$patch((t=>{x(t,e)}))}:/* istanbul ignore next */$;
/**
                 * Wraps an action to handle subscriptions.
                 *
                 * @param name - name of the action
                 * @param action - action to wrap
                 * @returns a wrapped action to handle subscriptions
                 */
function J(e,n){return function(){_(c);const s=Array.from(arguments),o=[],a=[];let r;// @ts-expect-error
S(W,{args:s,name:e,store:q,after:function(t){o.push(t)},onError:function(t){a.push(t)}});try{r=n.apply(this&&this.$id===t?this:q,s);// handle sync errors
}catch(i){throw S(a,i),i}return r instanceof Promise?r.then((t=>(S(o,t),t))).catch((t=>(S(a,t),Promise.reject(t)))):(// trigger after callbacks
S(o,r),r)}}const N={_p:c,// _s: scope,
$id:t,$onAction:m.bind(null,W),$patch:F,$reset:C,$subscribe(e,n={}){const s=m(M,e,n.detached,(()=>o())),o=h.run((()=>i((()=>c.state.value[t]),(s=>{("sync"===n.flush?j:b)&&e({storeId:t,type:O.direct,events:I},s)}),x({},v,n))));return s},$dispose:function(){h.stop(),M=[],W=[],c._s.delete(t)}},q=u(N);// store the partial store now so the setup of stores can instantiate each other before they are finished without
// creating infinite loops.
c._s.set(t,q);const z=(c._a&&c._a.runWithContext||P)((()=>c._e.run((()=>(h=s()).run(e)))));// TODO: idea create skipSerialize that marks properties as non serializable and they are skipped
// overwrite existing actions to support $onAction
for(const s in z){const e=z[s];if(f(e)&&(!f(D=e)||!D.effect)||l(e))// mark it as a piece of state to be serialized
r||(// in setup stores we must hydrate the state and sync pinia state tree with the refs the user just created
!k||g(B=e)&&B.hasOwnProperty(E)||(f(e)?e.value=k[s]:// probably a reactive object, lets recursively assign
// @ts-expect-error: prop is unknown
w(e,k[s])),c.state.value[t][s]=e);// action
else if("function"==typeof e){// @ts-expect-error: we are overriding the function we avoid wrapping if
const t=J(s,e);// this a hot module replacement store because the hotUpdate method needs
// to do it with the right context
/* istanbul ignore if */ // @ts-expect-error
z[s]=t,// list actions so they can be used in plugins
// @ts-expect-error
y.actions[s]=e}}// add the state, getters, and action properties
/* istanbul ignore if */var B,D;return x(q,z),// allows retrieving reactive objects with `storeToRefs()`. Must be called after assigning to the reactive object.
// Make `storeToRefs()` work with `reactive()` #799
x(p(q),z),// use this instead of a computed with setter to be able to create it anywhere
// without linking the computed lifespan to wherever the store is first
// created.
Object.defineProperty(q,"$state",{get:()=>c.state.value[t],set:t=>{F((e=>{x(e,t)}))}}),// apply all plugins
c._p.forEach((t=>{x(q,h.run((()=>t({store:q,app:c._a,pinia:c,options:y}))))})),// only apply hydrate to option stores with an initial state in pinia
k&&r&&n.hydrate&&n.hydrate(q.$state,k),b=!0,j=!0,q}}}}));
