System.register(["./@vue-legacy-c264fb29.js"],(function(e,t){"use strict";var n,r,o,a,c,s,i,l,u,f,p,h;return{setters:[e=>{n=e.s,r=e.m,o=e.u,a=e.at,c=e.d,s=e.b,i=e.z,l=e.r,u=e.w,f=e.h,p=e.n,h=e.W}],execute:function(){e({a:
/**
       * Returns the router instance. Equivalent to using `$router` inside
       * templates.
       */
function(){return r(xe)}
/**
       * Returns the current route location. Equivalent to using `$route` inside
       * templates.
       */,b:
/**
       * Creates an HTML5 history. Most common history for single page applications.
       *
       * @param base -
       */
function(e){const n=function(e){const{history:t,location:n}=window,r={value:M(e,n)},o={value:t.state};// private variables
function a(r,a,c){
/**
               * if a base tag is provided, and we are on a normal domain, we have to
               * respect the provided `base` attribute because pushState() will use it and
               * potentially erase anything before the `#` like at
               * https://github.com/vuejs/router/issues/685 where a base of
               * `/folder/#` but a base of `/` would erase the `/folder/` section. If
               * there is no host, the `<base>` tag makes no sense and if there isn't a
               * base tag we can just use everything after the `#`.
               */
const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:L()+e+r;try{// BROWSER QUIRK
// NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
t[c?"replaceState":"pushState"](a,"",i),o.value=a}catch(l){// Force the navigation, this also resets the call count
n[c?"replace":"assign"](i)}}function c(e,n){a(e,d({},t.state,B(o.value.back,// keep back and forward entries but override current position
e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e}function s(e,n){// Add to current entry the information of where we are going
// as well as saving the current position
const c=d({},// use current history state to gracefully handle a wrong call to
// history.replaceState
// https://github.com/vuejs/router/issues/366
o.value,t.state,{forward:e,scroll:S()});a(c.current,c,!0),a(e,d({},B(r.value,e,null),{position:c.position+1},n),!1),r.value=e}// build current history entry as this is a fresh navigation
return o.value||a(r.value,{back:null,current:r.value,forward:null,// the length is off by one, we need to decrease it
position:t.length-1,replaced:!0,// don't add a scroll as the user may have an anchor, and we want
// scrollBehavior to be triggered without a saved position
scroll:null},!0),{location:r,state:o,push:s,replace:c}}(e=// Generic utils
/**
       * Normalizes a base by removing any trailing slash and reading the base tag if
       * present.
       *
       * @param base - base to normalize
       */
function(e){if(!e)if(t){// respect <base> tag
const t=document.querySelector("base");// strip full URL origin
e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else e="/";// ensure leading slash when it was removed by the regex above avoid leading
// slash with hash because the file could be read from the disk like file://
// and the leading slash would cause problems
// remove the trailing slash so all other method can just do `base + fullPath`
// to build an href
return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),b(e)}// remove any character before the hash
(e)),r=function(e,t,n,r){let o=[],a=[],c=null;const s=({state:a})=>{const s=M(e,location),i=n.value,l=t.value;let u=0;if(a){// ignore the popstate and reset the pauseState
if(n.value=s,t.value=a,c&&c===i)return void(c=null);u=l?a.position-l.position:0}else r(s);// Here we could also revert the navigation by calling history.go(-delta)
// this listener will have to be adapted to not trigger again and to wait for the url
// to be updated before triggering the listeners. Some kind of validation function would also
// need to be passed to the listeners so the navigation can be accepted
// call all listeners
o.forEach((e=>{e(n.value,i,{delta:u,type:x.pop,direction:u?u>0?C.forward:C.back:C.unknown})}))};function i(){c=n.value}function l(e){// set up the listener and prepare teardown callbacks
o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1)};return a.push(t),t}function u(){const{history:e}=window;e.state&&e.replaceState(d({},e.state,{scroll:S()}),"")}function f(){for(const e of a)e();a=[],window.removeEventListener("popstate",s),window.removeEventListener("beforeunload",u)}// set up the listeners and prepare teardown callbacks
return window.addEventListener("popstate",s),// TODO: could we use 'pagehide' or 'visibilitychange' instead?
// https://developer.chrome.com/blog/page-lifecycle-api/
window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:i,listen:l,destroy:f}}
/**
       * Creates a state object
       */(e,n.state,n.location,n.replace),o=d({// it's overridden right after
location:"",base:e,go:function(e,t=!0){t||r.pauseListeners(),history.go(e)},createHref:$.bind(null,e)},n,r);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>n.state.value}),o},c:
/**
       * Creates a Router instance that can be used by a Vue app.
       *
       * @param options - {@link RouterOptions}
       */
function(e){const r=
/**
       * Creates a Router Matcher.
       *
       * @internal
       * @param routes - array of initial routes
       * @param globalOptions - global route options
       */
function(e,t){// normalized ordered array of matchers
const n=[],r=new Map;function o(e){return r.get(e)}function a(e,n,r){// used later on to remove by name
const o=!r,s=
/**
       * Normalizes a RouteRecordRaw. Creates a copy
       *
       * @param record
       * @returns the normalized version
       */
function(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Z(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}
/**
       * Normalize the optional `props` in a record to always be an object similar to
       * components. Also accept a boolean for components.
       * @param record
       */(e);// we might be the child of an alias
s.aliasOf=r&&r.record;const l=te(t,e),u=[s];// generate an array of records to correctly handle aliases
if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)u.push(d({},s,{// this allows us to hold a copy of the `components` option
// so that async components cache is hold on the original record
components:r?r.record.components:s.components,path:e,// we might be the child of an alias
aliasOf:r?r.record:s}))}let f,p;for(const t of u){const{path:u}=t;// Build up the path for nested routes if the child isn't an absolute
// route. Only add the / delimiter if the child path isn't empty and if the
// parent path doesn't have a trailing slash
if(n&&"/"!==u[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}// create the object beforehand, so it can be passed to children
if(f=Y(t,n,l),// if we are an alias we must tell the original record that we exist,
// so we can be removed
r?r.alias.push(f):(// otherwise, the first record is the original and others are aliases
p=p||f,p!==f&&p.alias.push(f),// remove the route if named and only for the top record (avoid in nested calls)
// this works because the original record is the first one
o&&e.name&&!J(f)&&c(e.name)),s.children){const e=s.children;for(let t=0;t<e.length;t++)a(e[t],f,r&&r.children[t])}// if there was no original record, then the first one was not an alias and all
// other aliases (if any) need to reference this record when adding children
r=r||f,// TODO: add normalized records for more flexibility
// if (parent && isAliasRecord(originalRecord)) {
//   parent.children.push(originalRecord)
// }
// Avoid adding a record that doesn't display anything. This allows passing through records without a component to
// not be reached and pass through the catch all route
(f.record.components&&Object.keys(f.record.components).length||f.record.name||f.record.redirect)&&i(f)}return p?()=>{// since other matchers are aliases, they should be removed by the original matcher
c(p)}:g}function c(e){if(G(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(c),t.alias.forEach(c))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(c),e.alias.forEach(c))}}function s(){return n}function i(e){let t=0;for(;t<n.length&&K(e,n[t])>=0&&(// Adding children with empty path should still appear before the parent
// https://github.com/vuejs/router/issues/1124
e.record.path!==n[t].record.path||!ne(e,n[t]));)t++;n.splice(t,0,e),// only add the original record to the name map
e.record.name&&!J(e)&&r.set(e.record.name,e)}function l(e,t){let o,a,c,s={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw D(1/* ErrorTypes.MATCHER_NOT_FOUND */,{location:e});c=o.record.name,s=d(// paramsFromLocation is a new object
N(t.params,// only keep params that exist in the resolved location
// TODO: only keep optional params coming from a parent record
o.keys.filter((e=>!e.optional)).map((e=>e.name))),// discard any existing params in the current location that do not exist here
// #1497 this ensures better active/exact matching
e.params&&N(e.params,o.keys.map((e=>e.name)))),// throws if cannot be stringified
a=o.stringify(s)}else if("path"in e)// no need to resolve the path with the matcher as it was provided
// this also allows the user to control the encoding
a=e.path,o=n.find((e=>e.re.test(a))),// matcher should have a value after the loop
o&&(// we know the matcher works because we tested the regexp
s=o.parse(a),c=o.record.name);else{if(// match by name or path of current route
o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw D(1/* ErrorTypes.MATCHER_NOT_FOUND */,{location:e,currentLocation:t});c=o.record.name,// since we are navigating to the same location, we don't need to pick the
// params like when `name` is provided
s=d({},t.params,e.params),a=o.stringify(s)}const i=[];let l=o;for(;l;)// reversed order so parents are at the beginning
i.unshift(l.record),l=l.parent;return{name:c,path:a,params:s,matched:i,meta:ee(i)}}// add initial routes
return t=te({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>a(e))),{addRoute:a,resolve:l,removeRoute:c,getRoutes:s,getRecordMatcher:o}}(e.routes,e),c=e.parseQuery||Ee,s=e.stringifyQuery||Oe,i=e.history,l=$e(),u=$e(),f=$e(),h=n(_);let y=_;// leave the scrollRestoration if no scrollBehavior is provided
t&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=m.bind(null,(e=>""+e)),E=m.bind(null,be),k=// @ts-expect-error: intentionally avoid the type check
m.bind(null,we);function P(e,t){if(// const objectLocation = routerLocationAsObject(rawLocation)
// we create a copy to modify it later
t=d({},t||h.value),"string"==typeof e){const n=w(c,e,t.path),o=r.resolve({path:n.path},t),a=i.createHref(n.fullPath);// locationNormalized is always a new object
return d(n,o,{params:k(o.params),hash:we(n.hash),redirectedFrom:void 0,href:a})}let n;// path could be relative in object as well
if("path"in e)n=d({},e,{path:w(c,e.path,t.path).path});else{// remove any nullish param
const r=d({},e.params);for(const e in r)null==r[e]&&delete r[e];// pass encoded values to the matcher, so it can produce encoded path and fullPath
n=d({},e,{params:E(r)}),// current location params are decoded, we need to encode them in case the
// matcher merges the params
t.params=E(t.params)}const o=r.resolve(n,t),a=e.hash||"";// the matcher might have merged current location params, so
// we need to run the decoding again
o.params=b(k(o.params));const l=
/**
       * Stringifies a URL object
       *
       * @param stringifyQuery
       * @param location
       */
function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}
/**
       * Strips off the base from the beginning of a location.pathname in a non-case-sensitive way.
       *
       * @param pathname - location.pathname
       * @param base - base to strip off
       */(s,d({},e,{hash:(u=a,ve(u).replace(he,"{").replace(me,"}").replace(fe,"^")),path:o.path}));
/**
       * Encode characters that need to be encoded on the hash section of the URL.
       *
       * @param text - string to encode
       * @returns encoded string
       */
var u;
/**
       * Encode characters that need to be encoded query values on the query
       * section of the URL.
       *
       * @param text - string to encode
       * @returns encoded string
       */const f=i.createHref(l);return d({fullPath:l,// keep the hash encoded so fullPath is effectively path + encodedQuery +
// hash
hash:a,query:// if the user is using a custom query lib like qs, we might have
// nested objects, so we keep the query as is, meaning it can contain
// numbers at `$route.query`, but at the point, the user will have to
// use their own type anyway.
// https://github.com/vuejs/router/issues/328#issuecomment-649481567
s===Oe?Re(e.query):e.query||{}},o,{redirectedFrom:void 0,href:f})}function C(e){return"string"==typeof e?w(c,e,h.value.path):d({},e)}function j(e,t){if(y!==e)return D(8/* ErrorTypes.NAVIGATION_CANCELLED */,{from:t,to:e})}function $(e){return M(e)}function L(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return"string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=C(r):// force empty params
{path:r},// @ts-expect-error: force empty params when a string is passed to let
// the router parse them again
r.params={}),d({query:e.query,hash:e.hash,// avoid transferring params if the redirect has a path
params:"path"in r?{}:e.params},r)}}function M(e,t){const n=y=P(e),r=h.value,o=e.state,a=e.force,c=!0===e.replace,i=L(n);if(i)return M(d(C(i),{state:"object"==typeof i?d({},o,i.state):o,force:a,replace:c}),// keep original redirectedFrom if it exists
t||n);// if it was a redirect we already called `pushWithRedirect` above
const l=n;let u;return l.redirectedFrom=t,!a&&
/**
       * Checks if two RouteLocation are equal. This means that both locations are
       * pointing towards the same {@link RouteRecord} and that all `params`, `query`
       * parameters and `hash` are the same
       *
       * @param stringifyQuery - A function that takes a query object of type LocationQueryRaw and returns a string representation of it.
       * @param a - first {@link RouteLocation}
       * @param b - second {@link RouteLocation}
       */
function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&O(t.matched[r],n.matched[o])&&R(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}
/**
       * Check if two `RouteRecords` are equal. Takes into account aliases: they are
       * considered equal to the `RouteRecord` they are aliasing.
       *
       * @param a - first {@link RouteRecord}
       * @param b - second {@link RouteRecord}
       */(s,r,n)&&(u=D(16/* ErrorTypes.NAVIGATION_DUPLICATED */,{to:l,from:r}),// trigger scroll to allow scrolling to the same anchor
ae(r,r,// this is a push, the only way for it to be triggered from a
// history.listen is with a redirect, which makes it become a push
!0,// This cannot be the first navigation because the initial location
// cannot be manually navigated to
!1)),(u?Promise.resolve(u):I(l,r)).catch((e=>U(e)?// navigation redirects still mark the router as ready
U(e,2/* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)?e:oe(e):// reject any unknown error
re(e,l,r))).then((e=>{if(e){if(U(e,2/* ErrorTypes.NAVIGATION_GUARD_REDIRECT */))return M(// keep options
d({// preserve an existing replacement but allow the redirect to override it
replace:c},C(e.to),{state:"object"==typeof e.to?d({},o,e.to.state):o,force:a}),// preserve the original redirectedFrom if any
t||l)}else// if we fail we don't finalize the navigation
e=T(l,r,!0,c,o);return F(l,r,e),e}))}
/**
           * Helper to reject and skip all navigation guards if a new navigation happened
           * @param to
           * @param from
           */function B(e,t){const n=j(e,t);return n?Promise.reject(n):Promise.resolve()}function W(e){const t=ie.values().next().value;// support Vue < 3.3
return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}// TODO: refactor the whole before guards by internally using router.beforeEach
function I(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let c=0;c<a;c++){const a=t.matched[c];a&&(e.matched.find((e=>O(e,a)))?r.push(a):n.push(a));const s=e.matched[c];s&&(// the type doesn't matter because we are comparing per reference
t.matched.find((e=>O(e,s)))||o.push(s))}return[n,r,o]}(e,t);// all components here have been resolved once because we are leaving
n=Ae(r.reverse(),"beforeRouteLeave",e,t);// leavingRecords is already reversed
for(const s of r)s.leaveGuards.forEach((r=>{n.push(Se(r,e,t))}));const c=B.bind(null,e,t);// run the queue of per route beforeRouteLeave guards
return n.push(c),ue(n).then((()=>{// check global guards beforeEach
n=[];for(const r of l.list())n.push(Se(r,e,t));return n.push(c),ue(n)})).then((()=>{// check in components beforeRouteUpdate
n=Ae(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(Se(r,e,t))}));// run the queue of per route beforeEnter guards
return n.push(c),ue(n)})).then((()=>{// check the route beforeEnter
n=[];for(const r of a)// do not trigger beforeEnter on reused views
if(r.beforeEnter)if(v(r.beforeEnter))for(const o of r.beforeEnter)n.push(Se(o,e,t));else n.push(Se(r.beforeEnter,e,t));// run the queue of per route beforeEnter guards
return n.push(c),ue(n)})).then((()=>(// NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
// clear existing enterCallbacks, these are added by extractComponentsGuards
e.matched.forEach((e=>e.enterCallbacks={})),// check in-component beforeRouteEnter
n=Ae(a,"beforeRouteEnter",e,t),n.push(c),ue(n)))).then((()=>{// check global guards beforeResolve
n=[];for(const r of u.list())n.push(Se(r,e,t));return n.push(c),ue(n)})).catch((e=>U(e,8/* ErrorTypes.NAVIGATION_CANCELLED */)?e:Promise.reject(e)))}function F(e,t,n){// navigation is confirmed, call afterGuards
// TODO: wrap with error handlers
f.list().forEach((r=>W((()=>r(e,t,n)))))}
/**
           * - Cleans up any navigation guards
           * - Changes the url if necessary
           * - Calls the scrollBehavior
           */function T(e,n,r,o,a){// a more recent navigation took place
const c=j(e,n);if(c)return c;// only consider as push if it's not the first navigation
const s=n===_,l=t?history.state:{};// change URL only if the user did a push/replace and if it's not the initial navigation because
// it's just reflecting the url
r&&(// on the initial navigation, we want to reuse the scroll position from
// history state if it exists
o||s?i.replace(e.fullPath,d({scroll:s&&l&&l.scroll},a)):i.push(e.fullPath,a)),// accept current navigation
h.value=e,ae(e,n,r,s),oe()}let z;// attach listener to history to trigger navigations
function V(){// avoid setting up listeners twice due to an invalid first navigation
z||(z=i.listen(((e,n,r)=>{if(!le.listening)return;// cannot be a redirect route because it was in history
const o=P(e),a=L(o);// due to dynamic routing, and to hash history with manual navigation
// (manually changing the url or calling history.hash = '#/somewhere'),
// there could be a redirect record in history
if(a)return void M(d(a,{replace:!0}),o).catch(g);y=o;const c=h.value;// TODO: should be moved to web history?
var s,l;t&&(s=A(c.fullPath,r.delta),l=S(),q.set(s,l)),I(o,c).catch((e=>U(e,12/* ErrorTypes.NAVIGATION_CANCELLED */)?e:U(e,2/* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)?(// Here we could call if (info.delta) routerHistory.go(-info.delta,
// false) but this is bug prone as we have no way to wait the
// navigation to be finished before calling pushWithRedirect. Using
// a setTimeout of 16ms seems to work but there is no guarantee for
// it to work on every browser. So instead we do not restore the
// history entry and trigger a new navigation as requested by the
// navigation guard.
// the error is already handled by router.push we just want to avoid
// logging the error
M(e.to,o).then((e=>{// manual change in hash history #916 ending up in the URL not
// changing, but it was changed by the manual url change, so we
// need to manually change it ourselves
U(e,20/* ErrorTypes.NAVIGATION_DUPLICATED */)&&!r.delta&&r.type===x.pop&&i.go(-1,!1)})).catch(g),Promise.reject()):(// do not restore history on unknown direction
r.delta&&i.go(-r.delta,!1),re(e,o,c)))).then((e=>{// revert the navigation
(e=e||T(// after navigation, all matched components are resolved
o,c,!1))&&(r.delta&&// a new navigation has been triggered, so we do not want to revert, that will change the current history
// entry while a different route is displayed
!U(e,8/* ErrorTypes.NAVIGATION_CANCELLED */)?i.go(-r.delta,!1):r.type===x.pop&&U(e,20/* ErrorTypes.NAVIGATION_DUPLICATED */)&&// manual change in hash history #916
// it's like a push but lacks the information of the direction
i.go(-1,!1)),F(o,c,e)})).catch(g)})))}// Initialization and Errors
let H,Q=$e(),X=$e();
/**
           * Trigger errorListeners added via onError and throws the error as well
           *
           * @param error - error to throw
           * @param to - location we were navigating to when the error happened
           * @param from - location we were navigating from when the error happened
           * @returns the error as a rejected promise
           */
function re(e,t,n){oe(e);const r=X.list();// reject the error no matter there were error listeners or not
return r.length&&r.forEach((r=>r(e,t,n))),Promise.reject(e)}function oe(e){return H||(// still not ready if an error happened
H=!e,V(),Q.list().forEach((([t,n])=>e?n(e):t())),Q.reset()),e}// Scroll behavior
function ae(n,r,o,a){const{scrollBehavior:c}=e;if(!t||!c)return Promise.resolve();const s=!o&&function(e){const t=q.get(e);// consume it so it's not used again
return q.delete(e),t}// TODO: RFC about how to save scroll position
/**
       * ScrollBehavior instance used by the router to compute and restore the scroll
       * position when navigating.
       */
// export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
//   // returns a scroll position that can be saved in history
//   compute(): ScrollPositionEntry
//   // can take an extended ScrollPositionEntry
//   scroll(position: ScrollPosition): void
// }
// export const scrollHandler: ScrollHandler<ScrollPosition> = {
//   compute: computeScroll,
//   scroll: scrollToPosition,
// }
(A(n.fullPath,0))||(a||!o)&&history.state&&history.state.scroll||null;return p().then((()=>c(n,r,s))).then((e=>e&&function(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}(e))).catch((e=>re(e,n,r)))}const ce=e=>i.go(e);let se;const ie=new Set,le={currentRoute:h,listening:!0,addRoute:function(e,t){let n,o;return G(e)?(n=r.getRecordMatcher(e),o=t):o=e,r.addRoute(o,n)},removeRoute:function(e){const t=r.getRecordMatcher(e);t&&r.removeRoute(t)},hasRoute:function(e){return!!r.getRecordMatcher(e)},getRoutes:function(){return r.getRoutes().map((e=>e.record))},resolve:P,options:e,push:$,replace:function(e){return $(d(C(e),{replace:!0}))},go:ce,back:()=>ce(-1),forward:()=>ce(1),beforeEach:l.add,beforeResolve:u.add,afterEach:f.add,onError:X.add,isReady:function(){return H&&h.value!==_?Promise.resolve():new Promise(((e,t)=>{Q.add([e,t])}))},install(e){e.component("RouterLink",Le),e.component("RouterView",_e),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>o(h)}),// this initial navigation is only necessary on client, on server it doesn't
// make sense because it will create an extra unnecessary navigation and could
// lead to problems
t&&// used for the initial navigation client side to avoid pushing
// multiple times when the router is used in multiple apps
!se&&h.value===_&&(// see above
se=!0,$(i.location).catch((e=>{})));const n={};for(const t in _)Object.defineProperty(n,t,{get:()=>h.value[t],enumerable:!0});e.provide(xe,this),e.provide(Ce,a(n)),e.provide(je,h);const r=e.unmount;ie.add(e),e.unmount=function(){ie.delete(e),// the router is not attached to an app anymore
ie.size<1&&(// invalidate the current navigation
y=_,z&&z(),z=null,h.value=_,se=!1,H=!1),r()}}};// TODO: type this as NavigationGuardReturn or similar instead of any
function ue(e){return e.reduce(((e,t)=>e.then((()=>W(t)))),Promise.resolve())}return le},u:function(){return r(Ce)}});
/*!
        * vue-router v4.2.5
        * (c) 2023 Eduardo San Martin Morote
        * @license MIT
        */
const t="undefined"!=typeof window,d=Object.assign;function m(e,t){const n={};for(const r in t){const o=t[r];n[r]=v(o)?o.map(e):e(o)}return n}const g=()=>{},v=Array.isArray,y=/\/$/,b=e=>e.replace(y,"")
/**
       * Transforms a URI into a normalized history location
       *
       * @param parseQuery
       * @param location - URI to normalize
       * @param currentLocation - current absolute location. Allows resolving relative
       * paths. Must start with `/`. Defaults to `/`
       * @returns a normalized history location
       */;
/**
       * Typesafe alternative to Array.isArray
       * https://github.com/microsoft/TypeScript/pull/48228
       */function w(e,t,n="/"){let r,o={},a="",c="";// Could use URL and URLSearchParams but IE 11 doesn't support it
// TODO: move to new URL()
const s=t.indexOf("#");let i=t.indexOf("?");// the hash appears before the search, so it's not part of the search string
// empty path means a relative query or hash `?foo=f`, `#thing`
return s<i&&s>=0&&(i=-1),i>-1&&(r=t.slice(0,i),a=t.slice(i+1,s>-1?s:t.length),o=e(a)),s>-1&&(r=r||t.slice(0,s),// keep the # character
c=t.slice(s,t.length)),// no search and no query
r=
/**
       * Resolves a relative path that starts with `.`.
       *
       * @param to - path location we are resolving
       * @param from - currentLocation.path, should start with `/`
       */
function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];// make . and ./ the same (../ === .., ../../ === ../..)
// this is the same behavior as new URL()
".."!==o&&"."!==o||r.push("");let a,c,s=n.length-1;for(a=0;a<r.length;a++)// we stay on the same position
if(c=r[a],"."!==c){// go up in the from array
if(".."!==c)break;// we can't go below zero, but we still need to increment toPosition
s>1&&s--;// continue
}return n.slice(0,s).join("/")+"/"+r.slice(a-(a===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+c,path:r,query:o,hash:c}}function E(e,t){// no base or base is not found at the beginning
return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function O(e,t){// since the original record has an undefined value for aliasOf
// but all aliases point to the original record, this will always compare
// the original record
return(e.aliasOf||e)===(t.aliasOf||t)}function R(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!k(e[n],t[n]))return!1;return!0}function k(e,t){return v(e)?P(e,t):v(t)?P(t,e):e===t}
/**
       * Check if two arrays are the same or if an array with one single entry is the
       * same as another primitive value. Used to check query and parameters
       *
       * @param a - array of values
       * @param b - array of values or a single value
       */function P(e,t){return v(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var x,C;!function(e){e.pop="pop",e.push="push"}(x||(x={})),function(e){e.back="back",e.forward="forward",e.unknown=""}(C||(C={}));const j=/^[^#]+#/;function $(e,t){return e.replace(j,"#")+t}const S=()=>({left:window.pageXOffset,top:window.pageYOffset});function A(e,t){return(history.state?history.state.position-t:-1)+e}const q=new Map;let L=()=>location.protocol+"//"+location.host
/**
       * Creates a normalized history location from a window.location object
       * @param base - The base path
       * @param location - The window.location object
       */;function M(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");// allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);// prepend the starting slash to hash so the url starts with /#
return"/"!==n[0]&&(n="/"+n),E(n,"")}return E(n,e)+r+o}function B(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?S():null}}function G(e){return"string"==typeof e||"symbol"==typeof e}
/**
       * Initial route location where the router is. Can be used in navigation guards
       * to differentiate the initial navigation.
       *
       * @example
       * ```js
       * import { START_LOCATION } from 'vue-router'
       *
       * router.beforeEach((to, from) => {
       *   if (from === START_LOCATION) {
       *     // initial navigation
       *   }
       * })
       * ```
       */const _={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},W=Symbol("");
/**
       * Enumeration with all possible types for navigation failures. Can be passed to
       * {@link isNavigationFailure} to check for specific failures.
       */
var I;function D(e,t){return d(new Error,{type:e,[W]:!0},t)}function U(e,t){return e instanceof Error&&W in e&&(null==t||!!(e.type&t))}// default pattern for a param: non-greedy everything but /
!function(e){
/**
           * An aborted navigation is a navigation that failed because a navigation
           * guard returned `false` or called `next(false)`
           */
e[e.aborted=4]="aborted",
/**
           * A cancelled navigation is a navigation that failed because a more recent
           * navigation finished started (not necessarily finished).
           */
e[e.cancelled=8]="cancelled",
/**
           * A duplicated navigation is a navigation that failed because it was
           * initiated while already being at the exact same location.
           */
e[e.duplicated=16]="duplicated"}(I||(I={}));const F="[^/]+?",T={sensitive:!1,strict:!1,start:!0,end:!0},z=/[.+*?^${}()[\]/\\]/g;
/**
       * Compares an array of numbers as used in PathParser.score and returns a
       * number. This function can be used to `sort` an array
       *
       * @param a - first array of numbers
       * @param b - second array of numbers
       * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
       * should be sorted first
       */
function V(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];// only keep going if diff === 0
if(r)return r;n++}// if the last subsegment was Static, the shorter segments should be sorted first
// otherwise sort the longest segment first
return e.length<t.length?1===e.length&&80/* PathScore.Segment */===e[0]?-1:1:e.length>t.length?1===t.length&&80/* PathScore.Segment */===t[0]?1:-1:0}
/**
       * Compare function that can be used with `sort` to sort an array of PathParser
       *
       * @param a - first PathParser
       * @param b - second PathParser
       * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
       */function K(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=V(r[n],o[n]);// do not return if both are equal
if(e)return e;n++}if(1===Math.abs(o.length-r.length)){if(H(r))return 1;if(H(o))return-1}// if a and b share the same score entries but b has more, sort b first
return o.length-r.length;// this is the ternary version
// return aScore.length < bScore.length
//   ? 1
//   : aScore.length > bScore.length
//   ? -1
//   : 0
}
/**
       * This allows detecting splats at the end of a path: /home/:id(.*)*
       *
       * @param score - score to check
       * @returns true if the last entry is negative
       */function H(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Q={type:0/* TokenType.Static */,value:""},X=/[a-zA-Z0-9_]/;function Y(e,t,n){const r=
/**
       * Creates a path parser from an array of Segments (a segment is an array of Tokens)
       *
       * @param segments - array of segments returned by tokenizePath
       * @param extraOptions - optional options for the regexp
       * @returns a PathParser
       */
function(e,t){const n=d({},T,t),r=[];// the amount of scores is the same as the length of segments except for the root segment "/"
// the regexp as a string
let o=n.start?"^":"";// extracted keys
const a=[];for(const i of e){// the root segment needs special treatment
const e=i.length?[]:[90/* PathScore.Root */];// allow trailing slash
n.strict&&!i.length&&(o+="/");for(let t=0;t<i.length;t++){const r=i[t];// resets the score if we are inside a sub-segment /:a-other-:b
let c=40/* PathScore.Segment */+(n.sensitive?.25/* PathScore.BonusCaseSensitive */:0);if(0/* TokenType.Static */===r.type)// prepend the slash if we are starting a new segment
t||(o+="/"),o+=r.value.replace(z,"\\$&"),c+=40/* PathScore.Static */;else if(1/* TokenType.Param */===r.type){const{value:e,repeatable:n,optional:l,regexp:u}=r;a.push({name:e,repeatable:n,optional:l});const f=u||F;// the user provided a custom regexp /:id(\\d+)
if(f!==F){c+=10/* PathScore.BonusCustomRegExp */;// make sure the regexp is valid before using it
try{new RegExp(`(${f})`)}catch(s){throw new Error(`Invalid custom RegExp for param "${e}" (${f}): `+s.message)}}// when we repeat we must take care of the repeating leading slash
let p=n?`((?:${f})(?:/(?:${f}))*)`:`(${f})`;// prepend the slash if we are starting a new segment
t||(p=// avoid an optional / if there are more segments e.g. /:p?-static
// or /:p?-:p2
l&&i.length<2?`(?:/${p})`:"/"+p),l&&(p+="?"),o+=p,c+=20/* PathScore.Dynamic */,l&&(c+=-8/* PathScore.BonusOptional */),n&&(c+=-20/* PathScore.BonusRepeatable */),".*"===f&&(c+=-50/* PathScore.BonusWildcard */)}e.push(c)}// an empty array like /home/ -> [[{home}], []]
// if (!segment.length) pattern += '/'
r.push(e)}// only apply the strict bonus to the last score
if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001/* PathScore.BonusStrict */}// TODO: dev only warn double trailing slash
n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const c=new RegExp(o,n.sensitive?"":"i");return{re:c,score:r,keys:a,parse:function(e){const t=e.match(c),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",o=a[r-1];n[o.name]=e&&o.repeatable?e.split("/"):e}return n},stringify:function(t){let n="",r=!1;// for optional parameters to allow to be empty
for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0/* TokenType.Static */===e.type)n+=e.value;else if(1/* TokenType.Param */===e.type){const{value:a,repeatable:c,optional:s}=e,i=a in t?t[a]:"";if(v(i)&&!c)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const l=v(i)?i.join("/"):i;if(!l){if(!s)throw new Error(`Missing required param "${a}"`);// if we have more than one optional param like /:a?-static we don't need to care about the optional param
o.length<2&&(// remove the last slash as we could be at the end
n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=l}}// avoid empty path when we have multiple optional params
return n||"/"}}}(// After some profiling, the cache seems to be unnecessary because tokenizePath
// (the slowest part of adding a route) is very fast
// const tokenCache = new Map<string, Token[][]>()
function(e){if(!e)return[[]];if("/"===e)return[[Q]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);// if (tokenCache.has(path)) return tokenCache.get(path)!
function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0/* TokenizerState.Static */,r=n;const o=[];// the segment will always be valid because we get into the initial state
// with the leading /
let a;function c(){a&&o.push(a),a=[]}// index on the path
let s,i=0,l="",u="";// char at index
function f(){l&&(0/* TokenizerState.Static */===n?a.push({type:0/* TokenType.Static */,value:l}):1/* TokenizerState.Param */===n||2/* TokenizerState.ParamRegExp */===n||3/* TokenizerState.ParamRegExpEnd */===n?(a.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1/* TokenType.Param */,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="")}function p(){l+=s}for(;i<e.length;)if(s=e[i++],"\\"!==s||2/* TokenizerState.ParamRegExp */===n)switch(n){case 0/* TokenizerState.Static */:"/"===s?(l&&f(),c()):":"===s?(f(),n=1/* TokenizerState.Param */):p();break;case 4/* TokenizerState.EscapeNext */:p(),n=r;break;case 1/* TokenizerState.Param */:"("===s?n=2/* TokenizerState.ParamRegExp */:X.test(s)?p():(f(),n=0/* TokenizerState.Static */,// go back one character if we were not modifying
"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2/* TokenizerState.ParamRegExp */:// TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
// it already works by escaping the closing )
// https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
// is this really something people need since you can also write
// /prefix_:p()_suffix
")"===s?// handle the escaped )
"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3/* TokenizerState.ParamRegExpEnd */:u+=s;break;case 3/* TokenizerState.ParamRegExpEnd */:// same as finalizing a param
f(),n=0/* TokenizerState.Static */,// go back one character if we were not modifying
"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state")}else r=n,n=4/* TokenizerState.EscapeNext */;// tokenCache.set(path, tokens)
return 2/* TokenizerState.ParamRegExp */===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),c(),o}(e.path),n),o=d(r,{record:e,parent:t,// these needs to be populated by the parent
children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function N(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Z(e){const t={},n=e.props||!1;// props does not exist on redirect records, but we can set false directly
if("component"in e)t.default=n;else// NOTE: we could also allow a function to be applied to every component.
// Would need user feedback for use cases
for(const r in e.components)t[r]="object"==typeof n?n[r]:n;return t}
/**
       * Checks if a record or any of its parent is an alias
       * @param record
       */function J(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}
/**
       * Merge meta fields of an array of records
       *
       * @param matched - array of matched records
       */function ee(e){return e.reduce(((e,t)=>d(e,t.meta)),{})}function te(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function ne(e,t){return t.children.some((t=>t===e||ne(e,t)))}
/**
       * Encoding Rules ␣ = Space Path: ␣ " < > # ? { } Query: ␣ " < > # & = Hash: ␣ "
       * < > `
       *
       * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
       * defines some extra characters to be encoded. Most browsers do not encode them
       * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
       * also encode `!'()*`. Leaving un-encoded only ASCII alphanumeric(`a-zA-Z0-9`)
       * plus `-._~`. This extra safety should be applied to query by patching the
       * string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
       * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
       * into a `/` if directly typed in. The _backtick_ (`````) should also be
       * encoded everywhere because some browsers like FF encode it when directly
       * written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
       */
// const EXTRA_RESERVED_RE = /[!'()*]/g
// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
const re=/#/g,oe=/&/g,ae=/\//g,ce=/=/g,se=/\?/g,ie=/\+/g,le=/%5B/g,ue=/%5D/g,fe=/%5E/g,pe=/%60/g,he=/%7B/g,de=/%7C/g,me=/%7D/g,ge=/%20/g;// %23
// }
/**
       * Encode characters that need to be encoded on the path, search and hash
       * sections of the URL.
       *
       * @internal
       * @param text - string to encode
       * @returns encoded string
       */
function ve(e){return encodeURI(""+e).replace(de,"|").replace(le,"[").replace(ue,"]")}function ye(e){return ve(e).replace(ie,"%2B").replace(ge,"+").replace(re,"%23").replace(oe,"%26").replace(pe,"`").replace(he,"{").replace(me,"}").replace(fe,"^")}
/**
       * Like `encodeQueryValue` but also encodes the `=` character.
       *
       * @param text - string to encode
       */
/**
       * Encode characters that need to be encoded on the path section of the URL as a
       * param. This function encodes everything {@link encodePath} does plus the
       * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
       * string instead.
       *
       * @param text - string to encode
       * @returns encoded string
       */
function be(e){return null==e?"":
/**
       * Encode characters that need to be encoded on the path section of the URL.
       *
       * @param text - string to encode
       * @returns encoded string
       */
function(e){return ve(e).replace(re,"%23").replace(se,"%3F")}(e).replace(ae,"%2F")}
/**
       * Decode text using `decodeURIComponent`. Returns the original text if it
       * fails.
       *
       * @param text - string to decode
       * @returns decoded string
       */function we(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}
/**
       * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
       * version with the leading `?` and without Should work as URLSearchParams

       * @internal
       *
       * @param search - search string to parse
       * @returns a query object
       */function Ee(e){const t={};// avoid creating an object with an empty key and empty value
// because of split('&')
if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){// pre decode the + into space
const e=n[r].replace(ie," "),o=e.indexOf("="),a=we(o<0?e:e.slice(0,o)),c=o<0?null:we(e.slice(o+1));// allow the = character
if(a in t){// an extra variable for ts types
let e=t[a];v(e)||(e=t[a]=[e]),e.push(c)}else t[a]=c}return t}
/**
       * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
       * doesn't prepend a `?`
       *
       * @internal
       *
       * @param query - query object to stringify
       * @returns string version of the query without the leading `?`
       */function Oe(e){let t="";for(let n in e){const r=e[n];(n=ye(n).replace(ce,"%3D"),null!=r)?(v(r)?r.map((e=>e&&ye(e))):[r&&ye(r)]).forEach((e=>{// skip undefined values in arrays as if they were not present
// smaller code than using filter
void 0!==e&&(// only append & with non-empty search
t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))})):// only null adds the value
void 0!==r&&(t+=(t.length?"&":"")+n);// keep null values
}return t}
/**
       * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
       * numbers into strings, removing keys with an undefined value and replacing
       * undefined with null in arrays
       *
       * @param query - query object to normalize
       * @returns a normalized query object
       */function Re(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=v(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}
/**
       * RouteRecord being rendered by the closest ancestor Router View. Used for
       * `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
       * Location Matched
       *
       * @internal
       */const ke=Symbol(""),Pe=Symbol(""),xe=Symbol(""),Ce=Symbol(""),je=Symbol("");
/**
       * Allows overriding the router view depth to control which component in
       * `matched` is rendered. rvd stands for Router View Depth
       *
       * @internal
       */
/**
       * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
       */
function $e(){let e=[];return{add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}},list:()=>e.slice(),reset:function(){e=[]}}}function Se(e,t,n,r,o){// keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
const a=r&&(// name is defined if record is because of the function overload
r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise(((c,s)=>{const i=e=>{var i;!1===e?s(D(4/* ErrorTypes.NAVIGATION_ABORTED */,{from:n,to:t})):e instanceof Error?s(e):"string"==typeof(i=e)||i&&"object"==typeof i?s(D(2/* ErrorTypes.NAVIGATION_GUARD_REDIRECT */,{from:t,to:e})):(a&&// since enterCallbackArray is truthy, both record and name also are
r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),c())},l=e.call(r&&r.instances[o],t,n,i);// wrapping with Promise.resolve allows it to work with both async and sync guards
let u=Promise.resolve(l);e.length<3&&(u=u.then(i)),u.catch((e=>s(e)))}))}function Ae(e,t,n,r){const o=[];for(const c of e)for(const e in c.components){let s=c.components[e];// skip update and leave guards if the route component is not mounted
if("beforeRouteEnter"===t||c.instances[e])if("object"==typeof(a=s)||"displayName"in a||"props"in a||"__vccOpts"in a){// __vccOpts is added by vue-class-component and contain the regular options
const a=(s.__vccOpts||s)[t];a&&o.push(Se(a,n,r,c,e))}else{// start requesting the chunk already
let a=s();o.push((()=>a.then((o=>{if(!o)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${c.path}"`));const a=(s=o).__esModule||"Module"===s[Symbol.toStringTag]?o.default:o;// replace the function with the resolved component
// cannot be null or undefined because we went into the for loop
var s;c.components[e]=a;// __vccOpts is added by vue-class-component and contain the regular options
const i=(a.__vccOpts||a)[t];return i&&Se(i,n,r,c,e)()}))))}}
/**
       * Allows differentiating lazy components from functional components and vue-class-component
       * @internal
       *
       * @param component
       */
var a;// TODO: we could allow currentRoute as a prop to expose `isActive` and
// `isExactActive` behavior should go through an RFC
return o}function qe(e){const t=r(xe),n=r(Ce),a=s((()=>t.resolve(o(e.to)))),c=s((()=>{const{matched:e}=a.value,{length:t}=e,r=e[t-1],o=n.matched;if(!r||!o.length)return-1;const c=o.findIndex(O.bind(null,r));if(c>-1)return c;// possible parent record
const s=Me(e[t-2]);// we are dealing with nested routes
return t>1&&// if the parent and matched route have the same path, this link is
// referring to the empty child. Or we currently are on a different
// child of the same parent
Me(r)===s&&// avoid comparing the child with its parent
o[o.length-1].path!==s?o.findIndex(O.bind(null,e[t-2])):c})),i=s((()=>c.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return!1}else if(!v(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return!1}return!0}
/**
       * Get the original path value of a record by following its aliasOf
       * @param record
       */(n.params,a.value.params))),l=s((()=>c.value>-1&&c.value===n.matched.length-1&&R(n.params,a.value.params)));
/**
           * NOTE: update {@link _RouterLinkI}'s `$slots` type when updating this
           */
return{route:a,href:s((()=>a.value.href)),isActive:i,isExactActive:l,navigate:function(n={}){return function(e){// don't redirect with control keys
if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey||e.defaultPrevented||void 0!==e.button&&0!==e.button))// don't redirect on right click
{// don't redirect if `target="_blank"`
// @ts-expect-error getAttribute does exist
if(e.currentTarget&&e.currentTarget.getAttribute){// @ts-expect-error getAttribute exists
const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}// this may be a Weex event which doesn't have this method
return e.preventDefault&&e.preventDefault(),!0}// don't redirect when preventDefault called
}(n)?t[o(e.replace)?"replace":"push"](o(e.to)).catch(g):Promise.resolve()}}}const Le=c({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,// inactiveClass: String,
exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:qe,setup(e,{slots:t}){const n=h(qe(e)),{options:o}=r(xe),a=s((()=>({[Be(e.activeClass,o.linkActiveClass,"router-link-active")]:n.isActive,// [getLinkClass(
//   props.inactiveClass,
//   options.linkInactiveClass,
//   'router-link-inactive'
// )]: !link.isExactActive,
[Be(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive})));return()=>{const r=t.default&&t.default(n);return e.custom?r:f("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,// this would override user added attrs but Vue will still add
// the listener, so we end up triggering both
onClick:n.navigate,class:a.value},r)}}});// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
       * Component to render a link that triggers a navigation on click.
       */function Me(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}
/**
       * Utility class to get the active class based on defaults.
       * @param propClass
       * @param globalClass
       * @param defaultClass
       */const Be=(e,t,n)=>null!=e?e:null!=t?t:n;function Ge(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
       * Component to display the current route the user is at.
       */const _e=e("R",c({name:"RouterView",// #674 we manually inherit them
inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},// Better compat for @vue/compat users
// https://github.com/vuejs/router/issues/1315
compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const a=r(je),c=s((()=>e.route||a.value)),p=r(Pe,0),h=s((()=>{let e=o(p);const{matched:t}=c.value;let n;for(;(n=t[e])&&!n.components;)e++;return e})),m=s((()=>c.value.matched[h.value]));i(Pe,s((()=>h.value+1))),i(ke,m),i(je,c);const g=l();// watch at the same time the component instance, the route record we are
// rendering, and the name
return u((()=>[g.value,m.value,e.name]),(([e,t,n],[r,o,a])=>{// copy reused instances
t&&(// this will update the instance for new instances as well as reused
// instances when navigating to a new route
t.instances[n]=e,// the component instance is reused for a different route or name, so
// we copy any saved update or leave guards. With async setup, the
// mounting component will mount before the matchedRoute changes,
// making instance === oldInstance, so we check if guards have been
// added before. This works because we remove guards when
// unmounting/deactivating components
o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),// trigger beforeRouteEnter next callbacks
!e||!t||// if there is no instance but to and from are the same this might be
// the first visit
o&&O(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const r=c.value,o=e.name,a=m.value,s=a&&a.components[o];// we need the value at the time we render because when we unmount, we
// navigated to a different location so the value is different
if(!s)return Ge(n.default,{Component:s,route:r});// props from route configuration
const i=a.props[o],l=i?!0===i?r.params:"function"==typeof i?i(r):i:null,u=f(s,d({},l,t,{onVnodeUnmounted:e=>{// remove the instance reference to prevent leak
e.component.isUnmounted&&(a.instances[o]=null)},ref:g}));// pass the vnode to the slot as a prop.
// h and <component :is="..."> both accept vnodes
return Ge(n.default,{Component:u,route:r})||u}}}))}}}));
