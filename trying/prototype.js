/**
 * Created by prateek on 29/2/16.
 */
//var abc=function(){
//  return {
//    "name":"Prateek"
//  };
//};
var def=function(){
  return {
    "name":"Prateek"
  };
};

var obj={"Place":"Pantnagar","number":"1234567890"};
var obj2=new def();


for(var key in obj){
  obj2.append(key,obj[key]);
}


console.log(obj2);
