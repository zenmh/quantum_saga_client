import api from "../../apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
        body: null,
      }),
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
