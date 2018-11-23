/*
 * @作者: 徐健 
 * @日期: 2018-11-20 09:17:00 
 * @最后修改:   徐健 
 * @最后修改时间: 2018-11-20 09:17:00 
 */


var O_student = {

}
function car(){ 
    var _wheel = 3;
    this.wheel = 4;
    this.getPrivateVal = function(){ 
        return _wheel; 
    } 
} 
var car1 = new car(); 
car1.wheel = 4;
console.log(car1.getPrivateVal());

var DATABASE_URL = '172.0.0.1:8080';

/**
 * @description
 * @author bruce
 * @date 2018-11-19
 */
function add(){
    console.log('bruce');
    
 };