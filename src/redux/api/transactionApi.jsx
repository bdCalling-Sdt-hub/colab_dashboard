import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: ({ searchParams, limit, page, transactionType }) => {
        const params = new URLSearchParams();
        if (searchParams) params.append("searchTerm", searchParams);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (transactionType !== null && transactionType !== undefined) {
          params.append("type", transactionType);
        }
        return {
          url: `/transaction/all-transactions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["transaction"],
    }),
  }),
});

export const { useGetAllTransactionQuery } = reportApi;
