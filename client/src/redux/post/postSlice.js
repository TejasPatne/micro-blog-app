import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: false,
  loading: false,
  page: 1,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsStart: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = false;
      state.page = state.page + 1;
    },
    getPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostStart: (state) => {
      state.loading = true;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOnePost: (state, action) => {
        // remove the post that was deleled and whose id is returned in action.payload
        state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    likePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload) {
          return {
            ...post,
            likes: [...post.likes, action.payload],
          };
        }
        return post;
      });
    },
  }
});

export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  deleteOnePost,
  likePost
} = postSlice.actions;
export default postSlice.reducer;
