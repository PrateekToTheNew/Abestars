/**
 * Created by prateek on 27/2/16.
 */
var express=require('express');
var mongojs=require('mongojs');
var db=mongojs('images',['dump']);
var app=express();

//app.use(express.static(__dirname));
app.use("/", express.static(__dirname));

app.get('/images',function(req,res){
    console.log("/images");
    db.dump.find(function(err,docs){
        res.send(docs);
    });
});

//app.get('/',function(req,res){
//    console.log('/index');
//    res.render('index.html');
//    res.end();
//});

app.listen(3000);
console.log("Express server started on port 3000");
console.log(__dirname);