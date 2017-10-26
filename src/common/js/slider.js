/*
 * @name  轮播图类
 * @param el->容器元素
 * @time 2017-10-25
 */

function Slider(el) {
    this.slider = el;
    this.loopTimer = null;
    this.loopTime = 1000;
    // this.loopNum = 2;
    this.loopType = 'add';
    this.sliderItemWidth = 0;
    this.sliderUl = null,
    this.sliderCount = 0;

    this.startX = 0,
    this.moveX = 0;
    this.endX = 0;
    this.moveMax = 100;
    this.init();
}
Slider.prototype = {
    constructor: Slider,
    init() {
  	  this.render();
  	  this.bindEvent();
  	  this.autoPlay();
    },
    render() {
    	const slider = this.slider;
		const ul = slider.querySelector('ul');
		const sliderWidth = this.sliderItemWidth = slider.clientWidth;
		let lis = Array.from(slider.querySelectorAll('li'));
		this.sliderUl = ul;
		// loop前后增加一个元素
		const firstChild = ul.firstChild;
		const cloneLastChild = lis[lis.length-1].cloneNode(true);
		const cloneFirstChild = lis[0].cloneNode(true);
		ul.insertBefore(cloneLastChild,firstChild);
		ul.appendChild(cloneFirstChild);
		lis.unshift(cloneLastChild);
		lis.push(cloneFirstChild);

		// 样式调整
		const ulWidth = lis.length * sliderWidth;
		this.sliderCount = lis.length;
		ul.style.width = ulWidth + 'px';
		if(this.loopType === 'add') {
			this.loopNum = 1;
		}else {
			this.loopNum = this.sliderCount - 1;
		}
		ul.style.transform = `translateX(-${sliderWidth*this.loopNum}px)`;

		lis.forEach((v) => {
		    v.style.width = sliderWidth + 'px';
		});

		// 底部分页point
		const paginationCount = lis.length - 2;
		const frag = document.createDocumentFragment();
		const paginationBox = this.slider.querySelector('.pagination');
		for(let i = 0;i < paginationCount; i++) {
		    let pagination = document.createElement('span');
		    frag.appendChild(pagination);
		}
		paginationBox.appendChild(frag);
    },
    autoPlay() {
    	const self = this;
    	clearInterval(this.loopTimer);
    	this.loopTimer = setInterval(function(){
    		self._loop('mi');
    	},this.loopTime);
    },
    _loop(type) {
    	if(this.loopType === 'add') {
    		this.loopNum++; 
    	}else {
    		this.loopNum--;
    	}
    	
    	this.sliderUl.style.transition = `all .5s`;
    	const translate = this.sliderItemWidth * this.loopNum;
    	this.sliderUl.style.transform = `translateX(-${translate}px)`;
    	
    },
    bindEvent() {
    	const self = this;
    	this.sliderUl.addEventListener('transitionend',this._transitionend.bind(this));
    	this.sliderUl.addEventListener('touchstart',this._touchstart.bind(this));
    	this.sliderUl.addEventListener('touchend',this._touchend.bind(this));
    	this.sliderUl.addEventListener('touchmove',this._touchmove.bind(this));
    },
    _transitionend() {
    	if(this.loopType === 'add') {
    		if(this.loopNum >= this.sliderCount - 2) {
	    		this.loopNum = 0;
	    		this.sliderUl.style.transition = 'none';
	    		this.sliderUl.style.transform = 'translateX(0)';
	    	}
    	}else {
    		if(this.loopNum <= 1) {
    			this.loopNum = this.sliderCount - 1;
    			this.sliderUl.style.transition = 'none';
    			this.sliderUl.style.transform = `translateX(-${this.sliderItemWidth*(this.sliderCount-1)}px)`;
    		}
    	}
    	
    },
    _touchstart(e) {
    	clearInterval(this.loopTimer);
    	this.startX = e.touches[0].clientX;
    },
    _touchend(e) {
    	// this.autoPlay();
    	const moveX = this.moveX;
    	if(moveX > 100) {
    		// 右滑
    		this.loopType = 'add';
    	}else {
    		this.loopType = 'mi';
    	}
    	this._loop();
    },
    _touchmove(e) {
    	this.moveX = this.startX - e.touches[0].clientX;

    	console.log(this.moveX);
 
    	this.sliderUl.style.transform = `translateX(-${this.sliderItemWidth*this.loopNum + (this.moveX)}px)`;
    }
}



export default Slider;