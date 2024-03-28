import styles from './burger-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { set } from '../../services/slices/ingredient-details/ingredient-details';
import { Link } from 'react-router-dom';
import { INGREDIENT_TYPE } from '../../constants';
import { BurgerIngredientComponent } from './burger-ingredient.types';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const BurgerIngredient: React.FC<BurgerIngredientComponent> = ({ ingredient }) => {
  const dispatch = useAppDispatch();

  const { _id, name, image, price } = ingredient;

  const [{ isDragging }, dragRef] = useDrag({
    type: INGREDIENT_TYPE,

    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { bun, ingredients } = useAppSelector((store) => store.burgerConstructor);

  const handleOpenIngredientDetails = () => {
    dispatch(set(ingredient));
  };

  const countIngredient = useMemo(() => {
    const burgerConstructorIngredients = [bun, ...ingredients.flatMap((ingredient) => ingredient), bun];
    return burgerConstructorIngredients.reduce((sum, el) => {
      if (!el) {
        return sum;
      }
      if (el._id === _id) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  }, [bun, ingredients, _id]);

  return (
    <li
      onClick={handleOpenIngredientDetails}
      style={isDragging ? { backgroundColor: 'var(--colors-interface-accent)' } : undefined}
      ref={dragRef}
      className={styles.item}>
      <Link className={styles.link} to={`/ingredients/${_id}`}>
        {countIngredient > 0 ? <Counter count={countIngredient} size="default" extraClass="m-1" /> : null}

        <img className={styles.image} src={image} alt={name} />
        <div style={{ display: 'flex' }}>
          <p className={'text text_type_digits-default pb-1 pr-2'}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p style={{ textAlign: 'center', paddingBottom: 24 }} className={'text text_type_main-default'}>
          {name}
        </p>
      </Link>
    </li>
  );
};

export default BurgerIngredient;
