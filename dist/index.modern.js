function e(e,t){const{deepCopy:n=!0,start:r,end:o}=t,p=e.length<o?e.length-r:o-r;if(n){const t=Buffer.alloc(p);return e.copy(t,0,r,r+p),t}return e.subarray(r,r+p)}function t(t,n){const r=[],{length:o,deepCopy:p=!0}=n;for(let n=0;n<t.length;)r.push(e(t,{deepCopy:p,start:n,end:n+=o}));return r}export{e as cutBuffer,t as cuttingBuffer};
//# sourceMappingURL=index.modern.js.map
