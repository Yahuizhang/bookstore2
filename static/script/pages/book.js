var id=location.href.split('?id=').pop();
$.get('/ajax/book?id='+id,function(d){
	
	var windowWidth=$(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
	console.log(d);
	new Vue({
		el:'#app',
		data:{
			d:d,
			screen_width:windowWidth,
			double_screen_width:windowWidth*2,
		},
		methods:{
			readBook:function(){
				location.href='/reader'
			}
		}
	})
},'json');
