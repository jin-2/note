# Jenkins 시작하기

## 과정
1. `새로운 Item` 메뉴에서 하단에 copy from 메뉴에서 검색하여 다른 프로젝트를 복사해서 테스트 해본다.
1. 설정화면에서 `General` > `소스 코드 관리` 내용을 작성한다.
    - Repository URL
    - Credentials: Add 하여 나의 계정을 추가했다.
1. `빌드 유발` 에서 `Authentication Token` 식별할 수 있는 특별한 값을 삽입한다. 예)pppp
1. 하단에 있는 설명처럼 `http://13.124.177.106:8080/job/sujin-test2/build?token=pppp`
토큰을 삽입하여 주소창에서 엔터를 치면 젠킨스 메뉴에서 `Build Now`를 클릭한 것과
같은 결과이다. 즉 소스가 체크아웃 받아진다.
    > Use the following URL to trigger build remotely: JENKINS_URL/job/sujin-test2/build?token=TOKEN_NAME or /buildWithParameters?token=TOKEN_NAME
Optionally append &cause=Cause+Text to provide text that will be included in the recorded build cause.

## 다음에는
Bitbucket에서 webhook설정을 이용해 pull request나 merge등이 될 때 build를 해보자.

## 참고링크
- [jenkins로 배포하기 - nodejs-1](https://setyourmindpark.github.io/2017/04/22/jenkins-2/)
- [NodeJS Plugin](https://wiki.jenkins.io/display/JENKINS/NodeJS+Plugin)
