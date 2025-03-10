import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReport: builder.query({
      query: ({ page }) => {
        return {
          url: `/report/all-reports?page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["report"],
    }),
  }),
});

export const { useGetAllReportQuery } = reportApi;
