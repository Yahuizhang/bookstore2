/**
 * Created by Administrator on 2017/6/2.
 */
var windowWidth=$(window).width();
if(windowWidth<320){
    windowWidth=320;
}
$.get('/ajax/rank',function(d){
    for(var i=0;i<d.items.length;i++){
        d.items[i].description=d.items[i].description.split('\n');
        // d.items[i].description=d.items[i].description.split('、');
    }
    new Vue({
        el:'#app',
        data:{
            data:d,
            screen_width:windowWidth
        }
    });

},'json');
