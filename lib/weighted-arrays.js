const sum = (previous, current) => previous + current

module.exports = {

  weightsSum: function (array, weightFn) {
    const weights = array.map(weightFn)
    return weights.reduce(sum, 0)
  },

  probability: function (array, weightFn, value) {
    const weightsSum = this.weightsSum(array, weightFn)
    return weightFn(value) / weightsSum
  },

  segments: function (array, weightFn) {
    const self = this
    const segments = []
    let cursor = 0
    array.forEach(value => {
      const segmentStart = cursor
      const segmentStop = segmentStart + self.probability(array, weightFn, value)
      segments.push({ start: segmentStart, stop: segmentStop, value: value })
      cursor = segmentStop
    })
    return segments
  },

  random: function (array, weightFn) {
    const random = Math.random()
    const segments = this.segments(array, weightFn)
    const randomSegment = segments.find(segment => {
      return random >= segment.start && random < segment.stop
    })
    return randomSegment.value
  },

  // if weigths are integer
  randomForInt: function (array, weightFn) {
    const weightedArray = this.weightedArray(array, weightFn)
    const weightsSum = this.weightsSum(array, weightFn)
    const randomIndex = Math.floor(Math.random() * weightsSum)
    return weightedArray[randomIndex]
  },

  // if weights are integer
  weightedArrayForInt: function (array, weightFn) {
    const weightedArray = []
    array.forEach(value => {
      for (let i = 0; i < weightFn(value); i++) {
        weightedArray.push(value)
      }
    })
    return weightedArray
  }

}
