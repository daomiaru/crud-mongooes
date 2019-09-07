
var mongoose = require('mongoose')

var Schema = mongoose.Schema
//1.连接数据库，指定的数据库若不存在，则mongoDB会自动创建
mongoose.connect('mongodb://localhost:27017/student',{  useNewUrlParser: true})


//2.设计表结构
//字段名称就是表结构中的属性名称
//约束的目的是为了数据的完整性，不要有脏数据
var userSchema = new Schema({
  name: {
    type: String,
    required: true //必须有
  },
  gender:{
    type: Number,
    enum:[0,1],
    default : 0
  },
  age: {
    type: Number
  },
  hobies: {
    type: String
  }
})


//3.将表结构发布为模型
//mongoose.model方法用于一个model
//第一个参数：传入一个大写字母单数名词字符串用于表示
//返回值：模型构造函数
module.exports = mongoose.model('Student',userSchema)

