---
title: "2026-03-22 OpenClaw 유튜브 트렌드 분석: Claude 경쟁, 보안 이슈, MaxClaw 확산"
description: "2026년 3월 22일 기준 OpenClaw(오픈클로) 유튜브 동향과 핵심 이슈를 빠르게 훑어보는 트렌드 분석입니다."
pubDate: 2026-03-22T00:00:00.000Z
updatedDate: 2026-03-23T12:18:00.000Z
slug: "openclaw-youtube-trend-20260322"
tags: ["OpenClaw", "유튜브 트렌드"]
---
## 핵심 요약


2026년 3월 22일 기준 OpenClaw 관련 유튜브 영상 17건을 분석한 결과, 이번 주 시장 흐름은 크게 세 갈래로 정리된다. 첫째는 Claude Code와 OpenClaw의 경쟁 심화, 둘째는 MaxClaw·Abacus Claw 같은 래퍼 서비스 확산, 셋째는 AI 에이전트 보안과 격리 이슈의 부상이다.


첫 번째 흐름은 Claude Code와 OpenClaw의 경쟁 구도가 더 또렷해졌다는 점이다. Anthropic이 Claude Code에 Channels(텔레그램·디스코드 연동)와 Cloud Tasks(클라우드 스케줄링)를 추가하면서, OpenClaw의 핵심 강점이던 원격 제어와 자동화 영역을 정면으로 겨냥하고 있다. 실제로 17건 중 4건이 이 경쟁 구도를 직접 다뤘고, 일부 영상에서는 “OpenClaw 킬러”라는 표현까지 사용했다. 다만 Claude Code는 여전히 로컬 머신이 켜져 있어야 한다는 구조적 한계가 있고, OpenClaw는 24시간 상시 가동을 전제로 하는 아키텍처라는 점에서 차이가 남아 있다.


두 번째 흐름은 OpenClaw의 진입장벽을 낮추는 서비스가 빠르게 늘고 있다는 점이다. MaxClaw 같은 원클릭 클라우드 배포 서비스, Abacus Claw 같은 월 구독형 통합 서비스, WeChat 플러그인 같은 플랫폼 연결이 대표적이다. 예전에는 서버 구성, API 키 관리, 보안 설정 등 개발자 수준의 역량이 필요했지만, 이제는 비개발자도 OpenClaw를 비교적 쉽게 써볼 수 있는 환경이 만들어지고 있다. 이는 OpenClaw가 개발자 도구를 넘어 대중형 플랫폼으로 이동하는 과정으로 해석할 수 있다.


세 번째 흐름은 보안과 격리 문제가 더 이상 부가 이슈가 아니라 핵심 의제로 올라왔다는 점이다. 많은 영상에서 OpenClaw를 개인 노트북이 아니라 VPS, Raspberry Pi, Mac Mini, VM 같은 별도 환경에서 실행하라고 강하게 권고한다. 실제로 악성 웹페이지를 통해 로컬 에이전트를 탈취할 수 있는 취약점이 올해 초 이슈가 되었고, 일부 국가와 기관도 사용 제한을 검토하고 있다. AI 에이전트가 파일, 이메일, 캘린더, 메시지에 접근하는 만큼, 보안 격리는 이제 선택이 아니라 기본 전제가 되고 있다.


지역별 확산 흐름도 눈에 띈다. 영어권뿐 아니라 스페인어, 러시아어, 태국어, 터키어, 중국어 등 다양한 언어권에서 OpenClaw 관련 콘텐츠가 활발하게 생산되고 있다. 특히 중국에서는 OpenClaw를 “龙虾(바닷가재)”라는 별칭으로 부르며, 생산성 인프라 차원에서 활용하려는 움직임이 포착된다. 바이두, 텐센트 같은 대형 기업이 일반 사용자에게 OpenClaw 설치법을 교육하는 사례도 등장하고 있다.


비용 구조 변화도 중요한 포인트다. OpenClaw와 고가 API 모델을 함께 쓰면 하루 수십 달러가 나올 수 있지만, Claude 구독형 모델이나 Abacus Claw 같은 정액제 서비스는 비용 예측이 더 쉽다. 동시에 메인 에이전트와 서브 에이전트에 서로 다른 모델을 배치하거나, 저가 모델을 보조적으로 활용하는 방식도 실전 전략으로 소개되고 있다. 즉 이제 시장은 “무조건 최고 성능”보다 “운영 가능한 비용 구조”를 더 중요하게 보기 시작했다.


---


## **영상별 상세 분석**


---


### **1. Stop Wasting Time & Master Openclaw in 12 Min**

- 채널명: Youri van Hofwegen
- 조회수: 17,963회
- 영상 URL: [https://www.youtube.com/watch?v=iSLruYDGT58](https://www.youtube.com/watch?v=iSLruYDGT58)
- 영상 길이: 10분 42초

**영상 내용:**


OpenClaw은 단순한 AI 챗봇이 아니라 자율적으로 일을 처리하는 에이전트 시스템에 가깝다. 이 영상은 OpenClaw를 실제로 운영할 때 필요한 보안 설정, 모델 연동, 자동화 설계, 스킬 활용법을 비교적 균형 있게 설명한다.


이 영상에서 가장 먼저 강조하는 포인트는 보안 격리다. OpenClaw를 개인 노트북에서 바로 실행하면 파일, 비밀번호, 브라우저 데이터까지 폭넓게 접근할 수 있기 때문에, 취약점이 발생했을 때 피해 범위가 커질 수 있다. 발표자는 이런 리스크를 줄이기 위해 Mac Mini 같은 별도 장비 대신, 월 5달러 수준의 VPS로 격리 환경을 만드는 방식을 추천한다. VPS는 24시간 켜둘 수 있고, 문제가 생겨도 비교적 빠르게 초기화할 수 있다는 점에서 실용적이다.


모델 연동 방식에서는 Nexus AI 크레딧 시스템 활용이 실전 팁으로 소개된다. 개별 API 키를 일일이 관리하는 대신 크레딧 방식으로 여러 모델을 전환하면, Claude·GPT·Gemini 같은 모델을 재배포 없이 오가며 쓸 수 있다. 또 OpenClaw가 핵심 설정을 스스로 바꿀 수 있는 구조인 만큼, 일일 자동 백업을 반드시 켜두라는 조언도 함께 나온다.


Claw Hub 마켓플레이스에서 스킬을 설치할 때의 보안 체크도 현실적이다. 누구나 확장 기능을 올릴 수 있기 때문에, 데이터 스크래핑이나 자격 증명 탈취 같은 악성 행위를 시도하는 스킬이 섞일 수 있다. 그래서 설치 전에는 VirusTotal 결과, OpenClaw 스캔 결과, 신뢰도 표시를 함께 확인하라고 강조한다. 외부 앱 연동은 Claw Hub 스킬보다 Zapier MCP를 추천하는데, 실제 비밀번호를 넘기지 않으면서 권한 범위를 더 세밀하게 통제할 수 있기 때문이다.


서브 에이전트 아키텍처는 비용과 성능을 함께 잡는 핵심 전략으로 소개된다. 메인 에이전트에는 추론 성능이 높은 모델을 쓰고, 소셜 리스닝이나 문서 작성 같은 하위 작업은 더 저렴한 모델로 분리하면 비용을 크게 낮출 수 있다. 또한 백그라운드 자동화는 크론 잡과 하트비트를 구분해서 써야 하며, 장기 메모리 운용에서는 압축 주기 전에 핵심 결정을 영속 파일에 저장하도록 미리 지시하는 것이 중요하다고 설명한다.


---


### **2. CHATGPT HA MUERTO: Así es como OpenClaw arrasa con la "vieja" IA y China lo aprovecha**

- 채널명: Negocios TV
- 조회수: 17,174회
- 영상 URL: [https://www.youtube.com/watch?v=XydCef9y1FQ](https://www.youtube.com/watch?v=XydCef9y1FQ)
- 영상 길이: 4분 56초

**영상 내용:**


이 영상의 핵심 메시지는 AI 산업의 무게중심이 “대화형 챗봇”에서 “자율 행동 에이전트”로 이동하고 있다는 점이다. 발표자는 이를 설명하면서 OpenClaw를 단순한 응답 도구가 아니라, 실제 작업을 대신 수행하는 에이전트로 포지셔닝한다.


여기서 ChatGPT와 OpenClaw의 차이가 분명하게 드러난다. ChatGPT가 질문에 답하는 도구라면, OpenClaw는 파일 관리, 이메일 처리, 웹 탐색, 예약 같은 작업을 스스로 수행하는 쪽에 가깝다. 즉 AI가 “대화 상대”에서 “디지털 직원”으로 넘어가는 흐름을 상징하는 사례로 읽힌다.


중국 시장에 대한 해석도 흥미롭다. 바이두와 텐센트 같은 대형 기업이 대규모 행사와 교육을 통해 일반 사용자에게 OpenClaw 설치와 활용법을 전파하고 있다는 점을 강조한다. 이는 단순한 기술 소개가 아니라, OpenClaw를 국가 차원의 생산성 도구로 흡수하려는 움직임으로 해석된다.


이 영상에서 가장 날카로운 지점은 보안의 역설이다. OpenClaw는 사용자의 디지털 생활 전반에 접근할 수 있기 때문에, 강력한 생산성 도구인 동시에 큰 보안 리스크이기도 하다. 발표자는 중국 정부조차 확산을 추진하면서도 특정 기관에서는 사용을 제한하고 있다는 점을 들어, 자율형 에이전트 시대의 보안 통제가 아직 충분히 정리되지 않았다고 지적한다.


---


### **3. NEW Claude Code Feature Destroys OpenClaw (Channels + Cloud)**

- 채널명: Jack Roberts
- 조회수: 16,150회
- 영상 URL: [https://www.youtube.com/watch?v=5ehtJzeXv-k](https://www.youtube.com/watch?v=5ehtJzeXv-k)
- 영상 길이: 16분 37초

**영상 내용:**


이 영상은 Claude Code의 신규 기능인 Cloud Tasks와 Channels를 중심으로, OpenClaw와의 경쟁 구도를 비교한다. 단순 기능 소개에 그치지 않고, 어떤 작업은 Claude가 따라잡았고 어떤 부분은 여전히 OpenClaw가 앞서는지 구조적으로 짚는 편이다.


Cloud Tasks는 로컬 머신이 아니라 클라우드에서 작업을 예약하고 실행한다는 점이 핵심이다. 기존 로컬 스케줄링은 랩톱이 꺼져 있으면 멈추고, 재부팅 후에도 신뢰성이 떨어질 수 있었는데, 클라우드 방식은 이 문제를 줄여준다. 영상에서는 커뮤니티 데이터 스크래핑과 이메일 보고 워크플로를 예시로 보여주며, 팀 운영에서 단일 장애 지점을 줄이는 장점도 함께 설명한다.


Channels는 텔레그램이나 디스코드를 통해 Claude Code와 직접 메시지를 주고받게 해주는 기능이다. 구조적으로는 MCP를 통해 로컬에서 실행 중인 Claude Code와 메신저를 연결하는 방식이며, 모바일에서 Claude를 다루는 경험을 크게 개선한다. 다만 본질적으로는 로컬 머신이 켜져 있어야 한다는 전제가 남아 있다.


실전 팁도 유용하다. 텔레그램 봇의 polling 충돌이 생기면 채널이 제대로 작동하지 않고, 승인 관련 옵션을 잘못 두면 원격 제어 경험이 크게 떨어질 수 있다. 음성 메시지 처리 시연에서는 Claude Code가 필요한 플러그인을 스스로 설치해 Whisper 기반 음성 인식 흐름을 구성하는 장면도 보여준다.


다만 Channels의 한계도 분명하다. 세션 히스토리 유지, 메시지 길이 제한, 파일 전송 제한, 웹 검색 부재, 그리고 가장 중요하게는 로컬 머신 의존성이 남아 있다는 점이다. 이 때문에 완전한 상시 가동 에이전트를 지향하는 OpenClaw와는 방향이 다르다.


---


### **4. Build Your Own Private Assistant With OpenClaw And Ollama**

- 채널명: Krish Naik
- 조회수: 5,022회
- 영상 URL: [https://www.youtube.com/watch?v=gUxf1DhRzs4](https://www.youtube.com/watch?v=gUxf1DhRzs4)
- 영상 길이: 22분 51초

**영상 내용:**


이 영상은 OpenClaw와 Ollama를 조합해, 외부 유료 API에 의존하지 않는 프라이빗 AI 비서를 만드는 과정을 보여준다. 핵심은 데이터를 외부 서버로 넘기지 않으면서도, 자율형 에이전트 워크플로를 어느 정도 구현할 수 있다는 점이다.


기술 아키텍처 측면에서는 OpenClaw가 자연어 지시를 받아 도구 호출, 파일 생성, Git 커밋까지 이어지는 에이전틱 워크플로로 동작한다는 점을 강조한다. 발표자는 속도와 워크플로 효율을 고려해 MiniMax M2 7B Cloud를 선택했고, 비교적 고사양 환경에서 시연을 진행했다.


프라이버시 관점에서 이 구성의 강점은 모든 데이터가 로컬에 머문다는 점이다. 영상에서는 기술 블로그 자동 생성, 매일 오전 AI 이슈를 수집해 텔레그램으로 보내는 크론잡, BotFather를 통한 Telegram 봇 연동까지 실용적인 예시를 차례로 시연한다.


평가도 비교적 솔직하다. 오픈소스 모델이 아직 Claude Opus 같은 유료 모델을 완전히 대체하진 못하고, 특히 코딩 품질에서는 격차가 있다고 인정한다. 다만 반복적인 업무 자동화나 개인 생산성 용도로는 충분히 실용적이라는 결론을 내린다.


---


### **5. MaxClaw + MiniMax M2.7: The BEST Way To Run OpenClaw In 2026!**

- 채널명: Universe of AI
- 조회수: 3,140회
- 영상 URL: [https://www.youtube.com/watch?v=qSMIt1ha-IM](https://www.youtube.com/watch?v=qSMIt1ha-IM)
- 영상 길이: 9분 21초

**영상 내용:**


MaxClaw는 OpenClaw를 훨씬 쉽게 쓰게 만드는 클라우드 원클릭 배포 서비스로 소개된다. 기존에는 서버 구축, 인프라 관리, 보안 설정까지 사용자가 떠안아야 했지만, MaxClaw는 이 복잡성을 크게 줄여 “바로 써보는 OpenClaw”에 가까운 경험을 제공한다.


영상은 MiniMax Agent와 MaxClaw의 관계도 구분해서 설명한다. MiniMax Agent가 통합 워크스페이스라면, MaxClaw는 그 안에서 항시 가동되는 OpenClaw 인스턴스에 가깝다. 이 조합은 성능과 비용 효율을 동시에 노리는 전략으로 소개된다.


실사용 시연에서는 전문가 모드, 소셜 미디어 트렌드 추적, 산업 리서치 자동화 같은 활용 사례가 등장한다. 특히 트위터 AI 뉴스 트렌드를 정기 수집하고, CSV 저장과 유튜브용 요약 생성까지 연결하는 흐름은 “콘텐츠 운영형 에이전트”의 방향을 잘 보여준다.


스킬 시스템 역시 사용성을 높이는 핵심 요소로 소개된다. 채팅으로 직접 스킬을 만들거나, 파일 업로드로 추가하거나, ClawHub 마켓플레이스에서 불러오는 방식이 모두 가능하다. 메신저 연결도 비교적 단순해서, BotFather로 만든 Telegram 봇을 붙여 이동 중에도 OpenClaw를 활용하는 흐름이 자연스럽게 이어진다.


---


### **6. OpenClaw Just Got BURIED Into A $10/Month Tool (Agencies Can't Keep Up)**

- 채널명: iampauljames
- 조회수: 2,950회
- 영상 URL: [https://www.youtube.com/watch?v=hj1LEl8awlY](https://www.youtube.com/watch?v=hj1LEl8awlY)
- 영상 길이: 8분 37초

**영상 내용:**


이 영상은 Abacus AI가 OpenClaw를 자사 클라우드 플랫폼에 통합해 “Abacus Claw”라는 월 10달러 제품으로 내놓은 점을 크게 조명한다. 핵심 메시지는 OpenClaw가 이제 기술 실험 단계를 넘어, 더 넓은 사용자층이 쉽게 접근할 수 있는 서비스형 상품으로 변하고 있다는 것이다.


여기서 가장 중요한 포인트는 기술적 진입장벽의 해소다. 예전에는 서버 구성, 런타임 관리, 보안 패치가 필요했지만, 이제는 회원가입 후 짧은 시간 안에 에이전트를 배포하고 메신저·업무도구를 연결할 수 있는 흐름으로 바뀌고 있다. 이는 OpenClaw의 대중화 가능성을 높이는 요소다.


활용 사례도 꽤 구체적이다. 부동산 관리 회사를 위한 고객 응대 자동화, 링크 하나로 SNS용 콘텐츠를 재가공하는 리퍼포징, Gmail·Slack 시그널을 묶어 텔레그램으로 보내는 임원용 모닝 브리핑 등이 대표적이다. 즉 이 영상은 OpenClaw를 단순한 AI 도구가 아니라 업무 자동화 레이어로 설명한다.


GitHub 통합도 중요한 차별점으로 소개된다. 에이전트가 열린 PR을 파악하고, 머지 충돌을 해결하고, 변경 내용을 문서화해 Slack으로 요약까지 보내는 흐름은 꽤 강력하다. 가격 모델 역시 월 구독 + 크레딧 방식으로 설명하면서, 실무 운영 관점에서 비용 구조를 함께 짚는다.


---


### **7. No instales OpenClaw así… mira estas 5 opciones primero**

- 채널명: Fazt
- 조회수: 2,940회
- 영상 URL: [https://www.youtube.com/watch?v=jDX4n9yc6v8](https://www.youtube.com/watch?v=jDX4n9yc6v8)
- 영상 길이: 15분 51초

**영상 내용:**


이 영상은 OpenClaw를 설치하기 전에 어떤 실행 환경을 고를지 먼저 비교해야 한다는 점을 강조한다. 같은 OpenClaw라도 Raspberry Pi, Docker, VPS, Mac Mini, VM 중 무엇을 선택하느냐에 따라 보안성, 안정성, 비용, 활용 범위가 크게 달라진다는 것이다.


Raspberry Pi는 저전력 24시간 운영에 유리하지만, SD 카드 내구성 문제 때문에 SSD를 함께 써야 한다는 점이 핵심 제약으로 지적된다. 기본적인 에이전트 작업에는 충분하지만, 더 무거운 워크로드에는 한계가 있다.


Docker는 격리와 이식성 측면에서 매력적이지만, 호스트 시스템 접근 제약과 “컴퓨터를 계속 켜둬야 한다”는 문제를 해결하지 못한다는 점에서 완전한 답으로 보지 않는다. 즉 입문용으로는 괜찮지만, 상시 가동형 에이전트에는 한계가 있다는 평가다.


발표자가 가장 강하게 추천하는 선택지는 VPS다. 상시 가동, 고정 IP, 안정적 네트워크, 비교적 단순한 운영이라는 장점이 있고, 진지하게 OpenClaw를 쓰는 사용자들이 결국 VPS로 이동한다는 커뮤니티 분위기도 함께 전한다. 브라우저 기반 스크래핑처럼 무거운 작업을 고려하면 더 높은 사양이 필요하다는 현실적인 조언도 포함된다.


Mac Mini는 Apple 생태계와의 네이티브 연동, Apple Silicon의 효율적인 메모리 구조가 장점이다. 다만 초기 비용이 높아서, 생산성보다 실험 목적이라면 부담이 될 수 있다는 점도 함께 언급된다.


VM은 Docker보다 더 강한 격리를 제공하지만, 그만큼 리소스 요구량이 크다. 결국 영상의 결론은 입문은 로컬에서도 가능하지만, 실제로 오래 쓰고 싶다면 VPS가 가장 균형 잡힌 선택이라는 것이다.


---


### **8. NEW Claude Updates DESTROY OpenClaw!**

- 채널명: Julian Goldie SEO
- 조회수: 2,609회
- 영상 URL: [https://www.youtube.com/watch?v=ogHfx9csilc](https://www.youtube.com/watch?v=ogHfx9csilc)
- 영상 길이: 9분 21초

**영상 내용:**


Claude의 다섯 가지 주요 업데이트가 OpenClaw의 기능을 어떻게 대체하고 있는지를 SEO/마케팅 실무자 관점에서 분석한다.


첫째, 텔레그램/디스코드 채널 연동 — 기존 OpenClaw만의 강점이었던 모바일 원격 제어를 Claude가 따라잡았다. 둘째, 스케줄 작업 — 알람처럼 정해진 시간에 자동 실행되지만, Claude Desktop 앱이 백그라운드에서 계속 실행되어야 한다는 차이가 있다(OpenClaw는 앱 없이도 24시간 가동). 셋째, 원격 제어 — Dispatch 기능으로 폰이나 컴퓨터에서 실시간 작업 모니터링 가능. 넷째, Opus 백만 토큰 컨텍스트 — 구독료만으로 사용 가능하여 비용 예측 가능성이 높다(OpenClaw에서 Opus API 사용 시 하루 $38 이상 발생 가능). 다섯째, 프로젝트 기능 — OpenClaw의 단일 대화 스트림과 달리 작업을 체계적으로 분리 관리 가능.


OpenClaw의 기술적 불안정성도 지적한다. API를 전환할 때 자주 오류가 발생하고 업데이트마다 기능이 깨지는 문제가 있어 비개발자에게는 상당한 진입장벽이 된다. 최종 결론은 고도의 커스터마이징이 필요한 개발자에게는 OpenClaw가 유리하지만, 비즈니스 자동화/마케팅 목적으로는 Claude가 설정 용이성, 안정성, 비용 효율성 모든 면에서 우위라는 것이다. 다만 이 상황이 매주 바뀔 수 있으며 OpenClaw의 한 번의 대형 업데이트로 판도가 뒤집힐 수 있다고 솔직하게 인정한다.


---


### **9. OpenClaw on Raspberry Pi 5: Full Setup Guide + AI Agent Demo (Step-by-Step)**

- 채널명: Wagner's TechTalk
- 조회수: 2,221회
- 영상 URL: [https://www.youtube.com/watch?v=NqY0wF4YKXo](https://www.youtube.com/watch?v=NqY0wF4YKXo)
- 영상 길이: 23분 23초

**영상 내용:**


Raspberry Pi 5에서 OpenClaw를 처음부터 끝까지 설치하고 활용하는 전체 과정을 다루며, 엣지 AI 에이전트의 실질적 가능성과 보안 고려사항까지 포괄한다.


보안 측면에서 매우 중요한 경고가 제시된다. OpenClaw는 시스템 명령 실행, 파일 접근, API 상호작용이 가능하기 때문에 프롬프트 인젝션, 악성 플러그인, 잘못된 접근 설정으로 의도치 않은 동작이 발생할 수 있다. 따라서 Raspberry Pi 5 같은 별도 장치에서 실험적 소프트웨어로 취급하여 운영할 것을 강력히 권장한다.


하드웨어 구성으로는 Pi 5를 Pierman 5 케이스에 장착하고 NVMe SSD를 설치했다. 마이크로 SD에 OS를 플래싱한 후 Pi Desktop의 SD 카드 복사기로 NVMe 드라이브에 클론하는 방식이 편리하다. 원격 접속은 Raspberry Pi Connect를 활성화하여 다른 컴퓨터에서 접근할 수 있다. LLM 프로바이더로 OpenAI를 선택하고 GPT 5.1 Codex를 사용했지만, 이전 모델이 Pi 5의 제한된 환경에서 더 나은 성능을 제공할 수 있다고 언급한다.


특히 주목할 조언은 봇이 처음 활성화되면 사용자에 대해 아무것도 모르므로, 이름, 관심사, 선호도 등을 충분히 알려주는 시간을 투자해야 한다는 것이다. 이 정보는 identity.md와 user.md 파일에 저장되어 에이전트의 장기 기억으로 기능한다. 작업 공간은 홈 디렉토리의 .openclaw/workspace에 위치하며, 숨겨진 폴더라서 일반 파일 목록으로는 보이지 않는다.


활용 데모에서는 매일 오전 8시 관심 주제 일일 다이제스트 발송 크론 잡과, 텔레그램 채팅만으로 99개 레벨의 팩맨 게임을 약 2시간 만에 완성하는 과정이 인상적이다.


---


### **10. 微信养龙虾：OpenClaw微信插件Clawbot发布！**

- 채널명: AI超元域
- 조회수: 1,921회
- 영상 URL: [https://www.youtube.com/watch?v=KZKT27Gk9lA](https://www.youtube.com/watch?v=KZKT27Gk9lA)
- 영상 길이: 6분 47초

**영상 내용:**


자막이 제공되지 않아 상세 분석이 불가합니다. 제목과 메타데이터로 판단하면, WeChat의 OpenClaw 공식 플러그인 ClawBot 출시와 설치 방법을 다루는 중국어 영상입니다.


---


### **11. สอนสร้าง n8nclaw ทีละขั้น บน LINE เหมือนแบบ OpenClaw แต่ฟรี! 100%**

- 채널명: BoomBigNose
- 조회수: 1,904회
- 영상 URL: [https://www.youtube.com/watch?v=EDPnKAOXaiM](https://www.youtube.com/watch?v=EDPnKAOXaiM)
- 영상 길이: 59분 7초

**영상 내용:**


OpenClaw를 LINE에서 직접 사용하면 안 되는 명확한 이유에서 출발하는 이 영상은, n8n 워크플로우를 사용하여 LINE 메신저에서 AI 에이전트를 구축하는 전체 과정을 안내한다. LINE의 메시지 발송에는 'Sending'과 'Reply' 두 가지 방식이 있는데, OpenClaw가 사용하는 Sending 방식은 광고 메시지 발송과 동일하여 한 달에 무료 300건밖에 제공되지 않는다. 반면 Reply 방식은 무제한 무료이며, n8n이 이를 활용할 수 있는 최적의 도구다.


워크플로우는 6개 파트로 구성된다. LINE Webhook, 메시지 유형 분류 Switch 노드(텍스트/이미지/PDF/음성), Google Gemini 3.1 Flash를 활용한 멀티미디어 분석, AI Agent 메인 두뇌, 그리고 Email Manager/Research Agent/Calendar Manager/Document Manager 4개 서브 에이전트. n8n의 Data Table 기능을 활용하여 사용자 프로필을 저장하고 AI가 사용자를 기억하게 만드는 구조가 인상적이다.


AI 모델로는 세 가지 무료/저가 옵션을 제시한다. OpenRouter 무료 모델(속도 불안정), Google Gemini 3.1 Flash Light(무료, 성능 우수), OpenAI GPT 5.4 Nano(약 $5 충전). LINE Reply Token도 무료이므로 전체 시스템을 100% 무료로 운영할 수 있다. 실제 데모에서는 사용자 정보 조회, Google Calendar 일정 등록, 강아지 사진 분석, PDF 요약, 투자 리서치 및 Google Doc 생성 등을 시연했다.


---


### **12. Новости ИИ: Claude копирует Openclaw, Midjourney v8, Скандал вокруг Cursor**

- 채널명: Продуктивный Совет
- 조회수: 1,840회
- 영상 URL: [https://www.youtube.com/watch?v=G-YS4Z1JAc8](https://www.youtube.com/watch?v=G-YS4Z1JAc8)
- 영상 길이: 37분 50초

**영상 내용:**


한 주간의 AI 뉴스를 종합적으로 다루는 이 영상은 여러 핵심 토픽을 깊이 있게 분석한다.


Claude가 OpenClaw를 복제한다는 주제에 대해, Anthropic이 OpenClaw와의 관계가 틀어진 후 원격 코딩 에이전트 방향으로 명확히 피봇했다고 분석한다. Claude Code에 Channels 기능이 추가되어 Telegram/Discord에서 원격 제어가 가능해졌고, Co-worker에도 Dispatch 기능이 추가되었다. Opus 4.6에 100만 토큰 컨텍스트가 추가되었으며, 'context: fork' 파라미터로 서브에이전트를 생성하여 독립 작업 후 결과를 반환하는 기능도 소개한다.


GPT 5.4 Mini와 Nano에 대해서는 Codex의 서브에이전트용으로 설계되었으며, OS World Verified 벤치마크에서 Mini가 풀 모델 대비 3%포인트 차이밖에 나지 않으면서도 가격이 매우 저렴하다(Nano 입력 20센트/출력 $1.25)고 정리한다.


Cursor 스캔들은 이 영상의 하이라이트다. Cursor가 Composer 2를 출시하며 자체 벤치마크를 발표했으나, Moonshot(Kimi 개발사) 팀이 API 응답에서 K2 모델 식별자를 발견했다. Cursor가 Kimi의 K2 모델을 foundation으로 사용하면서 이를 공개하지 않은 것이다. 법적으로는 Fireworks AI를 통한 정당한 사용이었지만 윤리적 문제가 제기된다.


NVIDIA GTC 2026에서는 네트워킹 사업부가 연간 260% 성장하여 $310억 매출을 기록했고, Vera Rubin 플랫폼은 50페타플롭스로 M3 Mac 대비 360만 배 성능을 제공한다. NemoClaw는 OpenClaw 기반 기업용 보안 플랫폼으로 알파 단계다. Midjourney v8은 네이티브 2K 생성 HD Mode와 개선된 Conversation Mode가 추가되었다.


---


### **13. GLM-5 Turbo es mejor que Claude en esto | OpenClaw**

- 채널명: Conciencia Artificial
- 조회수: 1,774회
- 영상 URL: [https://www.youtube.com/watch?v=2299bfryXRg](https://www.youtube.com/watch?v=2299bfryXRg)
- 영상 길이: 9분 5초

**영상 내용:**


GLM-5 Turbo가 개발자와 에이전트 워크플로우에서 실제로 사용할 만한 가치가 있는지를 분석한다. 핵심 인사이트는 이 모델이 범용 챗봇이 아니라 처음부터 OpenClaw 시나리오에 최적화되어 훈련되었다는 점이다. Zhipu AI(Z.ai)는 도구 호출, 복잡한 명령어 추적, 예약/영속 작업, 높은 처리량의 긴 실행 체인에 특화시켰다.


기술 사양으로 20만 토큰 컨텍스트 윈도우, 최대 12만 8천 토큰 출력, thinking modes, 스트리밍, function calling, context caching, MCP 지원을 갖추고 있다. 가격은 OpenRouter에서 입력 96센트/출력 $3.20이며, Z.ai의 코딩 플랜은 Lite($10/월), Pro($30/월), Max($80/월) 세 단계다.


실제 테스트 결과 코딩 문제를 모두 정확히 해결했고 기본 GLM-5보다 훨씬 덜 장황하면서 빨랐다. 그러나 한계도 명확하다. 폐쇄 소스여서 자체 호스팅이 불가능하고, 멀티모달을 지원하지 않으며, GLM-5 출시 이후 심각한 용량 부족이 있었다(피크 시간대 "사용 불가" 보고, 신규 가입 제한, 주가 23% 하락). 베이징 시간 14-18시에는 쿼터 소비가 3배로 적용되고, Z.ai가 2025년 1월부터 미국 상무부 Entity List에 포함되어 미국 기업의 규제 산업 사용 시 법적 검토가 필요하다는 점도 중요하다.


---


### **14. Claude Yeni Güncelleme! Claude Code'u Telegram'da Denedim & OpenClaw Bitti mi?**

- 채널명: Ömer Göçmen | Yapay Zeka & Otomasyon
- 조회수: 1,498회
- 영상 URL: [https://www.youtube.com/watch?v=Ycn3RlBu4jE](https://www.youtube.com/watch?v=Ycn3RlBu4jE)
- 영상 길이: 7분 33초

**영상 내용:**


Claude Code의 새로운 Telegram 플러그인을 실제로 설치하고 테스트하는 전 과정을 실용적으로 보여준다. OpenClaw의 등장으로 AI 코딩 에이전트를 메시징 플랫폼에서 원격 제어하는 트렌드가 형성되었고, Claude가 이에 대응하여 공식 플러그인을 출시한 것이 핵심 맥락이다.


설치는 네 단계로 구성된다. BotFather에서 봇 생성 및 Token 발급, Claude Code 플러그인 설치 및 reload plugins 실행(이 단계를 빠뜨리면 인식 안 됨), /telegram configure 명령으로 구성, Pair Token으로 사용자 인증 완료.


운영상 중요한 주의점 두 가지가 있다. Claude Code가 컴퓨터에서 열린 상태를 유지해야 하며 닫으면 어떤 명령도 처리되지 않는다는 것, 그리고 모든 권한을 미리 허용해놓지 않으면 매번 수동 승인이 필요하다는 것이다.


실제 데모에서는 Telegram에서 프롬프트를 보내 웹사이트를 생성하는 과정을 보여준다. Claude Code가 웹 리서치를 수행하여 이미지를 찾고 콘텐츠를 채워 완성했다. "OpenClaw가 끝났는가?"라는 질문에 대해서는, Claude Code의 Telegram 연동이 핵심 기능을 상당 부분 대체하지만 항시 가동(persistent) 측면에서는 여전히 차이가 있다는 뉘앙스를 남긴다.


---


### **15. I Gave My OpenClaw Eyes (Live Demo + Q&A)**

- 채널명: Zach Babiarz
- 조회수: 1,387회
- 영상 URL: [https://www.youtube.com/watch?v=Tmp9DH8WLEw](https://www.youtube.com/watch?v=Tmp9DH8WLEw)
- 영상 길이: 41분 58초

**영상 내용:**


Meta 스마트 안경에 OpenClaw의 "눈"을 달아주는 Vision Claw 프로젝트의 실제 구현과 Mission Control v2 대시보드를 공개하는 라이브 스트림이다.


Vision Claw의 기술적 구현 과정은 다음과 같다. 에이전트에게 GitHub 레포지토리를 다운로드하게 하고, Xcode를 설치하고, iPhone을 Mac Mini에 물리적으로 연결한 뒤 빌드하여 앱을 설치한다. Meta AI 앱에서 특정 버튼을 5번 탭하는 숨겨진 방법으로 개발자 모드를 활성화하고, Vision Claw 앱으로 안경에 연결한다. Zach 자신이 Xcode에 익숙하지 않아서 OpenClaw 에이전트에게 스크린샷을 보내며 설치를 완료했다는 것이 "모르면 에이전트에게 물어보라"는 그의 철학을 잘 보여준다.


라이브 데모에서는 안경으로 Mac Mini를 음성 제어하여 파일 생성에는 성공했으나, 브라우저 열기 등은 불안정했다. "현재로서는 일상적 실용성보다는 미래 가능성의 맛보기"라고 솔직히 평가하며, 마트에서 상품을 보며 가격 비교를 즉각 받는 시나리오를 미래 사용 사례로 제시한다.


Mission Control v2 대시보드는 상당히 인상적이다. 수익 추적, 에이전트별 활동 현황, 우선순위별 할 일 목록, 매일 3가지 AI 뉴스 브리핑, Fireflies API로 Zoom 회의 자동 요약 및 액션 아이템 추출, YouTube 구독자 진행 상황, Oura 링 연동 건강 데이터(수면/활동/준비 점수), 투자 추적(Polymarket, 암호화폐) 등이 포함된다.


비즈니스 아이디어로 OpenClaw가 100% 운영하는 사업체 실험을 제안한다. 고객이 폼에 요구사항을 입력하면 AI가 웹사이트를 구축하고 피드백 반영 후 Stripe로 결제까지 수집하는 완전 자동화 서비스다.


---


### **16. 【重磅更新】OpenClaw 接入微信：官方版"龙虾"插件上线，附安装与实测！**

- 채널명: AI学长小林
- 조회수: 1,227회
- 영상 URL: [https://www.youtube.com/watch?v=wxKHJMVyswQ](https://www.youtube.com/watch?v=wxKHJMVyswQ)
- 영상 길이: 4분 17초

**영상 내용:**


WeChat(微信)이 공식적으로 OpenClaw 플러그인 "ClawBot"을 출시했다는 소식을 전하며 설치부터 실사용까지를 시연한다. 가장 큰 의미는 OpenClaw가 중국 최대 메시징 플랫폼에 안전하고 편리하게 연동되었다는 것이다. 기존의 복잡한 서드파티 솔루션이나 비공식 개조판과 달리, 공식 플러그인이므로 계정 보안과 개인정보 문제를 걱정할 필요가 없다.


설치 과정은 놀라울 정도로 간단하다. WeChat 최신 버전 업데이트 후 설정 > 플러그인에서 "微信 ClawBot"을 확인하고(그레이 스케일 배포 중이라 앱 재시작 필요할 수 있음), 터미널에서 npx -y 명령어 한 줄을 실행하면 QR 코드가 생성되어 WeChat으로 스캔하여 연결을 승인하면 완료된다.


실제 테스트에서 "你好"라고 보내면 즉시 "안녕하세요, 저는 爬爬虾(OpenClaw의 중국어 애칭)입니다"라고 응답하고, "24시간 최신 AI 뉴스를 정리해달라"고 요청하면 LeCun의 AMI Labs 설립, Anthropic의 $300억 투자 유치 등의 뉴스를 정리해준다.


현재 제약 사항으로는 WeChat 계정당 하나의 OpenClaw만 연결 가능하고("한 마리 새우만 키울 수 있다"), 모바일에서만 사용 가능하며 PC 버전은 미지원이다. 다른 사람이 ClawBot을 친구 추가하거나 그룹에 초대할 수 없으며 개인 단독 사용만 지원된다. Telegram, Discord에 이어 WeChat까지 커버하게 되면서 OpenClaw가 주요 메시징 플랫폼을 모두 지원하게 되었다.


---


### **17. Openclaw Agent Teams + Abacus Claw + Manus Computer + NotebookLM Updates!**

- 채널명: Julian Goldie SEO
- 조회수: 1,030회
- 영상 URL: [https://www.youtube.com/watch?v=PRcMoK2V5P4](https://www.youtube.com/watch?v=PRcMoK2V5P4)
- 영상 길이: 1시간 26초

**영상 내용:**


자막이 제공되지 않아 상세 분석이 불가합니다. 제목으로 판단하면, OpenClaw의 Agent Teams 기능, Abacus Claw 통합, Manus Computer, NotebookLM 업데이트 등 최신 AI 에이전트 생태계의 주요 업데이트를 종합적으로 다루는 영상입니다.

