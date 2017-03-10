# The Vue.js Instance

```
new Vue(...)
```

## Using Multiple Vue Instances

```
var vm1 = new Vue(...)
var vm2 = new Vue(...)
```

## Accessing the Vue Instance from Outside(밖에서 접근)

```
setTimout(function() {
  vm1.title = 'changed by Timer';
}, 3000);
```

```
vm1.newProp = 'New!';
console.log(vm1);
```

## How VueJS manages your Data and Methods

```
var data = {
  title: 'HI',
  showParagraph: false
}

var vm = new Vue({
    data: data
});
```

## A Closer Look at `$el` and `$data`
$el: html template
