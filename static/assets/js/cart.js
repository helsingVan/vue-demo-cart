window.onload = function(){
	window.vm = new Vue({
		el: '#app',
		data: {
			productList: [],
			isCheckAll: false,
			totalMoney: 0,
			delFlag: false,
			delItem: null
		},
		filters: {
			money: function(value){
				return '$'+ value.toFixed(2);
			}
		},
		// computed: {
		// 	totalMoney: function(){
		// 		return parseInt(this.productList.productPrice)*this.productList.productQuentity;
		// 	}
		// },
		mounted: function(){
			this.$nextTick(function(){
				this.getData();
			});
		},
		methods: {
			getData: function(){
				this.$http.get('/cart.json').then(function(data){
					var product = data.data.result.productList;
					this.productList = product;
					// console.log(product);
				})
			},
			setCounter: function(item,type){
				if(type>0){
					item.productQuentity++;
				}else {
					item.productQuentity--;
					if(item.productQuentity<1){
						item.productQuentity = 1;
					}
				}
				this.getTotal();
			},
			checkProduct: function(item){
				if(typeof item.checked == 'undefined'){
					Vue.set(item,'checked',true);
				}else {
					item.checked = !item.checked;
				}
				this.getTotal();
			},
			setAll: function(){
				this.isCheckAll = !this.isCheckAll;
				var _this = this;
				if(this.isCheckAll){
					this.productList.forEach(function(v,i){
						v.checked = true;
					})
				}else {
					this.productList.forEach(function(v,i){
						v.checked = false;
					})
				}
				this.getTotal();
			},
			cancelAll: function(){
				this.isCheckAll = false;
				this.productList.forEach(function(v,i){
					if(v.checked){
						v.checked = false;
					}
				});
				this.getTotal();
			},
			getTotal: function(){
				this.totalMoney = 0;
				var _this = this;
				this.productList.forEach(function(v,i){
					if(v.checked){
						_this.totalMoney += v.productPrice*v.productQuentity;
					}
				})
			},
			delProduct: function(item){
				this.delFlag = true;
				this.delItem = item;
			},
			delYes: function(){
				var index = this.productList.indexOf(this.delItem);
				this.productList.splice(index,1);
				this.delFlag = false;
			}
		}
	});
	
}