import styles from './order.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';
import OrderIngredientsImageList from '../order-ingredients-image-list/order-ingredients-image-list';
import { set } from '../../services/slices/order-information/order-information';
import { countTotalPrice } from '../../utils/utils';
import { OrderComponent } from './order.types';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const Order: React.FC<OrderComponent> = ({ order, path }) => {
  const { _id, name, createdAt, number, ingredients } = order;

  const dispatch = useAppDispatch();

  const burgerIngredients = useAppSelector((store) => store.burgerIngredients.ingredients);

  const totalPrice = useMemo(() => {
    return countTotalPrice(ingredients, burgerIngredients);
  }, [ingredients, burgerIngredients]);

  const handleOpenOrderInformation = () => {
    dispatch(set(order));
  };

  return (
    <li onClick={handleOpenOrderInformation} key={_id} className={styles['order']}>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`${path}${_id}`}>
        <div className={styles['order__number-and-date']}>
          <p className="text text_type_digits-default">{`#${number}`}</p>
          <p className="text text_type_main-small text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <h3 className={`text text_type_main-medium ${styles['order__name']}`}>{name}</h3>
        <div className={styles['order__images-and-price']}>
          <ul className={styles['order__images-list']}>
            <OrderIngredientsImageList order={order} />
          </ul>
          <div className={styles['order__icon-and-price']}>
            <div className={`text text_type_digits-default ${styles['order__price']}`}>{totalPrice}</div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Order;
