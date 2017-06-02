/**
 * Created by Administrator on 2017/6/2.
 */
var windowWidth=$(window).width();
if(windowWidth<320){
    windowWidth=320;
}
$.get('/ajax/category',function(d){
    new Vue({
        el:'#app',
        data:{
            data:d,
            screen_width:windowWidth
        }
    });

},'json');
