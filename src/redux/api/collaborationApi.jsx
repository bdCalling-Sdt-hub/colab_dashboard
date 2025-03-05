import { baseApi } from "./baseApi";

const collaborationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollaboration: builder.query({
      query: () => {
        return {
          url: "/collaboration/all-collaborations",
          method: "GET",
        };
      },
      providesTags: ["collaboration"],
    }),
  }),
});

export const { useGetAllCollaborationQuery } = collaborationApi;
