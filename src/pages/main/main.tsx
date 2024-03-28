import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import { Route, Routes } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { remove } from '../../services/slices/ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { PATH_CONSTRUCTOR_PAGE, PATH_INGREDIENTS_ID } from '../../constants';

const Main = () => {
  const dispatch = useAppDispatch();
  const ingredientsFailed = useAppSelector((state) => state.burgerIngredients.ingredientsFailed);

  const handleCloseIngredientDetails = () => {
    dispatch(remove());
  };

  return ingredientsFailed ? (
    <h1>Что-то пошло не так, перезагрузите страницу или зайдите на страницу попозже</h1>
  ) : (
    <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
      <Routes>
        <Route
          path={PATH_INGREDIENTS_ID}
          element={
            <Modal onRemove={handleCloseIngredientDetails} closeModalPath={PATH_CONSTRUCTOR_PAGE}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};

export default Main;
