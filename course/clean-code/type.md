# 섹션3. 타입 다루기

## 타입 검사
- 자바스크립트는 동적인 타입을 가지는 언어이고 때문에 타입도 동적이다.
- 타입검사는 어려우며, 주의가 필요하다.
- RRIMITIVE vs REFERENCE 타입검사 시 주의점을 알자.
- 아래의 구글링 키워드로 가장 적절한 답을 찾으면 좋다.

```text
javascript is function
javascript is string
javascript is array
```

### typeof

```javascript
typeof '문자열' // 'string'  
typeof ('문자열') // 'string'

class MyClass {}
typeof MyClass // 'function' ??

// 래퍼 객체
const str = new String("문자열");
typeof str // 'object' ??

typeof null // 'object' => 언어적인 오류
```

### instanceof

```javascript
const arr = [];
const func = function () {};
const date = new Date();

arr instanceof Array // true
func instanceof Function // true
date instanceof Date // true

// 프로토타입 최상위에는 오브젝트가 있으므로 true
arr instanceof Object // true ??
func instanceof Object // true ??
date instanceof Object // true ??

Object.prototype.toString.call(date); // '[object Date]'
```

## undefined & null
쓰임을 조심하고, 컨벤션을 정의하여 둘을 사용하는 것이 좋다.

```javascript
null === false // false
!null === true // true

null + 123 // 123

undefined == null // true
undefined === null // false

!undefined
undefined + 123 // NaN

typeof undefined // 'undefined'

```

## eqeq 줄이기
느슨한 동등연산자 Equality(==)
엄격한 동등연산자 Strict equality(===)

동등연산자를 이용하면 형변환(type casting)이 일어나 정확한 비교가 되지 않는다.
eslint 룰을 추가하자(eqeqeq)

```javascript
'1' == 1
1 == true

input.value // '0' 
input.value == 0 // 위험
Number(input.value) === 0 // OK
input.valueAsNumber === 0 // OK
```

## 형변환 주의하기
예측 가능한 명시적인 형변환을 하자.
[JS Comparison Table](https://dorey.github.io/JavaScript-Equality-Table/)

### 암묵적 변환
```javascript
11 + ' 문자와 결합' // '11 문자와 결합'

!!'문자열' // true
!!'' // false
```

### 명시적 변환
```javascript
String(11 + ' 문자와 결합');

Boolean('문자열');
Boolean('');

parseInt('9.9999', 10) // 9
```

> paseInt(string, radix) 사용시 radix 매개변수는 기본 값을 꼭 지정해주자. [**기본 값이 10이 아니다.**](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

## isNaN
isNaN은 문제가 많다.
Number.isNaN을 사용하여 엄격하게 검사하자.

```javascript
isNaN(123) // false: 123은 숫자가 아닌게 아니다. => 숫자가 맞다.

isNaN(123+'wow') // true 느슨한 검사
Number.isNaN(123+'wow') // false 엄격한 검사
```
