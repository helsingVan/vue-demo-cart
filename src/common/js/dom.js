function addClass(el,className) {
  if(hasClass(el,className)) {
  	return null;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

function hasClass(el,className) {
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className);
}

function getData(el,name,val) {
  let prefixName = 'data-' + name;
  if(val) {
  	return el.setAttribute(prefixName,val);
  }else {
  	return el.getAttribute(prefixName);
  }
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()
function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export { addClass,hasClass,getData,prefixStyle };