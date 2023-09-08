import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: () => ({}),
  tagTypes: [
    "create_book",
    "update_book",
    "delete_book",
    "add_review",
    "add_to_wishlist",
  ],
});

export default api;
