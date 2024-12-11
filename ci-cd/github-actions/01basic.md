# Github Actions

## 디렉토리
`.github/workflows/{deploy}.yml`

## 기본 문법 정리

```yaml
# Workflow 이름
name: Github Actions 실행시켜보기

# Event: 실행되는 시점을 설정
on:
  push:
    branches:
      - main

# 하나의 Workflow는 1개 이상의 Job으로 구성
# 여러 Job은 기본적으로 병렬적으로 수행
jobs: 
  # Job을 식별하기 위한 id
  My-Deploy-Job:
    # 어떤 운영체제에서 실행할 지
    runs-on: ubuntu-latest

    # Step: 특정 작업을 수행하는 가장 작은 단위 Job = Step, Step, Step
    steps:
      - name: Hello World 찍기
        run: echo "Hello World"

      # | 사용
      - name: 여러 명령어 문장 작성하기
        run: |
          echo "Good"
          echo "Morning"

      # github settings에서 미리 값을 저장
      - name: 노출되면 안 되는 값
        run: |
          echo ${{ secrets.MY_AGE }}
          echo ${{ secrets.MY_ADDRESS }}
```

## Secret key 관리
- Github 레포지토리의 Settings 페이지로 이동해서
- Secrets and variables > actions > new repository secret 추가