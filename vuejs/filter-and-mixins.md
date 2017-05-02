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
