import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; //게시판 ID

    @Column()
    title: string; // 게시판 제목

    @Column()
    requester: string; // 요청자

    @Column()
    request_mail: number; // 요청 메일 (log, 알람, debug, 버그, 분석, 테스트, 일반)

    @Column()
    state: number; // 상태 (log, 알람, debug, 버그, 분석, 테스트, 일반)

    @Column()
    manager: string; // 담당자 (유비샘 담당자)

    @Column()
    state_progress: number; // 진행상태 (진행중, 완료, 취소)
    
    @Column()
    review: number; // 검토 상태 (접수, 컴펀 중, 컴펀 완료, 긴급 대응)

    @Column()
    site: number; //관련 사이트 ID ( 파주[패턴], 파주[레이저], 구미[패턴]구미[레이저])

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    request_date: Date; // 요청 날짜 (선택)

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true }) // 소프트 삭제를 위한 컬럼
    deletedAt: Date | null;
}