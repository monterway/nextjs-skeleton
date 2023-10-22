import { ProductOrderType } from "./ProductOrderType";

export interface OrderType {
  id: string;
  productOrders: ProductOrderType[];
}
