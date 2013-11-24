
var expect = require('expect.js')
  , parse = require('../index')

describe('hsl', function () {
  it('should parse an hsl', function () {
    expect(parse.hsl('hsl(300, 20%, 10%)')).to.eql({
      h: 5/6,
      s: .2,
      l: .1,
      a: 1
    })
  })
  it('should parse an hsla()', function () {
    expect(parse.hsl('hsla(180, 50%, 100%, .2)')).to.eql({
      h: .5,
      s: .5,
      l: 1,
      a: .2
    })
  })
  it('should parse and convert and rgb hex', function () {
    expect(parse.hsl('#FF3377')).to.eql({
      h: 340 / 360,
      s: 1,
      l: .6,
      a: 1
    })
  })
})

describe('rgb', function () {
  it('should parse 3 hex', function () {
    expect(parse('#102')).to.eql({
      r: 17,
      g: 0,
      b: 34,
      a: 1
    })
  })
  it('should parse a 6 hex', function () {
    expect(parse('#01100a')).to.eql({
      r: 1,
      g: 16,
      b: 10,
      a: 1
    })
  })
  it('should parse an 8 hex', function () {
    expect(parse('#01100a0F')).to.eql({
      r: 1,
      g: 16,
      b: 10,
      a: 15/255
    })
  })
  it('should parse an rgb()', function () {
    expect(parse('rgb(100, 50, 0)')).to.eql({
      r: 100,
      g: 50,
      b: 0,
      a: 1
    })
  })
  it('should parse an rgba()', function () {
    expect(parse('rgba(2, 45, 10, .3)')).to.eql({
      r: 2,
      g: 45,
      b: 10,
      a: .3
    })
  })
  it('should parse & convert an hsl()', function () {
    expect(parse('hsl(340, 100%, 60%)')).to.eql({
      r: 255,
      g: 51,
      b: 119,
      a: 1
    })
  })
})

