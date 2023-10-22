import { Button } from 'react-bootstrap';
import React from 'react';
import OrderHandlerContext from '../../contexts/OrderHandlerContext';
import { ButtonProps } from 'react-bootstrap/Button';

export interface AddToOrderButtonProps {
  productId: string;
  quantity: number;
  children: string | JSX.Element | JSX.Element[];
  buttonProps?: ButtonProps;
}

const AddToOrderButton = (props: AddToOrderButtonProps): JSX.Element | null => {
  const { productId, quantity, children, buttonProps = {} } = props;
  const orderHandler = React.useContext(OrderHandlerContext);

  const addToOrder = () => {
    orderHandler.set((order) => {
      order.productOrders.push({
        id: new Date().getTime().toString(),
        productId,
        quantity
      });
      return order;
    });
  };

  return (
    <Button onClick={addToOrder} {...buttonProps}>
      {children}
    </Button>
  );
};

export default AddToOrderButton;
