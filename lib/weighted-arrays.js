var sum = function (previous, current) {
  return previous + current;
};

module.exports = {

  weightsSum: function (array, weightFn) {
    var weights = array.map(weightFn);
    return weights.reduce(sum, 0);
  },

  probability: function (array, weightFn, value) {
    var weightsSum = this.weightsSum(array, weightFn);
    return weightFn(value)/weightsSum;
  },

  // random value if weigths are integer
  random: function (array, weightFn) {
    var weightedArray = this.weightedArray(array, weightFn);
    var weightsSum = this.weightsSum(array, weightFn);
    var randomIndex = Math.floor(Math.random() * weightsSum);
    return weightedArray[randomIndex];
  },

  // if weights are integer
  weightedArray: function (array, weightFn) {
    var weightedArray = [];
    array.forEach(function (value) {
      for (var i = 0; i < weightFn(value); i++) {
        weightedArray.push(value);
      }
    });
    return weightedArray;
  }

};