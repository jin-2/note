# Advanced Component Usage

## Slot
1. (무엇을 집어넣도록 만든 가느다란) 구멍
2. (명단・프로그램・방송 등에 들어가는) 자리[시간/틈]
3. (가느다란 구멍・자리에) 넣다[끼우다/들어가다]

### [Slot 예제](https://jsfiddle.net/changjoo_park/god12gok/)

### Slot 스타일링
- `<app-quote>` 컴퍼넌트 안에 있는 요소들의 스타일은 오직 `Quote.vue`에서 적용할 수 있다.
- 스타일링 이외의 vue syntax는 모두 적용할 수 있다.(예: v-if, v-for 등등)

App.vue

```html
<template>
  <div id="app">
    <img src="./assets/logo.png" style="width: 50px;">
    <app-quote>
      <h2>{{ quoteTitle }}</h2>
      <p>B Wonderful Quote</p>
    </app-quote>
    <router-view></router-view>
  </div>
</template>

<script>
import Quote from './components/Quote.vue';

export default {
  name: 'app',
  data: function() {
    return {
      quoteTitle: 'The Quote'
    }
  },
  components: {
    appQuote: Quote
  }
}
</script>
```

Quote.vue

```html
<template>
  <div>
    <slot>
      제공된 컨텐츠가 없으면 볼 수 있어요.
    </slot>
  </div>
</template>

<script>
  export default {
    props: ['quote']
  }
</script>

```

### Using Multiple Slots (Named Slots)
`<slot>` 엘리먼트는 특별한 속성 인 `name`을 가지고 있습니다. 이 속성은 내용을 어떻게 배포할 지 커스터마이징하는 데 사용할 수 있습니다. `name`과 `slot`속성으로 연결시켜 줍니다.

Quote.vue

```html
<template>
  <div>
    <div class="title">
      <slot name="title"></slot>
      <em class="subtitle"><slot>The Subtitle</slot></em>
    </div>
    <hr>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>
```

App.vue

```html
<app-quote>
  <h2 slot="title">{{ quoteTitle }}</h2>
  <p slot="content">B Wonderful Quote</p>
</app-quote>
```

### Switching Multiple Component with Dynamic Components

#### `<component>`, `:is`
같은 마운트 포인트를 사용하고 예약된 <component> 엘리먼트를 사용하여 여러 컴포넌트 간에 동적으로 전환하고 is 속성에 동적으로 바인드 할 수 있습니다.

이 예제에서는 `selectedComponent` 변경되면 컴퍼넌트가 변경됩니다.

```html
<template>
  <div id="app">
    <button @click="selectedComponent = 'appQuote'">Quote</button>
    <button @click="selectedComponent = 'appAuthor'">Author</button>
    <button @click="selectedComponent = 'appNew'">New</button>

    {{ selectedComponent }}

    <component :is="selectedComponent">
      <p>Default content</p>
    </component>
  </div>
</template>

<script>
import Quote from './components/Quote.vue';
import Auther from './components/Author.vue';
import New from './components/New.vue';

export default {
  name: 'app',
  data: function() {
    return {
      quoteTitle: 'The Quote - slot',
      selectedComponent: 'appQuote'
    }
  },
  components: {
    appQuote: Quote,
    appAuthor: Auther,
    appNew: New
  }
}
</script>
```
