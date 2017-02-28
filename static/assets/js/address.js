window.onload = function(){



	window.address = new Vue({
		el: '#address',
		data: {
			addressData: [],
			num: 3,
			checkIndex: '',
			song:0
		},
		mounted: function(){
			this.getData();
		},
		computed: {
			addList: function(){
				return this.addressData.slice(0,this.num);
			}
		},
		methods: {
			getData: function(){
				var _this = this;
				this.$http.get('/address.json').then(res=>{
					_this.addressData = res.data.result;
					console.log(this.addressData);
				})
			},
			more: function(){
				if(this.num === 3){
					this.num = this.addressData.length;
				}else {
					this.num = 3;
				}
			},
			setDefault: function(index){
				this.addressData.forEach(function(v,i){
					if(i === index){
						v.isDefault = true;
					}else {
						v.isDefault = false;
					}
				})
			}
		}
	});
}