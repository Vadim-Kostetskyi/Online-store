import { name as shoppingCartName } from './shopping-cart.slice';
import { type RootState } from '../../store';

export const selectQuantity = (state: RootState): number =>
  state[shoppingCartName].quantity;
