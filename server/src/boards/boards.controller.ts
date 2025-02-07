import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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


    @Put(':id') // 업데이트를 위한 API
    @UsePipes(new ValidationPipe())
    updateBoard(@Param('id') id: number, // 업데이트할 대상 ID
                @Body() updateBoardDto: CreateBoardDto, // 업데이트할 데이터
    ) {
        return this.boardsService.updateBoard(id, updateBoardDto);
    }

    @Delete(':id')
    deleteBoard(@Param('id') id: number) {
    console.log('delete 진행');
    
    return this.boardsService.deleteBoard(id);
    //return { message: `Board with ID ${id} has been deleted` };
    }

}
