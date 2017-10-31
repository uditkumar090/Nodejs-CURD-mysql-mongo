var DataTypes      = require('sequelize');
const {mongoose,Sequelize}=require('./../config/dbconf.js');
const validator = require('validator');
const jwt= require('jsonwebtoken');
const _ =require('lodash');

var userSchema = new  mongoose.Schema({
     username:{
       type:String,
       required:true,
       minlength:1,
       trim:true,
       unique:true
     },
     password:{
        type:String,
        trim:true,
        required:true,
        minlength:6
   },
   createdAt:{
     type:Date
   },
   updatedAt:{
     type:Date
   }
});

var Tbl_user_auths = Sequelize.define('tbl_user_auths', {
         id :{
           type:DataTypes.STRING,
           primaryKey:true,
           defaultValue:DataTypes.UUIDV4
          },
         username:{
           type:DataTypes.STRING(125),
           allowNull:false,
           unique: {
                args: true,
                message: 'Username must be unique.'
            },
           validate:{
             notEmpty:{
               args:true,
               msg:'Users Name is required'
             },
             len:{
               args:[1,24],
               msg:'Min lenght 1-24 User Name one require'
             }
            }
           ,
           get(){
             return this.getDataValue('username');
           }
         },
         password:{
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
             notEmpty:{
               msg:'Password Should not be empty'
             },
             len:{
               args:[6,25],
               msg:'Password min 6 and max 25 length'
             }
          },
          get(){
             return this.getDataValue('password');
          }
         },
         createdAt:{
           type:DataTypes.DATE,
           allowNull:false,
           get(){
             return this.getDataValue('createdAt');
           }
         },
         updatedAt:{
           type:DataTypes.DATE,
           allowNull:false,
           get(){
             return this.getDataValue('updatedAt');
           }
         }
});

Tbl_user_auths.sync({force:false}).then(()=>{
   console.log('Table Created Successfully');
}).catch((e)=>{
     console.log('error while creating table : ERROR :Table dosenot exits');
});



var Users = mongoose.model('tbl_user_auth',userSchema);

module.exports =  {Users,Tbl_user_auths};
