
function getStyle(elm) {
  if (!elm.style) elm.style = {};
  
  for (let prop in elm.computedStyle) {
    // let p = elm.computedStyle.value;
    // elm.style[prop] = elm.computedStyle[prop].value;
    elm.style[prop] = elm.computedStyle[prop].value.value;

    if (elm.style[prop].toString().match(/px$/)) {
      elm.style[prop] = parseInt(elm.style[prop])
    }

    if (elm.style[prop].toString().match(/^[0-9\.]+$/)) {
      elm.style[prop] = parseInt(elm.style[prop])
    }

  }

  return elm.style;
}

function layout(elm) {
  if (!elm.computedStyle) return;

  let elmStyle = getStyle(elm);
  if (elmStyle.display !== 'flex') return;

  let items = elm.children.filter(e => e.type === 'element')

  item.sort((a,b) => ((a.order || 0) - (b.order || 0)));

  let style = elmStyle;

  
  ['width', 'height'].forEach(size => {
    if(style[size] === 'auto' || style[size] === '') {
      style.size = null;
    }
  });

  // 增加flex默认属性
  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch';
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if (!style.flexWarp || style.flexWarp === 'auto') {
    style.flexWarp = 'nowarp';
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }

  let mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;

  if (style.flexDirection === 'row') {
    mainSign = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;
    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }

  if (style.flexDirection === 'row-reverse') {
    mainSign = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;
    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }

  if (style.flexDirection === 'column') {
    mainSign = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if (style.flexDirection === 'column-reverse') {
    mainSign = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if (style.flexWarp === 'warp-reverse') {
    let tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }


  // 分行计算
  let isAutoMainSize = false;
  if (!style[mainSize]) {
    elmStyle[mainSize] = 0;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);
      if (itemStyle[mainSize] !== null && item[mainSize]) {
        elmStyle[mainSize] = elmStyle[mainSize] + item[mainSize]; // 待定
      }
    }
    isAutoMainSize = true;
    // noWarp
  }

  let flexLine = [];
  let flexLines = [flexLine];

  let mainSpace = elmStyle[mainSize];
  let crossSpace = 0;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWarp === 'nowrap' && isAutoMainSize) {

      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      flexLine.push(item);

    } else {

      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }

      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;

  // 主轴计算
  if (style.flexWarp === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {
    // overflow (happens on if container is single line), scale every item
    let scale = style[mainSize] / (style[mainSize] - mainSpace);
    let currentMain = mainBase;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }
      
      itemStyle[mainSize] = itemStyle[mainSize] * scale;
      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    // process each flex line
    flexLines.forEach(items => {
      let mainSpace = items.mainSpace;
      let flexTotal = 0;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);

        if (itemStyle.flex !== null && itemStyle.flex !== (void 0)) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      if (flexTotal > 0) {
        // There is flexible flex items
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemStyle = getStyle(item);

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        // There is *NO* flexible flex items, which means, justifyContent shound work
        let currentMain = mainBase;
        let step = 0;
        if (style.justifyContent === 'flex-start') {
          currentMain = mainBase;
        }

        if (style.justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase;
        }
        
        if (style.justifyContent === 'center') {
          currentMain = mainSpace / 2 * mainSign + mainBase;
        }

        if (style.justifyContent === 'space-between') {
          step = mainSpace / (items.length - 1) * mainSign;
          currentMain = mainBase;
        }

        if (style.justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign;
          currentMain = step / 2 + mainBase;
        }

        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemStyle = getStyle(item);

          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    })
  }

  // compute the cross axis sizes
  // align-items, align-self
  let crossSpace;

  if (!style[crossSize]) {
    crossSpace = 0;
    elmStyle[crossSize] = 0;
    for (let i = 0; i < flexLines.length; i++) {
      elmStyle[crossSize] = elmStyle[crossSize] + flexLines[i].crossSpace;
    } 
  } else {
    crossSpace = style[crossSize];
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace
    }
  }

  if (style.flexWarp === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  let lineSize = style[crossSize] / flexLines.length;

  let step;
  if (style.alignContent === 'flex-start') {
    crossBase += 0;
    step = 0;
  }

  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
    step = 0;
  }

  if (style.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }

  if (style.alignContent === 'space-between') {
    crossBase += 0;
    step = crossSpace / (items.length - 1);
  }

  if (style.alignContent === 'space-around') {
    step = crossSpace / flexLines.length;
    currentMain = crossSize * step / 2;
  }

  if (style.alignContent === 'stretch') {
    crossBase += 0;
    step = 0;
  }

  flexLines.forEach(items => {
    let lineCrossSize = style.alignContent === 'stretch' ?
      items.crossSpace + crossSpace / flexLines.length :
      items.crossSpace;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);

      let align = itemStyle.alignSelf || style.alignItems;

      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0;
      }

      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossBase * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossBase * itemStyle[crossSize];
      }

      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      }

      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : 0);

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }

    }
    crossBase += crossSign * (lineCrossSize + step)
  })


  
}

module.exports = layout;