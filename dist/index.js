function e(e,r){var t=r.deepCopy,n=r.start,o=r.end,p=e.length<o?e.length-n:o-n;if(void 0===t||t){var a=Buffer.alloc(p);return e.copy(a,0,n,n+p),a}return e.subarray(n,n+p)}function r(r,t){for(var n=[],o=t.length,p=t.deepCopy,a=void 0===p||p,u=0;u<r.length;)n.push(e(r,{deepCopy:a,start:u,end:u+=o}));return n}export{e as cutBuffer,r as cuttingBuffer};
//# sourceMappingURL=index.js.map
