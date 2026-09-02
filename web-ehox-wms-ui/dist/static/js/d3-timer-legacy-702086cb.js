System.register([],(function(t,n){"use strict";return{execute:function(){t("t",h);var// how frequently we check for clock skew
n,e,i=0,// is an animation frame pending?
o=0,// is a timeout pending?
r=0,// are any timers active?
c=1e3,l=0,u=0,a=0,s="object"==typeof performance&&performance.now?performance:Date,f="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function _(){return u||(f(m),u=s.now()+a)}function m(){u=0}function w(){this._call=this._time=this._next=null}function h(t,n,e){var i=new w;return i.restart(t,n,e),i}function p(){u=(l=s.now())+a,i=o=0;try{!function(){_(),// Get the current time, if not already set.
++i;for(// Pretend we’ve set an alarm, if we haven’t already.
var t,e=n;e;)(t=u-e._time)>=0&&e._call.call(void 0,t),e=e._next;--i}()}finally{i=0,function(){for(var t,i,o=n,r=1/0;o;)o._call?(r>o._time&&(r=o._time),t=o,o=o._next):(i=o._next,o._next=null,o=t?t._next=i:n=i);e=t,y(r)}(),u=0}}function x(){var t=s.now(),n=t-l;n>c&&(a-=n,l=t)}function y(t){i||(// Soonest alarm already set, or will be.
o&&(o=clearTimeout(o)),// Strictly less than if we recomputed clockNow.
t-u>24?(t<1/0&&(o=setTimeout(p,t-s.now()-a)),r&&(r=clearInterval(r))):(r||(l=s.now(),r=setInterval(x,c)),i=1,f(p)))}w.prototype=h.prototype={constructor:w,restart:function(t,i,o){if("function"!=typeof t)throw new TypeError("callback is not a function");o=(null==o?_():+o)+(null==i?0:+i),this._next||e===this||(e?e._next=this:n=this,e=this),this._call=t,this._time=o,y()},stop:function(){this._call&&(this._call=null,this._time=1/0,y())}}}}}));
