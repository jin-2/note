# Actions

## [Checkout](https://github.com/marketplace/actions/checkout)
Github Repository를 가져와 작업을 수행

```yaml
name: checkout
on: workflow_dispatch

jobs:
  no-checkout:
    runs-on: ubuntu-latest
    steps:
      - name: check file list
        run: cat README.md

  checkout:
    runs-on: ubuntu-latest
    steps:
      - name: use checkout action
        # uses 키워드를 이용해 action을 불러올 수 있다.
        uses: actions/checkout@v4
      - name: check file list
        run: cat README.md
```

## [Context](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#about-contexts)
워크플로우를 실행하는 환경에 대한 정보

아래처럼 유연하게 워크플로우를 만들기 위해 사용한다.
- dev branch에 push 이벤트 발생하면, workflow에서 1번 job 실행
- master branch에 push 이벤트 발생하면, workflow에서 2번 job 실행

```yaml
name: context
on: workflow_dispatch

jobs:
  context:
    runs-on: ubuntu-latest
    steps:
      - name: github context
        # github에 대한 정보
        run: echo '${{ toJSON(github) }}'
      - name: check github context
        run: |
          echo ${{ github.repository }}
          echo ${{ github.event_name }}
```

## [Filter](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)
특정 조건일 때만 워크플로우가 실행되도록 효과적으로 제어
- 특정 branch에서 실행
- 특정 path에서 실행
- 특정 tag에서 실행

### branch

```yaml
name: branch-filter
on:
  push:
    # dev 브랜치에 push 될 때만
    branches: ["dev"]
```

### path

```yaml
name: path-filter
on:
  push:
    paths:
      # 아래 디렉토리에 변경사항이 일어나면 trigger
      - '.github/workflows/part1/*'
      # !: 제외하다
      # push.yaml 파일의 변경사항을 trigger에서 제외
      - '!.github/workflows/part1/push.yaml'
```

### tag
- push event에서만 사용 가능
- 태그 생성: `git tag v0.0.0`

```yaml
name: tag-filter
on:
  push:
    tags:
      # success: v1.0.0 or v2.2.2
      # fail: v1.0 or 1.0.0
      - 'v[0-9]+.[0-9]+.[0-9]+'
```

## [Timeout](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes)
- 특정 시간 실행되면 자동으로 중단
- 특정 job or 특정 step 무한 루프 시 불필요한 자원 소모 방지
- default: 360분

```yaml
name: timeout
on: push

jobs:
  timeout:
    runs-on: ubuntu-latest
    # job level: 2분 이상 실행되면 종료
    timeout-minutes: 2
    steps:
      - name: loop
        run: |
          count=0
          while true; do
            echo "seconds: $count"
            count=$((count+1))
            sleep 1
          done
        # step level: 1분 이상 실행되면 종료
        timeout-minutes: 1
      - name: echo
        run: echo hello
```

## [Cache](https://github.com/marketplace/actions/cache)
- [Caching dependencies to speed up workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows)
- 자주 사용되는 데이터를 빠르게 불러올 수 있도록 저장하는 기능
- actions > management > caches 탭에서 확인 가능

```yaml
name: cache
on:
  push:
    paths:
      # my-app 디렉토리 아래에 모든 파일을 포함
      - 'my-app/**'

jobs:
  cache:
    runs-on: ubuntu-latest
    steps:
      - name: checkout # 레포지토리 체크아웃
        uses: actions/checkout@v4
      - name: steup-node # node version 18 설치
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Cache Node.js modules
        uses: actions/cache@v3
        with:
          # 캐싱할 경로
          path: ~/.npm
          # runner.os: 운영체제 별로 캐시를 분리하기 위해
          # hashFiles('**/package-lock.json') hash값이 변경될 때 새로운 캐시를 생성하기 위해
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          # 캐시 복구
          # 가장 가까운 캐시를 찾아서 사용하기 위함
          restore-keys: |
            ${{ runner.os }}-node-
      - name: Install dependencies
        run: |
          cd my-app
          npm ci
      - name: npm build
        run: |
          cd my-app
          npm run build
```

## [Artifact](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow)
- 워크플로우 실행 중 생성된 파일 또는 파일 모음
- 동일한 워크플로우 내에서 job 사이에 데이터 공유
  - [GitHub Actions에서 작업(job)은 독립된 CI 서버에서 완전히 격리되어 실행되기 때문에 기본적으로 데이터 공유되지 않는데요.](https://www.daleseo.com/github-actions-artifacts/)
- 워크플로우가 종료된 후에도 데이터 유지(90일)
- 다운로드 가능
- 깃헙 마켓플레이스에 정의된 공식 액션
  - [upload-artifact](https://github.com/marketplace/actions/upload-a-build-artifact)
  - [download-artifact](https://github.com/marketplace/actions/upload-a-build-artifact)

```yaml
name: artifact
on: push

jobs:
  uplodad-artifact:
    runs-on: ubuntu-latest
    steps:
      - name: echo
        # hello.txt 파일에 hello-world 입력
        run: echo hello-world > hello.txt
      - name: upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: artifact-test
          path: ./hello.txt

  download-artifact:
    runs-on: ubuntu-latest
    # upload 후에 실행되어야 함
    needs: [uplodad-artifact]
    steps:
      - name: download artifact
        uses: actions/download-artifact@v3
        with:
          name: artifact-test
          path: ./
      - name: check
        run: cat hello.txt
```

## [Output](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/passing-information-between-jobs)
- 한 job에서 생성된 데이터를 동일한 job의 step, 다른 job에 데이터 공유
- 여러 step과 job 간에 데이터를 손쉽게 전달
- `echo "{key}={value}" >> $GITHUB_OUTPUT`
- [아웃풋을 사용하려면 아웃풋이 정의된 **스텝의 고유 id**를 사용해야함](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsid)
- 다른 잡에서 아웃풋을 사용하려면
  - needs
  - job level outputs

### artifact vs output
- artifact
  - 파일 또는 파일 모음으로 데이터 공유 가능
- output
  - **단순한 값 전달할 때 사용**
  - key-value 형태로 데이터 저장

```yaml
name: output
on: push

jobs:
  create-output:
    runs-on: ubuntu-latest
    outputs:
      test: ${{ steps.check-output.outputs.test }}
    steps:
      - name: echo input
        id: check-output
        run: |
          echo "test=hello" >> $GITHUB_OUTPUT
      - name: check output
        # hello 출력
        run: |
          echo ${{ steps.check-output.outputs.test }} 

  get-output:
    # create-output이 실행된 후
    needs: [create-output]
    runs-on: ubuntu-latest
    steps:
      - name: get output
        # hello 출력
        run: echo ${{ needs.create-output.outputs.test }}
```

## [Environment variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables)
- step이나 job에서 사용할 수 있는 환경 변수
- key-value 형태로 데이터 저장

### output vs env
- output
  - 같은 job, 다른 job 간에 데이터 공유
- env
  - 동일한 job에서만 데이터 공유

### env 사용
- workflow file 안에서 정의
  - workflow level, job level, step level에서 정의
  - 우선순위: step > job > workflow

```yaml
name: var-1
on: push

# 워크플로우 레벨에서 환경변수 구성
env:
  level: workflow

jobs:
  get-env-1:
    runs-on: ubuntu-latest
    steps:
      - name: check env
        run: echo "LEVEL ${{ env.level }}" # workflow

  get-env-2:
    runs-on: ubuntu-latest
    env:
      level: job
    steps:
      - name: check env
        run: echo "LEVEL ${{ env.level }}" # job

  get-env-3:
    runs-on: ubuntu-latest
    env:
      level: job
    steps:
      - name: check env
        run: echo "LEVEL ${{ env.level }}" # step
        env:
          level: step

  get-env:
    runs-on: ubuntu-latest
    steps:
      - name: create env
        run: echo "level=job" >> $GITHUB_ENV
      - name: check env
        run: echo "LEVEL ${{ env.level }}"
```

### vars 사용
- github settings > Secrets and variables에서 미리 정의

```yaml
name: var-2
on: push

jobs:
  get-var:
    runs-on: ubuntu-latest
    steps:
      - name: get var
        # github settings에서 등록한 Repository variables 가져오기
        run: echo ${{ vars.level }}
```

### secret
- 민감한 데이터를 안전하게 저장해서 워크플로우에서 사용
- 안전한 저장(github에서 암호화)
- 로깅 방지(출력 시 마스킹)
- 접근 제한(워크플로우 실행 중에만 접근 가능)

```yaml
name: secrets
on: push

jobs:
  get-secrets:
    runs-on: ubuntu-latest
    steps:
      - name: get secrets
        run: echo ${{ secrets.level }}
```

### Github environment
- 특정 환경에서만 사용 가능한 환경변수와 시크릿 관리
- organization level, repository level, environment level로 정의
- 우선 순위: environment > repo > org

```yaml
name: environment
on: push

jobs:
  get-env:
    runs-on: ubuntu-latest
    steps:
      - name: check env & secret
        run: |
          echo ${{ vars.level }}
          echo ${{ secrets.key }}

  get-env-dev:
    runs-on: ubuntu-latest
    environment: dev
    steps:
      - name: check env & secret
        run: |
          echo ${{ vars.level }}
          echo ${{ secrets.key }}
```

## [Matrix](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow)
- 다양한 변수를 조합하여 작업을 병렬로 실행할 수 있는 기능
- 주로 다양한 환경, 설정 또는 의존성을 테스트하거나 빌드하는 데 사용
- 예시: 변수로 window, linux, macOS 설정하여 하나의 잡을 구성해서 러너가 다른 잡 3개를 실행

```yaml
name: matrix
on: push

jobs:
  get-matrix:
    strategy:
      # 4개의 job이 실행된다.
      # windows-latest 12, windows-latest 14
      # ubuntu-latest 12, ubuntu-latest 14
      matrix:
        os: [windows-latest, ubuntu-latest]
        version: [12, 14]
    runs-on: ${{ matrix.os }}
    steps:
      - name: check matrix
        run: |
          echo ${{ matrix.os }}
          echo ${{ matrix.version }}
```

## [If condition](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/using-conditions-to-control-job-execution)
- 특정 조건이 충족될 때 실행되도록 하는 데 사용
- [operators 활용](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/evaluate-expressions-in-workflows-and-actions#operators)
- job level, step level

### filter vs if condition
- filter
  - workflow 트리거를 더 세밀하게 제어
- if condition
  - workflow가 트리거 된 이후 job과 step을 세밀하게 제어

```yaml
name: if-1
on:
  push:
  workflow_dispatch:

jobs:
  job1:
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    steps:
      - name: get event name
        run: echo ${{ github.event_name }}
  job2:
    runs-on: ubuntu-latest
    if: github.event_name != 'push'
    steps:
      - name: get event name
        run: echo ${{ github.event_name }}
  job3:
    runs-on: ubuntu-latest
    steps:
      - name: get event name
        if: github.event_name == 'push'
        run: echo "PUSH"
      - name: get event name
        if: github.event_name != 'push'
        run: echo "WORKFLOW_DISPATCH"
```

### if: always()
특정 job과 stepd을 강제로 실행 가능

```yaml
name: if-2
on: push

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: exit 1
        run: exit 1
      - name: echo
        if: always()
        run: echo hello

  job2:
    needs: [job1]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: echo
        run: echo hello
```

## startswith, endswith, contains
- 문자열 처리 함수(문자열에 대한 조건 검사 수행)

```yaml
name: string-function
on: push

jobs:
  string-function:
    runs-on: ubuntu-latest
    steps:
      - name: startswith
        if: startsWith('github actions', 'git')
        run: echo "git"
      - name: startswith
        if: startsWith('github actions', 'test')
        run: echo "test"

      - name: endswith
        if: endsWith('github actions', 'ions')
        run: echo "ions"
      - name: endswith
        if: endsWith('github actions', 'test')
        run: echo "test"

      - name: contains
        if: contains('github actions', 'act')
        run: echo "contains act"
      - name: contains
        if: contains('github, actions', 'git')
        run: echo "contains git"
```