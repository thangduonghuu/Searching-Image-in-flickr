import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Image {
  title: string;
  media: { m: string };
  link: string;
  author: string;
  tags: string;
}

interface SearchState {
  query: string;
  results: {
    items: Image[];
  };
}

const initialState: SearchState = {
  query: "",
  results: {
    items: [],
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchState>) => {
      state.results = action.payload;
    },
  },
});

export const { setQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
