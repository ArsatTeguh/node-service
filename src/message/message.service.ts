import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  onlineUsers = new Map<string, string>();

  addUser(userId: string, socketId: string) {
    this.onlineUsers.set(userId, socketId);
  }

  getSocketId(userId: string): string | undefined {
    return this.onlineUsers.get(userId);
  }

  removeUser(userId: string) {
    this.onlineUsers.delete(userId);
  }
}
