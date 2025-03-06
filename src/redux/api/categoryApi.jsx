import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `category/all-categories`,
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (formData) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/delete-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
