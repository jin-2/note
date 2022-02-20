# 객체 다루기

## Shorthand Properties
- Concise Method: 간결한 메서드
- ES2015+

```javascript
const firstName = "sujin";
const lastName = "Lee";

const person = {
    firstName: firstName,
    lastName: lastName,
    getFullName: function() {
        return this.firstName + " " + this.lastName;
    }
}

const personShort = {
    firstName,
    lastName,
    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
```

## Computed Property Name

```javascript
const handleChange = (e) => {
    setState({
        [e.target.name]: e.target.value
    });
}

const funcName0 = "func0";
const funcName1 = "func1";
const funcName2 = "func2";
const obj = {
    [funcName0]() {
        return "func0";
    },
    [funcName1]() {
        return "func1";
    },
    [funcName2]() {
        return "func2";
    }
}
for (var i = 0; i < 3; i++) {
    console.log(obj[`func${i}`]());
}
```

## Lookup Table
- key와 value의 쌍으로 나열된 테이블
- Computed Property Name을 활용해서 불필요한 분기분을 줄였다.

```javascript
function getUserType(type) {
    switch (key) {
        case 'ADMIN':
            return '관리자';
        case 'INSTRUCTOR':
            return '강사';
        case 'STUDENT':
            return '수강생';
        default:
            return '해당 없음';
    }
}

// better
function getUserType(type) {
    const USER_TYPE = {
        ADMIN: '관리자',
        INSTRUCTOR: '강사',
        STUDENT: '수강생',
        UNDEFINED: '해당 없음'
    }
    
    return USER_TYPE[type] ?? USER_TYPE.UNDEFINED;
}
```

## Object Destructuring
- 함수에서 인자가 3개 이상일 경우 객체로 구성한다.
- TypeScript가 아닌 경우 필수값을 별도의 인자로 받고, 나머지 인자는 객체(options)로 구성한다. (라이브러리에서 많이 구현함)

배열은 자바스크립트에서 객체로 취급된다.
```javascript
const orders = ['first', 'second', 'third'];

const [one, , three] = orders;

const {0: st2, 2: rd2} = orders;

console.log(one, three);
console.log(st2, rd2);
```

## Object.freeze
deep copy
- 대중적인 유틸 라이브러리(lodash)
- 직접 유틸 함수 생성
- stack overflow
- TypeScript => readonly

## Prototype 조작 지양하기
- class 이용하자.
  - 직접 만들어서 모듈화 => 배포 => NPM
- JS 빌트인 객체를 건들지말자.

몽키패치?
런타임 중인 프로그램 메모리의 소스 내용을 직접 바꾸는 기법

## hasOwnProperty
`Object.prototype.hasOwnProperty.call(foo, 'bar');`

[프로퍼티의 명칭으로서 hasOwnProperty 를 사용하기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty#%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0%EC%9D%98_%EB%AA%85%EC%B9%AD%EC%9C%BC%EB%A1%9C%EC%84%9C_hasownproperty_%EB%A5%BC_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

```javascript
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // always returns false

// Use another Object's hasOwnProperty and call it with 'this' set to foo
({}).hasOwnProperty.call(foo, 'bar'); // true

// It's also possible to use the hasOwnProperty property from the Object prototype for this purpose
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```
 
```javascript
function hasOwnProp(targetObj, targetProp) {
    return Object.prototype.hasOwnProperty.call(targetObj, targetProp);
}
```

## 직접 접근 지양하기
- 모델를 다루는 레이어를 분리하여 위임한다.
- getter, setter

```javascript
const model = {
    isLogin: false,
    isValidToken: false
};

function setLogin(bool) {
    model.isLogin = bool;
    serverAPI.log(model.isLogin);
}

function setValidToken(bool) {
    model.isValidToken = bool;
    serverAPI.log(model.isValidToken);
}

// bad
// function login() {
//     model.isLogin = true;
//     model.isValidToken = true;
// }

function login() {
    setLogin(true);
    setValidToken(true);
}

function logout() {
    setLogin(false);
    setValidToken(false);
}

someElement.addEventListener('click', login);
```

## Optional Chaining

```javascript
let nestedProp = obj.first && obj.first.second;

// better
let netedProp = obj.first?.second;

// 위 코드와 같다.

let temp = obj.first;
let netedProp = ((temp === null || temp === undefined) ? undefined : temp.second)

// Optional chanining으로 배열 항목에 접근하기
let arrayItem = arr?.[42];
```

## Extends & Mixin