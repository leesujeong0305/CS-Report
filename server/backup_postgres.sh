#!/bin/bash

# 설정
#CONTAINER_NAME="ubuntu-postgres"  # PostgreSQL 컨테이너 이름
#DB_NAME="cs_report_db"                   # 백업할 데이터베이스 이름
#DB_USER="postgres"                             # PostgreSQL 사용자
#BACKUP_DIR="/mnt/synology_backup"              # 백업 경로 (NFS 마운트된 시놀로지 경로)
#TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
# 현재 날짜 및 시간 가져오기
BACKUP_TIME=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/mnt/backup"         # 백업 폴더 경로 (호스트와 공유 마운트된 경로)
DB_NAME="your_database_name" # 백업할 DB 이름
DB_USER="your_user"          # PostgreSQL 사용자 이름
DB_PASS="your_password"      # PostgreSQL 비밀번호 (환경 변수로 설정하는 것이 권장됨)


# 백업 디렉터리 확인 및 생성
if [ ! -d "$BACKUP_DIR" ]; then
    echo "백업 경로가 존재하지 않습니다: $BACKUP_DIR"
    exit 1
fi

# PostgreSQL 데이터베이스 백업 시작
echo "PostgreSQL 데이터베이스 $DB_NAME 백업을 시작합니다..."

docker exec "$CONTAINER_NAME" pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
PGPASSWORD="$DB_PASS" pg_dump -U $DB_USER -F c -b -v -f "$BACKUP_DIR/${DB_NAME}_backup_$BACKUP_TIME.dump" $DB_NAME

if [ $? -eq 0 ]; then
    echo "PostgreSQL 백업 완료: db_backup_$TIMESTAMP.sql"
else
    echo "백업 실패!"
    exit 1
fi

# 오래된 백업 파일 정리 (30일 이상 된 파일 삭제)
#find "$BACKUP_DIR" -type f -name "*.sql" -mtime +30 -exec rm {} \;

echo "백업 작업이 완료되었습니다!"

# 컨테이너 내가 아닌 host내에서 진행해야함