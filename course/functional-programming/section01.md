# 섹션 1. 함수형 프로그래밍 개요

## 함수형 프로그래밍 정의, 순수함수

### 성공적인 프로그래밍이란?

어떠한 기능, 목표를 이루는데 효율적이고 생산적인 프로그래밍

### 함수형 프로그래밍이란?

**순수 함수를 만든다.**

### 순수 함수

- 부수적인 효과를 만들지 않는 함수 → 오류를 줄이고 안정성을 높인다.
    - 함수가 받은 인자외에 외부의 상태에 영향을 끼치지 않는다. 리턴값 외에 외부와 소통하지 않는다.
    - 부수 효과 문제는 특히 동시성(concurrency)이 생길 때 더욱 취약하다. 자바스크립트는 단일 스레드라서 무관하다고 생갈할 수 있겠지만, 자바스크립트의 실제 실행 환경에서는 그렇지 않다. 브라우저나 Node.js는 다양한 작업을 동시에 처리한다. 이렇게 동시성이 생기는 상황에서는 여러 곳에서 공유되고 있는 값이 변경되는 것은 위험하다.
- 수학적 함수: 들어오는 인자가 같으면 항상 동일한 값을 반환한다.
- 조합성을 강조한다. 모듈화 수준을 높인다. 생산성을 높인다. 재사용성이 높다. 팀웍도 좋다. 기획 대응력도 좋다.

### 순수 함수는 객체의 상태를 변경할 수 없는가? 객체를 다룰 수 없는가?

함수형 프로그램밍에서는 객체의 값을 변형해 나간다.

**객체를 복사해서** 값을 변형하여 새로운 객체를 리턴한다.

외부의 상태의 영향을 미치지 않는다.

### 순수 함수는 평가 시점이 중요하지 않다.

아래 처럼 외부 요인(`c`)에 의해서 값이 변경되는 순수 함수가 아닌 경우는 평가 시점이 중요하다.

```jsx
var c = 10;
function add2(a, b) {
    return a + b + c;
}

add2(10, 10);

c = 20
add2(10, 10)
```

### 순수 함수에 담긴 전략은 그 이름처럼 간단 명료하다.

- 상태 변화를 최소화하고,
- 다음 단계로 넘어갈 때마다 새로운 값으로 출발하는 식으로 코딩하는 것이다.

이렇게 하면 문제가 쉬워진다. 문제가 단순해지면 해결책 역시 쉬워지고 오류를 만들 가능성도 줄어든다.

## 일급함수, add_maker, 함수로 함수 실행하기

### 일급 함수

함수를 값으로 다룰 수 있다.

런타임에서 언제나 함수를 변수에 담을 수 있고, 인자로 넘길 수 있고, 인자로 넘긴 함수를 다른 함수에서 실행할 수 있다.

### 다시 함수형 프로그래밍이란?

**일급 함수 개념과 순수 함수의 특징을 이용해서 함수의 조합성을 높여나가는 것이 함수형 프로그래밍이다.**

언제 평가 해도 상관없는 순수함수들을 많이 만들고 그리고 그 순수함수들을 값으로 갖고 다니면서 필요한 시점에 평가를 하면서 다양한 로직을 만들어 나가는 것이 함수형 프로그래밍이다.

> 함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다.
>

> 함수형 사고 방식은 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것
>

객체 지향에서는 데이터를 먼저 디자인하고 데이터에 맞는 메소드를 구성하는 식으로 프로그래밍

함수를 만들고 함수에 맞게 데이터를 구성하는 프로그래밍

### 어떻게 전환해 왔는가?

명령형 → 함수형