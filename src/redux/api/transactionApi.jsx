import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: () => {
        return {
          url: "/transaction/all-transactions",
          method: "GET",
        };
      },
      providesTags: ["transaction"],
    }),
  }),
});

export const { useGetAllTransactionQuery } = reportApi;
