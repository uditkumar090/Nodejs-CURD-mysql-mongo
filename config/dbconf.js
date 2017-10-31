var mongoose= require('mongoose');
var sequelize = require('sequelize');

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/cryptocurrency', { useMongoClient: true },(ignore,connection)=>{
     connection.onOpen()
}).then(()=>{
   console.log('mongodb connected successfully');
}).catch(console.error);

var Sequelize=new sequelize('NODEJS','root','uditkumarsharma',{
     host:'localhost',
     dialect:'mysql',
     pool:{
       max:1,
       min:0,
       idle:10000
     },
     engine: 'MYISAM'
});

Sequelize.authenticate().then(()=>{
  console.log('MYSQL connected successfully');
}).catch((e)=>{
   console.log('error',e);
});


module.exports = {mongoose,Sequelize};
