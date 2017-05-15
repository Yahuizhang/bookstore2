//读取文件，使内容暴露出去
var fs=require('fs');
exports.get_test_data=function(){
    var content=fs.readFileSync('./mock/test.json','utf-8');
    return content;
}

//获取首页信息
exports.get_index_data= function () {
    var content=fs.readFileSync('./mock/home.json','utf-8');
    return content;
}

//获得rank信息
exports.get_rank_data= function () {
    var content=fs.readFileSync('./mock/rank.json','utf-8');
    return content;
}

//获得书籍信息(按照id去取json)
exports.get_book_data= function (id) {
    if(!id){    //容错处理，如果没有id的话，则传入已有或者默认的id
        id='18218';
    }
    var content=fs.readFileSync('./mock/book/'+id+'.json','utf-8');
    return content;
}

//获得女频信息
exports.get_female_data= function () {
    var content=fs.readFileSync('./mock/channel/female.json','utf-8');
    return content;
}

//获得男频信息
exports.get_male_data= function () {
    var content=fs.readFileSync('./mock/channel/male.json','utf-8');
    return content;
}

//获得分类信息
exports.get_category_data= function () {
    var content=fs.readFileSync('./mock/category.json','utf-8');
    return content;
}

//搜索信息   线上接口获得的信息，其余的数据模拟获得的
exports.get_search_data=function(start,end,keyword){
    return function (cb){ //接受的回调时才执行
        var http=require('http');    //http模块   发送请求，
        var qs=require('querystring');     //把一个object对象转换为一个http参数  ，例子如下：
        //{a:'1'}    把前面的转换为后端接受到的接口样式http:127.0.0.1/api?a=1
        var data={
            s:keyword,
            start:start,
            end:end
        };
        var content=qs.stringify(data);
        var http_request={
            hostname:'dushu.xiaomi.com',   //线上地址
            port:80,     //设置80端口
            path:'/store/v0/lib/query/onebox?'+content
        }

        //发送请求
        req_obj=http.request(http_request,function(_res){    //_res响应对象
            var content='';
            _res.setEncoding('utf8');   //设定返回的数据格式
            _res.on('data',function(chunk){ //接受都返回的数据后触发data方法，他是按块返回的，还不是完全返回
                                            //因此还需要监听end事件
                content+=chunk;
            })
            _res.on('end',function(){  //end事件触发时，数据完全返回。之后在执行
                cb(null,content);   //错误代码，返回内容
            })
        })

        //请求出错时的
        req_obj.on('error',function(){

        })

        req_obj.end();
    }
}