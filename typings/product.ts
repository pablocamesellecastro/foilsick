export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  size: string;
  genre: string[];
  audio: string;
  display_index: number;

  constructor(data: object) {
    Object.assign(this, data);
  }
}
