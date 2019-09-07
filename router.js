//路由请求模块
var fs = require('fs')

var express = require('express')

var student = require('./student')

var router = express.Router()//创建一个路由容器


//读取主页
router.get('/student',function(req,res){//将请求服务挂载到router容器中
	student.find(function(err,students){
		if(err){
			return res.send('文件读取失败')
		}
		res.render('index.html',{fruits : [
			'苹果',
			'香蕉',
			'菠萝',
			'芭乐'
			],
	 	students : students})
	})
})
//读取学生查找页面
router.get('/student/lookup',function(req,res){
	res.render('select.html')
})

router.post('/student/select/',function(req,res){
	// console.log(req.body)
	//获取表单提交名字
	//与json文件中的students数组做比较
	//匹配则返回该学生信息
	//若没有则返回查无此人
	// console.log(typeof req.body.name)
	student.findOne({
		name: req.body.name
		},
	 	function(err,students){
		if(err){
			res.send('查无此人')
		}
		if(students != null){
			// console.log(data)
		res.render('student.html',{students : students})
	}else{
		res.send('查无此人')
	}
		
	})
})

//读取添加学生页面
router.get('/student/new',function(req,res){
	res.render('new.html')
})
//读取添加学生后的主页
// router.post('/student/new/',function(req,res){
// 	//调用添加学生方法，将表单提交的数据作为参数传递
// 	console.log(req.body)
// 	new student(req.body).save(function(err,ret){
// 		if(err){
// 			return res.send("保存失败")
// 			console.log(ret)
// 		}
// 		res.redirect('/student')
// 	})
// })

router.post('/student/new/', function (req, res) {
  // 1. 获取表单数据
  // 2. 处理
  //    将数据保存到 db.json 文件中用以持久化
  // 3. 发送响应
  new student(req.body).save(function (err,ret) {
    if (err) {
    	console.log(ret)
      return res.status(500).send('Server error.')
    }
    res.redirect('/student')
  })
})


   //读取编辑学生后的页面
router.post('/student/edit/',function(req,res){
	var id = req.body.id.replace(/"/g,'')
	//通过id作为条件更新数据
		student.findByIdAndUpdate(id,req.body,function(err){//因为是post提交的数据所以路径数据保存在req.body中
			if(err){
				return res.send("错误")
			}
			res.redirect('/student')
		})
})



router.get('/student/delete',function(req,res){
	//根据id来删除学生
	// console.log(req.query.id)
	student.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
		if(err){
			return res.send("错误")
		}
		res.redirect('/student')
	})
	
})

//读取编辑学生页面
router.get('/student/edit',function(req,res){
	//获取要编辑的学生id
	//渲染编辑页面
	//由于路径中的req.query.id为字符串所以要调用parseInt()转为数字
	//repalce方法支持字符串模式和正则模式
	//字符串模式，简单但不支持全局和忽略大小写
	//正则表达式模式，强大，支持全局和忽略大小写
	student.findById(req.query.id.replace(/"/g,''),function(err,student){//student = ret
		if(err){
			return res.send("服务端错误")
		}
		res.render('edit.html',{
			students : student
		})
	})
})

	

module.exports = router //导出router