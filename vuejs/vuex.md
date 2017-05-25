# VUEX
props와 $emit을 전달했던 데이터를 vuex를 이용하여 전달하는 예제.

- Parent: App.vue

```html
<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vuex</h1>
                <app-result :counter="counter"></app-result>
                <hr>
                <app-counter @updated="counter += $event"></app-counter>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter.vue';
    import Result from './components/Result.vue';

    export default {
        data() {
            return {
                counter: 0
            }
        },
        components: {
            appCounter: Counter,
            appResult: Result,
        }
    }
</script>
```

- Child: components/Counter.vue

```html
<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement">Decrement</button>
    </div>
</template>

<script>
    export default {
        methods: {
            increment() {
                this.$emit('updated', 1);
            },
            decrement() {
                this.$emit('updated', -1);
            }
        }
    }
</script>
```

- Child: components/Result.vue

```html
<template>
    <p>Counter is: {{ counter }}</p>
</template>

<script>
    export default {
        props: ['counter']
    }
</script>
```

- vuex 설치

```
npm install --save vuex
```

- `/src` 루트 디렉토리에 `store/store.js`를 만든다.

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 외부에서 store 사용할 수 있도록
export const store = new Vuex.Store({
  state: {
    counter: 0
  }
});
```

- `main.js` import 한다

```javascript
import { store } from './store/store';

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```

- `Counter.vue`에서  `$emit` 을 이용해서 값을 전달했던 부분을 `this.$store` 로
값을 가져온다.

```javascript
export default {
    methods: {
        increment() {
            //this.$emit('updated', 1);
            this.$store.state.counter++;
        },
        decrement() {
            //this.$emit('updated', -1);
            this.$store.state.counter--;
        }
    }
}
```

- `Result.vue`에서 `props`을 이용해 전달받은 값을 `this.$store`를 이용해 값을 전달한다.

```javascript
export default {
    //props: ['counter']
    computed: {
        counter() {
            return this.$store.state.counter;
        }
    }
}
```

- `App.vue`에서 바인드되었던 내용을 지운다.

```html
<app-result></app-result>
<hr>
<app-counter></app-counter>
```

## Using [Getter](https://vuex.vuejs.org/kr/getters.html)
this.$store.state 값을 child.vue에 가져와서 다시 계산을 하여 값을 보여주는 것은
성능에 안좋은가 보다. (내 추측- 찾아봐야함.)

> 둘 이상의 컴포넌트가 이를 사용 해야하는 경우 함수를 복제하거나 공유된 헬퍼를 추출하여 여러 위치에서 가져와야합니다. 둘 다 이상적이지 않습니다.

- before code: `Result.vue`
여기서 $store에서 값을 가져와 2를 곱했다.

```html
<template>
    <p>Counter is: {{ counter }}</p>
</template>

<script>
    export default {
        computed: {
            counter() {
                return this.$store.state.counter * 2;
            }
        }
    }
</script>
```

- After code: `store.js`
getters를 이용해 `doubleCounter` 미리 값을 계산했다.

```javascript
export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    }
  }
});
```

- After code: `Result.js`

```javascript
export default {
    computed: {
        counter() {
            return this.$store.getters.doubleCounter;
        }
    }
}
```

## mapGetters
mapGetters 헬퍼는 저장소 getter를 로컬 계산된 속성에 매핑합니다.

### Info
You can also pass an Object and map the Getters to different Names!

### Example

```
mapGetters({
  propertyName: 'doubleCounter'
})
```

- `store.js`: `stringCounter` 내용을 추가한다.

```javascript
export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    },
    stringCounter: state => {
      return state.counter + ' Clicks';
    }
  }
});
```

- `AnotherResult.vue`에서 위의 내용을 보여준다.

```html
<template>
  <div>
    <p>Counter other is: {{ counter }}</p>
    <p>Number of Clicks: {{ clicks }}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      counter() {
        return this.$store.getters.doubleCounter;
      },
      clicks() {
        return this.$store.getters.stringCounter;
      }
    }
  }
</script>
```

- 위의 내용을 `mapGetters`를 이용해서 바꾼다.

```html
<template>
  <div>
    <p>Counter other is: {{ doubleCounter }}</p>
    <p>Number of Clicks: {{ stringCounter }}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters([
        'doubleCounter',
        'stringCounter'
    ])
  }
</script>
```

- 위의 내용을 ES6 문법으로 바꾼다.

```javascript
export default {
    computed: {
      ...mapGetters([
           'doubleCounter',
           'stringCounter'
         ])
    }
  }
```

- 패키지 설치

```
npm install --save-dev babel-preset-stage-2
```

- `.babelrc` 수정

```
{
  "presets": [
    ["es2015", {"modules": false}],
    ["stage-2"]
  ]
}
```
