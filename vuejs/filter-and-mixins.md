# Improving your App with Filters and Mixins

## Locally

```html
<template>
  <p class="title">{{ title | toUppercase | to-lowercase }}</p>
</template>

<script>
export default {
	data() {
		return {
			title: 'Create Campaign'
		};
	},
	filters: {
		toUppercase(value) {
			return value.toUpperCase();
		}
	}
};  
</script>
```

## Globally

```javascript
Vue.filter('to-lowercase', function(value) {
  return value.toLowercase();
})
```

## Filters and Computed

> PDF
> 계산된 속성을 사용하여 배열을 필터링 할 수 있습니다. 그러면 다른 곳에서 필터링 된 결과에
접근할 수 있으므로 깊이 있는 제어와 유연함을 제공합니다. 예를 들어 필터링 된 배열의 길이는
코드의 어느 위치에서나 가져올 수 있습니다.

```html
<template>
	<div>
		<input type="text" v-model="filterText">
		<ul>
			<li v-for="(fruit, index) in filteredFruits">{{ index + 1 }}. {{ fruit }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
				filterText: ''
			};
		},
		computed: {
			filteredFruits() {
				return this.fruits.filter((element) => {
					return element.match(this.filterText);
				});
			}
		}
	};
</script>
```

### Lodash 의 orderBy 문법

```javascript
_.orderBy(collection, [iteratees=[_.identity]], [orders])
```

```html
<div class=”container”>
    <h1>Let’s hear some stories!</h1>
    <ul class=”list-group”>
        <li v-for=”story in _.orderBy(stories, [’upvotes’], [’desc’])”>
            {{ story.writer }} said ”{{ story.plot }}” and upvoted {{ story.upvotes }} times.
        </li>
    </ul>
</div>
```

## [Mixins](https://kr.vuejs.org/v2/guide/mixins.html)

> Mixins는 Vue 컴포넌트에 재사용 가능한 기능을 배포하는 유연한 방법입니다. mixin 객체는 모든 구성 요소 옵션을 포함 할 수 있습니다. 구성 요소가 mixin을 사용하면 해당 mixin의 모든 옵션이 컴포넌트의 고유 옵션에 “혼합”됩니다.

### **fruitMixin.js** 파일을 만들어 filter 기능을 삽입한다.

```javascript
export const fruitMixin = {
  data() {
    return {
      text: 'Hello there!',
      fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
      filterText: ''
    }
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter((element) => {
        return element.match(this.filterText);
      });
    }
  },
  created() {
    console.log('created');
  }
}
```

### 기능이 필요한 List.vue 파일에 `mixins` 로 추가한다.

```html
<template>
  <div>
    <h1>Filters & Mixins</h1>
    <input v-model="filterText">
    <ul>
      <li v-for="fruit in filteredFruits">{{ fruit }}</li>
    </ul>
  </div>
</template>

<script>
  import { fruitMixin } from './fruitMixin';
  export default {
    mixins: [fruitMixin],
    created() {
      console.log('Inside List Created Hook');
    }
  }
</script>
```

### 위 코드에서 `created` 훅 실행결과 믹스인 훅은 컴포넌트 자체의 훅 **이전** 에 호출된다.

```console
created
Inside List Created Hook
```

## Grobal Mixin

> 주의하십시오! mixin을 전역으로 적용하면 이후에 생성 된 모든 Vue 인스턴스 에 영향을 미칩니다.

```javascript
Vue.mixin({
  created() {
    console.log('Global Mixin - Created Hook');
  }
});
```

![vue-mixin-call](/assets/vue-mixin-call.png)

## PDF 예제

```html
<template>
  <div>
    <h3>Alex’s stories</h3>
    <ul class=”list-group”>
      <li v-for="story in storiesBy('Alex')" class="list-group-item">
        {{ story.writer }} said "{{ story.plot }}"
      </li>
    </ul>

    <h3>John’s stories</h3>
    <ul class=”list-group”>-->
      <li v-for="story in storiesBy('John')" class="list-group-item">
        {{ story.writer }} said "{{ story.plot }}"
      </li>
    </ul>

    <h3>famous list: {{ famous.length }}</h3>
    <ul class=”list-group”>
      <li v-for="story in famous" class="list-group-item">
        {{ story.writer }} said "{{ story.plot }}" and upvotes {{ story.upvotes }} times.
      </li>
    </ul>

    <h3>search list: {{ famous.length }}</h3>
    <label for="storySearch">story search</label>
    <input type="text" id="storySearch" v-model="query">

    <ul class=”list-group”>
      <li v-for="story in search" class="list-group-item">
        {{ story.writer }} said "{{ story.plot }}" and upvotes {{ story.upvotes }} times.
      </li>
    </ul>

    <pre>
      <!--{{ $data }}-->
    </pre>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stories: [
          {
            plot: 'I crashed my car today!',
            writer: 'Alex',
            upvotes: 28
          },
          {
            plot: 'Yesterday, someone stole my bag!',
            writer: 'John',
            upvotes: 8
          },
          {
            plot: 'Someone ate my chocolate...',
            writer: 'John',
            upvotes: 51
          },
          {
            plot: 'I ate someone’s chocolate!',
            writer: 'Alex',
            upvotes: 74
          }
        ],
        query: ' ' // 공백 필수
      }
    },
    computed: {
      famous: function() {
        return this.stories.filter(function(item) {
          return item.upvotes > 25;
        });
      },
      search: function() {
        var query = this.query;
        return this.stories.filter(function(story) {
          return story.plot.includes(query);
        });
      }
    },
    methods: {
      storiesBy: function (writer) {
        return this.stories.filter(function (story) {
          return story.writer == writer;
        });
      }
    }
  }
</script>

<style lang="sass">
.list-group-item
  margin: 0.1em
  padding: 0.5em
  border: 1px solid #eee
  border-radius: 5px
  list-style: none
</style>
```
