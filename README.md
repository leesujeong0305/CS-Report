npm install pg typeorm @nestjs/typeorm --save
npm install --save class-validator class-transformer




postgresql 시간대 변경
//기본 시간대 확인
SHOW timezone;

//시간대 변경
SET timezone = 'Asia/Seoul';

ssh로 postgres 컨테이너 내부 접속하는 방법
docker exec -it <postgres-container-name> psql -U postgres
sudo systemctl restart postgresql