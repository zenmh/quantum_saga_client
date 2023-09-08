import api from "../../apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (searchTerm) => `/books?searchTerm=${searchTerm}`,
      providesTags: [
        "update_book",
        "create_book",
        "delete_book",
        "add_review",
        "add_to_wishlist",
      ],
    }),
    getBooksWithSelectedGenre: builder.query({
      query: (genre) => `/books?genre=${genre}`,
      providesTags: [
        "update_book",
        "create_book",
        "delete_book",
        "add_review",
        "add_to_wishlist",
      ],
    }),
    getBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: [
        "create_book",
        "update_book",
        "delete_book",
        "add_review",
        "add_to_wishlist",
      ],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["create_book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["update_book"],
    }),
    deleteBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["delete_book"],
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["add_review"],
    }),
    addToWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/add_to_wishlist/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["add_to_wishlist"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBooksWithSelectedGenreQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddReviewMutation,
  useAddToWishlistMutation,
} = bookApi;

export default bookApi;
