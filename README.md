# Weighted arrays

## Install it

```bash
npm i weighted-arrays
```

## Use it

```js
var wa = require('weighted-arrays');

var array = [1, 2, 3, 4]; 
var random = wa.random(array, function (obj) {
  return obj;
});
```
