System.register(["./@antv-legacy-5cb6425b.js"],(function(t,n){"use strict";var e;return{setters:[t=>{t.c,e=t.g}],execute:function(){var n={exports:{}};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
       * @license MIT */!function(t,n){t.exports=function(){var t,n,e={version:"0.2.0"},r=e.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};
/**
      	   * Helpers
      	   */
function i(t,n,e){return t<n?n:t>e?e:t}
/**
      	   * (Internal) converts a percentage (`0..1`) to a bar translateX
      	   * percentage (`-100%..0%`).
      	   */function s(t){return 100*(-1+t)}
/**
      	   * (Internal) returns the correct CSS for changing the bar's
      	   * position given an n percentage, and speed and ease from Settings
      	   */function o(t,n,e){var i;return(i="translate3d"===r.positionUsing?{transform:"translate3d("+s(t)+"%,0,0)"}:"translate"===r.positionUsing?{transform:"translate("+s(t)+"%,0)"}:{"margin-left":s(t)+"%"}).transition="all "+n+"ms "+e,i}
/**
      	   * (Internal) Queues a function to be executed.
      	   */
/**
      	   * Updates configuration.
      	   *
      	   *     NProgress.configure({
      	   *       minimum: 0.1
      	   *     });
      	   */
e.configure=function(t){var n,e;for(n in t)void 0!==(e=t[n])&&t.hasOwnProperty(n)&&(r[n]=e);return this},
/**
      	   * Last number.
      	   */
e.status=null,
/**
      	   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
      	   *
      	   *     NProgress.set(0.4);
      	   *     NProgress.set(1.0);
      	   */
e.set=function(t){var n=e.isStarted();t=i(t,r.minimum,1),e.status=1===t?null:t;var s=e.render(!n),c=s.querySelector(r.barSelector),l=r.speed,f=r.easing;return s.offsetWidth,/* Repaint */a((function(n){// Set positionUsing if it hasn't already been set
""===r.positionUsing&&(r.positionUsing=e.getPositioningCSS()),// Add transition
u(c,o(t,l,f)),1===t?(// Fade out
u(s,{transition:"none",opacity:1}),s.offsetWidth,/* Repaint */setTimeout((function(){u(s,{transition:"all "+l+"ms linear",opacity:0}),setTimeout((function(){e.remove(),n()}),l)}),l)):setTimeout(n,l)})),this},e.isStarted=function(){return"number"==typeof e.status},
/**
      	   * Shows the progress bar.
      	   * This is the same as setting the status to 0%, except that it doesn't go backwards.
      	   *
      	   *     NProgress.start();
      	   *
      	   */
e.start=function(){e.status||e.set(0);var t=function(){setTimeout((function(){e.status&&(e.trickle(),t())}),r.trickleSpeed)};return r.trickle&&t(),this},
/**
      	   * Hides the progress bar.
      	   * This is the *sort of* the same as setting the status to 100%, with the
      	   * difference being `done()` makes some placebo effect of some realistic motion.
      	   *
      	   *     NProgress.done();
      	   *
      	   * If `true` is passed, it will show the progress bar even if its hidden.
      	   *
      	   *     NProgress.done(true);
      	   */
e.done=function(t){return t||e.status?e.inc(.3+.5*Math.random()).set(1):this},
/**
      	   * Increments by a random amount.
      	   */
e.inc=function(t){var n=e.status;return n?("number"!=typeof t&&(t=(1-n)*i(Math.random()*n,.1,.95)),n=i(n+t,0,.994),e.set(n)):e.start()},e.trickle=function(){return e.inc(Math.random()*r.trickleRate)},
/**
      	   * Waits for all supplied jQuery promises and
      	   * increases the progress as the promises resolve.
      	   *
      	   * @param $promise jQUery Promise
      	   */
t=0,n=0,e.promise=function(r){return r&&"resolved"!==r.state()?(0===n&&e.start(),t++,n++,r.always((function(){0==--n?(t=0,e.done()):e.set((t-n)/t)})),this):this},
/**
      	   * (Internal) renders the progress bar markup based on the `template`
      	   * setting.
      	   */
e.render=function(t){if(e.isRendered())return document.getElementById("nprogress");l(document.documentElement,"nprogress-busy");var n=document.createElement("div");n.id="nprogress",n.innerHTML=r.template;var i,o=n.querySelector(r.barSelector),a=t?"-100":s(e.status||0),c=document.querySelector(r.parent);return u(o,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),r.showSpinner||(i=n.querySelector(r.spinnerSelector))&&m(i),c!=document.body&&l(c,"nprogress-custom-parent"),c.appendChild(n),n},
/**
      	   * Removes the element. Opposite of render().
      	   */
e.remove=function(){f(document.documentElement,"nprogress-busy"),f(document.querySelector(r.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&m(t)},
/**
      	   * Checks if the progress bar is rendered.
      	   */
e.isRendered=function(){return!!document.getElementById("nprogress")},
/**
      	   * Determine which positioning CSS rule to use.
      	   */
e.getPositioningCSS=function(){// Sniff on document.body.style
var t=document.body.style,n="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";// Sniff prefixes
return n+"Perspective"in t?"translate3d":n+"Transform"in t?"translate":"margin"};var a=function(){var t=[];function n(){var e=t.shift();e&&e(n)}return function(e){t.push(e),1==t.length&&n()}}(),u=function(){var t=["Webkit","O","Moz","ms"],n={};function e(t){return t.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(t,n){return n.toUpperCase()}))}function r(n){var e=document.body.style;if(n in e)return n;for(var r,i=t.length,s=n.charAt(0).toUpperCase()+n.slice(1);i--;)if((r=t[i]+s)in e)return r;return n}function i(t){return t=e(t),n[t]||(n[t]=r(t))}function s(t,n,e){n=i(n),t.style[n]=e}return function(t,n){var e,r,i=arguments;if(2==i.length)for(e in n)void 0!==(r=n[e])&&n.hasOwnProperty(e)&&s(t,e,r);else s(t,i[1],i[2])}}();
/**
      	   * (Internal) Applies css properties to an element, similar to the jQuery 
      	   * css method.
      	   *
      	   * While this helper does assist with vendor prefixed property names, it 
      	   * does not perform any manipulation of values prior to setting styles.
      	   */
/**
      	   * (Internal) Determines if an element or space separated list of class names contains a class name.
      	   */
function c(t,n){return("string"==typeof t?t:d(t)).indexOf(" "+n+" ")>=0}
/**
      	   * (Internal) Adds a class to an element.
      	   */function l(t,n){var e=d(t),r=e+n;c(e,n)||(// Trim the opening space.
t.className=r.substring(1))}
/**
      	   * (Internal) Removes a class from an element.
      	   */function f(t,n){var e,r=d(t);c(t,n)&&(// Replace the class name.
e=r.replace(" "+n+" "," "),// Trim the opening and closing spaces.
t.className=e.substring(1,e.length-1))}
/**
      	   * (Internal) Gets a space separated list of the class names on the element. 
      	   * The list is wrapped with a single space on each end to facilitate finding 
      	   * matches within the list.
      	   */function d(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}
/**
      	   * (Internal) Removes an element from the DOM.
      	   */function m(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return e}()}(n),t("N",e(n.exports))}}}));
