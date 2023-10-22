import { Button } from 'react-bootstrap';
import React from 'react';
import OrderHandlerContext from '../../contexts/OrderHandlerContext';
import { ButtonProps } from 'react-bootstrap/Button';

export interface AddToOrderButtonProps {
  productId: string;
  quantity: number;
  children: JSX.Element | JSX.Element[];
  buttonProps?: ButtonProps;
}

const AddToOrderButton = (props: AddToOrderButtonProps): JSX.Element | null => {
  const { productId, quantity, children, buttonProps = {} } = props;
  const orderHandler = React.useContext(OrderHandlerContext);

  const addToOrder = () => {
    orderHandler.set((order) => {
      const indexOfExistingProductOrder = order.productOrders.findIndex((productOrder) => productOrder.productId === productId);
      if (indexOfExistingProductOrder < 0) {
        const newOrder = { ...order };
        newOrder.productOrders.push({
          id: new Date().getTime().toString(),
          productId,
          quantity
        });
        return newOrder;
      }
      else {
        const newOrder = { ...order };
        newOrder.productOrders[indexOfExistingProductOrder].quantity = newOrder.productOrders[indexOfExistingProductOrder].quantity + quantity;
        return newOrder;
      }
    });
  };

  return (
    <Button onClick={addToOrder} {...buttonProps}>
      {children}
    </Button>
  );
};

export default AddToOrderButton;
