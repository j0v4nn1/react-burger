import Order from '../../components/order/order';
import styles from './orders.module.css';
import { useEffect } from 'react';
import { connectionClose, connectionStart } from '../../services/slices/websocket-history-orders';
import Spinner from '../../components/spinner/spinner';
import { Route, Routes } from 'react-router-dom';
import OrderInformation from '../order-information/order-information';
import Modal from '../../components/modal/modal';
import { remove } from '../../services/slices/order-information/order-information';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const Orders = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((store) => store.profile.accessToken);
  const { orders } = useAppSelector((store) => store.websocketHistoryOrders.messages);
  const { loading } = useAppSelector((store) => store.websocketHistoryOrders);

  const handleCloseOrderInformation = () => {
    dispatch(remove());
  };

  useEffect(() => {
    dispatch(connectionStart({ accessToken }));

    return () => {
      dispatch(connectionClose());
    };
    // eslint-disable-next-line
  }, [accessToken]);

  const ordersList = orders
    ? orders
        .map((order) => {
          return <Order path={'/profile/orders/'} key={order._id} order={order} />;
        })
        .reverse()
    : null;

  return loading ? (
    <Spinner height={'calc(100vh - 128px)'} />
  ) : (
    <>
      <ul className={styles['profile__orders']}>{ordersList}</ul>
      <Routes>
        <Route
          path="/:id"
          element={
            <Modal closeModalPath={'/profile/orders'} onRemove={handleCloseOrderInformation}>
              <OrderInformation closeModalPath={'profile/orders'} />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};
export default Orders;
