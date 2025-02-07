import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    requester: string; // 요청자

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value)) // 문자열 -> 숫자로 변환
    request_mail: number; // 요청 메일

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value)) // 문자열 -> 숫자로 변환
    state: number; // 상태
    
    @IsString()
    @IsNotEmpty()
    manager: string; // 담당자
    
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value)) // 문자열 -> 숫자로 변환
    state_progress: number; // 진행상태

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value)) // 문자열 -> 숫자로 변환
    review: number; // 검토 상태
    
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value)) // 문자열 -> 숫자로 변환
    site: number;
    
    @IsNotEmpty()
    request_date: Date; // 요청 날짜
}