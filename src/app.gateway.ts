import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server ,Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() wss: Server;

  private logger:Logger = new Logger('AppGateWay');

  afterInit(server:Server){
    this.logger.log('initialized');
  }

  handleConnection(client:Socket){
    this.logger.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client:Socket, ...args:any[]){
    this.logger.log(`client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgToClient',text);
    // return {event:'msgToClient', data:text}
  }
}
