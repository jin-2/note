# 배열 다루기

## JavaScript의 배열은 객체다

```javascript
const arr = [1, 2, 3];
const obj = {
    0: 1,
    1: 2,
    2: 3
}
```

```javascript
const arr = [1, 2, 3];

if (typeof arr === "object") console.log('배열 확인2');

if (arr instanceof Array) console.log('배열 확인4');

if (arr .constructor === Array) console.log('배열 확인5');

if (Object.prototype.toString.call(arr) === '[object Array]') console.log('배열 확인6'); 

// ES5 추천!
if (Array.isArray(arr)) console.log('배열 확인7');
```

## Array.length

마지막 요소의 자릿수가 length
```javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3

arr[9] = 10;
console.log(arr.length, arr); // 10, [1, 2, 3, , , , , , , 10]
```

length를 이용해 배열 초기화
```javascript
Array.prototype.clear = function() {
    this.length = 0;
}

function clearArray(array) {
    array.length = 0;
    return array;
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

arr1.clear();
console.log(arr1);

clearArray(arr2);
console.log(arr2);
```

## 배열 요소에 접근하기
- 인덱스로 접근하는 모호함보다는 구조 분해 할당을 활용하여 명시적으로 접근 요소를 표현하자.
- 유틸 함수를 만들자. 예를 들어 lodash의 `_.head(array)`

```javascript
function head(arr) {
    return arr[0] ?? "";
}
```

```javascript
const google = "A B C";
const arr = google.split(" ");

console.log(arr[0]);

// better
const [a, b, c] = arr;
console.log(a);

function getGoogle([a, b, c]) {
    console.log(a);
}
```

## 유사 배열 객체 
NodeList, arguments

## 불변성
- 배열을 복사한다.
- 새로운 배열을 반환하는 메서드들을 활용한다.

## for 문 배열 고차 함수로 리팩터링

## 배열 메서드 체이닝 활용하기

## map vs forEach

## Continue & Break
- for문에서 흐름을 제어하기 위해서 사용된다.(for...of, for...in)
- forEach, map, reduce등은 중간에 멈출 수 없다.
- 조기에 반복을 종료할 수 있는 메서드(every, some, find, findIndex)를 이용해보자.