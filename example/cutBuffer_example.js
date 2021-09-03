import { cutBuffer } from '../build/index.js';

const buffer = Buffer.from('abcde');
// <Buffer 61 62 63 64 65>
let r = cutBuffer(buffer, { deepCopy: true, start: 0, end: 3 });
console.log(r);
// <Buffer 61 62 63>

r = cutBuffer(buffer);
console.log(r);
// <Buffer 61 62 63 64 65>
