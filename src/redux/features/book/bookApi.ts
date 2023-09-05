import api from "../../apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["update_book", "create_book", "delete_book"],
    }),
    getBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["create_book", "update_book", "delete_book"],
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
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;

export default bookApi;
