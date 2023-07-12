## README
## Docker Compose 빌드, 실행
```
docker-compose up --build
```
## 테스트
### 도커 컨테이너 모두 실행된 후 웹 브라우저 실행
* http://localhost:3000
### 회원가입 후 로그인
![image](https://github.com/hsk9169/gin_demo/assets/39580172/3fa9dc2f-0dac-4ae1-a4e2-f17854942e74)
* access-token
  * 유효기간: 1분
  * 저장소: redux
* refresh-token
  * 유효기간: 1분
  * 저장소: browser cookie
* access-token 유효할 때 '데이터 조회' 가능
* access-token 만료 시 '토큰 REFRESH' 실행
  * access-token, refresh-token 갱신 
* 로그아웃
  * access-token 유효할 때 가능
  * 만료 시 refresh 후 재실행 가능
