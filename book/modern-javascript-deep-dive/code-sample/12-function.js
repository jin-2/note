var add = function foo(x, y) {
    return x + y;
};

console.log(add(1, 3));
// console.log(foo(1, 3));

// 12.4.3
console.dir(add2);
console.dir(sub);

console.log(add2(2, 3));
// console.log(sub(2, 3));

function add2(x, y) {
    return x + y;
}

var sub = function (x, y) {
    return x - y;
}

var add3 = new Function("x", "y", "return x + y");
console.log(add3(5, 6));

var add4 = (function(){
    var a = 10;
    return function (x, y) {
        return x + y + a;
    }
}());
console.log('add4 ', add4(1, 2));

var add5 = (function(){
    var a = 10;
    return new Function("x", "y", "return x + y + a;");
}());
// console.log('add5 ', add5(1, 3));

function add6(x, y) {
    if (typeof x !== "number" || typeof y !== "number") {
        throw new TypeError("인수는 모두 숫자 값이어야 합니다.")
    }
    return x + y;
}
// console.log('add6 ', add6(1));
// console.log('add6 ', add6("가"));

function foo() {

}
console.log('return: ', foo());

// 12.6
function changeVal(primitive, obj) {
    primitive += 100;
    obj.name = "Kim";
}

var num = 100;
var person = { name: "Lee" };

console.log(num); // 100
console.log(person); // {name: "Lee"}

changeVal(100, person);

console.log(num); // 100
console.log(person); // {name: "Kim"}

console.log(typeof (function fn() {}));

(function () {
    console.log("=> 1");
}());

(function () {
    console.log("=> 2");
})();

!function() {
    console.log("=> 3");
}();

+function() {
    console.log("=> 4");
}();

var res = (function() {
    var a = 3;
    var b = 5;
    return a * b;
}());

console.log(res);

res = (function(a, b) {
    return a * b;
}(3, 7));

console.log(res);

function countdown(n) {
    for (let i = n; i >= 0; i--) {
        console.log(i);
    }
}

// countdown(10)
console.clear();

function countdown2(n) {
    if (n < 0) return;
    console.log(n);
    countdown2(n - 1);
}

countdown2(3);

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(3));

function factorial2(n) {
    if (n <= 1) return 1;
    let res = n;
    while (--n) {
        res *= n;
    }
    return res;
}

console.log('?!',factorial2(5));

function repeat(n, f) {
    for (var i = 0; i < n; i++) {
        f(i);
    }
}

var logAll = function(i) {
    console.log(i);
}

repeat(3, logAll);

repeat(5, function(i) {
    if (i % 2) console.log(i);
}); // 1, 3
