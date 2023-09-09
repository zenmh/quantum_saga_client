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
        "remove_from_wishlist",
        "add_to_read_soon",
        "add_to_currently_reading",
        "add_to_finished",
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
        "remove_from_wishlist",
        "add_to_read_soon",
        "add_to_currently_reading",
        "add_to_finished",
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
        "remove_from_wishlist",
        "add_to_read_soon",
        "add_to_currently_reading",
        "add_to_finished",
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
    removeFromWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/remove_from_wishlist/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["remove_from_wishlist"],
    }),
    addToReadSoon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/add_to_read_soon/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["add_to_read_soon"],
    }),
    addToCurrentlyReading: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/add_to_currently_reading/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["add_to_currently_reading"],
    }),
    addToFinished: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/add_to_finished/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["add_to_finished"],
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
  useRemoveFromWishlistMutation,
  useAddToReadSoonMutation,
  useAddToCurrentlyReadingMutation,
  useAddToFinishedMutation,
} = bookApi;

export default bookApi;
