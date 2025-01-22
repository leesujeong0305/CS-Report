import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateBoardDto {
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    requester: string; // 요청자

    @IsString()
    request_mail: string; // 요청 메일

    @IsNotEmpty()
    request_date: Date; // 요청 날짜

    @IsNumber()
    @IsNotEmpty()
    state_cause: number; // 상태 원인

    @IsNumber()
    @IsNotEmpty()
    state: number; // 상태

    @IsString()
    @IsNotEmpty()
    manager: string; // 담당자

    @IsNumber()
    @IsNotEmpty()
    state_progress: number; // 진행상태

    @IsNumber()
    @IsNotEmpty()
    site: number;

    @IsNumber()
    @IsNotEmpty()
    review: number; // 유비샘 내부 진행
}