# 섹션4. 경계 다루기

## min - max
min과 max를 다룰 때 이상, 이하, 초과, 미만 어떤 것으로 다룰지 컨벤션으로 정해야 모호함이 없다.

1. 최소값과 최대값을 다룬다.
2. 최소값과 최대값 포함 여부를 결정해야한다.(이상-초과/이하-미만)
3. 혹은 네이밍에 최소값과 최대값 포함 여부를 표현한다. `MIN_NUMBER_LIMIT`, `MIN_IN_NUMBER`

```javascript
function isAdult(age) {
    if (age > 20) {}
}
```

## begin - end
begin: 체크인
end: 체크아웃, 고정되지 않고 언제나 경계에서 제외될 수 있는

```javascript
function reservationDate(beginDate, endDate) {}
```

## first - last
양 끝점이 존재하지만 그안에 요소가 규칙, 연속성이 없을 경우

```javascript
element.firstChild
element.lastChild
```

## prefix - suffix
코드의 일관성을 위해 prefix, suffix를 활용하자.

```text
useState, useEffect, useContext => Hook 이구나아
```

## 매개변수의 순서가 경계다
호출하는 함수의 네이밍과 인자의 순서의 연관성을 고려한다.
매개변수를 2개가 넘지않도록 하는게 좋다.(네이밍과 인자를 보면 역할을 유추할 수 있다.)

인자가 많아질 경우?
- arguments, rest parameter
- 매개변수를 객체에 담아서 넘긴다
- 랩핑하는 함수


```javascript
genRandomNumber(1, 50);
getDates("2021-10-01", "2021-10-31");
genShuffleArray(1, 5);

function someFunc(arg1, arg2, arg3, arg4) {}

// 최악의 경우 리팩토링 시 랩핑하는 함수를 이용
function getFunc(arg1, arg3) {
    someFunc(arg1, undefined, arg3)
}
```