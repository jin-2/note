# 섹션5. 분기 다루기

## 20. 값식문
- 문법 grammar 중요 -> 컴퓨터를 이해시키기 위해
- 식 -> 값으로 귀결된다.

## 21. 삼항 연산자 다루기
- 과도한 숏코딩 지양하자.
- 일관성이 필요하다

> 조건 ? 참(식):거짓(식)

```javascript
// before
const example = condition1
    ? a === 0 ? 'zero' : 'positive'
    : 'negative';

// after: 사람이 이해하기 더 좋게 표현
const example = condition1
    ? ((a === 0) ? 'zero' : 'positive')
    : 'negative';
```

```javascript
// bad: 값, 식이 들어가야 할 자리에 함수가 있다. (숏코딩을 위한)
// alert: () => void
function alertMessage(isAdult) {
    isAdult ? alert("입장 가능합니다.") : alert("입장 불가능 합니다.");
    // isAdult ? undefined : undefined
}
```

## 22. Truthy & Falsy
- [참 같은 값](https://developer.mozilla.org/ko/docs/Glossary/Truthy)
- [거짓같은 값](https://developer.mozilla.org/ko/docs/Glossary/Falsy)

## 23. 단축평가 (short-circuit evaluation)
논리 연산자를 사용하여 한눈에 들어오는 코드를 만들자.
- || (OR)
- && (AND)

## 24. else if 피하기
- 조건을 명확히 파악하자.
- 조건이 많아진다면 switch 문을 고려해보자.

아래 코드는 논리적으로 같은 코드이다. 언어가 이해하고 처리하는 방식도 같다.
```javascript
const x = 1;
if (x > 0) {
    console.log("x는 0과 같거나 크다");
} else if (x > 0) {
    console.log("x는 0보다 크다");
}

if (x > 0) {
    console.log("x는 0과 같거나 크다");
} else {
    if (x > 0) {
        console.log("x는 0보다 크다");
    }
}
```

## 25. else 피하기

## 26. Early Return

## 27. 부정 조건문 지양하기
- 생각을 여러번 해야할 수 있다. `Number.isNaN(1) // false`
- 프로그래밍 언어 자체로 if문이 처음부터오고 true부터 실행시킨다. `if ... else, else ... if`

### 부정 조건문 예외
- Early Return
- Form Validation
- 보안 혹은 검사하는 로직

## 28. Default Case 고려하기

```javascript
function safeParseInt(number, radix = 10) {
    return parseInt(number, radix);
}
```

## 29. 명시적인 연산자 사용 지향하기
- 괄호를 이용해 우선순위를 지정해주자.
- [연산자 우선순위](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

헷갈리게 하지말고, 명시적으로 작성하자.
```javascript
let number = 0;

function increasement() {
    number++; // X
    ++number; // X
    number = number + 1; // O
}

function decreasement() {
    number--; // X
    --number; // X
    number = number - 1; // O
}
```

## 30. Nullish coalescing operator "??"
nullish 병합 연산
null or undefined => ??
falsy => ||

```javascript
const baz = 0 ?? 42;
console.log(baz); // expected output: 0
```

## 31. 드모르간의 법칙
true is not true
false is not false

조건이 더 추가된다면 good으로 표시한 코드가 더 명시적이다.
```javascript
// bad
if (!(A && B)) {}

// good
if (!A || !B) {}

// bad
if (!(A || B)) {}

// good
if (!A && !B) {}
```
