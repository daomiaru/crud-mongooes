//服务器入口模块
var express = require('express')
var router = require('./router')//加载路由模块

var bodyParser = require('body-parser')

// var fs = require('fs') 

//创建app服务器
var app = express()

app.engine('html',require('express-art-template'))

//配置bodyparser
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))

app.use(router)//把路右容器挂载到app服务中


app.listen(3000,function(){
	console.log('running')
})


module.exports = app