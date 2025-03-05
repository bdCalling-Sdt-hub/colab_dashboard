import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReport: builder.query({
      query: () => {
        return {
          url: "/report/all-reports",
          method: "GET",
        };
      },
      providesTags: ["report"],
    }),
  }),
});

export const { useGetAllReportQuery } = reportApi;
