import styles from './burger-constructor.module.css';
import getOrderNumber from '../../utils/order-api';
import Modal from '../modal/modal';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import OrderDetails from '../order-details/order-details';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import { set, remove } from '../../services/slices/order-details/order-details';
import { removeAllIngredients, setIngredient } from '../../services/slices/burger-constructor/burger-constructor';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { INGREDIENT_TYPE, PATH_LOGIN_PAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { ConstructorIngredient, OrderData } from './burger-constructor.types';

const BurgerConstructor = () => {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const dispatch = useAppDispatch();
  const { ingredients, bun } = useAppSelector((store) => store.burgerConstructor);
  const accessToken = useAppSelector((store) => store.profile.accessToken);
  const isLoggedIn = useAppSelector((store) => store.profile.isLoggedIn);
  const orderNumber = useAppSelector((store) => store.orderDetails.orderNumber);

  const handleRemoveOrder = () => {
    dispatch(remove());
  };

  const dropHandler = (ingredient: ConstructorIngredient) => {
    dispatch(setIngredient(ingredient));
  };

  const [{ isOver }, dropTarget] = useDrop({
    accept: INGREDIENT_TYPE,
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: { ingredient: ConstructorIngredient }) => {
      if (bun || item.ingredient.type === 'bun') {
        dropHandler(item.ingredient);
      } else {
        alert('Сначала добавьте булку');
      }
    },
  });

  const navigate = useNavigate();

  const fetchOrderNumber = () => {
    setLoadingOrder(true);
    if (isLoggedIn && bun) {
      const ingredientsAndBunsIdsList = [bun._id, ...ingredients.flatMap(({ _id }) => _id), bun._id];
      getOrderNumber(ingredientsAndBunsIdsList, accessToken)
        .then((data: OrderData) => {
          dispatch(set(data.order.number));
        })
        .catch((error: string) => {
          console.error(error);
        })
        .finally(() => {
          dispatch(removeAllIngredients());
          setLoadingOrder(false);
        });
    } else {
      navigate(PATH_LOGIN_PAGE);
    }
  };

  const totalPrice = useMemo(() => {
    const burgerConstructorIngredients = [bun, ...ingredients.flatMap((ingredient) => ingredient), bun];
    return burgerConstructorIngredients.reduce((sum, item) => {
      if (item && item.price) {
        return sum + item.price;
      }
      return sum;
    }, 0);
  }, [bun, ingredients]);

  return (
    <section className={styles.burgerConstructor}>
      <ul className={styles.mainList} ref={dropTarget} style={isOver ? { outlineStyle: 'solid' } : undefined}>
        {loadingOrder ? (
          <>
            <h2 style={{ textAlign: 'center' }}>Ваш заказ готовится, ожидайте...</h2>
            <Spinner height={'auto'} />
          </>
        ) : (
          <>
            {!bun ? null : (
              <li className="ml-8" style={{ cursor: 'pointer' }}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </li>
            )}
            <li>
              <ul className={styles.list}>
                {ingredients.map((ingredient, index) => {
                  return (
                    <BurgerConstructorIngredient key={ingredient.uniqueId} ingredient={ingredient} index={index} />
                  );
                })}
                <div>
                  {orderNumber && (
                    <Modal onRemove={handleRemoveOrder} closeModalPath={'/'}>
                      <OrderDetails />
                    </Modal>
                  )}
                </div>
              </ul>
            </li>
            {!bun ? null : (
              <li className="ml-8" style={{ cursor: 'pointer', margin: 'auto 0 0 32px' }}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </li>
            )}
          </>
        )}
      </ul>
      <div className={styles.bottom}>
        <div className="mr-10" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="mr-2 text text_type_digits-medium">{totalPrice ? totalPrice : 0}</div>
          <div className={styles.svgWrapper}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          disabled={!bun || loadingOrder}
          onClick={fetchOrderNumber}
          htmlType="button"
          type="primary"
          size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
