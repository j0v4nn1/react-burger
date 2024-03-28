import { useState, useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { useAppSelector } from '../../types/hooks';
import { Ingredient } from '../burger-ingredient/burger-ingredient.types';

const BurgerIngredients = () => {
  const ingredients = useAppSelector((store) => store.burgerIngredients.ingredients);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState('bun');

  useEffect(() => {
    const scrollNode = scrollRef.current;
    if (scrollNode) {
      scrollNode.addEventListener('scroll', scrollHandler);
    }
    return () => {
      if (scrollNode) {
        scrollNode.removeEventListener('scroll', scrollHandler);
      }
    };
  }, []);

  const scrollHandler = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollTop < 294) {
        setCurrent('bun');
      } else if (scrollRef.current.scrollTop < 876) {
        setCurrent('sauce');
      } else {
        setCurrent('main');
      }
    }
  };

  const buns = ingredients.map((ingredient: Ingredient) => {
    if (ingredient.type === 'bun') {
      return <BurgerIngredient key={ingredient._id} ingredient={ingredient} className={styles.item} />;
    } else {
      return null;
    }
  });

  const sauces = ingredients.map((ingredient: Ingredient) => {
    if (ingredient.type === 'sauce') {
      return <BurgerIngredient key={ingredient._id} ingredient={ingredient} className={styles.item} />;
    } else {
      return null;
    }
  });

  const cutlets = ingredients.map((ingredient: Ingredient) => {
    if (ingredient.type === 'main') {
      return <BurgerIngredient key={ingredient._id} ingredient={ingredient} className={styles.item} />;
    } else {
      return null;
    }
  });

  return (
    <section className={`${styles.ingredients} text text_type_main-default`}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <ul className={'mt-5'} style={{ display: 'flex', padding: 0, listStyle: 'none' }}>
        <li>
          <a href={'#buns'} className={styles.link}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href={'#sauce'} className={styles.link}>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href={'#main'} className={styles.link}>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <div ref={scrollRef} style={{ scrollBehavior: 'smooth' }} className={styles.wrapper}>
        <h2 id="buns" className={'text text_type_main-medium'}>
          Булки
        </h2>
        <ul className={styles.list}>{buns}</ul>
        <h2 id="sauce" className={'text text_type_main-medium'}>
          Соусы
        </h2>
        <ul className={styles.list}>{sauces}</ul>
        <h2 id="main" className={'text text_type_main-medium'}>
          Начинки
        </h2>
        <ul className={styles.list}>{cutlets}</ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
