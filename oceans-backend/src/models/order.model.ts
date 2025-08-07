import { Product } from './product.model';

export interface Order {
  id: string;
  products: Product[];
  total: number;
  closed: boolean;
  createdBy: string;
  createdAt: Date;
}
