var assert = require('assert');
// var add = require('../add.js').add;
// var mul = require('../add.js').mul;

import { add, mul } from '../add';

// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

describe("add function testing", function () {
  it('1 + 2 should be 3', function () {
    assert.equal(add(1, 2), 3);
  });

  it('-5 + 2 should be -3', function () {
    assert.equal(add(-5, 2), -3);
  });

  it('-5 * 2 should be -10', function () {
    assert.equal(mul(-5, 2), -10);
  });
})


