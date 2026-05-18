export class Department  {
  id: number;
  name: string;
  description: string | undefined;
  
  constructor(data: object) {
    Object.assign(this, data);
  }

}