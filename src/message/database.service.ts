import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class databaseService {
  constructor(private prisma: PrismaService) {}

  async getMessages(from: string, to: string) {
    try {
      const messages = await this.prisma.message.findMany({
        where: {
          users: {
            hasEvery: [from, to],
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender === from,
          message: msg.message,
          sender: from,
          to,
        };
      });
      return projectedMessages;
    } catch (error) {
      throw new Error('Failed to fetch messages');
    }
  }

  async addMessage(id: number, from: string, to: string, message: string) {
    try {
      const data = await this.prisma.message.create({
        data: {
          message: message,
          users: [from, to],
          sender: from,
          read: false,
          id_user: id,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Failed to add message');
    }
  }
}
