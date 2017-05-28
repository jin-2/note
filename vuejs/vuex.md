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

## Understanding [Mutations](https://vuex.vuejs.org/kr/mutations.html)
Vuex 저장소에서 실제로 상태를 변경하는 유일한 방법은 **변이(Mutations)** 하는 것입니다.

- `store.js`에 `mutations`을 정의한다.

```javascript
mutations: {
  increment: state => {
    state.counter++;
  },
  decrement: state => {
    state.counter--;
  }
}
```

- `Counter.vue` 파일에 정의되었던 `methods` 내용을 `$store.commit`을 이용하여 `mutations`에 등록한 내용을 호출한다.

```javascript
export default {
    methods: {
        increment() {
            // this.$store.state.counter++;
            this.$store.commit('increment');
        },
        decrement() {
            // this.$store.state.counter--;
            this.$store.commit('decrement');
        }
    }
}
```

- `this.$store.commit` 이 코드마저 중복된다. 코드를 단축하면

```javascript
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations([
        'increment',
        'decrement'
      ])
  }
}
```

## [actions](https://vuex.vuejs.org/kr/actions.html)
mutations을 동기화 시키려면 actions을 이용한다?

- `store.js`에 `actions`를 정의한다.

```javascript
actions: {
  increment: context => {
    context.commit('increment');
  }
}
```

- ES6 문법으로 고치고 동기화할 수 있는 asyncIncrement를 정의한다.

```javascript
actions: {
  increment: ({ commit }) => {
    commit('increment');
  },
  decrement: ({ commit }) => {
    commit('decrement');
  },
  asyncIncrement: ({ commit }) => {
    setTimeOut(() => {
      commit('increment');
    }, 1000)
  },
  asyncDecrement: ({ commit }) => {
    setTimeOut(() => {
      commit('decrement');
    }, 1000)
  }
}
```

- vue 페이지에서 mutations으로 정의되있던 부분을 수정한다.

```javascript
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions([
        'increment',
        'decrement'
      ])
  }
}
```

## 페이로드를 가진 커밋
> mutations에 대해 payload라고 하는 store.commit에 추가 전달인자를 사용할 수 있습니다.

### 예제 코드

- `Counter.vue` file

```html
<button class="btn btn-primary" @click="increment(100)">Increment</button>
```

```javascript
import { mapActions } from 'vuex';
export default {
  methods:
  ...mapActions([
      'increment',
      'decrement'
    ]),
    // increment(by) {
    //   this.$store.dispatch('increment', by)
    // }
  }
}
```

- `store.js` 파일

```javascript
mutations: {
  increment: (state, payload) => {
    state.counter += payload;
  },
  decrement: state => {
    state.counter -= payload;
  }
},
actions: {
  increment: ({ commit }, payload) => {
    commit('increment', payload);
  },
  decrement: ({ commit }, payload) => {
    commit('decrement', payload);
  }
  // ...
}
```

### 예제 코드

- 추가 예제

- `AnotherCounter.vue`

```html
<button class="btn btn-primary" @click="asyncIncrement({by: 50, duration: 500})">Increment</button>
```

- store.js

```javascript
asyncIncrement: ({ commit }, payload) => {
  setTimeOut(() => {
    commit('increment', payload.by);
  }, payload.duration)
},
asyncDecrement: ({ commit }) => {
  setTimeOut(() => {
    commit('decrement', payload.by);
  }, payload.duration)
}
```

## Two way binding(v-model) and Vuex

- `store.js`

```javascript
export const store = new Vuex.Store({
  state: {
    value: 0
  },
  getters: {
    value: state => {
      return state.value;
    }
  },
  mutations: {
    updateValue: (state, payload) => {
      state.value = payload;
    }
  },
  actions: {
    updateValue({commit}, payload) {
      commit('updateValue', payload)
    }
  }
});
```

- vue 파일: 하지만 아래 내용으로 value 가져올 수 있지만 값이 갱신되지 않는다.

```javascript
<template>
  <div>
    <h2>Home</h2>
    <input type="text" :value="value">
    {{ value }}
  </div>
</template>

<script>
  export default {
    computed: {
        value() {
            return this.$store.getters.value;
        }
    }
  }
</script>
```

- 그래서 methods에서 value를 업데이트한다.

```html
<template>
  <div>
    <h2>Home</h2>
    <input type="text" :value="value" @input="updateValue">
    {{ value }}
  </div>
</template>

<script>
  export default {
    computed: {
        value() {
            return this.$store.getters.value;
        }
    },
    methods: {
        updateValue(event) {
          this.$store.dispatch('updateValue', event.target.value);
        }
    }
  }
</script>
```

- v-model로 value 값을 바꾸고, get, set 값을 정의했다.(단순하게 하기 위함인가?)

```html
<template>
  <div>
    <h2>Home</h2>
    <input type="text" v-model="value">
    {{ value }}
  </div>
</template>

<script>
  export default {
    computed: {
        value: {
            get() {
              return this.$store.getters.value;
            },
            set(value) {
                this.$store.dispatch('updateValue', value);
            }
        }
    },
    methods: {
        updateValue(event) {
          this.$store.dispatch('updateValue', event.target.value);
        }
    }
  }
</script>
```

## Folder Structures

- `/store` 폴더 안에 `/modules` 폴더를 만든다.
- `counter.js`, `value.js` (예제로 만들었던 내용) 파일을 만든다.
- `counter.js` 파일에 counter 내용만 정의한다.

```javascript
const state = {
  counter: 0
};

const getters = { /* ... */ };

const mutations = { /* ... */ };

const actions = { /* ... */ };

export default {
  state,
  getters,
  mutations,
  actions
}
```

- `store.js` 파일에 counter를 module로 등록한다.

```javascript
import counter from './modules/counter';
export const store = new Vuex.Store({
  // ...
    modules: {
      counter
    }
  })
```

## Separate files

- `/store` 안에 `store.js`파일이 거대해 질 수 있으므로, 파일을 분류한다.(?)
- `actions.js`, `getters.js`, `mutations.js` 파일을 분리하고

- `actions.js`

```javascript
export const updateValue = ({commit}, payload) => {
  commit('updateValue', payload)
};

export const action2 = // ...
```

- `store.js`

```javascript
import * as actions from './actions';

export const store = new Vuex.Store({
  // ...
  actions,
})
```
