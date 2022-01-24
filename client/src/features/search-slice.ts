import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchApi } from '@api/search';
import { slowLoading } from '@helpers/helpers';
import {
  isSomeAsyncActionsFulfilled,
  isSomeAsyncActionsPending,
  isSomeAsyncActionsRejected,
} from '@helpers/action-slice';
import { RECIPES_BY_TYPE } from '@config/recipe';
import { MINIMUM_SEARCH_DELAY } from '@config/constants';

interface SearchState {
  results: any;
  loading: boolean;
  outOfResults: boolean;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  outOfResults: false,
};

export const searchRecipesByTitle = createAsyncThunk(
  'search/recipes/title',
  async (title, { rejectWithValue, getState }) => {
    try {
      await slowLoading(MINIMUM_SEARCH_DELAY);
      const state: any = getState();
      const totalSearchResults = state.search.results.length;
      const response = await searchApi.getRecipesByTitle(
        title,
        totalSearchResults
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchRecipesByIngredient = createAsyncThunk(
  'search/recipes/ingredient',
  async (ingredient, { rejectWithValue, getState }) => {
    try {
      await slowLoading(MINIMUM_SEARCH_DELAY);
      const state: any = getState();
      const totalSearchResults = state.search.results.length;
      const response = await searchApi.getRecipesByIngredient(
        ingredient,
        totalSearchResults
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchUsersByNameOrEmail = createAsyncThunk(
  'search/users',
  async (user, { rejectWithValue, getState }) => {
    try {
      await slowLoading(MINIMUM_SEARCH_DELAY);
      const state: any = getState();
      const totalSearchResults = state.search.results.length;
      const response = await searchApi.getUsersByNameOrEmail(
        user,
        totalSearchResults
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isSearchPending = isSomeAsyncActionsPending([
  searchRecipesByTitle,
  searchRecipesByIngredient,
  searchUsersByNameOrEmail,
]);
const isSearchFulfilled = isSomeAsyncActionsFulfilled([
  searchRecipesByTitle,
  searchRecipesByIngredient,
  searchUsersByNameOrEmail,
]);
const isSearchReject = isSomeAsyncActionsRejected([
  searchRecipesByTitle,
  searchRecipesByIngredient,
  searchUsersByNameOrEmail,
]);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.outOfResults = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isSearchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(isSearchFulfilled, (state, action) => {
      const searchResults = action.payload.map((result) => ({
        ...result,
        type: RECIPES_BY_TYPE.OTHER,
      }));

      if (searchResults.length) {
        state.results = [...state.results, ...searchResults];
      } else {
        state.outOfResults = true;
      }
      state.loading = false;
    });
    builder.addMatcher(isSearchReject, (state) => {
      state.loading = false;
    });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;