import {useState} from "react";
import PropTypes from "prop-types";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";

const BurgerIngredients = ({data}) => {

  const [selectedIngredientId, setSelectedIngredientId] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [current, setCurrent] = useState("bun");

  function changeModalContent(modalElement) {
    setModalContent(modalElement)
  }

  const buns = data.map((bun) => {
    if (bun.type === "bun") {
      return (
        <li
          key={bun._id}
          className={styles.item}
          onClick={() => {
            setIsVisibleModal(true);
            setSelectedIngredientId(bun._id);
            changeModalContent('ingredient-details')
          }}
        >
          <Counter count={1} size="default" extraClass="m-1"/>
          <img className={styles.image} src={bun.image} alt={bun.name}/>
          <div style={{display: "flex"}}>
            <p className={"text text_type_digits-default pb-1 pr-2"}>
              {bun.price}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
          <p
            style={{textAlign: "center", paddingBottom: 24}}
            className={"text text_type_main-default"}
          >
            {bun.name}
          </p>
        </li>
      );
    }
    return null
  });
  const sauces = data.map((sauce) => {
    if (sauce.type === "sauce") {
      return (
        <li
          key={sauce._id}
          className={styles.item}
          onClick={() => {
            setIsVisibleModal(true);
            setSelectedIngredientId(sauce._id);
            changeModalContent('ingredient-details')
          }}
        >
          <Counter count={1} size="default" extraClass="m-1"/>
          <img className={styles.image} src={sauce.image} alt={sauce.name}/>
          <div style={{display: "flex"}}>
            <p className={"text text_type_digits-default pb-1 pr-2"}>
              {sauce.price}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
          <p
            style={{textAlign: "center", paddingBottom: 24}}
            className={"text text_type_main-default"}
          >
            {sauce.name}
          </p>
        </li>
      );
    }
    return null
  });
  const cutlets = data.map((cutlet) => {
    if (cutlet.type === "main") {
      return (
        <li
          key={cutlet._id}
          className={styles.item}
          onClick={() => {
            setIsVisibleModal(true);
            setSelectedIngredientId(cutlet._id);
            changeModalContent('ingredient-details')
          }}
        >
          <Counter count={1} size="default" extraClass="m-1"/>
          <img className={styles.image} src={cutlet.image} alt={cutlet.name}/>
          <div style={{display: "flex"}}>
            <p className={"text text_type_digits-default pb-1 pr-2"}>
              {cutlet.price}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
          <p
            style={{textAlign: "center", paddingBottom: 24}}
            className={"text text_type_main-default"}
          >
            {cutlet.name}
          </p>
        </li>
      );
    }
    return null
  });

  return (
    <section className={`${styles.ingredients} text text_type_main-default`}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <ul
        className={"mt-5"}
        style={{display: "flex", padding: 0, listStyle: "none"}}
      >
        <li>
          <a href={"#buns"} className={styles.link}>
            <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href={"#sauce"} className={styles.link}>
            <Tab
              value="sauce"
              active={current === "sauce"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href={"#main"} className={styles.link}>
            <Tab value="main" active={current === "main"} onClick={setCurrent}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <div style={{scrollBehavior: "smooth"}} className={styles.wrapper}>
        <h2 id="buns" className={"text text_type_main-medium"}>
          Булки
        </h2>
        <ul className={styles.list}>{buns}</ul>
        <h2 id="sauce" className={"text text_type_main-medium"}>
          Соусы
        </h2>
        <ul className={styles.list}>{sauces}</ul>
        <h2 id="main" className={"text text_type_main-medium"}>
          Начинки
        </h2>
        <ul className={styles.list}>{cutlets}</ul>
        <ModalOverlay onClose={() => {setIsVisibleModal(false)}} isVisibleModal={isVisibleModal}>
          <Modal data={data}
                 selectedIngredientId={selectedIngredientId}
                 modalContent={modalContent}
                 onClose={() => {
                   setIsVisibleModal(false)
                 }}/>
        </ModalOverlay>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerIngredients;
