//联通数据
$.get('/ajax/search',function(d){
	var windowWidth=$(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
	
	new Vue({
		el:'#app',
		data:{
			screen_width:windowWidth,
			
		},
		methods:{
			
		}
		
	})
},'json');

