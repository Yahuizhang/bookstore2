//联通数据
$.get('/ajax/index',function(d){
	var windowWidth=$(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
	
	new Vue({
		el:'#app',
		data:{
			screen_width:windowWidth,
			double_screen_width:windowWidth*2,
			top:d.items[0].data.data,
			hot:d.items[1].data.data,
			recommend:d.items[2].data.data,
			female:d.items[3].data.data,
			male:d.items[4].data.data,
			free:d.items[5].data.data,
			topic:d.items[6].data.data,
			//书城、书架切换的属性  默认
			duration:0,
			position:0,
			header_position:0,
			header_duration:0,
			tab_1_class:'Swipe-tab__on',
			tab_2_class:''
		},
		methods:{
			tabSwitch:function(pos){
				this.duration=0.5;
				this.header_duration=0.5;
				if(pos==0){
					this.position=0;
					this.header_position=0;
					this.tab_1_class='Swipe-tab__on';
					this.tab_2_class='';
				}
				if(pos==1){
					this.position=(-windowWidth);
					this.header_position=100;
					this.tab_1_class='';
					this.tab_2_class='Swipe-tab__on';
				}
			}
		}
		
	})
},'json');

