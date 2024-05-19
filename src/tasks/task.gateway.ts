// src/gateway/websockets.gateway.ts

import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task } from 'src/tasks/entities/task.entity';

@WebSocketGateway()
@UseGuards(AuthGuard)
export class TaskGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Set<Socket> = new Set();

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  @SubscribeMessage('taskCreated')
  handleTaskCreated(client: Socket, task: Task) {
    console.log(`New task created: ${task.title}`);
    this.server.emit('taskCreated', task);
  }

  @SubscribeMessage('taskUpdated')
  handleTaskUpdated(client: Socket, task: Task) {
    console.log(`Task updated: ${task.id}`);
    this.server.emit('taskUpdated', task);
  }
}
