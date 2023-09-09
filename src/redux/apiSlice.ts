import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: [
    "create_book",
    "update_book",
    "delete_book",
    "add_review",
    "add_to_wishlist",
    "remove_from_wishlist",
    "add_to_read_soon",
    "add_to_currently_reading",
    "add_to_finished",
  ],
});

export default api;
