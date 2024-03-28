import styles from '../burger-constructor-ingredient/burger-constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { reOrder, removeIngredient } from '../../services/slices/burger-constructor/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';
import { BURGER_CONSRTUCTOR_INGREDIENT_TYPE } from '../../constants';
import { useRef } from 'react';
import { BurgerConstructorComponent, DragItem } from './burger-constructor-ingredient.types';
import { useAppDispatch } from '../../types/hooks';
import type { Identifier } from 'dnd-core';

const BurgerConstructorIngredient: React.FC<BurgerConstructorComponent> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const handleRemoveIngredient = () => {
    dispatch(removeIngredient(ingredient.uniqueId));
  };

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: BURGER_CONSRTUCTOR_INGREDIENT_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      dispatch(
        reOrder({
          dragIndex,
          hoverIndex,
        })
      );
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: BURGER_CONSRTUCTOR_INGREDIENT_TYPE,
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li style={{ opacity }} data-handler-id={handlerId} ref={ref} className={styles.item}>
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleRemoveIngredient}
      />
    </li>
  );
};

export default BurgerConstructorIngredient;
