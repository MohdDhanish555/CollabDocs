import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS_KEY } from "src/decorators/permission.decorator";
import { Permissions } from "src/enums/permissions.enum";
import { Collaborator } from "../entities/collaborators.entity";
import { Document } from "../entities/document.entity";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<Permissions>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredPermission) {
      return true;
    }
    const { user, params } = context.switchToHttp().getRequest();

    const document = await Document.findByPk(params.id, {
      attributes: ["authorId"],
    });

    if (document && document.authorId === user.userId) {
      return true; // Authors have full access
    }

    const collaborator = await Collaborator.findOne({
      where: { userId: user.userId, documentId: params.id },
      attributes: ["accessLevel"],
    });

    if (!collaborator) {
      return false;
    }

    console.log({ collaborator });

    return (
      (requiredPermission === Permissions.READ &&
        collaborator.accessLevel === "read") ||
      collaborator.accessLevel === "write"
    );
  }
}
