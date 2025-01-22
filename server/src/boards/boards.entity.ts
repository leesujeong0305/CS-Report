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
    request_mail: string; // 요청 메일

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    request_date: Date; // 요청 날짜

    @Column()
    state_cause: number; // 상태 원인

    @Column()
    state: number; // 상태

    @Column()
    manager: string; // 담당자

    @Column()
    state_progress: number; // 진행상태

    @Column()
    review: number; // 유비샘 내부 진행

    @Column()
    site: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}