var wa = require('../lib/weighted-arrays');

var identity = function (value) {
  return value;
};
var sameWeight = function () {
  return 1;
};
var isValue = function (expected) {
  return function (value) {
    return value === expected;
  };
};

describe('random', function () {

  it('should return only value with weight', function () {
    var array = [0, 1, 0];
    var random = wa.random(array, identity);

    random.should.equal(1);
  });

  it('should not return a 0-weighted value', function () {
    var array = [0, 1, 2];
    var random = wa.random(array, identity);

    random.should.not.equal(0);
  });

  it('should return one of values with weight', function () {
    var array = [0, 1, 2];
    var random = wa.random(array, identity);

    [1, 2].should.containEql(random);
  });

  it('should works with non-integer weights', function () {
    var array = [0, 0.33, 0.44];
    var random = wa.random(array, identity);

    random.should.not.equal(0);
    [0.33, 0.44].should.containEql(random);
  });

  it('should return random value coherent with weight', function () {
    var array = [0, 1, 3, 7];
    var draws = 10000;
    var delta = draws * 0.1;
    var randoms = [];
    for (var i = 0; i < draws; i++) {
      randoms.push(wa.random(array, identity));
    }

    randoms.should.have.length(draws);
    randoms.filter(isValue(0)).length.should.equal(0);
    randoms.filter(isValue(1)).length.should.be.approximately(1000, delta);
    randoms.filter(isValue(3)).length.should.be.approximately(3000, delta);
    randoms.filter(isValue(7)).length.should.be.approximately(7000, delta);
  });

});

describe('probability', function () {

  it('should return 0 for a 0-weighted value', function () {
    var array = [0, 1, 2];

    wa.probability(array, identity, 0).should.equal(0);
  });

  it('should return same probability for same weight values', function () {
    var array = [0, 1, 2, 3];
    var p0 = wa.probability(array, sameWeight, 0);
    var p1 = wa.probability(array, sameWeight, 1);
    var p2 = wa.probability(array, sameWeight, 2);
    var p3 = wa.probability(array, sameWeight, 3);

    p0.should.equal(1/4);
    p1.should.equal(1/4);
    p2.should.equal(1/4);
    p3.should.equal(1/4);
  });

  it('should return coherent probability', function () {
    var array = [0, 1, 2, 3];
    var p0 = wa.probability(array, identity, 0);
    var p1 = wa.probability(array, identity, 1);
    var p2 = wa.probability(array, identity, 2);
    var p3 = wa.probability(array, identity, 3);

    p0.should.equal(0);
    p1.should.equal(1/6);
    p2.should.equal(2/6);
    p3.should.equal(3/6);
  });

});