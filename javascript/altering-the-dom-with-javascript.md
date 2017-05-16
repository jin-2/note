# [Altering the DOM with JavaScript](https://zellwk.com/blog/js-in-dom/)

## Selecting HTML elements

```javascript
document.querySelector('#identity');
```

## querySelectorAll

```javascript
let allThings = document.querySelectorAll('.this, .that');

// Modern browsers
allThings.forEach(el => {/* do something with element */});

// older browsers
// let allThingArray = Array.prototype.slice.call(allThings);
let allThingArray = Array.from(allThings);
allThingArray.forEach(el => {/* do something with element */});
```

## Adding event listeners

```javascript
let thing = document.querySelector('.thing');
thing.addEventListener(event, callback);

function callback(e) {
  e.preventDefault();
  console.log('thing is clicked!');

  // 전형적으로 일을 진행한 후 이벤트를 지울 것이다.
  thing.removeEventListener('click', callback);
}
```

## Adding and removing classes

```javascript
let button = document.querySelector('button')
let nav = document.querySelector('nav')

button.addEventListener('click', toggleNav)

function toggleNav() {
  // Checks if nav has is-open class
  if (nav.classList.contains('is-open')) {
    // removes is-open class
    nav.classList.remove('is-open')
  } else {
    // adds is-open class
    nav.classList.add('is-open')
  }
}
```

## Adding, changing and removing attributes

```javascript
// Get attribute
button.getAttribute('aria-expanded')

// Set attribute
button.setAttribute('aria-expanded', true)

// Remove attribute
button.removeAttribute('aria-expanded')
```

## Adding elements to the DOM

```javascript
let ul = document.querySelector('ul')

// Creating a <li> element
let li = document.createElement('li')

// Adding content to the <li> element
li.innerHTML = 'Hello again, world!'

// Adding it to the DOM
ul.append(li)
```

## Removing elements from the DOM

```javascript
ul.removeChild(li)
```
