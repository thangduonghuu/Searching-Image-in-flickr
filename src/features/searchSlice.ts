import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Image {
  title: string;
  media: { m: string };
  link: string;
  author: string;
  tags: string;
}

export interface DataImage {
  images: string;
  author: string;
  tag: string;
  link: string;
}

interface SearchState {
  query: string;
  results: {
    items: DataImage[];
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
    setResults: (state, action: PayloadAction<{ items: DataImage[] }>) => {
      state.results.items = action.payload.items;
    },
  },
});

export const { setQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
