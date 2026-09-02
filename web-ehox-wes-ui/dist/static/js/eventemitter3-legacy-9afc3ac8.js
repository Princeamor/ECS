System.register(["./@antv-legacy-5cb6425b.js"],(function(e,t){"use strict";var n;return{setters:[e=>{n=e.g}],execute:function(){var t={exports:{}};!function(e){var t=Object.prototype.hasOwnProperty,n="~";
/**
      	 * Constructor to create a storage for our `EE` objects.
      	 * An `Events` instance is a plain object whose properties are event names.
      	 *
      	 * @constructor
      	 * @private
      	 */function r(){}
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.

/**
      	 * Representation of a single event listener.
      	 *
      	 * @param {Function} fn The listener function.
      	 * @param {*} context The context to invoke the listener with.
      	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
      	 * @constructor
      	 * @private
      	 */
function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1}
/**
      	 * Add a listener for a given event.
      	 *
      	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
      	 * @param {(String|Symbol)} event The event name.
      	 * @param {Function} fn The listener function.
      	 * @param {*} context The context to invoke the listener with.
      	 * @param {Boolean} once Specify if the listener is a one-time listener.
      	 * @returns {EventEmitter}
      	 * @private
      	 */function s(e,t,r,s,i){if("function"!=typeof r)throw new TypeError("The listener must be a function");var c=new o(r,s||e,i),f=n?n+t:t;return e._events[f]?e._events[f].fn?e._events[f]=[e._events[f],c]:e._events[f].push(c):(e._events[f]=c,e._eventsCount++),e}
/**
      	 * Clear event by name.
      	 *
      	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
      	 * @param {(String|Symbol)} evt The Event name.
      	 * @private
      	 */function i(e,t){0==--e._eventsCount?e._events=new r:delete e._events[t]}
/**
      	 * Minimal `EventEmitter` interface that is molded against the Node.js
      	 * `EventEmitter` interface.
      	 *
      	 * @constructor
      	 * @public
      	 */function c(){this._events=new r,this._eventsCount=0}
/**
      	 * Return an array listing the events for which the emitter has registered
      	 * listeners.
      	 *
      	 * @returns {Array}
      	 * @public
      	 */Object.create&&(r.prototype=Object.create(null),// This hack is needed because the `__proto__` property is still inherited in
// some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
(new r).__proto__||(n=!1)),c.prototype.eventNames=function(){var e,r,o=[];if(0===this._eventsCount)return o;for(r in e=this._events)t.call(e,r)&&o.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(e)):o},
/**
      	 * Return the listeners registered for a given event.
      	 *
      	 * @param {(String|Symbol)} event The event name.
      	 * @returns {Array} The registered listeners.
      	 * @public
      	 */
c.prototype.listeners=function(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,s=r.length,i=new Array(s);o<s;o++)i[o]=r[o].fn;return i},
/**
      	 * Return the number of listeners listening to a given event.
      	 *
      	 * @param {(String|Symbol)} event The event name.
      	 * @returns {Number} The number of listeners.
      	 * @public
      	 */
c.prototype.listenerCount=function(e){var t=n?n+e:e,r=this._events[t];return r?r.fn?1:r.length:0},
/**
      	 * Calls each of the listeners registered for a given event.
      	 *
      	 * @param {(String|Symbol)} event The event name.
      	 * @returns {Boolean} `true` if the event had listeners, else `false`.
      	 * @public
      	 */
c.prototype.emit=function(e,t,r,o,s,i){var c=n?n+e:e;if(!this._events[c])return!1;var f,a,u=this._events[c],v=arguments.length;if(u.fn){switch(u.once&&this.removeListener(e,u.fn,void 0,!0),v){case 1:return u.fn.call(u.context),!0;case 2:return u.fn.call(u.context,t),!0;case 3:return u.fn.call(u.context,t,r),!0;case 4:return u.fn.call(u.context,t,r,o),!0;case 5:return u.fn.call(u.context,t,r,o,s),!0;case 6:return u.fn.call(u.context,t,r,o,s,i),!0}for(a=1,f=new Array(v-1);a<v;a++)f[a-1]=arguments[a];u.fn.apply(u.context,f)}else{var l,p=u.length;for(a=0;a<p;a++)switch(u[a].once&&this.removeListener(e,u[a].fn,void 0,!0),v){case 1:u[a].fn.call(u[a].context);break;case 2:u[a].fn.call(u[a].context,t);break;case 3:u[a].fn.call(u[a].context,t,r);break;case 4:u[a].fn.call(u[a].context,t,r,o);break;default:if(!f)for(l=1,f=new Array(v-1);l<v;l++)f[l-1]=arguments[l];u[a].fn.apply(u[a].context,f)}}return!0},
/**
      	 * Add a listener for a given event.
      	 *
      	 * @param {(String|Symbol)} event The event name.
      	 * @param {Function} fn The listener function.
      	 * @param {*} [context=this] The context to invoke the listener with.
      	 * @returns {EventEmitter} `this`.
      	 * @public
      	 */
c.prototype.on=function(e,t,n){return s(this,e,t,n,!1)},
/**
      	 * Add a one-time listener for a given event.
      	 *
      	 * @param {(String|Symbol)} event The event name.
      	 * @param {Function} fn The listener function.
      	 * @param {*} [context=this] The context to invoke the listener with.
      	 * @returns {EventEmitter} `this`.
      	 * @public
      	 */
c.prototype.once=function(e,t,n){return s(this,e,t,n,!0)},
/**
      	 * Remove the listeners of a given event.
      	 *
      	 * @param {(String|Symbol)} event The event name.
      	 * @param {Function} fn Only remove the listeners that match this function.
      	 * @param {*} context Only remove the listeners that have this context.
      	 * @param {Boolean} once Only remove one-time listeners.
      	 * @returns {EventEmitter} `this`.
      	 * @public
      	 */
c.prototype.removeListener=function(e,t,r,o){var s=n?n+e:e;if(!this._events[s])return this;if(!t)return i(this,s),this;var c=this._events[s];if(c.fn)c.fn!==t||o&&!c.once||r&&c.context!==r||i(this,s);else{for(var f=0,a=[],u=c.length;f<u;f++)(c[f].fn!==t||o&&!c[f].once||r&&c[f].context!==r)&&a.push(c[f]);
// Reset the array, or remove it completely if we have no more listeners.

a.length?this._events[s]=1===a.length?a[0]:a:i(this,s)}return this},
/**
      	 * Remove all listeners, or those of the specified event.
      	 *
      	 * @param {(String|Symbol)} [event] The event name.
      	 * @returns {EventEmitter} `this`.
      	 * @public
      	 */
c.prototype.removeAllListeners=function(e){var t;return e?(t=n?n+e:e,this._events[t]&&i(this,t)):(this._events=new r,this._eventsCount=0),this},// Alias methods names because people roll like that.
c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,// Expose the prefix.
c.prefixed=n,// Allow `EventEmitter` to be imported as module namespace.
c.EventEmitter=c,e.exports=c}(t),e("E",n(t.exports))}}}));
