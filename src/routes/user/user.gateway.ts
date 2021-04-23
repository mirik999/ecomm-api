import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user.service';

@WebSocketGateway({ namespace: 'user' })
export class UserGateway {
  constructor(private userService: UserService) {}

  @WebSocketServer() wss: Server;

  handleConnection(client: Socket) {
    console.log(`connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`disconnected ${client.id}`);
  }

  @SubscribeMessage('logoutUser')
  onUserUpdate(@MessageBody() id: string) {
    this.wss.emit('logoutUser', id);
  }
}
