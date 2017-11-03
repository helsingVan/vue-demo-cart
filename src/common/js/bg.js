(function(){
  
  let bgArr = [];
  let intervalTime = 5000;
  let num = 0;
  let bgStr = 'http://www.fanguangcn.xin/static/image/bg_';
  for(let i = 1;i < 21;i++) {
    i = i < 10?'0' + i:i;
    let bgString = bgStr + i + '.jpg';
    bgArr.push(bgString);
  }
  function loop() {
    if(num > 20) {
      num = 0;
    }
    const body = document.body;
    body.style.backgroundImage = `url(${bgArr[num]})`;
    console.log(1);
    num++;
    setTimeout(function(){loop();},intervalTime);
  }
  loop();
  
})();