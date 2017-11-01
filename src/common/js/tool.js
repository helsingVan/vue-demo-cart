function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomArr(arr) {
  let _arr = arr.slice();
  _arr.forEach((v,i,_this)=> {
  	let randomIndex = getRandomInt(0,i);
  	let j = _this[i];
  	_this[i] = _this[randomIndex];
  	_this[randomIndex] = j;
  });
  return _arr;
}