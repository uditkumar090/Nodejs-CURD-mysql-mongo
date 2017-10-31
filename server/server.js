const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const _ = require('lodash');
const {Users,Tbl_user_auths} = require('./../models/tbl_user_auth');


var publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;
var app=express();

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/login/me',(req,res)=>{
         var body=_.pick(req.body,['username','password']);

         var UserAuth= new Users({
            username:body.username,
            password:body.password,
            createdAt:new Date().getTime(),
            updatedAt: new Date().getTime()
         });

         var tbl_user_auths = Tbl_user_auths.build({
             username:body.username,
             password:body.password,
             createdAt:new Date().getTime(),
             updatedAt: new Date().getTime()
         });
         // //Inserting Data into database
         tbl_user_auths.save().then((tbl_user_auths)=>{
              res.status(200).send(tbl_user_auths.get());
         }).catch((e)=>{
                console.log(e);
                res.status(401).send(e.errors);
         });

        //  UserAuth.save().then((doc)=>{
        //     res.send(doc);
        //  },(e)=>{
        //     res.status(400).send(e);
        //  }).catch(console.error);

});


app.post('/login/me/update',(req,res)=>{
      var body = _.pick(req.body,['id','username','password']);

      Tbl_user_auths.findOne({
          where:{
            id:body.id
          }
       }).then((doc)=>{
        if(!doc){
         res.status(401).json({msg:'Not Match Record found'});
         }
         console.log(doc);
         doc.updateAttributes({
               password:body.password,
               username:body.username
         }).then((data)=>{
                res.json(data.get());
         }).catch((e)=>{
                res.json(e);
         });

      }).catch((e)=>{
            console.log(e);
      });
});

app.post('/login/me/destroy',(req,res)=>{
         var body=_.pick(req.body,['id']);

         Tbl_user_auths.findOne({where:{id:body.id}}).
         then((doc)=>{
              if(!doc){
                res.status(401).json('Your given id not matched');
              }
              doc.destroy({}).then((doc)=>{
                  res.json(doc);
              }).catch(console.error);

         }).catch((e)=>{
              res.json(e);
         });
});

app.listen(port,()=>{
    console.log('connected on port 3000');
});
