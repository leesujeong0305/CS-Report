npm install pg typeorm @nestjs/typeorm --save
npm install --save class-validator class-transformer
npm install @type/cors



postgresql 시간대 변경
//기본 시간대 확인
SHOW timezone;

//시간대 변경
SET timezone = 'Asia/Seoul';

ssh로 postgres 컨테이너 내부 접속하는 방법
docker exec -it <postgres-container-name> psql -U postgres
sudo systemctl restart postgresql


// *cs-management-app의 build 폴더 서버 폴더로 복사*
cp -r ./cs-management-app/build ./server/public


pm2 - Node.js 애플리케이션을 관리하기 위한 도구로, 프로세스를 백그라운드에서 실행하고 모니터링함

1. 설치
npm install -g pm2

2. NestJS 서버 실행 (꼭 서버 폴더로 이동 후 실행하기!!!)
pm2 start npm --name "suport-ubisam-server" -- run start


3. 상태확인
pm2 status

4. 서버 종료
pm2 stop suport-ubisam-server

5. 시스템 재부팅 시 자동 실행 설정
pm2 startup
pm2 save

6. 특정 프로세스 이름으로 삭제
pm2 delete <name>

7. 전체 프로세스 삭제
pm2 delete all