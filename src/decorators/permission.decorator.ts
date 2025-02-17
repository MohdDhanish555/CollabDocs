import { SetMetadata } from "@nestjs/common";
import { Permissions } from "src/enums/permissions.enum";

export const PERMISSIONS_KEY = "permissions";
export const RequirePermission = (permissions: Permissions) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
