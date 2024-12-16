# Slack으로 알림받기 설정

1. "slack webhook" 검색
2. 우측 하단 "Your Apps" 클릭
3. "Create new app" 클릭
4. "From scratch" 클릭
5. "App Name" 작성, Workspace 선택
6. Slack 앱에서 알림받을 채널 생성
7. Incoming Webhooks -> "on" 활성화
8. Add New Webhook to Workspace에서 6번에서 만들 채널 선택
9. Sample curl request to post to a channel 예시 터미널에서 입력 후 슬랙에 연결되었는지 확인
    ```
    curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' YOUR_WEBHOOK_URL_HERE
    ```