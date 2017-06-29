# [JWT(JSON Web Token)](https://velopert.com/2389)

## 토큰 기반 인증 작동 원리

- 유저가 아이디와 비밀번호로 로그인을 한다.
- 서버측에서 해당 계정정보를 검증한다.
- 계정정보가 정확하다면, 서버측에서 유저에게 signed 토큰을 발급해준다.
  - 여기서 signed 의 의미는 해당 토큰이 서버에서 정상적으로 발급된 토큰임을 증명하는 signature 를 지니고 있다는 것이다
- 클라이언트 측에서 전달받은 토큰을 저장해두고, 서버에 요청을 할 때 마다, 해당 토큰을 함께 서버에 전달한다.
- 서버는 토큰을 검증하고, 요청에 응답한다.

- 웹서버에서 토큰을 서버에 전달 할 때에는, **HTTP 요청의 헤더** 에 토큰값을 포함시켜서 전달한다.
- 서버측에서 어플리케이션의 응답부분에 다음 헤더만 포함시켜주면 된다.

```
Access-Control-Allow-Origin: *
```

## JWT의 생김새

```
// 헤더.내용.서명
aaaaaa.bbbbbb.cccccc
```

### 헤더(Header)

아래 두가지 정보를 base64로 인코딩하여 사용한다.

```
{
   // 토큰타입
  "typ": "JWT",

  // 해싱 알고리즘: 토큰 검증할 때 사용되는 signature 부분에서 사용
  "alg": "HS256"
}
```

### 정보(payload)
토큰에 담을 정보가 들어있다. 여기에 담는 정보의 한 '조각'을 클레임(claim)이라고 부르고,
이는 name/value의 한 쌍의로 이뤄져있다. 토큰에는 여러개의 클레임을 넣을 수 있다.

#### 예제

```
{
  "iss": "velopert.com",
  "exp": "1485270000000",
  "https://velopert.com/jwt_claims/is_admin": true,
  "userId": "11028373727102",
  "username": "velopert"
}
```

#### 등록된(registered): 선택적(optional)
- iss: 토큰 발급자
- sub: 토큰 제목
- aud: 토큰 대상자
- exp: 토큰 만료 시간
- nbf: 토큰 활성 날짜
- iat: 토큰이 발급된 시간
- jti: JWT 고유 식별자(중복처리방지)

#### 공개(public): 충돌이 방지된 이름을 가져야 한다. URI 형식이다.

```
{
  "https://velopert.com/jwt_claims/is_admin": true
}
```

#### 비공개(private): 클라이언트와 서버 협의하에 사용되는 클레임 이름

```
{
  "username": "velopert"
}
```

### 서명(signature)
헤더의 인코딩값과 정보의 인코딩값을 합친 후 주어진 비밀키로 해쉬를 하여 생성합니다.


## 참고링크
- [JWT 디버거](https://jwt.io/)
