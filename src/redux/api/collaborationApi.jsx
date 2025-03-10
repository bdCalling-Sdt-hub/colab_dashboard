import { baseApi } from "./baseApi";

const collaborationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollaboration: builder.query({
      query: ({ page }) => {
        return {
          url: `/collaboration/all-collaborations?page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["collaboration"],
    }),
  }),
});

export const { useGetAllCollaborationQuery } = collaborationApi;
