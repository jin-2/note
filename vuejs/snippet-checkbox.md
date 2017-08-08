# Vue Checkbox v-model

[Creating Custom Inputs With Vue.js](https://www.smashingmagazine.com/2017/08/creating-custom-inputs-vue-js/)

```html
<template>
  <div>
    <input type="checkbox" value="foo" v-model="checkedVals">
    <input type="checkbox" value="bar" v-model="checkedVals">
    <input type="checkbox" value="baz" v-model="checkedVals">
  </div>
</template>
<script>
  export default {
    data: () => ({
      checkedVals: ['bar']
    })
  }
</script>
```

```html
<template>
  <div>
    <input type="checkbox" value="foo" v-model="checkedVals">
    <input type="checkbox" value="bar" v-model="checkedVals">
    <input type="checkbox" value="baz" v-model="checkedVals">
  </div>
</template>
<script>
  export default {
    data() {
      return { checkedVals: ['bar'] }
    },
    methods: {
      shouldBeChecked(val) {
        return this.checkedVals.includes(val)
      },
      updateVals(e) {
        let isChecked = e.target.checked
        let val = e.target.value

        if (isChecked) {
          this.checkedVals.push(val)
        } else {
          this.checkVals.splice(this.checkedVals.indexOf(val), 1)
        }
      }
    }
  }
</script>
```
