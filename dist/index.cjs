function e(e,r){var t=r.deepCopy,n=r.start,o=r.end,u=e.length<o?e.length-n:o-n;if(void 0===t||t){var f=Buffer.alloc(u);return e.copy(f,0,n,n+u),f}return e.subarray(n,n+u)}exports.cutBuffer=e,exports.cuttingBuffer=function(r,t){for(var n=[],o=t.length,u=t.deepCopy,f=void 0===u||u,p=0;p<r.length;)n.push(e(r,{deepCopy:f,start:p,end:p+=o}));return n};
//# sourceMappingURL=index.cjs.map
