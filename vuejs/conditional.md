# Conditionals & Lists

## v-else-if
v-else-if는 이름에서 알 수 있듯, v-if에 대한 “else if 블록” 역할을 합니다. 또한 여러 개를 사용할 수 있습니다.  
v-else와 마찬가지로, v-else-if 엘리먼트는 v-if 또는 v-else-if 엘리먼트 바로 뒤에 와야 합니다.
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

## v-for

### `<template>`을 이용하여 그룹으로 사용.

```html
<div id="app">
  <template v-for="(item, index) in items">
      <h1>{{ item }}</h1>
      <p>{{ index }}</p>
  </template>
</div>
```

```javascript
data: {
  items: ['apple', 'banana', 'melon']
}
```

### 객체로 이루어진 배열인 경우

```javascript
data: {
  persons: [
    {name: 'max', age: '27', color: 'red'},
    {name: 'ann', age: '30', color: 'blue'}
  ]
}
```

```html
<ul>
  <li v-for="person in persons">{{ person.name }}</li>
</ul>
```

```html
<ul>
  <li v-for="person in persons">
    <div v-for="(value, key, index) in person">{{ key }}: {{ value }} ({{ index }})</div>
  </li>
</ul>
```

### Update - push()

```html
<ul>
  <li v-for="(ingredient, i) in ingredients" :key="ingredient">{{ ingredient }} ({{ i }})</li>
</ul>
<button @click="ingredients.push('spices')">Add New</button>
```

super save? real unique value
`:key="ingredient"`

### array 체크해서 리스트 만들기

```html
<ul>
  <li v-for="value in testData">
    <template v-if="Array.isArray(value)">
      <div v-for="element in value">
        {{ element }}
      </div>
    </template>
    <template v-else>
      {{ value }}
    </template>
  </li>
</ul>
```

```javascript
data: {
  testData: {
    name: 'TESTOBJECT',
    id: 10,
    data: [1.67, 1.33, 0.98, 2.21]
  }
}
```
