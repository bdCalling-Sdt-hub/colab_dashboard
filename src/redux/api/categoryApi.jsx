import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `category/all-categories`,
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
