# 섹션2. 변수 다루기

## var를 지양하자

## function scope, block scope

## 전역 공간 사용 최소화하자
브라우저: window, Node.js: global
전역 변수보다는 지역변수, IIEF, 모듈, 클로져, const, let을 사용하여 전역 공간을 깨끗하게 하자.

## 임시변수 제거하기
변수의 CRUD를 최소화하여 사이드이펙트를 줄인다.
(하나의 역할만 할 수 있도록, 수정하고 싶은 유혹을 느끼지 못하도록)

### 이유는?
- 임시변수를 사용하게 되면 그 변수를 연산하고 변경함으로
- 명령형으로 가득한 로직이 되고
- 어디서 어떻게 에러가 발생했는지 디버깅이 힘들다
- 추가적인 코드를 작성하게 유혹한다.

### 해결책
- 함수를 나누기
- 바로 반환하기
- 고차함수 이용하기(map, filter, reduce)
- 선언형으로 작성하기

```javascript
// before
function getObject() {
    const result = {}; // 임시 객체

    result.title = document.querySelector(".title");
    result.text = document.querySelector(".text");
    result.value = document.querySelector(".value");

    return result;
}

// after
function getElements() {
    return {
        title: document.querySelector(".title"),
        text: document.querySelector(".text"),
        value: document.querySelector(".value"),
    }
}
```

## 호이스팅 주의하기

### 호이스팅이란?
런타임시에 선언이 최상단으로 끌어올려진다. 
런타임시기에 선언과 할당이 분리된 것 

### 문제?
코드 작성 시 예측 하지 못한 실행 결과를 유발할 수 있다.

### 해결책
- var를 사용하지 않는다. -> let, const 지향
- 함수 표현식을 사용한다.
(실수의 여지를 줄여준다.)

```javascript
const sum = function() {
    return 1 + 2;
}
```