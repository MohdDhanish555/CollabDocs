import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CommentsService } from "src/modules/documents/comments.service";
import { UsersService } from "src/modules/users/users.service";

interface User {
  id: string;
  username: string;
}

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class DocumentGateway {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService
  ) {}

  @WebSocketServer()
  server: Server;

  private activeUsers: Map<string, Map<string, User>> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("joinRoom")
  async handleJoin(
    @MessageBody()
    data: {
      documentId: string;
      userId: string;
    },
    @ConnectedSocket() client: Socket
  ) {
    const { documentId, userId } = data;

    client.join(documentId);

    const user = await this.usersService.findById(userId);

    if (!this.activeUsers.has(documentId)) {
      this.activeUsers.set(documentId, new Map());
    }
    this.activeUsers.get(documentId)?.set(user.id, user);

    this.broadcastActiveUsers(documentId);
  }

  @SubscribeMessage("leaveRoom")
  async handleLeave(
    @MessageBody()
    data: {
      documentId: string;
      userId: string;
    },
    @ConnectedSocket() client: Socket
  ) {
    const { documentId, userId } = data;
    client.leave(documentId);

    // const { id, username } = await this.usersService.findById(userId);

    if (this.activeUsers.has(documentId)) {
      this.activeUsers.get(documentId)?.delete(userId);
    }
    this.broadcastActiveUsers(documentId);
  }

  private broadcastActiveUsers(documentId: string) {
    const users = Array.from(this.activeUsers.get(documentId)?.values() || []);
    this.server.to(documentId).emit("usersUpdated", users);
  }

  @SubscribeMessage("addComment")
  async handleNewComment(
    @MessageBody()
    data: {
      documentId: string;
      userId: string;
      comment: string;
    },
    @ConnectedSocket() client: Socket
  ) {
    const { documentId, comment, userId } = data;

    const newComment = await this.commentsService.addComment(
      documentId,
      comment,
      userId
    );

    this.server.to(documentId).emit("commentsUpdated", newComment);
  }
}
