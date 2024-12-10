# Docker

## JSCODE 박재성 - Docker 입문/실전
[https://www.youtube.com/playlist?list=PLtUgHNmvcs6rS5aNCRIZtVcyk3gRX2iOd](https://www.youtube.com/playlist?list=PLtUgHNmvcs6rS5aNCRIZtVcyk3gRX2iOd)

### 도커란?

- 컨테이너를 사용하여 각각의 프로그램을 분리된 환경에서 실행 및 관리할 수 있는 툴

#### 도커의 장점

- 이식성: 특정 프로그램을 다른 곳으로 쉽게 옮겨서 설치할 수 있는 특성(이사가 쉽다)

### 컨테이너란?

- 컴퓨터 안에 있는 미니 컴퓨터라고 생각하자

#### 컨테이너의 특징
독립성
- 디스크(저장 공간): A컨테이너 내부에서 B컨테이너의 내부의 파일에 접근할 수 없다.
- 네트워크(IP, Port): 고유의 네트워크를 가지고 있다. 각자 IP 주소가 있다.

### 이미지란?
닌텐도 칩.

Node.js 기반의 Express.js 서버 프로젝트를 이미지로 만들어,
Docker로 실행하면 Express.js 서버 프로젝트가 컨테이너 환경에서 실행된다.
간단하게 Nginx로 컨테이너를 띄워보자.

```
// nginx 이미지를 다운받는다.
docker pull nginx

// 다운받은 이미지 확인
docker image ls

// 이미지를 가지고 컨테이너를 실행
docker run --name webserver -d -p 80:80 nginx

// 컨테이너가 띄워진 건 지 확인
docker ps

// 컨테이너 종료
docker stop webserver
```

### docker 명령어

[https://hub.docker.com/](https://hub.docker.com/)

#### 이미지(Image) 조회/삭제

```
// 이미지 삭제: IMAGE ID 일부만 입력 가능
// docker image rm {IMAGE ID}
docker image rm fb1975

// 삭제 후 확인
docker image ls

// 강제 삭제(컨테이너가 중지되어야 가능)
docker image rm -f 705

// 컨테이너에서 사용하고 있지 않는 전체 이미지를 삭제한다.
docker image rm $(docker images -q)

// 중단된 컨테이너에서 사용하고 있는 이미지를 삭제한다.
docker image rm -f $(docker images -q)
```

#### 컨테이너(Container) 생성/실행

```
// container 생성: 이미지를 바탕으로 생성한다
// 미니컴퓨터를 만들었다.
docker create nginx

// 컨테이터 목록 확인
docker ps -a

// 미니컴퓨터를 실행하자.
// docker start {CONTAINER ID}
docker start 37e

// 컨테이너 중지 후 삭제 가능
docker stop {CONTAINER ID}

// 컨테이너 삭제
docker rm {CONTAINER ID}

// 컨테이너 여러개 삭제
docker rm {CONTAINER ID} {CONTAINER ID} {CONTAINER ID}
```

![vue-mixin-call](/assets/docker-container-start.png)

```
// 컨테이너 생성 및 실행
// docker create + start
docker run nginx
```

##### 포그라운드(foreground)
내가 실행시킨 프로그램 내용이 화면에서 실행되고 출력되는 상태 
`docker run {nginx}`

##### 백그라운드(background)
내가 실행시킨 프로그램이 컴퓨터 내부적으로 실행되는 상태

```
docker run -d nginx

// 이름 지정해서 백그라운드로 실행하기
// docker run -d --name {NAMES} nginx
docker run -d --name my-web-server nginx
```

#### 호스트의 포트와 컨테이너 포트를 연결하기

포트매핑: 컨테이너가 네트워크 망이 분리되어 있어 연결시켜 컨테이너에 접근

```
docker run -d -p 4000:80 nginx
```

#### 컨테이너 조회/중지/삭제

```
// 실행중인 컨테이너만 조회
docker ps

// 실행중, 중단된 모든 컨테이너 조회
docker ps -a

// 안정적으로 시스템 종료
docker stop {CONTAINER_ID}

// 강제 종료
docker kill {CONTAINER_ID}

// 중지된 컨테이너 삭제
docker rm {CONTAINER_ID}

// 중지된 컨테이너 모두 삭제
docker rm $(docker ps -qa)

// 실행된 컨테이너 삭제
docker rm -f {CONTAINER_ID}
```

#### 컨테이너 로그 조회

```
// 로그 확인
docker logs {CONTAINER_ID}

// 로그의 최근 열줄만 확인
docker logs --tail 10 {CONTAINER_ID}

// 실시간 생성된 로그
docker logs -f {CONTAINER_ID}

// 앞에 로그를 보지않고 현재부터 로그만 확인
docker logs --tail 0 -f {CONTAINER_ID}
```

#### 실행중인 컨테이너 내부에 접속하기(exec-it)

```
// 컴퓨터를 bash 환경으로 접속하겠다.
docker exec -it {CONTAINER_ID} bash

// 퇴장
exit
```

#### Docker volume
컨테이너 기능이 추가되면 컨테이너에 새로운 이미지를 만들어서 컨테이너를 실행시켜야 한다. 
이때, 기존 컨테이너의 변경된 부분을 수정하지 않고, 통째로 갈아끼우는 방식으로 교체한다.
만약 내부에 삭제되면 안되는 데이터가 있는 경우 **볼륨**이라는 개념을 활용해야 한다.

호스트의 저장 공간을 공유해서 사용하는 형태이고, 데이터를 영속적으로 저장 할 수 있다. 

```
docker run -v [호스트의 디렉토리 절대경로]:[컨테이너의 디렉토리 절대경로] [이미지명]:[태그명]
```

#### Doker로 MySQL 실행시켜보기
[How to use this image](https://hub.docker.com/_/mysql)

```
// mysql 이미지로 컨테이너에 설치 
docker run -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql

docker exec -it {CONTAINER_ID} bash

echo $MYSQL_ROOT_PASSWORD

mysql -u root -p

Enter password:

show databases;

// mydb 추가
create database mydb;

show databases;

exit

// 컨테이너 삭제
docker rm -f {CONTAINER_ID}

// 다시 mysql 설치하고
docker run -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql
docker exec -it {CONTAINER_ID} bash
mysql -u root -p

// DB에는 mydb가 없다.
show databases;
```

##### volume 이용하여 설치
[MySQL: Where to Store Data](https://hub.docker.com/_/mysql)

```
// 호스트에 데이터를 저장하기 위해 디렉토리를 설정하여 설치
// 디렉토리 추가함 /Users/isujin/docker-test-host/docker-mysql/mysql-data
// Where to Store Data: /var/lib/mysql
docker run -e MYSQL_ROOT_PASSWORD=my-1234 -p 3306:3306 -d -v /Users/isujin/docker-test-host/docker-mysql/mysql-data:/var/lib/mysql mysql
```

**volume 주의사항**
MySQL을 삭제하고 다시 설치할 때 password를 변경했다면 변경한 password로 MySQL에 접근하지 못한다.
이미 지정한 volume에 이전 password로 설정이 되어있기 때문이다.
- MySQL에서 password를 변경하거나
- 설정한 디렉토리를 삭제하고 다시 만드는 방법이 있을 수 있다.