import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState = {
  data: [],
  loading: null,
  error: false
} 

export const Articles = createSlice({
  name: "Articles",
  initialState,
  reducers: {
    FETCH_ARTICLE_START: (store) => {
      store.loading = true
    }, 
    FETCH_ARTICLE_SUCCES: (store, actions ) => {
      store.loading = false
      store.data = actions.payload
    },
    FETCH_ARTICLE_SUCCES_DETAIL:  (store , actions ) => {
      store.loading = false      
      store.data = actions.payload
    },
    FETCH_ARTICLE_FAILURE: (store) => {
      store.loading = false
      store.error = true
    }
  }
})

export const {
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_SUCCES,
  FETCH_ARTICLE_SUCCES_DETAIL,
  FETCH_ARTICLE_FAILURE
} = Articles.actions

export default Articles.reducer
