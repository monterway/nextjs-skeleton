import { ButtonProps } from 'react-bootstrap/Button';
import React from 'react';
import OrderHandlerContext from '../../contexts/OrderHandlerContext';
import { Button } from 'react-bootstrap';

export interface AddOrRemoveFromOrderButtonProps {
  productId: string;
  addButtonChildren: JSX.Element | JSX.Element[];
  removeButtonChildren: JSX.Element | JSX.Element[];
  addButtonProps?: ButtonProps;
  removeButtonProps?: ButtonProps;
}

const AddOrRemoveFromOrderButton = (props: AddOrRemoveFromOrderButtonProps): JSX.Element | null => {
  const { productId, addButtonChildren, removeButtonChildren, addButtonProps = {}, removeButtonProps = {} } = props;
  const orderHandler = React.useContext(OrderHandlerContext);
  const [isRemoveAvailable, setIsRemoveAvailable] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsRemoveAvailable(() => {
      const productOrderOfCurrentProductInProductOrders = orderHandler.get.productOrders.find(
        (productOrder) => productOrder.productId === productId
      );
      return typeof productOrderOfCurrentProductInProductOrders !== 'undefined';
    });
  }, [orderHandler.get]);

  const addProduct = () => {
    orderHandler.set((order) => {
      const indexOfCurrentProductInProductOrders = orderHandler.get.productOrders.findIndex(
        (productOrder) => productOrder.productId === productId
      );
      if (indexOfCurrentProductInProductOrders < 0) {
        let newOrder = { ...order };
        newOrder.productOrders.push({
          id: new Date().getTime().toString(),
          quantity: 1,
          productId
        });
        return newOrder;
      } else {
        const newQuantityOfCurrentProduct = order.productOrders[indexOfCurrentProductInProductOrders].quantity + 1;
        let newOrder = { ...order };
        newOrder.productOrders[indexOfCurrentProductInProductOrders].quantity = newQuantityOfCurrentProduct;
        return newOrder;
      }
    });
  };

  const removeProduct = () => {
    orderHandler.set((order) => {
      const indexOfCurrentProductInProductOrders = orderHandler.get.productOrders.findIndex(
        (productOrder) => productOrder.productId === productId
      );
      if (indexOfCurrentProductInProductOrders < 0) {
        return order;
      } else {
        const newQuantityOfCurrentProduct = order.productOrders[indexOfCurrentProductInProductOrders].quantity - 1;
        if (newQuantityOfCurrentProduct < 1) {
          return {
            ...order,
            productOrders: order.productOrders.filter(
              (productOrder, index) => index !== indexOfCurrentProductInProductOrders
            )
          };
        } else {
          let newOrder = { ...order };
          newOrder.productOrders[indexOfCurrentProductInProductOrders].quantity = newQuantityOfCurrentProduct;
          return newOrder;
        }
      }
    });
  };

  return (
    <div className="add-or-remove-from-order-button">
      <Button
        className="add-or-remove-from-order-button__button"
        onClick={addProduct}
        variant="success"
        {...addButtonProps}
      >
        {addButtonChildren}
      </Button>
      {isRemoveAvailable ? (
        <Button
          className="add-or-remove-from-order-button__button"
          onClick={removeProduct}
          variant="danger"
          {...removeButtonProps}
        >
          {removeButtonChildren}
        </Button>
      ) : null}
    </div>
  );
};

export default AddOrRemoveFromOrderButton;
