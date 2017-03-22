# An Introduction to components

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

## How to name your components Tags
컴포넌트의 이름은 `<my-list>` 소문자와 대시로 작성을 하면 `<MyList>`처럼 카멜케이스로
표현된다. 물론 `<MyList>`로 이름지어도 된다. 카멜케이스는 자바스크립트에서 많이 사용하므로
컴포넌트는 돔스타일인 소문자와 대시로 표현하는 것을 추천한다.

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
