var sum = function (previous, current) {
  return previous + current
}

module.exports = {

  weightsSum: function (array, weightFn) {
    var weights = array.map(weightFn)
    return weights.reduce(sum, 0)
  },

  probability: function (array, weightFn, value) {
    var weightsSum = this.weightsSum(array, weightFn)
    return weightFn(value) / weightsSum
  },

  segments: function (array, weightFn) {
    var self = this
    var segments = []
    var cursor = 0
    array.forEach(function (value) {
      var segmentStart = cursor
      var segmentStop = segmentStart + self.probability(array, weightFn, value)
      segments.push({ start: segmentStart, stop: segmentStop, value: value })
      cursor = segmentStop
    })
    return segments
  },

  random: function (array, weightFn) {
    var random = Math.random()
    var segments = this.segments(array, weightFn)
    var randomSegment = segments.find(function (segment) {
      return random >= segment.start && random < segment.stop
    })
    return randomSegment.value
  },

  // if weigths are integer
  randomForInt: function (array, weightFn) {
    var weightedArray = this.weightedArray(array, weightFn)
    var weightsSum = this.weightsSum(array, weightFn)
    var randomIndex = Math.floor(Math.random() * weightsSum)
    return weightedArray[randomIndex]
  },

  // if weights are integer
  weightedArrayForInt: function (array, weightFn) {
    var weightedArray = []
    array.forEach(function (value) {
      for (var i = 0; i < weightFn(value); i++) {
        weightedArray.push(value)
      }
    })
    return weightedArray
  }

}
