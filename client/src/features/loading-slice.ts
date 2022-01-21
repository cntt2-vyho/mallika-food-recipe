import { createSlice } from '@reduxjs/toolkit';
import { capitalizeFirstLetter } from '@helpers/helpers';
import {
  isSomeAsyncActionsFulfilled,
  isSomeAsyncActionsPending,
  isSomeAsyncActionsRejected,
} from '@helpers/action-slice';
import { createRecipe, getFeaturedRecipes, getMyRecipes } from './recipe-slice';

const initialState = {
  featuredRecipesLoading: false,
  myRecipesLoading: false,
};

const isFeaturedRecipesPending = isSomeAsyncActionsPending([
  getFeaturedRecipes,
]);
const isFeaturedRecipesFulfilled = isSomeAsyncActionsFulfilled([
  getFeaturedRecipes,
]);
const isFeaturedRecipesReject = isSomeAsyncActionsRejected([
  getFeaturedRecipes,
]);

const isMyRecipesPending = isSomeAsyncActionsPending([
  createRecipe,
  getMyRecipes,
]);
const isMyRecipesFulfilled = isSomeAsyncActionsFulfilled([
  createRecipe,
  getMyRecipes,
]);
const isMyRecipesReject = isSomeAsyncActionsRejected([
  createRecipe,
  getMyRecipes,
]);

const reducersCreator = (initialState) => {
  const reducersObj = {};

  Object.keys(initialState).forEach((key) => {
    const capitalizeKey = capitalizeFirstLetter(key);

    reducersObj[`set${capitalizeKey}`] = (state, action) => {
      state[key] = action.payload;
    };

    reducersObj[`toggle${capitalizeKey}`] = (state, action) => {
      state[key] = action.payload;
    };
  });

  return reducersObj;
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: reducersCreator(initialState),
  extraReducers: (builder) => {
    builder.addMatcher(isFeaturedRecipesPending, (state) => {
      state.featuredRecipesLoading = true;
    });
    builder.addMatcher(isFeaturedRecipesFulfilled, (state) => {
      state.featuredRecipesLoading = false;
    });
    builder.addMatcher(isFeaturedRecipesReject, (state) => {
      state.featuredRecipesLoading = false;
    });

    builder.addMatcher(isMyRecipesPending, (state) => {
      state.myRecipesLoading = true;
    });
    builder.addMatcher(isMyRecipesFulfilled, (state) => {
      state.myRecipesLoading = false;
    });
    builder.addMatcher(isMyRecipesReject, (state) => {
      state.myRecipesLoading = false;
    });
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
