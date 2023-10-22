import React, { Dispatch, SetStateAction } from 'react';
import { OrderType } from '../../../../general/types/OrderType';

export interface OrderHandlerType {
  set: Dispatch<SetStateAction<OrderType>>;
  get: OrderType;
}

const OrderHandlerContext = React.createContext<OrderHandlerType>({
  set: () => ({
    id: new Date().getTime().toString(),
    productOrders: []
  }),
  get: {
    id: new Date().getTime().toString(),
    productOrders: []
  }
});

export default OrderHandlerContext;
