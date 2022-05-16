# Typescript


union type: 타입 가드의 추가 처리가 필요하다.
```typescript
function (a: string | number) {
    if (typeof a === string) {
        a.toLocaleString();
    }
    if (typeof a === number) {
        a.toString();
    }
}
```