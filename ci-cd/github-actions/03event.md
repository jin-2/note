# Trigger Events

## push

```yaml
name: push-workflow
on: push
```

## Pull Request
activity types을 지정하지 않으면 PR에 커밋이 추가되어도 github action이 실행
https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#pull_request

```yaml
name: pull-request-workflow
# pull request에 정의된 default activity types 적용되어
# PR에 커밋을 또 추가할 때 github action이 실행된다.
# types에 지정해주면 PR이 opened 상태일 때만 실행된다.
on:
  pull_request:
    types: [opened]
```

## Issue
default branch에서만 동작한다.
https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#issues

```yaml
name: issue-workflow
on:
  # 일부 이벤트는 default branch에서만 트리거 된다.
  issues:
    types: [opened]
```

## Issue Comment
- Issue에 코멘트 추가될 때
- PR에 코멘트 추가될 때
- defalut branch에서만 동작

```yaml
name: issue-comment-workflow
on: issue_comment

jobs:
  # PR에 커멘트 달 때
  pr-comment:
    if: ${{ github.event.issue.pull_request }}
    runs-on: ubuntu-latest
    steps:
      - name: pr comment
        run: echo ${{ github.event.issue.pull_request }}

  # issue에 커멘트 달 때
  issue-comment:
    if: ${{ !github.event.issue.pull_request }}
    runs-on: ubuntu-latest
    steps:
      - name: issue comment
        run: echo ${{ github.event.issue.pull_request }}
```

## Workflow Dispatch
- 수동으로 트리거
- default branch에서만 동작

```yaml
name: workflow-dispatch
on:
  # 수동으로 트리거
  # default branch에서만 트리거됨
  # https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#workflow_dispatch
  workflow_dispatch:
    inputs:
      name:
        description: 'set name'
        required: true
        default: 'github actions'
        type: string
      environment:
        description: 'set env'
        required: true
        default: 'dev'
        type: choice
        options:
          - dev
          - qa
          - prod

jobs:
  workflow-dispatch-job:
    runs-on: ubuntu-latest
    steps:
      - name: step1
        run: echo hello world
      - name: step2
        run: |
          echo hello world
          echo github action
      - name: echo inputs
        run: |
          echo ${{ inputs.name }}
          echo ${{ inputs.environment }}
```

## Multiple events

```yaml
name: multiple-event-workflow
on:
  # 여러개의 이벤트를 트리거로 설정할 때
  # push 할 때, issue open 될 때, 수동으로
  push:
  issues:
    types: [opened]
  workflow_dispatch:
```

## Needs
- 하나의 워크플로우에서 여러개의 job을 실행할 때
- job 사이에 종속성이 필요한 경우
- needs를 이용해서 실행순서를 조절
- (job은 기본적으로 병렬적으로 실행)

```yaml
name: needs
on: push

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: echo
        run: echo "job1 done"

  job2:
    runs-on: ubuntu-latest
    needs: [job1]
    steps:
      - name: echo
        run: echo "job2 done"

  job3:
    runs-on: ubuntu-latest
    steps:
      - name: echo
        # exit 1: github job 강제실패
        run: |
          echo "job3 failed"
          exit 1

  job4:
    runs-on: ubuntu-latest
    needs: [job3]
    steps:
      - name: echo
        run: echo "job4 done"
```

- job2는 job1일 실행되어 성공한 경우 실행
- job4는 job3이 실패되어 실행 X

## Schedule
5분 간격, 30분 간격의 작업은 드랍될 가능성 있음, 추천 X
https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule

## Re-run
리런할 때 수정한 파일이 반영되어 워크플로우가 트리거되어야 반영