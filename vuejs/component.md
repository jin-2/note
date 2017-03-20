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
