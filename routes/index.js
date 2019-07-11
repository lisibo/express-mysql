var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
  // if(req.cookies.isLogin){
  //   req.session.isLogin = req.cookies.isLogin
  // }
  // if(req.session.isLogin){
  //   res.locals.
  // }
  res.render('index',{title:"首页",username:req.cookies.username})
})

router.route('/registe').get((req,res)=>{
  res.render('registe',{title:"注册"})
}).post((req,res)=>{
  res.send('你是谁')
})

router.route('/login').get((req,res)=>{
  res.render('login',{title:"登录"})
}).post((req,res)=>{
  res.send('你是猪')
})
  

module.exports = router;
