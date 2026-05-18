import { UUID } from "crypto";
import { Role } from "./role.model";
import { Department } from "./department.model";

export class User {
  id: string | UUID | number;
  name: string;
  surname: string;
  email: string | undefined;
  createdAt: Date | undefined;
  image: string; // image url

  fullName: string;

  constructor(data: object) {
    Object.assign(this, data); // @todo no depender de object assing y meter a la antigua usanza this.id = data['id']

    if (!this.fullName && data["name"] && data["surname"])
      this.fullName = `${data["name"].toString()} ${data[
        "surname"
      ].toString()}`;

    // if (data["createdAt"] && typeof data["createdAt"] != "Date") this.createdAt = new Date(data["createdAt"]);
  }

  // toBD(){
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     surname: this.surname,
  //     phone: this.phone,
  //     email: this.email,
  //     address: this.address,
  //     active: this.active,
  //     departmentId: this.departmentId,

  //   }
  // }

  // rolesToBD(){
  //    return  this.roles?.map((role: Role) => {
  //       return {
  //         userId: this.id,
  //         roleId: role.id,

  //       }
  //     })
  // }
}
