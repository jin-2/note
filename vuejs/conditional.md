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

### [key](https://kr.vuejs.org/v2/guide/list.html#key) (`:key="ingredient"`)
데이터 항목의 순서가 변경된 경우 항목의 순서와 일치하도록 DOM 요소를 이동하는 대신
Vue는 각 요소를 적절한 위치에 패치하고 해당 인덱스에서 렌더링할 내용을 반영하는지 확인합니다.  

Vue가 각 노드의 ID를 추적하고 기존 엘리먼트를 재사용하고 재정렬할 수 있도록 힌트를
제공하려면 각 항목에 고유한 key 속성을 제공해야 합니다. key에 대한 이상적인 값은
각 항목의 고유한 ID입니다.

```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

반복되는 DOM 내용이 단순하지 않거나 의도적인 성능 향상을 위해 기본 동작에 의존하지
않는한 가능하면 언제나 v-for에 key를 추가하는 것이 좋습니다.

<!-- super save? real unique value -->

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
