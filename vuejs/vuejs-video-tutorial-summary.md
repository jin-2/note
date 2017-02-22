# Vue.js 동영상 강의 정리

## 동영상 강의 목록

- Part 1: Introduction
    - [https://youtu.be/vzSjlLzGB1A](https://youtu.be/vzSjlLzGB1A)
- Part 2: Project Setup
    - [https://youtu.be/wr75fuDV9uc](https://youtu.be/wr75fuDV9uc)
- Part 3: Vue Directives
    - [https://youtu.be/ZCweh0Q8tyE](https://youtu.be/ZCweh0Q8tyE)
- Part 4: V-Bind Directive
    - [https://youtu.be/7ZjNQ92Pl3c](https://youtu.be/7ZjNQ92Pl3c)
- Part 5: Looping
    - [https://youtu.be/SnlJ-iXBTdM](https://youtu.be/SnlJ-iXBTdM)
- Part 6: 2-Way Binding
    - [https://youtu.be/nEdsu6heW9o](https://youtu.be/nEdsu6heW9o)
- Part 7: Event Handling
    - [https://youtu.be/4PXXQzME5no](https://youtu.be/4PXXQzME5no)
- Part 8: Computed Properties
    - [https://youtu.be/3nYlioo9Ta4](https://youtu.be/3nYlioo9Ta4)
- Part 9: Getter & Setter Computed Properties
    - [https://youtu.be/PuxdMnk-u5k](https://youtu.be/PuxdMnk-u5k)
- Part 10: AJAX to External API
    - [https://youtu.be/KT-yhTnIf_k](https://youtu.be/KT-yhTnIf_k)


## 테스트 템플릿

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Vue.js</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
</head>
<body>

  <div id="app">
    <h1>{{message}}</h1>
  </div>

  <script src="https://unpkg.com/vue@2.1.10/dist/vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js world'
      }
    })
    // app.message = 'hi';
  </script>
</body>
</html>
```

## Vue Directives

### v-text [string]
엘리먼트의 textContent를 업데이트 합니다.

```html
<span v-text="message"><span>
<span>{{message}}</span>
```

### v-html [string]
엘리먼트의 innerHTML을 업데이트 합니다. **내용은 일반 HTML으로 삽입되므로 Vue 템플릿으로 컴파일 되지 않습니다.**

```html
<h1 v-html="intro"></h1>
```

### v-show [any]
토글은 표현식 값의 참(true)에 기반한 **display CSS 속성**입니다. 이 디렉티브는 조건이 바뀌면 전환이 호출 됩니다.

```html
<div id="app">
    <h1 v-show="viewed">You have viewed this page</h1>
    <h1 v-show="viewed == viewed2">Viewed == viewed2</h1>
</div>
<script>
var app = new Vue({
    el: '#app',
    data: {
        viewed: false,
        viewed2: true
    }
})
</script>
```

### v-if [any]
표현식 값의 참 거짓을 기반으로 **엘리먼트를 조건부 렌더링** 합니다. 엘리먼트 및 포함된 디렉티브 / 컴포넌트는 토글하는 동안 삭제되고 다시 작성됩니다.

### v-else
이전 형제 엘리먼트가 v-if또는 v-else-if이어야 합니다.

```html
<h1 v-if="Math.random() > 0.5">You have viewed this page</h1>
<h1 v-else>You have NOT viewed this page</h1>
```

### v-if VS v-show
일반적으로 v-if는 토글 비용이 높고 v-show는 초기 렌더링 비용이 더 높습니다. 매우 자주 바꾸기를 원한다면 v-show를, 런타임 시 조건이 바뀌지 않으면 v-if를 권장합니다.

### v-pre
이 엘리먼트와 모든 자식 엘리먼트에 대한 컴파일을 건너 뜁니다. 원시 mustache 태그를 표시하는데 사용할 수 있습니다. 디렉티브가 없는 많은 수의 노드를 뛰어 넘으면 컴파일 속도가 빨라집니다.

```html
<h1 v-pre>{{intro}}</h1>
<script>
var app = new Vue({
    el: '#app',
    data: {
        intro: "Welcome to the Tutorial <small>It is all about Vue.js</small>"
    }
})
</script>
```

### v-cloak
이 디렉티브는 Vue 인스턴스가 **컴파일을 완료할 때까지 엘리먼트에 남아있습니다.** [v-cloak] { display: none }와 같은 CSS규칙과 함께 이 디렉티브는 Vue인스턴스가 준비될 때까지 컴파일되지 않은 mustache 바인딩을 숨기는데 사용할 수 있습니다. **(조심히 써야한다.)**

```
<style>
[v-cloak] {
    background-color: red;
}
</style>
<div id="app">
    <h1 v-cloak>{{ message }}</h1>
</div>
<script>
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue World'
    }
})
</script>
```

### v-once
엘리먼트 및 컴포넌트를 **한번만 렌더링** 합니다. 후속 렌더링에서 엘리먼트 / 컴포넌트와 모든 하위 엘리먼트는 정적으로 처리되어 건너 뜁니다. 이는 업데이트 성능을 최적화하는데 사용합니다.

```html
<span v-once>This will never change: {{msg}}</span>
```

## Looping

### v-for
v-for 디렉티브를 사용하여 배열을 기반으로 리스트를 렌더링 할 수 있습니다. v-for 디렉티브는 `item in items` 형태로 특별한 문법이 필요합니다. 여기서 items는 원본 데이터 배열이고 item은 반복되는 배열 엘리먼트의 별칭 입니다.

```html
<div id="app">
    <ul>
        <li style="list-style-type: none;" v-for="(todo, index) in todos">{{message}} {{index + 1}}) {{todo.text}} - {{todo.id}}</li>
    </ul>
</div>
<script>
var app = new Vue({
    el: '#app',
    data: {
        message: 'fixed text',
        todos: [{
            text: 'Learn Vue',
            id: 500
        }, {
            text: 'Like the video',
            id: 655
        }, {
            text: 'Write a blog',
            id: 321
        }]
    }
})
```

#### `in` 대신에  `of` 를 구분자로 사용할 수 있습니다.

```
<div v-for="item of items"></div>
```

## [V-Bind Directive](http://kr.vuejs.org/v2/api/#v-bind)

### v-bind [any (with argument) | Object (without argument)]
동적으로 하나 이상의 컴포넌트 속성 또는 표현식을 바인딩 합니다.  
class또는 style 속성을 묶는 데 사용될 때, Array나 Objects와 같은 추가 값 유형을 지원합니다.

#### Argument attrOrProp (optional)

#### 약어 `:`

```html
<div id="app">
  <h1 v-bind:title="title">{{message}}</h1>
  <img :src="url" :alt="title" :title="title">
</div>

<script>
var app = new Vue({
    el: '#app',
    data: {
        message: 'hello vue world!',
        title: 'You loaded the page on' + new Date(),
        url: 'http://vuejs.org/images/logo.png'
    }
})
</script>
```

## 2-Way Binding

### v-model
폼 인풋 엘리먼트 또는 컴포넌트에 양방향 바인딩을 만듭니다.

#### 제한사항
- `<input>`
- `<select>`
- `<textarea>`
- components

#### [Form input Bindings](http://kr.vuejs.org/v2/guide/forms.html)

```html
<div id="app">
    <h1>{{message}}</h1>
    <input type="text" v-model="message">
</div>
<script>
var app = new Vue({
    el: '#app',
    data: {
        message: 'hello vue world!'
    }
})
</script>
```

## Event Handling

### v-on [Function | Inline Statement]
엘리먼트에 이벤트 리스너를 연결합니다. 이벤트 유형은 전달인자로 표시됩니다. 표현식은 메소드 이름 또는 인라인 구문일 수 있으며, 수식어가 있으면 생략할 수 있습니다.
일반 엘리먼트에 사용되면 기본 DOM 이벤트만 받습니다. 사용자 정의 컴포넌트에서 사용될 떄 해당 하위 컴포넌트에서 생성된 사용자 정의 이벤트를 받습니다.
네이티브 DOM 이벤트를 수신하면 메소드는 네이티브 이벤트를 유일한 전달인자로 받습니다. 인라인 구문을 사용하는 경우 명령문은 특별한 `$event` 속성에 접근할 수 있습니다: `v-on: click = "handle('ok', $event)"`

#### Argument(전달인자): event (required)

#### 약어 `@`

#### [Methods and Event Handling](http://kr.vuejs.org/v2/guide/events.html)

```html
<!-- 메소드 핸들러 -->
<button v-on:click="doThis"></button>

<!-- 인라인 구문 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 약어 -->
<button @click="doThis"></button>

<!-- 전파 금지 -->
<button @click.stop="doThis"></button>

<!-- 기본 동작 방지 -->
<button @click.prevent="doThis"></button>

<!-- 표현식이 없는 기본 동작 방지 -->
<form @submit.prevent></form>

<!-- 수식어 체이닝 -->
<button @click.stop.prevent="doThis"></button>

<!-- 키 별칭을 이용한 키 입력 수식어 -->
<input @keyup.enter="onEnter">

<!-- 키 코드를 이용한 키 입력 수식어 -->
<input @keyup.13="onEnter">

<!-- the click event will be triggered at most once -->
<button v-on:click.once="doThis"></button>
```

### methods
Vue 인스턴스에 추가할 메소드입니다. VM 인스턴스를 통해 직접 접근하거나 디렉티브 표현식에서 사용할 수 있습니다. 모든 메소드는 자동으로 this 컨텍스트를 Vue 인스턴스에 바인딩합니다.

#### Type
`{ [key: string]: Function }`

#### arrow function를  메소드를 정의하는데 사용하면 안됩니다.
화살표 함수가 부모 컨텍스트를 바인딩하기 때문에 `this`는 Vuev 인스턴스가 아니며 `this.a`는 정의되지 않습니다.

```javascript
plus: () => this.a++
```

#### [Sample code - @click](https://jsfiddle.net/sujin/8efubvvx/2/)

```javascript
new Vue({
  el: '#app',
  data: {
    message: 'Event Handling',
    url: '',
    cleanUrl: ''
  },
  methods: {
  	humanizeUrl: function () {
    	this.cleanUrl = this.url.replace(/^http:\/\//, '');
    }
  }
})
```

## Computed Properties

### computed
Vue 인스턴스에 추가되는 계산된 속성입니다. 모든 getter와 setter는 자동으로 this 컨텍스트를 Vue 인스턴스에 바인딩 합니다.  
계산된 속성은 **캐시** 되며 의존하고 있는 **반응형 속성이 변경되는 경우 다시 평가** 됩니다. 특정한 의존성이 인스턴스의 범위를 벗어나는 경우(반응형이지 않은 경우)에 계산된 속성은 갱신되지 않습니다. 그러나 여전히 반응형 속성을 갖지 않고 있기 때문에 이를 수정하는 경우 DOM 갱신을 발생시키지 않습니다.

#### Type
`{ [key: string]: Function | { get: Function, set: Function } }`

#### [Computed Properties](https://kr.vuejs.org/v2/guide/computed.html)

##### [Computed Caching vs Methods](https://kr.vuejs.org/v2/guide/computed.html#계산된-캐싱-vs-메소드)

> the difference is that computed properties are cached based on their dependencies.
> 차이점은 계산된 속성은 종속성에 따라 캐시된다는 것 입니다.

> In comparison, a method invocation will always run the function whenever a re-render happens.
> 메소드 호출은 재 렌더링 할 때마다 항상 메소드를 호출합니다.

> In cases where you do not want caching, use a method instead.  
> 캐싱을 원하지 않는 경우 메소드를 사용하십시오.

#### [Sample code - computed](https://jsfiddle.net/sujin/w4mjx3rv/2/)

```javascript
new  Vue({
	el: '#app',
  data: {
  	level: '',
    xp: 0
  },
  methods: {
  	addXP: function() {
    	return this.xp += 10;
    },
    decreaseXP: function() {
    	return this.xp -= 10;
    }
  },
  computed: {
  	level: function() {
    	if (this.xp >= 200) {
      	return this.level = 'Pro';
      } else if (this.xp >= 100) {
      	return this.level = 'Intermediate';
      } else if (this.xp >= 0) {
      	return this.level = 'Beginner';
      } else if (this.xp < 0) {
      	return this.level = 'Give up';
      }
    }
  }
})
```

## Getter & Setter Computed Properties
computed 속성은 기본적으로 getter만 가지고 있지만, 필요한 경우 setter를 제공할 수 있습니다.

```javascript
new Vue({
  el: '#app',
  data: {
    first: '',
    last: '',
    fullname: ''
  },
  computed: {
    fullname: {
      get: function() {
        return this.first+' '+this.last
      },
      set: function(name) {
        var name = name.split(' ')
        this.first = name[0]
        this.last = name[name.length - 1]
      }
    }
  }
})
```

## AJAX to External API

### [Sample code - 우편번호를 체크하여 지역 확인(jsfiddle에서는 소스코드만 확인가능.)](https://jsfiddle.net/sujin/2d6fbmcf/3/)

### watch
**대부분의 경우 `computed` 속성이 더 적합**하지만 사용자 정의 감시자가 필요한 경우가 있습니다. 그래서 Vue는 `watch` 옵션을 통해 데이터 변경에 반응하는 보다 일반적인 방법을 제공합니다. 이는 데이터 변경에 대한 응답으로 **비동기식** 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용합니다.

```javascript
var app = new Vue({
  el: '#app',
  data: {
    startingZip: '',
    startingCity: '',
    endingZip: '',
    endingCity: ''
  },
  watch: {
    startingZip: function() {
      this.startingCity = ''
      if (this.startingZip.length == 5) {
        this.lookupStartingZip()
      }
    },
    endingZip: function() {
      this.endingCity = ''
      if (this.endingZip.length == 5) {
        this.lookupEndingZip()
      }
    }
  },
  methods: {
    lookupStartingZip: _.debounce(function() {
      var app = this
      app.startingCity = "Searching..."
      axios.get('http://ziptasticapi.com/' + app.startingZip)
            .then(function (response) {
              app.startingCity = response.data.city + ', ' + response.data.state
            })
            .catch(function (error) {
              app.startingCity = "Invalid Zipcode"
            })
    }, 500),
    lookupEndingZip: _.debounce(function() {
      var app = this
      app.endingCity = "Searching..."
      axios.get('http://ziptasticapi.com/' + app.endingZip)
            .then(function (response) {
              app.endingCity = response.data.city + ', ' + response.data.state
            })
            .catch(function (error) {
              app.endingCity = "Invalid Zipcode"
            })
    }, 500)
  }
})
```
### 참고

#### [axios](https://www.npmjs.com/package/axios)

- [HTTP 요청을 위한 axios](https://vuejs-kr.github.io/update/2017/01/04/http-request-with-axios/)

```javascript
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### [lodash](https://lodash.com/)

- [함수 체인과 지연 실행](http://think.golbin.net/post/121402142691/%ED%95%A8%EC%88%98-%EC%B2%B4%EC%9D%B8%EA%B3%BC-%EC%A7%80%EC%97%B0-%EC%8B%A4%ED%96%89)
- [Lodash의 지연 평가 소개 by Filip Zawada](http://www.haruair.com/blog/2983)
- [throttle과 debounce](https://hyunseob.github.io/2016/04/24/throttle-and-debounce/)

> `_.debounce`는 `_.throttle`과 마찬가지로 과다한 이벤트 로직 실행을 방지하기 위해 사용되는 함수이다. 바로 실행되는 `_.throttle`과는 달리 호출이 반복되는 동안에는 로직 실행을 방지하며, 호출이 멈춘 뒤, **설정한 시간이 지나고 나서야 로직을 실행** 하게 된다.

```javascript
// Avoid costly calculations while the window size is in flux.
jQuery(window).on('resize', _.debounce(calculateLayout, 150));

// Invoke `sendMail` when clicked, debouncing subsequent calls.
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));

// Ensure `batchLog` is invoked once after 1 second of debounced calls.
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);

// Cancel the trailing debounced invocation.
jQuery(window).on('popstate', debounced.cancel);
```

## 그밖에
- [Vue.js 한국어 사용자 모임](https://vuejs-kr.github.io/)
