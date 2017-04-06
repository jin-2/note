# [Using and Creating Directives](http://kr.vuejs.org/v2/guide/custom-directive.html)

## [Vue.directive( id, [definition] )](http://kr.vuejs.org/v2/api/#Vue-directive)
전역 디렉티브를 등록하거나 검색합니다.

```javascript
// Creating a Simple Directive
Vue.directive('highlight1', {

  // bind: 훅 함수
  // el, binding, vnode: 디렉티브 훅 전달인자
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = 'green';
  }
})

// Passing Values to Custom Directives
Vue.directive('highlight2', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = binding.value;
  }
})

// Passing Arguments to Custom Directives
Vue.directive('highlight3', {
  bind: function (el, binding, vnode) {
    if (binding.arg == 'background') {
      el.style.backgroundColor = binding.value;;
    } else {
      el.style.color = binding.value;
    }
  }
})

// Modifying a Custom Directive with Modifiers
Vue.directive('highlight4', {
  bind: function (el, binding, vnode) {
    var delay = 0;
    if (binding.modifiers['delayed']) {
      delay = 3000;
    }

    setTimeout(() => {
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value;;
      } else {
        el.style.color = binding.value;
      }
    }, delay);
  }
})
```

```html
<p v-highlight1>color this</p>

<p v-highlight2="'red'">color this</p>

<p v-highlight3:background.delayed="'red'">color this</p>

<!-- 멀티 수식 가능 -->
<p v-highlight3:background.delayed.another="'red'">color this</p>
```

### Locally

```html
<p v-local-highlight:background.delayed="'red'">color this</p>
```

```javascript
export default {
  directives: {
    'local-highlight': {
      bind: function (el, binding, vnode) {
        var delay = 0;
        if (binding.modifiers['delayed']) {
          delay = 3000;
        }

        setTimeout(() => {
          if (binding.arg == 'background') {
            el.style.backgroundColor = binding.value;;
          } else {
            el.style.color = binding.value;
          }
        }, delay);
      }
    }
  }
}
```

## Using Multiple Modifiers

```html
<p v-local-highlight:background.delayed.blink="'red'">color this</p>
```

```javascript
export default {
  directives: {
    'local-highlight': {
      bind: function (el, binding, vnode) {
        var delay = 0;
        if (binding.modifiers['delayed']) {
          delay = 3000;
        }

        if (binding.modifiers['blink']) {
          let mainColor = binding.value;
          let secondColor = 'blue';
          let currentColor = mainColor;

          setTimeout(() => {
            setInterval(() => {
              currentColor == secondColor ? currentColor = mainColor : currentColor = secondColor;
              if (binding.arg == 'background') {
                el.style.backgroundColor = currentColor;
              } else {
                el.style.color = currentColor;
              }
            }, 1000);
          }, delay);

        } else {
          setTimeout(() => {
            if (binding.arg == 'background') {
              el.style.backgroundColor = binding.value;;
            } else {
              el.style.color = binding.value;
            }
          }, delay);
        }
      }
    }
  }
}
```

## Passing more Complex Values to Directives

```html
<p v-local-highlight:background.delayed.blink="{mainColor: 'red', secondColor: 'green', delay: 500}">color this</p>
```

```javascript
export default {
  directives: {
    'local-highlight': {
      bind: function (el, binding, vnode) {
        var delay = 0;
        if (binding.modifiers['delayed']) {
          delay = 3000;
        }

        if (binding.modifiers['blink']) {
          let mainColor = binding.value.mainColor;
          let secondColor = binding.value.secondColor;
          let currentColor = mainColor;

          setTimeout(() => {
            setInterval(() => {
              currentColor == secondColor ? currentColor = mainColor : currentColor = secondColor;
              if (binding.arg == 'background') {
                el.style.backgroundColor = currentColor;
              } else {
                el.style.color = currentColor;
              }
            }, binding.value.delay);
          }, delay);

        } else {
          setTimeout(() => {
            if (binding.arg == 'background') {
              el.style.backgroundColor = binding.value.mainColor;
            } else {
              el.style.color = binding.value.mainColor;
            }
          }, delay);
        }
      }
    }
  }
}
```
