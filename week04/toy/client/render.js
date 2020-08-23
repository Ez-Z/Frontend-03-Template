const images = require('images');

function render(viewport, elm) {
  if (elm.style) {
    let img = images(elm.style.width, elm.style.height);

    if (elm.style["background-color"]) {
      let color = elm.style["backgroud-color"] || "rgb(0, 0, 0)";
      color.match(/rgb\((\d+),(\d+),(\d+)\)/);
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3))
      viewport.draw(img, elm.style.left || 0, elm.style.top || 0);
    }
  }

  if (elm.children) {
    for (let child of elm.children){
      render(viewport, child);
    }
  }
}

module.exports = render;