//// 入口文件
"use strict";
var koa=require('koa');
//koa-rooter当做路由，相当于Java里的控制器
var controller=require('koa-route');
var app=new koa();

//渲染模板中间件
var view=require('co-views');
var render=view('./view',{    //view即是项目下的view
	map:{html:'ejs'}   //ejs模板引擎
});   //实例化view方法参数1模板路径，参数2模板的渲染类型

//集成静态文件的中间件
var kos_static=require('koa-static-server');
app.use(kos_static({
	rootDir:'./static/',  //整个项目的目录
	rootPath:'/static/',    //在URL地址里访问时用的路径
	maxage:0,     //缓存设置为0 ，不缓存
}))

//借助service返回文件------接口处用
var service=require('./service/webAppService.js');

//控制器中间件    控制路由
app.use(controller.get('/route_test', function* () {
	this.set('Cache-Control','no-cache');
	this.body='hello koa-router test';
}))

//模板引擎
app.use(controller.get('/ejs_test', function* () {
	this.set('Cache-Control','no-cache');
	this.body=yield render('test',{title:'title_test'}); //ES6 异步执行 render(模板名字，传递额参数)
}))

//渲染首页页面 以ejs模板
app.use(controller.get('/', function* () {
	this.set('Cache-Control','no-cache');
	this.body=yield render('index',{title:'书城首页'}); 
}))

//渲染书籍页面 以ejs模板
app.use(controller.get('/book', function* () {
	this.set('Cache-Control','no-cache');
	var querystring=require('querystring');
	var params=querystring.parse(this.req._parsedUrl.query);
	var bookId=params.id;
	this.body=yield render('book',{bookId:bookId}); 
}))

//渲染搜索页面 以ejs模板
app.use(controller.get('/search', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search',{nav:'搜索'});
}));
app.use(controller.get('/backet', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('backet');
}));
 var querystring = require('querystring')
app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));
app.use(controller.get('/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('reader');
}));

app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male',{nav:'男生频道'});
}));

app.use(controller.get('/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female',{nav:'女生频道'});
}));

app.use(controller.get('/usercenter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('user-center',{nav:'用户中心'});
}));

app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank',{nav:'排行'});
}));

app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category',{nav:'分类'});
}));







//接口1------测试
app.use(controller.get('/api_test', function* () {
	this.set('Cache-Control','no-cache');
	this.body=service.get_test_data();
}))

//路由(接口)-----首页
app.use(controller.get('/ajax/index', function* () {
	this.set('Cache-Control','no-cache');
	this.body=service.get_index_data();
}))

//路由（接口）--rank
app.use(controller.get('/ajax/rank', function* () {
	this.set('Cache-Control','no-cache');
	this.body=service.get_rank_data();
}))

//路由（接口）--男频
app.use(controller.get('/ajax/male', function* () {
	this.set('Cache-Control','no-cache');
	this.body=service.get_male_data();
}))

//路由（接口）--女频
app.use(controller.get('/ajax/female', function* () {
	this.set('Cache-Control','no-cache');
	this.body=service.get_female_data();
}))

//路由（接口）--类别
app.use(controller.get('/ajax/category', function* () {
	this.set('Cache-Control','no-cache');
	this.body=service.get_category_data();
}))

//路由（接口）--书籍（按照id去取json）
app.use(controller.get('/ajax/book', function* () {
	this.set('Cache-Control','no-cache');
	var querystring=require('querystring');
	var params=querystring.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){   //容错
		id='';
	}
	this.body=service.get_book_data(id);
}))

//接口线上------搜索()
app.use(controller.get('/ajax/search', function* () {
	this.set('Cache-Control','no-cache');
	var querystring=require('querystring');
	var params=querystring.parse(this.req._parsedUrl.query);
	var start=params.start;
	var end=params.end;
	var keyword=params.keyword;
	this.body=yield service.get_search_data(start,end,keyword);     //异步返回
}))

app.listen(3001); //端口配置
console.log('koa server is started!');

