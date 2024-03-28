import styles from './feed.module.css';
import Order from '../../components/order/order';
import { useEffect } from 'react';
import { connectionClose, connectionStart } from '../../services/slices/websocket-feed/websocket-feed';
import Spinner from '../../components/spinner/spinner';
import { Route, Routes } from 'react-router-dom';
import OrderInformation from '../order-information/order-information';
import Modal from '../../components/modal/modal';
import { remove } from '../../services/slices/order-information/order-information';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const Feed = () => {
  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector((store) => store.websocketFeed.messages);

  const { loading } = useAppSelector((store) => store.websocketFeed);

  const ordersList = orders
    ? orders.map((order) => {
        return order.status === 'done' && <Order path={'/feed/'} key={order._id} order={order} />;
      })
    : null;

  const checkOrderStatus = (status: 'done' | 'pending', className: string) => {
    return orders
      ? orders.map((order, index) => {
          return order.status === status && index <= 9 ? (
            <li key={order._id} className={className}>
              {order.number}
            </li>
          ) : null;
        })
      : null;
  };

  const readyOrders = checkOrderStatus(
    'done',
    `text text_type_digits-default ${styles['feed__orders-ready-list-item']}`
  );
  const pendingOrders = checkOrderStatus('pending', 'text text_type_digits-default mb-2');

  useEffect(() => {
    dispatch(connectionStart());

    return () => {
      dispatch(connectionClose());
    };
    // eslint-disable-next-line
  }, []);

  const handleCloseOrderInformation = () => {
    dispatch(remove());
  };

  return loading ? (
    <Spinner height={'calc(100vh - 128px)'} />
  ) : (
    <>
      <section className={styles['feed']}>
        <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
        <div className={styles['feed__orders']}>
          <ul className={styles['feed__orders-list']}>{ordersList}</ul>
          <div className={styles['feed__orders-information-wrapper']}>
            <div className={styles['feed__orders-information']}>
              <div className={styles['feed__orders-ready']}>
                <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                <ul className={styles['feed__orders-ready-list']}>{readyOrders}</ul>
              </div>
              <div className={styles['feed__orders-pending']}>
                <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                <ul className={styles['feed__orders-pending-list']}>{pendingOrders}</ul>
              </div>
            </div>
            <h3 className="text text_type_main-medium mt-15">Выполнено за все время:</h3>
            <div className={`text text_type_digits-large ${styles['feed__orders-ready-all-number']}`}>{total}</div>
            <h3 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h3>
            <div className={`text text_type_digits-large ${styles['feed__orders-ready-today-number']}`}>
              {totalToday}
            </div>
          </div>
        </div>
      </section>
      <Routes>
        <Route
          path="/:id"
          element={
            <Modal onRemove={handleCloseOrderInformation} closeModalPath={'/feed'}>
              <OrderInformation closeModalPath={'/feed'} />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};
export default Feed;
