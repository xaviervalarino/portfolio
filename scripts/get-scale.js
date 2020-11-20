#!/usr/bin/env node

const message = `
GET SCALE
A simple script for getting typographic scales
Useful when mocking up different devices

1st argument: the base number
2nd argument: the ratio

ex. "./get-scale.js 16 1.4"
`;

const args = process.argv

if ( !args[2] || !args[3] ) {
  console.log(message)
  process.exit(1)
}

function getScale (base, ratio) {
  const scale = [];
  // base = parseFloat(base);
  // ratio = parseFloat(ratio);
  for ( let i = 7; i > 0 ; i--) {
    scale.push( Number.parseFloat(base / Math.pow(ratio, i) ).toFixed(2) )
  };
  scale.push(base);
  for ( let i = 1; i < 7; i++) {
    scale.push( Number.parseFloat(base * Math.pow(ratio, i) ).toFixed(2) )
  };
  return scale;
}
getScale(args[2], args[3]).forEach( (v) => console.log(v) )
