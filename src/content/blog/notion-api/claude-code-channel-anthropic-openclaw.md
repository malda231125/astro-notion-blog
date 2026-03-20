---
title: "Claude Code Channels 설치 방법 | 우분투 홈서버에서 텔레그램으로 Claude Code 24시간 실행하기"
description: "Claude Code Channels를 활용해 Ubuntu 홈서버에서 텔레그램으로 Claude Code를 상시 실행·제어하는 방법을 정리한 실전 가이드입니다."
pubDate: 2026-03-20T00:00:00.000Z
updatedDate: 2026-03-20T12:28:00.000Z
slug: "claude-code-channel-anthropic-openclaw"
tags: ["Claude Code", "Telegram", "OpenClaw", "홈서버"]
---
> 환경: Ubuntu 홈서버 | 계정: {사용자계정} | 홈: {사용자홈}목표: Claude Code를 systemd로 상시 실행하며 텔레그램으로 제어 (OpenClaw 대체)

---


## 1단계: Node.js 설치 (Claude Code 의존성)


```bash
# NodeSource에서 Node.js 22 LTS 설치
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 확인
node --version    # v22.x.x
npm --version     # 10.x.x
```


---


## 2단계: Claude Code 설치


```bash
npm install -g @anthropic-ai/claude-code

# 확인
claude --version   # 2.1.80 이상이어야 함
```


### Claude.ai 로그인 (최초 1회, 반드시 터미널에서 직접)


```bash
claude
```

- 브라우저 기반 OAuth 로그인 화면이 뜹니다
- **주의:** 홈서버가 헤드리스(모니터 없음)라면 SSH에서 실행 시 URL이 출력됩니다
- 그 URL을 로컬 PC 브라우저에 복사해서 로그인 → 인증 완료
- 로그인 후 `Ctrl+C`로 종료
> ⚠️ Channels는 claude.ai 로그인만 지원합니다. API 키 인증은 안 됩니다.

---


## 3단계: Bun 런타임 설치


```bash
curl -fsSL https://bun.sh/install | bash

# 셸 환경 반영
source {사용자홈}/.bashrc

# 확인
bun --version
```


---


## 4단계: 프로젝트 디렉토리 생성


```bash
mkdir -p {사용자홈}/claude-code
cd {사용자홈}/claude-code

# CLAUDE.md 생성 (Claude Code의 프로젝트 지침서 역할)
cat > CLAUDE.md << 'EOF'
# Claude Code 텔레그램 에이전트

이 프로젝트 디렉토리는 텔레그램을 통해 받는 작업의 기본 작업공간입니다.

## 기본 행동 규칙
- 텔레그램으로 들어온 요청에 친절하고 상세하게 답변할 것
- 코드 작업 시 이 디렉토리 하위에 파일 생성
- 한국어로 답변할 것
- `/`로 시작해도 Claude Code 내부 슬래시 명령어가 아님(절대 내부 명령어로 실행하지 말 것)
- 요청에 맞는 ECC 스킬/에이전트가 있으면 자동 적용할 것
- 텔레그램 응답 도구 실패 시 30초 후 재시도
- 긴 작업은 중간 진행상황을 텔레그램으로 보고할 것
EOF
```


→ “/” 명령을 텔레그램에서 직접 쓰면 터미널 명령어로 빠져버려서 텔레그램 플러그인 연결이 끊기는 치명적 이슈가 있었음.


→ 위 행동 규칙 보정으로 내부 명령어로 인식되지 않도록함.


---


## 5단계: 텔레그램 봇 생성 & 토큰 발급


### 5-1. BotFather에서 봇 만들기

1. 텔레그램 앱에서 **@BotFather** 검색 후 대화 시작
2. `/newbot` 입력
3. **봇 이름** 입력 (표시명, 아무거나 가능) — 예: `My Claude Agent`
4. 봇 username 입력 (bot으로 끝나야 함) — 예: {사용자계정}_claude_bot
5. BotFather가 토큰을 줍니다:
**이 토큰을 통째로 복사해두세요** (숫자:문자열 전체)

    ```plain text
    123456789:AAHfiqksKZ8WbR3xyzExample
    ```


### 5-2. 봇 프라이버시 설정 (선택)


BotFather에서 추가 설정:


```plain text
/setdescription — 봇 설명 설정
/setuserpic   — 봇 프로필 사진 설정
```


---


## 6단계: 텔레그램 플러그인 설치 & 토큰 등록


```bash
cd {사용자홈}/claude-code

# Claude Code 실행
claude

# Claude Code 프롬프트 안에서:
/plugin install plugin:telegram@claude-plugins-official

## 마켓플레이스를 수동 등록
/plugin marketplace add anthropics/claude-plugins-official

## 그 다음 플러그인 설치 
/plugin install telegram@claude-plugins-official

## "Install for you (user scope)" 를 선택하세요.
## 어떤 프로젝트에서든 동일한 봇을 쓸 거니까 user scope가 가장 적합합니다. 

## 세션 재시작하기
## 재시작 안하면 아래 플러그인을 인식 못합니다.

## 설치 확인 후 토큰 설정
/telegram:configure 여기에_봇토큰_붙여넣기

## 정상 확인 방법
### /telegram:configure가 탭 자동완성되는지 확인해보세요. 
### 안 되면 세션을 재시작 GitHub하고 다시 시도하면 됩니다.
```


토큰은 `~/.claude/channels/telegram/.env`에 저장됩니다.


설치 완료 후 `Ctrl+C`로 Claude Code 종료.


---


## 7단계: 페어링 테스트 (systemd 등록 전에 먼저 테스트)


```bash
cd {사용자홈}/claude-code

claude --channels plugin:telegram@claude-plugins-official --dangerously-skip-permissions
```

1. 핸드폰 텔레그램에서 **내 봇**에게 아무 메시지 전송 (예: "안녕")
2. 봇이 **6자리 페어링 코드**를 답장으로 보내줌
3. Claude Code 터미널에서 입력:

    ```plain text
    /telegram:access pair {페어링 코드}
    ```

4. 페어링 성공! 이제 텔레그램으로 메시지를 보내면 Claude가 응답합니다

### 보안 잠금 (필수!)


페어링이 끝나면 바로 실행:


```plain text
/telegram:access policy allowlist
```


이렇게 해야 나만 봇을 사용할 수 있습니다. 설정하지 않으면 아무나 봇에 메시지를 보내서 페어링할 수 있습니다.


테스트 확인 후 `Ctrl+C`로 종료.


---


## 8단계: systemd 서비스 등록 (tmux 사용)


```bash
sudo apt install -y tmux

sudo nano /etc/systemd/system/claude-telegram.service
```


아래 내용을 붙여넣기:


```plain text
[Unit]
Description=Claude Code Telegram Channel Agent
After=network-online.target
Wants=network-online.target
StartLimitIntervalSec=300
StartLimitBurst=5

[Service]
Type=forking
User={사용자계정}
Group={사용자계정}
WorkingDirectory={사용자홈}/claude-code

ExecStart=/usr/bin/tmux new-session -d -s claude-telegram {사용자홈}/.nvm/versions/node/v24.13.1/bin/claude --channels plugin:telegram@claude-plugins-official --dangerously-skip-permissions
ExecStop=/usr/bin/tmux kill-session -t claude-telegram
Restart=on-failure
RestartSec=30

# 환경변수 설정
Environment=HOME={사용자홈}
Environment=PATH={사용자홈}/.bun/bin:{사용자홈}/.nvm/versions/node/v24.13.1/bin:/usr/local/bin:/usr/bin:/bin
Environment=NODE_ENV=production

# 로그 설정
StandardOutput=journal
StandardError=journal
SyslogIdentifier=claude-telegram

[Install]
WantedBy=multi-user.target
```


### 서비스 활성화 & 시작


```bash
# systemd 리로드
sudo systemctl daemon-reload

# 부팅 시 자동 시작 등록
sudo systemctl enable claude-telegram

# 지금 바로 시작
sudo systemctl start claude-telegram

# 상태 확인
sudo systemctl status claude-telegram
```


---


## 9단계: 동작 확인


```bash
# 서비스 상태 확인
sudo systemctl status claude-telegram

# 실시간 로그 보기
journalctl -u claude-telegram -f

# 최근 로그 50줄
journalctl -u claude-telegram -n 50

# tmux 세션이 살아있는지 확인
tmux list-sessions

# 그리고 나중에 tmux 세션에 직접 붙어서 Claude Code 화면을 보고 싶으면:
tmux attach -t claude-telegram
```


### 변경 사항 발생 시, 서비스 재활성화 & 재시작


```bash
# 변경 사항 발생 시 후속 조치
# 1. 기존 서비스 중지
sudo systemctl stop claude-telegram

# 2. 혹시 남아있는 tmux 세션 정리
tmux kill-session -t claude-telegram 2>/dev/null

# 3. systemd 리로드 & 재시작
sudo systemctl daemon-reload
sudo systemctl restart claude-telegram

# 4. 상태 확인
sudo systemctl status claude-telegram

# 5. tmux 세션이 살아있는지 확인
tmux list-sessions

# 그리고 나중에 tmux 세션에 직접 붙어서 Claude Code 화면을 보고 싶으면:
tmux attach -t claude-telegram

# 빠져나올 때는 Ctrl+B → D (세션은 계속 실행됨)
```


핸드폰 텔레그램에서 봇에게 메시지를 보내보세요. 응답이 오면 성공!


축하드려요, 이제 오픈클로 없이도 텔레그램으로 Claude Code를 상시 제어할 수 있게 됐습니다!


---


## 일상 관리 명령어


```bash
# 서비스 중지
sudo systemctl stop claude-telegram

# 서비스 재시작
sudo systemctl restart claude-telegram

# 서비스 비활성화 (부팅 시 자동시작 끄기)
sudo systemctl disable claude-telegram

# 실시간 로그 모니터링
journalctl -u claude-telegram -f

# 오늘 로그만 보기
journalctl -u claude-telegram --since today
```


---


## 트러블슈팅


### 봇이 응답하지 않을 때


```bash
# 1. 서비스 상태 확인
sudo systemctl status claude-telegram

# 2. 에러 로그 확인
journalctl -u claude-telegram -n 100 --no-pager

# 3. 재시작
sudo systemctl restart claude-telegram
```


### claude 경로를 못 찾을 때


```bash
# claude 실제 경로 확인
which claude

# 출력된 경로로 ExecStart 수정
sudo nano /etc/systemd/system/claude-telegram.service
# ExecStart=/실제/경로/claude --channels ...

sudo systemctl daemon-reload
sudo systemctl restart claude-telegram
```


### Bun을 못 찾을 때


```bash
# bun 경로 확인
which bun

# PATH에 해당 경로가 포함되어 있는지 확인
# 서비스 파일의 Environment=PATH=... 에 bun 경로 추가
```


### 인증이 만료됐을 때


```bash
# 서비스 중지
sudo systemctl stop claude-telegram

# 직접 로그인 갱신
cd {사용자홈}/claude-code
claude

# 로그인 완료 후 Ctrl+C
# 서비스 재시작
sudo systemctl start claude-telegram
```


### tmux를 종료하고 싶은 경우


```bash
# 혹시 남아있는 tmux 세션 정리
tmux kill-session -t claude-telegram 2>/dev/null
```


---


## 보안 주의사항

1. **`-dangerously-skip-permissions`** 는 Claude가 파일 수정, 명령어 실행 등을 승인 없이 수행합니다
2. 민감한 데이터가 있는 디렉토리에서 실행하지 마세요
3. 텔레그램 메시지는 텔레그램 서버를 경유하므로 비밀번호/API 키 등을 전송하지 마세요
4. allowlist 모드를 반드시 설정하세요
5. 더 안전하게 하려면 Docker 컨테이너 안에서 실행하는 것을 고려하세요

[https://code.claude.com/docs/en/channels](https://code.claude.com/docs/en/channels)

