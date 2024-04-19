import { configureStore } from "@reduxjs/toolkit";

// REDUCERS
import Articles from "./reducers/article.reducer";


export default configureStore({
  reducer: {
    article: Articles
  },
});
