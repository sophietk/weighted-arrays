# Weighted arrays

## Install it

```bash
npm i weighted-arrays
```

## Use it

```js
var wa = require('weighted-arrays');

var array = [
  { value: 'a', weight: 0},
  { value: 'b', weight: 5},
  { value: 'c', weight: 10}
];
var getWeight = function (obj) {
  return obj.weight;
};
var random = wa.random(array, getWeight);
```
