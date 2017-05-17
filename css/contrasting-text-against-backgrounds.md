# [Methods for Contrasting Text Against Backgrounds](https://css-tricks.com/methods-contrasting-text-backgrounds/?utm_source=CSS-Weekly&utm_campaign=Issue-265&utm_medium=email)

배경과 대비되는 폰트 스타일 방법

## `mix-blend-mode: difference;`
element 의 직속 부모 content 와 element 의 background 에 blend (혼합)되어야 하는지 서술한다.

```css
header { background: url(black-and-white-image.jpg) }

h2 {
  color: white;
  mix-blend-mode: difference;
}
```

## `filter: invert(1);`

```css
h2 {
  background: inherit;
  background-clip: text;
  color: transparent;
  filter: invert(1);
}
```

### 폰트 흑백반전

```css
filter: invert(1) grayscale(1) contrast(9)
```
