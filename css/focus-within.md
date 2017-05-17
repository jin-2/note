# [The :focus-within pseudo class](https://www.iandevlin.com/blog/2017/04/css/the-focus-within-pseudo-class?utm_source=CSS-Weekly&utm_campaign=Issue-265&utm_medium=email)

아래 코드 `.container`의 `input`에 포커스가 갈 때 스타일을 줄 수 있다.
브라우저 지원: Firefox (since 52), Safari (since 10.1), and will come out from behind a flag in Chrome 60

```html
<style>
.container:focus-within {
  background-color: #aaa;
}
</style>

<div class="container" tabindex="0">
  <label for="text">Enter text</label>
  <input id="text" type="text" />
</div>
```
