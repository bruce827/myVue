// var name = 'xj';
// name.len = 2;
// console.log(name.len);
// name.toUpperCase();
// console.log(name);

//===
// var flag1 = true;
// var flag2 = true;
// console.log(typeof flag1 == flag2);
// console.log(typeof (flag1 == flag2));


// ===
// var null;
// var undefind;
// var name = null;

// console.log( (typeof name));
// var arr = [];
// console.log(arr);

//====
// console.log(0.1+0.2);


// ===
// var str = 'xj';
// str.length = 5;
// console.log(str.length);



// ===
// Boolean(new Boolean(false));


// ===
// 对象直接量
// var person = {
//     name:'',
//     age:''
// };
// new
// var person = Object();
// 构造函数
// var person = function(name,age){
//     this.name = name;
//     this.age = age;
//     this.toString = function(){
//         console.table(name,age);
//     }
// };
// var person_xj = new Person('徐健',18);
// var person_yz = new Person('扬州',20);
// 原型链创建
// function Person() {}
// Person.prototype.name = 'Nike';
// Person.prototype.age = 20;
// Person.prototype.sayName = function () {
//     console.log(this.name);
//     (this.name);
// };
// var person_xj = new Person();
// person_xj.name = '徐健';
// person_xj.sayName();
// // object.create
// var roles = {
//     type: "Admin", //Default value of properties
//     displayType: function () {
//         console.log(this.type); //Mehtod which will display type of role
//     }
// }
// var super_role = Object.create(roles);
// super_role.displayType();
// var guest_role = Object.create(roles);
// guest_role.type = "Guest";
// guest_role.displayType();
// var testObj = Object.create(null)
// testObj.type = "xx"
// testObj.displayType = new Function("a", "console.log(a)");
// testObj.displayType("abc")

// ===
// var a = -1;
// console.log(+a);

// ===
// var a = 1;
// var b = a+++a;
// console.log(b);

// var a = 3;
// console.log(++a == 3);

// ===
// var a = 1;
// var b = 2;
// var result = (a == 2 || b == 2);
// console.log(result);
// var x = a || b ;
// console.log(x);

// a && b || c

// !(x&&y) 

// 7>6>5

var a = b = 1;