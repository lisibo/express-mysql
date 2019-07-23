var express = require('express');
var router = express.Router();
var usr = require('../db/db')

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
  let {username,password} = req.body;
  let client = usr.connect();
  var id = null;
  usr.insertFun(client,id,username,password,(err)=>{
    if(err) throw err;
    res.send('注册成功');
  })
})

router.route('/login').get((req,res)=>{
  res.render('login',{title:"登录"})
}).post((req,res)=>{
  let {username,password} = req.body
  let client = usr.connect();
  result = null;
  usr.selectFun(client,username,(result)=>{
    if(result[0] === undefined){
      res.json({
        code:2,
        msg:'用户不存在'
      })
    }else if(result[0].password === password){
      res.cookie('isLogin',username,{maxAge:60000})
      res.redirect('/home')
    }else{
      res.json({
        code:'0',
        msg:'用户名或密码错误'
      })
    }
  })
})

router.get('/home',(req,res)=>{
  if(req.cookies.isLogin){
    res.render('home',{title:'home',user:req.cookies.isLogin})
  }else{
    res.redirect('/');
  }
  
})

router.get('/out',(req,res)=>{
  res.clearCookie('isLogin');
  res.redirect('/');
})

module.exports = router;
