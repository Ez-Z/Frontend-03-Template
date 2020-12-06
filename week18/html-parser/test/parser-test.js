const assert = require('assert')
import { parseHTML } from '../src/parser.js'

describe('parse html', () => {
  it('<a></a>', () => {
    let tree = parseHTML('<a></a>')
    assert.strictEqual(tree.children[0].tagName, 'a')
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a href="//time.geekbang.org"></a>', () => {
    let tree = parseHTML('<a href="//time.geekbang.org"></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a href ></a>', () => {
    let tree = parseHTML('<a href ></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a href id></a>', () => {
    let tree = parseHTML('<a href id></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a href="abc" id></a>', () => {
    let tree = parseHTML('<a href="abc" id></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a id=abc id></a>', () => {
    let tree = parseHTML('<a id=abc id></a>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a id=abc/>', () => {
    let tree = parseHTML('<a id=abc/>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it("<a id='abc'/>", () => {
    let tree = parseHTML("<a id='abc'/>")
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<a />', () => {
    let tree = parseHTML('<a />')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<A /> upper case', () => {
    let tree = parseHTML('<A />')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children.length, 0)
  })

  it('<>', () => {
    let tree = parseHTML('<>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].type, 'text')
  })

  it('<div>a</div>', () => {
    let tree = parseHTML('<div>a</div>')
    assert.strictEqual(tree.children.length, 1)
    assert.strictEqual(tree.children[0].children[0].type, 'text')
  })

  it('<div class="a"b>', () => {
    assert.throws(
      () => {
        parseHTML('<div class="a"b>')
      },
      {
        name: 'Error',
        message: 'afterQuotedAttributeValue error',
      }
    )
  })
})