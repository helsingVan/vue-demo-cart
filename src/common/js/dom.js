function addClass(el,className) {
  if(hasClass(el,className)) {
  	return null;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  return newClass.join(' ');
}

function hasClass(el,className) {
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className);
}

export { addClass,hasClass };