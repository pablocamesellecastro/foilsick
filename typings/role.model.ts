import { Permission } from "./permission.model";

export class Role {
  id: string;
  description: string | undefined;
  permissions: Permission[] = [];

  constructor(data: object) {

      this.id = data['id'];

      this.description = data['description'];

    if (data['roles_permissions'] && !data['permissions']) {
      this.permissions = data['roles_permissions'].map(
        (role_permission: any) => new Permission(role_permission['permission'])
      );
    }

    if (data['permissions']) {
      this.permissions = data['permissions'].map(
        (perm: any) => new Permission(perm)
      );
    }
  }

  toBD() {
    return {
      id: this.id,
      description: this.description,
      roles_permissions: this.permissions?.map((permission: Permission) => ({
        permissionId: permission.id
      }))
    }
  }
}