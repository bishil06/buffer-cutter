function t(t){var n;if("undefined"!=typeof Symbol&&(Symbol.asyncIterator&&(n=t[Symbol.asyncIterator]),null==n&&Symbol.iterator&&(n=t[Symbol.iterator])),null==n&&(n=t["@@asyncIterator"]),null==n&&(n=t["@@iterator"]),null==n)throw new TypeError("Object is not async iterable");return n.call(t)}function n(t){this.wrapped=t}function e(t){var e,r;function o(e,r){try{var i=t[e](r),l=i.value,c=l instanceof n;Promise.resolve(c?l.wrapped:l).then(function(t){c?o("return"===e?"return":"next",t):u(i.done?"return":"normal",t)},function(t){o("throw",t)})}catch(t){u("throw",t)}}function u(t,n){switch(t){case"return":e.resolve({value:n,done:!0});break;case"throw":e.reject(n);break;default:e.resolve({value:n,done:!1})}(e=e.next)?o(e.key,e.arg):r=null}this._invoke=function(t,n){return new Promise(function(u,i){var l={key:t,arg:n,resolve:u,reject:i,next:null};r?r=r.next=l:(e=r=l,o(t,n))})},"function"!=typeof t.return&&(this.return=void 0)}function r(t){return function(){return new e(t.apply(this,arguments))}}function o(t){return new n(t)}function u(t,n){var e={},r=!1;function o(e,o){return r=!0,o=new Promise(function(n){n(t[e](o))}),{done:!1,value:n(o)}}return e["undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator"]=function(){return this},e.next=function(t){return r?(r=!1,t):o("next",t)},"function"==typeof t.throw&&(e.throw=function(t){if(r)throw r=!1,t;return o("throw",t)}),"function"==typeof t.return&&(e.return=function(t){return r?(r=!1,t):o("return",t)}),e}function i(t,n){const{deepCopy:e=!0,start:r,end:o}=n,u=t.length<o?t.length-r:o-r;if(e){const n=Buffer.alloc(u);return t.copy(n,0,r,r+u),n}return t.subarray(r,r+u)}function l(t,n){const e=[],{length:r,deepCopy:o=!0}=n;for(let n=0;n<t.length;)e.push(i(t,{deepCopy:o,start:n,end:n+=r}));return e}function c(t,n){return f.apply(this,arguments)}function f(){return(f=r(function*(n,e){const{length:r,deepCopy:i=!0}=e;let c=[],f=0;var a,y=!0,h=!1;try{for(var s,p,d=t(n);y=(s=yield o(d.next())).done,p=yield o(s.value),!y;y=!0){const t=p;if(c.push(t),f+=t.length,f>r){const t=l(Buffer.concat(c),{deepCopy:i,length:r}),n=t.length%r!=0,e=n?t.length-1:t.length;for(let n=0;n<e;n+=1)yield t[n];n?(c=[t[t.length-1]],f=c.reduce((t,n)=>t+n.length,0)):(c=[],f=0)}}}catch(t){h=!0,a=t}finally{try{y||null==d.return||(yield o(d.return()))}finally{if(h)throw a}}c.length>0&&(yield*u(t(c),o))})).apply(this,arguments)}e.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)};export{i as cutBuffer,l as cuttingBuffer,c as cuttingRStream};
//# sourceMappingURL=index.modern.js.map
