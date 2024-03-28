import { setAccessToken, setProfileName, setProfileEmail, setIsLoggedIn } from '../services/slices/profile/profile';
import { Ingredient } from '../components/burger-ingredient/burger-ingredient.types';
import { AuthData } from '../types';

export const setAuthData: AuthData = (dispatch, refreshToken, accessToken, name, email) => {
  localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
  dispatch(setAccessToken(accessToken));
  dispatch(setProfileName(name));
  dispatch(setProfileEmail(email));
  dispatch(setIsLoggedIn(true));
};

export const filterIngredients = (ingredients: string[], burgerIngredients: Ingredient[]) => {
  return ingredients
    .map((id) => {
      return burgerIngredients.filter(({ _id }) => {
        return id === _id;
      });
    })
    .flat(2)
    .filter((ingredient, index, array) => {
      return !index || !array.slice(0, index).some((prevItem) => prevItem._id === ingredient._id);
    });
};

export const countTotalPrice = (ingredients: string[], burgerIngredients: Ingredient[]): number => {
  return ingredients
    .map((id) => {
      return burgerIngredients.filter(({ _id }) => {
        return id === _id;
      });
    })
    .flat(2)
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price;
    }, 0);
};
