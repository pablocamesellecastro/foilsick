export class Permission {
  id: string;
  description: string;
  roles: string[];

  constructor(data: object) {
    this.id = data['id'];
    this.description = data['description'];
    this.roles = data['roles'];
  }

  toBD() {
    return {
      id: this.id,
      description: this.description,
      roles: this.roles
    }
  }
}