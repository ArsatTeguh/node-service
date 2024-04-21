import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server; // ini untuk mengirim ke semua yang terhubung
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('add-user')
  handleAddUser(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.messageService.addUser(userId, client.id);
  }

  @SubscribeMessage('send-msg')
  handleSendMessage(
    @MessageBody() data: { to: string; msg: string; from: string },
  ) {
    const sendUserSocket = this.messageService.getSocketId(data.to);
    const senderSocket = this.messageService.getSocketId(data.from);
    const callback = {
      from: data.from,
      to: data.to,
      msg: data.msg,
    };

    this.server.to(sendUserSocket).emit('msg-recieve', callback);
    this.server.to(sendUserSocket).emit('msg-profil', callback);
    this.server.to(senderSocket).emit('msg-profil', callback);
    // this.server.emit('msg-profil', callback);
  }

  @SubscribeMessage('update-online')
  updateOnline(@MessageBody() data: { id: number }) {
    const callback = { online: true, id: data.id };
    this.server.emit('online', callback);
  }

  @SubscribeMessage('typing')
  typing(
    @MessageBody() data: { isTyping: boolean; id: string },
    @ConnectedSocket() client: Socket,
  ) {
    const sendUserSocket = this.messageService.getSocketId(data.id);
    client.broadcast.to(sendUserSocket).emit('typing', data.isTyping);
  }
}
