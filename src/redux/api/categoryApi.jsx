import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => {
        return {
          url: "/category/all-categories",
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = reportApi;
