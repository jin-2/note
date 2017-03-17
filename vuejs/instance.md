# [The Vue.js Instance](http://kr.vuejs.org/v2/guide/instance.html#search-form)

```javascript
new Vue(...)
```

## Using Multiple Vue Instances

```javascript
var vm1 = new Vue(...)
var vm2 = new Vue(...)
```

## Accessing the Vue Instance from Outside(밖에서 접근)

```javascript
setTimout(function() {
  vm1.title = 'changed by Timer';
}, 3000);
```

```javascript
vm1.newProp = 'New!';
console.log(vm1);
```

## How VueJS manages your Data and Methods
각 Vue 인스턴스는 data 객체에 있는 모든 속성을 프록시 처리 합니다.

```javascript
var data = {
  title: 'HI',
  showParagraph: false
}

var vm = new Vue({
    data: data
});
```

## A Closer Look at `$el` and `$data`
- $el: Vue 인스턴스가 관리하는 루트 DOM 엘리먼트 입니다.(html template)
- $data: Vue 인스턴스가 관찰하는 데이터 객체입니다. Vue 인스턴스는 데이터 객체의 속성에 대한 엑세스를 프록시 합니다.
- 이 프로퍼티들(var data = {...})과 메소드들은 $ 접두사로 프록시 데이터 속성과 구별됩니다.
- 인스턴스 속성이나 콜백에서 화살표 함수을 사용하지 마십시오. (예: vm.$watch('a', newVal => this.myMethod())). 화살표 함수는 부모 컨텍스트에 바인딩 되어 있으므로 this는 Vue 인스턴스가 아니며 this.myMethod는 정의되지 않습니다.

```javascript
console.log(vm.$data === data);
```

## Placing $refs and Using them on your Templates

### [ref](http://kr.vuejs.org/v2/api/#ref)

```html
<!-- vm.$refs.p는 DOM 노드가 됩니다 -->
<button ref="myButton">show</button>
```

```javascript
console.log(this.$refs.myButton);
this.$refs.myButton.innerText = 'test';
```

## Mounting a Template

### [vm.$mount([elementOrSelector])](http://kr.vuejs.org/v2/api/#vm-mount)
Vue 인스턴스가 인스턴스화 할 때 el 옵션이 없으면 연결된 DOM 엘리먼트 없이 “unmounted” 상태가 됩니다. vm.$mount()는 unmounted 된 Vue인스턴스의 마운트를 수동으로 시작하는데 사용할 수 있습니다.  

elementOrSelector 인자가 제공되지 않으면, 템플릿은 문서가 아닌 엘리먼트로 렌더링 될 것이므로 DOM API를 사용하여 문서에 직접 삽입해야 합니다.  

이 메소드는 다른 인스턴스 메소드를 체이닝 할 수 있도록 인스턴스 그 자체를 반환 합니다.

```javascript
var vm3 = new Vue({
  template: '<h1>Hello!</h1>'
});

vm3.$mount();
document.getElementById('app3').appendChild(vm3.$el);
```

## Using [Component](http://kr.vuejs.org/v2/guide/components.html)
컴포넌트는 Vue의 가장 강력한 기능 중 하나입니다. 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 도움이 됩니다. 상위 수준에서 컴포넌트는 Vue의 컴파일러에 의해 동작이 추가된 사용자 지정 엘리먼트입니다. 경우에 따라 특별한 is 속성으로 확장 된 원시 HTML 엘리먼트로 나타날 수도 있습니다.

```javascript
var vm3 = new Vue({
  el: 'hello',
  template: '<h1>Hello</h1>'
});
```

```html
<hello></hello>
<hello></hello>

<div class="hello"></div>
<div class="hello"></div>
```

위의 코드는 한개만 생성이 되므로 component를 사용한다.

```javascript
Vue.component('hello', {
  template: '<h1>Hello</h1>'
});
```

## The VueJS Instance [Lifecycle](http://kr.vuejs.org/v2/guide/instance.html#라이프사이클-다이어그램) in Practice

```javascript
new Vue({
  el: '#app',
  beforeCreate: function() {
    console.log('beforeCreate');
  },
  created: function() {
    console.log('created');
  },
  beforeMount: function() {
    console.log('beforeMount'); // dom yet
  },
  mounted: function() {
    console.log('mounted'); // attach real dom
  },
  beforeUpdate: function() {
    console.log('beforeUpdate');
  },
  update: function() {
    console.log('update');
  },
  beforeDestroy: function() {
    console.log('beforeDestroy');
  },
  destroyed: function() {
    console.log('destroyed');
  }
})
```
