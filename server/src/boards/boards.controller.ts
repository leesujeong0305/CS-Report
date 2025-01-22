import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    //get http://ubisampaju.synology.me:9101/boards/
    @Get()
    getAllBoard() {
        return this.boardsService.getAllBoards();
    }

    //get http://ubisampaju.synology.me:9101/boards/count
    @Get('/count')
    getBoardCount() {
        return this.boardsService.getBoardCount();
    }
   
    //get http://ubisampaju.synology.me:9101/boards/e5f33e73-2a72-4189-a2bf-f3ce0faaa70a
    @Get(':id')
    getBoardById(@Param('id') id: number) {
        return this.boardsService.getBoard(id);
    }
    
    //post http://ubisampaju.synology.me:9101/boards/
    // {
    //     "title": "Board 2",
    //     "description": "Description 2",
    //     "isPublic": false
    //   }
    @Post()
    @UsePipes(new ValidationPipe())
    createBoard(@Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.createBoard(createBoardDto);
    }

}
