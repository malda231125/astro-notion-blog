---
title: "도커 기반의 오픈클로 설치 가이드"
description: "Docker 환경에서 OpenClaw(오픈클로)를 설치하고 실행하는 과정을 실무 기준으로 정리한 가이드입니다."
pubDate: 2026-02-27T00:00:00.000Z
updatedDate: 2026-02-27T10:39:00.000Z
slug: "openclaw-docker-guide"
tags: ["OpenClaw", "Docker", "설치 가이드"]
---
> **환경:** Ubuntu 홈서버 + Docker Desktop (맥에서 RDP 원격 접속으로 셋팅)
>
> **방식:** 순수 docker 명령어만 사용 (Dockerfile, docker-compose 없음)
>
>
> **베이스 이미지:** Ubuntu 24.04
>
>
> **최종 업데이트:** 2026-02-27
>
>

---


## 전체 흐름


```plain text
Step 1.  네트워크 & 볼륨 생성
Step 2.  임시 컨테이너 생성 (sleep infinity)
Step 3.  패키지 설치
Step 4.  OpenClaw 온보딩 (AI 모델 + API 키)
Step 5.  텔레그램 봇 연동
Step 6.  이미지 저장 (docker commit)
Step 7.  게이트웨이 자동 시작 컨테이너로 전환
Step 8.  텔레그램 페어링 + 테스트
```


---


## Step 1. 네트워크 & 볼륨 생성


```bash
# 격리된 브릿지 네트워크
docker network create --driver bridge openclaw-net

# Docker 관리 볼륨 (호스트 파일시스템 직접 접근 차단)
docker volume create openclaw-data
docker volume create openclaw-config
```


---


## Step 2. 임시 컨테이너 생성


패키지 설치 + 온보딩을 위한 작업용 컨테이너입니다.
`sleep infinity`로 띄워서 자유롭게 작업할 수 있는 상태를 만듭니다.


```bash
docker run -d \
  --name openclaw \
  --network openclaw-net \
  --hostname openclaw \
  --restart unless-stopped \
  --pids-limit=512 \
  --security-opt no-new-privileges:true \
  -v openclaw-data:/home/openclaw \
  -v openclaw-config:/root/.openclaw \
  -p 127.0.0.1:18789:18789 \
  -p 127.0.0.1:1455:1455 \
  -e NODE_ENV=production \
  ubuntu:24.04 \
  sleep infinity
```


### 플래그 설명


| 플래그                                | 역할                           |
| ---------------------------------- | ---------------------------- |
| `--restart unless-stopped`         | 서버 재부팅 시 자동 복구               |
| `--pids-limit=512`                 | fork bomb 방지                 |
| `--security-opt no-new-privileges` | 권한 상승 차단                     |
| `-v openclaw-data`                 | 홈 디렉토리 영속 볼륨                 |
| `-v openclaw-config`               | OpenClaw 설정/스킬 영속 볼륨         |
| `-p 127.0.0.1:18789:18789`         | 게이트웨이 포트 (로컬호스트만)            |
| `-p 127.0.0.1:1455:1455`           | ChatGPT OAuth 콜백 포트 (로컬호스트만) |


---


## Step 3. 패키지 설치


```bash
docker exec -it openclaw bash
```


컨테이너 안에서 순서대로 실행:


### 3-1. 시스템 패키지 + 편의 도구


```bash
apt update && apt upgrade -y

apt install -y \
  curl wget git ca-certificates gnupg lsb-release \
  vim nano htop tree jq unzip \
  build-essential python3 python3-pip \
  ffmpeg \
  iputils-ping dnsutils net-tools
```


| 분류  | 패키지                                     | 용도                   |
| --- | --------------------------------------- | -------------------- |
| 필수  | curl, wget, git, ca-certificates, gnupg | 다운로드, 인증서, 저장소 관리    |
| 편의  | vim, nano, htop, tree, jq, unzip        | 파일 편집, 모니터링, JSON 처리 |
| 빌드  | build-essential, python3, python3-pip   | npm 네이티브 모듈 컴파일, 파이썬 |
| 미디어 | ffmpeg                                  | 오디오/자막 변환            |
| 디버깅 | iputils-ping, dnsutils, net-tools       | 네트워크 문제 해결           |


### 3-2. Node.js 22 설치


```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
```


### 3-3. yt-dlp 최신 바이너리 설치


```bash
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
  -o /usr/local/bin/yt-dlp
chmod a+rx /usr/local/bin/yt-dlp
```

> ⚠️ `apt install yt-dlp`는 쓰지 마세요.  
> Ubuntu 저장소 버전은 수개월 뒤처져서 YouTube 봇 차단에 걸립니다.

### 3-4. OpenClaw 설치


```bash
npm install -g openclaw@latest
```


### 3-5. 설치 확인


```bash
node --version          # v22.x.x
openclaw --version      # 최신
yt-dlp --version        # 2026.xx.xx
ffmpeg -version 2>&1 | head -1
python3 --version
```


모두 정상이면 캐시 정리:


```bash
apt clean && rm -rf /var/lib/apt/lists/*
```

> 아직 컨테이너에서 나가지 마세요. Step 4로 계속 진행합니다.

---


## Step 4. OpenClaw 온보딩


컨테이너 안에서 계속 진행합니다.

> ⚠️ `--install-daemon` 옵션은 쓰지 마세요.  
> Docker 컨테이너 안에는 systemd가 없어서 daemon 등록이 동작하지 않습니다.

```bash
openclaw onboard
```


위자드가 순서대로 물어봅니다:

1. **보안 공지** → Continue
2. **Onboarding mode** → QuickStart
3. **Gateway port** → 18789
4. **Model provider** → AI 제공자 선택
5. **API 키** → 입력

### AI 모델 옵션


| 제공자            | 모델                                 | 비용     | 비고    |
| -------------- | ---------------------------------- | ------ | ----- |
| OpenAI (API 키) | gpt-4o, gpt-4.5-preview            | 사용량 과금 | 안정적   |
| OpenAI (OAuth) | ChatGPT Pro/Max 구독                 | 구독료 내  | 비용 절약 |
| Anthropic      | claude-sonnet-4-5, claude-opus-4-5 | 사용량 과금 | 고성능   |
| Google         | gemini-flash                       | 무료 티어  | 테스트용  |


### OAuth 방식 (ChatGPT Pro/Max 구독 활용)

1. 온보딩에서 OpenAI Codex OAuth 선택
2. CLI가 URL 출력
3. 그 URL을 **홈서버 브라우저에 복사-붙여넣기**로 로그인
4. 로그인 후 `http://127.0.0.1:1455/auth/callback?code=...`으로 리다이렉트됨
5. 브라우저에 에러 페이지가 떠도 그 **URL 전체를 복사**해서 CLI에 붙여넣기
> `-p 127.0.0.1:1455:1455`가 이 OAuth 콜백을 받기 위한 포트입니다.

### 온보딩 완료 후 게이트웨이 테스트


```bash
openclaw gateway --port 18789 --verbose
```


홈서버 브라우저에서 `http://localhost:18789` 접속 → WebChat 테스트.
정상 동작 확인되면 `Ctrl+C`로 게이트웨이를 종료합니다.

> 아직 컨테이너에서 나가지 마세요. Step 5로 계속 진행합니다.

---


## Step 5. 텔레그램 봇 연동


### 5-1. 텔레그램에서 봇 생성

1. 텔레그램 앱 → 검색 → **`BotFather`** (파란 체크 확인)
2. **시작(START)** 탭
3. `/newbot` 입력
4. 봇 표시 이름 입력 (예: `내비서`)
5. 봇 username 입력 (예: `myopenclaw_bot`, **`bot`****으로 끝나야 함**)
6. **HTTP API 토큰** 복사

```plain text
예시: 123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
```


### 5-2. 내 User ID 확인

1. 텔레그램 검색 → **`@userinfobot`** → 시작
2. `Id:` 뒤의 숫자 복사 (예: `987654321`)

### 5-3. OpenClaw에 등록


컨테이너 안에서:


```bash
openclaw channels add --channel telegram --token "여기에_봇_토큰"
```


등록 확인 후 컨테이너에서 나갑니다:


```bash
exit
```


---


## Step 6. 이미지 저장 (docker commit)


Step 3에서 설치한 패키지들(Node.js, OpenClaw, yt-dlp, vim 등)은
컨테이너 레이어에만 존재합니다.
이 상태에서 컨테이너를 삭제하면 **설치한 패키지가 전부 날아갑니다.**


볼륨에 저장되는 것은 온보딩 설정, API 키, 텔레그램 토큰 등 **설정 파일뿐**입니다.


따라서 현재 상태를 이미지로 저장해둬야 합니다:


```bash
docker commit openclaw openclaw-ubuntu:latest
```


확인:


```bash
docker images | grep openclaw-ubuntu
```

> 이 이미지에는 Ubuntu 24.04 + 설치한 모든 패키지가 포함됩니다.  
> 이후 컨테이너를 재생성할 때 이 이미지를 사용하면 패키지를 다시 설치할 필요가 없습니다.

---


## Step 7. 게이트웨이 자동 시작 컨테이너로 전환


현재 컨테이너는 `sleep infinity`로 돌고 있어서
서버가 재부팅되면 컨테이너는 살아나지만 게이트웨이는 안 뜹니다.


컨테이너의 실행 명령을 게이트웨이로 바꿔서,
**서버 재부팅 → Docker 시작 → 컨테이너 시작 → 게이트웨이 자동 실행**
체인을 완성합니다.


### 7-1. 기존 컨테이너 삭제


```bash
docker stop openclaw && docker rm openclaw
```

> 볼륨(`openclaw-data`, `openclaw-config`)은 삭제되지 않습니다.  
> 온보딩 설정, API 키, 텔레그램 토큰 등 모두 안전합니다.

### 7-2. 게이트웨이 자동 시작 컨테이너 생성


```bash
docker run -d \
  --name openclaw \
  --network openclaw-net \
  --hostname openclaw \
  --restart unless-stopped \
  --pids-limit=512 \
  --security-opt no-new-privileges:true \
  -v openclaw-data:/home/openclaw \
  -v openclaw-config:/root/.openclaw \
  -p 127.0.0.1:18789:18789 \
  -p 127.0.0.1:1455:1455 \
  -e NODE_ENV=production \
  openclaw-ubuntu:latest \
  bash -c "openclaw gateway --port 18789"
```


**이전(Step 2)과의 차이점:**


| 항목    | Step 2 (임시)         | Step 7 (운영)                       |
| ----- | ------------------- | --------------------------------- |
| 이미지   | `ubuntu:24.04` (깡통) | `openclaw-ubuntu:latest` (패키지 포함) |
| 실행 명령 | `sleep infinity`    | `openclaw gateway --port 18789`   |
| 용도    | 설치/설정 작업            | 게이트웨이 자동 운영                       |
| 재부팅 후 | 컨테이너만 살아남           | 게이트웨이까지 자동 시작                     |


### 7-3. 동작 확인


```bash
# 컨테이너 상태 (Up이어야 함)
docker ps | grep openclaw

# 게이트웨이 로그 (에러 없이 시작됐는지 확인)
docker logs openclaw

# 홈서버 브라우저에서 WebChat 접속
# http://localhost:18789
```


---


## Step 8. 텔레그램 페어링 + 테스트


### 8-1. 페어링

1. 텔레그램에서 **내 봇** 검색 → 시작 → 아무 메시지 전송
2. 봇이 페어링 코드 응답 (예: `TP298LC8`)
3. 홈서버 터미널에서:

```bash
docker exec openclaw openclaw pairing approve telegram TP298LC8
```

1. 다시 봇에게 메시지 → AI 응답 오면 성공

### 8-2. 보안 검증


```bash
# 호스트 파일 접근 불가
docker exec openclaw ls /home/사용자명    # 실패해야 정상
```


### 8-3. 자동 시작 검증 (선택)


```bash
# 서버 재부팅 시뮬레이션
docker restart openclaw

# 잠시 후 게이트웨이 정상 확인
docker logs openclaw
```


---


## 나중에 패키지 추가


게이트웨이가 실행 중이어도 `docker exec`로 접속해서 설치 가능합니다:


```bash
docker exec -it openclaw bash

# apt
apt update && apt install -y 새패키지

# pip
pip3 install 새패키지 --break-system-packages

# npm
npm install -g 새패키지
```


설치 후 이미지에 반영하려면:


```bash
docker commit openclaw openclaw-ubuntu:latest
```

> `docker commit`을 안 하면 컨테이너 재생성 시 추가 패키지가 날아갑니다.  
> 중요한 패키지를 설치했으면 commit 해두세요.

---


## yt-dlp 업데이트


YouTube 차단 로직 변경 시:


```bash
docker exec openclaw bash -c '
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
  -o /usr/local/bin/yt-dlp
chmod a+rx /usr/local/bin/yt-dlp
yt-dlp --version
'
```


업데이트 후 이미지에도 반영:


```bash
docker commit openclaw openclaw-ubuntu:latest
```


---


## 컨테이너 관리


```bash
# 게이트웨이 로그 (실시간)
docker logs -f openclaw

# 컨테이너 접속 (디버깅/설정 변경)
docker exec -it openclaw bash

# 재시작 (게이트웨이도 같이 재시작됨)
docker restart openclaw

# 정지 / 시작
docker stop openclaw
docker start openclaw

# 리소스 사용량
docker stats openclaw --no-stream
```


### 컨테이너 교체가 필요할 때


(포트 추가, 볼륨 변경 등 docker run 플래그를 바꿔야 할 때)


```bash
# 1) 현재 상태를 이미지에 저장
docker commit openclaw openclaw-ubuntu:latest

# 2) 기존 컨테이너 삭제
docker stop openclaw && docker rm openclaw

# 3) 새 컨테이너 생성 (변경된 플래그 적용)
docker run -d \
  --name openclaw \
  --network openclaw-net \
  --hostname openclaw \
  --restart unless-stopped \
  --pids-limit=512 \
  --security-opt no-new-privileges:true \
  -v openclaw-data:/home/openclaw \
  -v openclaw-config:/root/.openclaw \
  -p 127.0.0.1:18789:18789 \
  -p 127.0.0.1:1455:1455 \
  -e NODE_ENV=production \
  openclaw-ubuntu:latest \
  bash -c "openclaw gateway --port 18789"
```

> 볼륨 동일 → 설정/데이터 유지  
> 커밋된 이미지 → 패키지 유지

---


## 트러블슈팅


| 증상                                           | 원인                     | 해결                                                            |
| -------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| yt-dlp “Sign in to confirm you’re not a bot” | yt-dlp 구버전             | “yt-dlp 업데이트” 참조                                              |
| yt-dlp 자막 안 나옴                               | 플래그 오타                 | `--write-auto-subs` (s), `--sub-langs` (s)                    |
| OAuth 리다이렉트 실패                               | 1455 포트 미바인딩           | `-p 127.0.0.1:1455:1455` 확인                                   |
| 텔레그램 봇 무응답                                   | 페어링 미완료                | `docker exec openclaw openclaw pairing approve telegram <코드>` |
| 텔레그램에 BotFather가 답함                          | 내 봇이 아님                | 내가 만든 봇 username으로 검색                                         |
| 스킬 인식 안 됨                                    | 게이트웨이 미재시작             | `docker restart openclaw`                                     |
| `localhost:18789` 안 열림                       | 게이트웨이 크래시              | `docker logs openclaw`로 에러 확인                                 |
| 재시작 후 패키지 없음                                 | commit 안 함             | Step 6 `docker commit` 다시 실행                                  |
| 재부팅 후 게이트웨이 안 뜸                              | `sleep infinity`로 실행 중 | Step 7로 전환 필요                                                 |
| 온보딩 daemon 등록 실패                             | Docker에 systemd 없음     | `--install-daemon` 빼고 `openclaw onboard`만                     |


---


## 비용 참고


| 항목                              | 비용        |
| ------------------------------- | --------- |
| OpenClaw                        | 무료 (오픈소스) |
| AI 모델 API (OpenAI, Anthropic 등) | 사용량 과금    |
| ChatGPT Pro/Max (OAuth)         | 월 구독료 내   |
| 텔레그램 봇                          | 무료        |

> ⚠️ **반드시 API 제공사 대시보드에서 월간 사용 한도 설정.**  
> AI 에이전트 무한루프 시 비용 폭발 가능.

---


## 자동 시작 체인 (서버 재부팅 시)


```plain text
홈서버 재부팅
  → Docker 자동 시작 (시스템 서비스)
    → 컨테이너 자동 시작 (--restart unless-stopped)
      → openclaw gateway 자동 실행 (CMD)
        → 텔레그램 봇 자동 연결
```


수동 개입 없이 완전 자동입니다.


---


## 체크리스트

- [ ] `openclaw-net` 네트워크 생성
- [ ] `openclaw-data`, `openclaw-config` 볼륨 생성
- [ ] 임시 컨테이너 실행 (Step 2)
- [ ] 시스템 패키지 + 편의 도구 설치
- [ ] Node.js 22 설치
- [ ] yt-dlp 최신 바이너리 설치 (apt 아님)
- [ ] OpenClaw 설치
- [ ] 전체 도구 동작 확인
- [ ] OpenClaw 온보딩 완료 (`-install-daemon` 없이)
- [ ] 게이트웨이 수동 테스트 성공 (`http://localhost:18789`)
- [ ] 텔레그램 봇 생성 (BotFather) + 토큰
- [ ] 텔레그램 User ID 확인 (@userinfobot)
- [ ] 텔레그램 채널 등록
- [ ] `docker commit`으로 이미지 저장 (Step 6)
- [ ] 게이트웨이 자동 시작 컨테이너로 전환 (Step 7)
- [ ] 텔레그램 페어링 승인 (Step 8)
- [ ] 텔레그램 AI 응답 확인
- [ ] 자동 시작 검증 (`docker restart openclaw`)
- [ ] API 사용 한도 설정

