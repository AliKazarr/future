import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "./aiSlice"; // SÜSLÜ PARANTEZ YOK!
import predictionReducer from "./predictionSlice";

export const store = configureStore({
  reducer: {
    ai: aiReducer,
    predictions: predictionReducer,
  },
});
