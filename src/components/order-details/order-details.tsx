import styles from './order-details.module.css';
import done from '../../images/done.png';
import { remove } from '../../services/slices/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const OrderDetails = () => {
  const dispatch = useAppDispatch();

  const orderNumber = useAppSelector((store) => store.orderDetails.orderNumber);

  const handleRemoveOrder = () => {
    dispatch(remove());
  };

  return (
    <>
      <button onClick={handleRemoveOrder} aria-label="Закрыть" type="button" className={styles.closeButton}></button>
      <div className={styles.wrapper}>
        <h3 className="mt-30 text text_type_digits-large">{orderNumber}</h3>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <img className="mt-15 mb-15" src={done} alt="Готово" />
        <p className="text text_type_main-default">Ваш заказ готов</p>
        <p className="text text_type_main-default mt-2 mb-30 text_color_inactive">
          Можете получить его на орбитальной станции
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
