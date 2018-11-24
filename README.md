# weighted-arrays

## install it

```bash
npm i weighted-arrays
```

## use it

```js
const wa = require('weighted-arrays')

const array = [
  { value: 'a', weight: 0},
  { value: 'b', weight: 2.5},
  { value: 'c', weight: 10}
]
const getWeight = obj => obj.weight

const random = wa.random(array, getWeight)
// output: sometimes { value: 'b', weight: 2.5}, sometimes { value: 'c', weight: 10}, and never { value: 'a', weight: 0}

const probability = wa.probability(array, getWeight, array[1])
// output: 0.2
```
