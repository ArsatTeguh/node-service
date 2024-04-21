import { Body, Controller, Post } from '@nestjs/common';
import { databaseService } from './database.service';
import { addMessageDto, getMessageDto } from './dto/createMessage.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly databasesService: databaseService) {}

  @Post()
  getMessages(@Body() body: getMessageDto) {
    const { from, to } = body;
    return this.databasesService.getMessages(from, to);
  }

  @Post('add')
  async addMessage(@Body() body: addMessageDto) {
    const { from, to, message, id } = body;
    return await this.databasesService.addMessage(id, from, to, message);
  }
}
