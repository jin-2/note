# [clipboard.js](https://clipboardjs.com/) 플러그인 홈페이지에 적용

1. zip 파일 다운로드
2. `HOMEPAGE\src\main\resources\static\js` 파일 삽입
3. `HOMEPAGE\src\main\resources\templates\index.vm` 스크립트 삽입
  ```
  <script src="js/clipboard.min.js"></script>
  ```
4. `dev.js` 파일에 clipboard 인스턴스 정의
  ```
  new Clipboard('.js-tooltip-share-button');
  ```
5. 클릭대상에 `data-clipboard-target="#foo"` data 값 정의, 복사대상에 id값 정의
  ```html
  <!-- Target -->
  <input id="foo" value="https://github.com/zenorocha/clipboard.js.git">

  <!-- Trigger -->
  <button class="btn" data-clipboard-target="#foo">
      <img src="assets/clippy.svg" alt="Copy to clipboard">
  </button>
  ```
6. 스타일 수정

  ```css
  .item::selection {
    color: #eee;
  }
  ```
