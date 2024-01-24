import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetailsAsync = createAsyncThunk(
  "search/getProductDetailsAsync",
  async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/items/${productId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const searchAsync = createAsyncThunk(
  "search/searchAsync",
  async (query) => {
    try {
      const response = await axios.get("http://localhost:3000/api/items", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
    productDetails: {},
    generalCategories: [],
    specificCategories: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.items;
        state.generalCategories = action.payload.categories;

      })
      .addCase(searchAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newProduct = action.payload.item;
        state.productDetails[newProduct.id] = newProduct;
        state.specificCategories = action.payload.categories;
      })
      .addCase(getProductDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
