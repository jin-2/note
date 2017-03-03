# [클래스와 스타일 바인딩](https://kr.vuejs.org/v2/guide/class-and-style.html#배열-구문)

## HTML 클래스 바인딩하기

### 객체 구문

active 클래스의 존재 여부가 데이터 속성 isActive 의 참 속성에 의해 결정되는 것을 의미합니다.

```html
<div class="{active: isActive}"></div>
```

객체에 필드가 더 있으면 여러 클래스를 토글 할 수 있습니다. 또한v-bind:class 디렉티브는 일반 class 속성과 공존할 수 있습니다. 그래서 다음과 같은 템플릿이 가능합니다:

```html
<div class="static"
     @click="isActive = !isActive"
     :class="{active: isActive, 'text-danger': hasError}"></div>
```

```javascript
data: {
  isActive: true,
  hasError: false
}
```

바인딩 된 객체는 인라인 일 필요는 없습니다.

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

또한 객체를 반환하는 계산된 속성에도 바인딩 할 수 있습니다. 이것은 일반적이며 강력한 패턴입니다.

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  isActive: false
},
computed: {
  classObject: function () {
    return {
      active: !this.isActive,
      default : this.isActive
    }
  }
}
```

### 배열 구문
클래스 목록을 지정할 수 있습니다.
여러 조건부 클래스가 있는 경우 장황해질 수 있습니다. 그래서 배열 구문 내에서 객체 구문을 사용할 수 있습니다.

```html
<div style="[myStyle, {height: width + 'px'}]"></div>
```

```javascript
data: {
  color: 'gray',
  width: 100
},
computed: {
  myStyle: function() {
    return {
      backgroundColor: this.color,
      width: this.width + 'px'
    }
  }
}
```
