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

export { addClass,hasClass,getData };