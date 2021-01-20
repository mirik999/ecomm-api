import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { StatisticService } from './statistic.service';

@WebSocketGateway({ namespace: 'statistic' })
export class StatisticGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private statisticService: StatisticService) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('initialized');
  }

  handleConnection(client: Socket, ...args) {
    this.logger.log(`connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`disconnected ${client.id}`);
  }

  @SubscribeMessage('getSystemInfo')
  async handleMessage(@MessageBody() data): Promise<void> {
    const osInfo = this.statisticService.getOsInfo();
    const cpuInfo = await this.statisticService.getCpuInfo();
    this.wss.emit('sendSystemInfo', {
      ...osInfo,
      ...cpuInfo,
    });
  }
}
