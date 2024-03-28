import styles from './order-ingredients-image-list.module.css';
import { filterIngredients } from '../../utils/utils';
import { useAppSelector } from '../../types/hooks';
import React from 'react';
import { OrderIngredientsImageListComponent } from './order-ingredients-image-list.types';

const OrderIngredientsImageList: React.FC<OrderIngredientsImageListComponent> = ({ order }) => {
  const burgerIngredients = useAppSelector((store) => store.burgerIngredients.ingredients);
  const { ingredients } = order;

  const flattedIngredients = filterIngredients(ingredients, burgerIngredients);

  const sortedIngredients = flattedIngredients.map((ingredient, index) => {
    return (
      index <= 5 && (
        <li
          key={ingredient._id.concat(index.toString())}
          style={{ zIndex: ingredients.length - index }}
          className={styles['order__images-item']}>
          <img
            className={styles['order__image']}
            style={
              index >= 5 && flattedIngredients.length > 6 ? { opacity: '.6', backgroundColor: '#1C1C21' } : undefined
            }
            src={ingredient.image}
            alt={ingredient.name}
          />
          {index >= 5 && flattedIngredients.length > 6 ? (
            <div className={`text text_type_digits-default ${styles['order__image-invisible-ingredients-counter']}`}>
              +{flattedIngredients.length - 6}
            </div>
          ) : null}
        </li>
      )
    );
  });
  return <>{sortedIngredients}</>;
};

export default OrderIngredientsImageList;
