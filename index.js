
var convert = require('color-convert')

module.exports = rgb
rgb.hsl = hsl

function rgb(input) {
  if (input.indexOf('hsl') === 0) {
    return fromHsl(hsl(input))
  }
  if (input.indexOf('rgb') !== 0) return unHex(input)
  var parts = input.slice(input.indexOf('(') + 1, input.lastIndexOf(')')).split(',')
  if (parts.length < 3) return
  return {
    r: parseFloat(parts[0]),
    g: parseFloat(parts[1]),
    b: parseFloat(parts[2]),
    a: parts[3] ? parseFloat(parts[3]) : 1
  }
}

function unHex(text) {
  if (text[0]=='#') text = text.slice(1)
  if (text.length === 3) {
    text = text[0] + text[0] + text[1] + text[1] + text[2] + text[2]
  }
  return {
    r:parseInt(text.slice(0, 2), 16),
    g:parseInt(text.slice(2, 4), 16),
    b:parseInt(text.slice(4, 6), 16),
    a:text.length === 8 ? parseInt(text.slice(6,8), 16)/255 : 1
  }
}

function hsl(input) {
  if (input.indexOf('hsl') !== 0) {
    return toHsl(rgb(input))
  }
  var parts = input.slice(input.indexOf('(') + 1, input.lastIndexOf(')')).split(',')
  if (parts.length < 3) return
  return {
    h: parseFloat(parts[0]) / 360,
    s: parseFloat(parts[1]) / 100,
    l: parseFloat(parts[2]) / 100,
    a: parts[3] ? parseFloat(parts[3]) : 1
  }
}

function toHsl(color) {
  if (!color) return
  var res
  if (convert.rgb2hsl) {
    res = convert.rgb2hsl(color.r, color.g, color.b)
    res[0] /= 360
    res[1] /= 100
    res[2] /= 100
  } else {
    res = convert.RGBtoHSL(color.r, color.g, color.b)
  }
  return {
    h: res[0],
    s: res[1],
    l: res[2],
    a: color.a
  }
}

function fromHsl(color) {
  var rgb
  if (convert.hsl2rgb) {
    rgb = convert.hsl2rgb(color.h * 360, color.s * 100, color.l * 100)
  } else {
    rgb = convert.HSLtoRGB(color.h, color.s, color.l)
  }
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a: color.a
  }
}

