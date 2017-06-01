var windowWidth=$(window).width();
if(windowWidth<320){
    windowWidth=320;
}
$.get('/ajax/female',function(d){
    new Vue({
        el:'#app',
        data:{
            data:d,
            screen_width:windowWidth
        }
    });

},'json');
