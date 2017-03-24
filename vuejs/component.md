# An Introduction to [components](https://kr.vuejs.org/v2/guide/components.html)

```html
<my-cmp></my-cmp>
<my-cmp></my-cmp>

<script type="text/javascript">
Vue.component('my-cmp', {
  data: function() {
    return {
      status: 'Critical'
    }
  },
  template: '<p>Server Status: {{ status }}'
});

new Vue({
  el: '#app'
})
</script>
```

## Storing Data in Components with the Data Method
data 선언을 변수로 외부에서 사용할 때와 내부에서 사용할 때 차이점

- [컴포넌트 안에서 data가 있을 경우](https://jsfiddle.net/vL4eg3qc/)
- [컴포넌트 밖에서 변수로 선언할 경우](https://jsfiddle.net/sujin/6brfea65/)

## Registering Components Locally and Globally

### 전역등록

```javascript
Vue.component('my-component', {
  // 옵션
})
```

## 지역등록
모든 component는 전역으로 등록할 필요는 없습니다. 인스턴스/컴포넌트 범위에서만 사용할
수 있는 컴포넌트를 만들 수 있습니다.

```javascript
var cmp = {
  data: function() {
    return {
      status: 'Critical'
    }
  },
  template: '<p>Server Status: {{ status }}'
};

new Vue({
  el: '#app2',
  components: {
    'my-cmp': cmp
  }
})
```

## `data`는 반드시 함수여야합니다.

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```

```javascript
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
  // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})
```

세 개의 컴포넌트 인스턴스가 모두 같은 `data` 객체를 공유하므로 하나의 카운터를
증가 시키면 모두 증가합니다.! 대신 새로운 데이터 객체를 반환하여 이 문제를 해결합시다.

## Root Component

- App.vue

```html
<template>
  <p>Server status {{ status }}</p>
</template>
<script>
export default {
  data: function() {
    return {
      status: 'Critical'
    }
  }
}
</script>
```

## Creating Component

- Home.vue: UI - 하나의 부모엘리먼트로 감싸야 한다.

```javascript
<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
    export default {
        data: function() {
            return {
                title: 'Server Status'
            }
        }
    }
</script>
```

- App.vue: Home.vue 컴퍼넌트를 감싸는 부모

```javascript
<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <c-header></c-header>
            </div>
        </div>
    </div>
</template>
```

- main.js: import home, Vue.component 선언

```javascript
import Vue from 'vue'
import App from './App.vue'
import Header from './Header.vue'

Vue.component('c-header', Header); // 전역 등록

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## How to name your components Tags
컴포넌트의 이름은 `<my-list>` 소문자와 대시로 작성을 하면 `<MyList>`처럼 카멜케이스로
표현된다. 물론 `<MyList>`로 이름지어도 된다. 카멜케이스는 자바스크립트에서 많이 사용하므로
컴포넌트는 돔스타일인 소문자와 대시로 표현하는 것을 추천한다.

> Vue는 사용자 지정 태그 이름에 대해 W3C 규칙(모두 소문자이어야 하고 하이픈을 포함해야합니다)을 적용하지 않습니다. 그러나 이 규칙을 따르는 것이 좋습니다.

```javascript
export default {
  components: {
    'app-header': Header,
    AppFooter: Footer,
    'app-servers': Servers,
    Servers // for ES6
  }
}
```

## Scoping component styles

### Grobally style

```html
<style>
div {
  background: red;
}
</style>
```

### Locally style
아래처럼 적용하면 `div`에 속성이 추가되고 그 속성에 스타일이 지정된다.

```html
<style scoped>
div {
  background: red;
}
</style>
```
