# 함수 다루기

## 함수, 메서드, 생성자
- 함수, 메서드, 생성자를 잘 구분하여 사용하자.

### 함수(1급 객체)
- 변수나 데이터에 담길 수 있다
- 매개변수로 전달 가능(콜백 함수)
- 함수가 함수를 반환(고차 함수)

## argument & parameter
Parameter(Formal Parameter): 형식을 갖춘, 매개변수
Argument(Actual parameter): 실제로 사용되는, 인자 or 인수

## 복잡한 인자 관리하기
- 매개변수가 무조건 3개 이상이 나쁘다는게 아니다. 맥락이 중요하다.
- 인자를 객체로 구성하자.

## Default Value

```javascript
const required = (argName) => {
    throw new Error('required is '+ argName);
}

function createCarousel({
    items = required('items'),
    margin = 0,
    center = false,
    navElement = 'div' } = {}) {
    return {
        margin,
        center,
        navElement
    }
}
createCarousel();
```

## Rest Parameters
[나머지 매개변수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters)

## void & return
함수가 반환이 있는지 없는지 확인하고 return을 사용하자.

## 화살표 함수
객체 메서드에서 사용할 때 this 주의
arguments, call, apply, bind 사용할 수 없다
rest parameters를 이용하여 arguments
생성자 함수로 사용할 수 없다.
class,
generator

## Callback function
함수의 제어권을 위임한다.

## 순수 함수

## Closure
사용해보고 단점, 메모리 문제점, 메모이제이션 등을 알아보자.

```javascript
function log(value) {
    return function (fn) {
        fn(value);
    }
}

const logFoo = log('foo');

logFoo((v)=>console.log(v));
logFoo((v)=>console.info(v));
logFoo((v)=>console.error(v));
logFoo((v)=>console.warn(v));
```

```javascript
function fetcher(endpoint) {
    return function (url, options) {
        return fetch(endpoint + url, options)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.error);
                }
            })
            .catch((err) => console.error(err));
    }
}

const naverApi = fetcher("http://naver.com");
const daumApi = fetcher("http://daum.net")

```

## 고차 함수

## Currying