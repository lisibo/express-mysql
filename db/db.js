var mysql = require('mysql');

function connectServer(){
  var client = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root1231',
    database:'lsb'
  })
  return client;
}

function selectFun(client,username,callback){
  client.query(`select password from list where username='${username}'`,(err,result,fields)=>{
    if(err) throw err;
    callback(result)
  })
}

function insertFun(client,id,username,password,callback){
  client.query(`insert into list value(?,?,?)`,[id,username,password],(err,result)=>{
    if(err){
      console.log("error"+err.message)
      return err;
    }
    callback(err)
  })
}

exports.connect = connectServer;
exports.selectFun = selectFun;
exports.insertFun = insertFun;