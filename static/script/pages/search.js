
var windowWidth=$(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
new Vue({
		el:'#app',
		data:{
			search:[],
			condition:true,
			empty:false,
			tagsIsShow:'block',
			screen_width:windowWidth
		},
		methods:{
			doSearch:function(){
				var keyword=$("#search-input").val();
				var _this=this;
				//联通数据
				$.get('/ajax/search',{
					keyword:keyword
				},function(d){
					_this.constructor=false;
					_this.search=d.items;
					if(_this.search.length==0){
						_this.empty=true;
					}else{
						_this.empty=false;
						_this.tagsIsShow='none';
					}
				},'json');
				
				
			}
			
		}
		
	})