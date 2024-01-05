import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddItemPayload } from './libs/types/types';
import { SliceName } from '../libs/enums/enums';
import { useLocalStorage } from 'libs/hooks/hooks';

type State = {
  items: AddItemPayload[];
  quantity: number;
  totalPrice: number;
};

const initialState: State = {
  items: [],
  quantity: 0,
  totalPrice: 0,
};

const { getItem, setItem } = useLocalStorage<State>(
  SliceName.SHOPPING_CART,
  initialState,
);

const addItem: CaseReducer<State, PayloadAction<AddItemPayload>> = (
  state,
  action,
) => {
  const newItem = action.payload;
  state.items.push(newItem);
  state.quantity++;
  state.totalPrice += newItem.price;

  setItem(state);
};

const removeItem: CaseReducer<State, PayloadAction<string>> = (
  state,
  action,
) => {
  const itemId = action.payload;
  const itemToRemove = state.items.find(item => item.id === itemId);
  if (itemToRemove) {
    state.items = state.items.filter(item => item.id !== itemId);
    state.quantity--;
    state.totalPrice -= itemToRemove.price;
    setItem(state);
  }
};

const clearCart: CaseReducer<State> = () => {
  setItem(initialState);

  return initialState;
};

const { reducer, actions, name } = createSlice({
  name: SliceName.SHOPPING_CART,
  initialState: { ...initialState, ...getItem() },
  reducers: {
    addItem,
    removeItem,
    clearCart,
  },
});

export { actions, name, reducer };
