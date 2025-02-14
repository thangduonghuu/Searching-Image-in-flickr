import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Photo {
  title: string;
  link: string;
  media: { m: string };
  author: string;
  tags: string;
}

interface SearchState {
  photos: Photo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SearchState = {
  photos: [],
  status: "idle",
  error: null,
};

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const FLICKR_API_URL =
  "https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=";

export const fetchPhotos = createAsyncThunk<Photo[], string>(
  "search/fetchPhotos",
  async (searchTerm) => {
    const response = await axios.get(`${FLICKR_API_URL}${searchTerm}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.items;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPhotos.fulfilled,
        (state, action: PayloadAction<Photo[]>) => {
          state.status = "succeeded";
          state.photos = action.payload;
        }
      )
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default searchSlice.reducer;
