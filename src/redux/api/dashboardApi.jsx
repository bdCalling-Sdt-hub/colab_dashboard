import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Dashboard chart api */
    getUserChartData: builder.query({
      query: (year) => {
        return {
          url: `/meta/user-chart-data?year=${year}`,
          method: "GET",
        };
      },
    }),
    getSubscriptionChartData: builder.query({
      query: (year) => {
        return {
          url: `/meta/subscription-chart-data?year=${year}`,
          method: "GET",
        };
      },
    }),
    getDashboardData: builder.query({
      query: () => {
        return {
          url: "/meta/get-dashboard-meta-data",
          method: "GET",
        };
      },
    }),

    /** Category Api */
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

    /** dashboard banner api  */
    getBanner: builder.query({
      query: () => {
        return {
          url: "/dashboard/get-banner",
          method: "GET",
        };
      },
      providesTags: ["banner"],
    }),

    createBanner: builder.mutation({
      query: (formData) => {
        return {
          url: "/dashboard/create-banner",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => {
        return {
          url: `/dashboard/delete-banner/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["banner"],
    }),
    /** Notification  */
    getNotification: builder.query({
      query: () => {
        return {
          url: "/notification/get-all-notification",
          method: "GET",
        };
      },
    }),
    deleteNotification: builder.mutation({
      query: (id) => {
        return {
          url: `notification/delete-notification/${id}`,
          method: "DELETE",
        };
      },
    }),
    /** User management */
    getAllUsers: builder.query({
      query: ({ searchParams, limit, isPremium }) => {
        const params = new URLSearchParams();
        if (searchParams) params.append("searchTerm", searchParams);
        if (limit) params.append("limit", limit);
        if (isPremium !== null && isPremium !== undefined) {
          params.append("isPremium", isPremium);
        }
        return {
          url: `/normal-user/get-all-user-for-admin?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["userManagement"],
    }),
    blockUnblockUser: builder.mutation({
      query: (data) => {
        return {
          url: `user/change-status/${data?.id}`,
          method: "PATCH",
          body: { status: data?.status },
        };
      },
      invalidatesTags: ["userManagement"],
    }),

    /** setting api */
    createAboutUs: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/about-us",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["about"],
    }),
    getAboutUs: builder.query({
      query: () => {
        return {
          url: "/manage/about-us",
          method: "GET",
        };
      },
      providesTags: ["about"],
    }),
    createTipsTricks: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/tips-and-tricks",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["tipsTricks"],
    }),
    getTipsTricks: builder.query({
      query: () => {
        return {
          url: "/manage/tips-and-tricks",
          method: "GET",
        };
      },
      providesTags: ["tipsTricks"],
    }),
    getAccessibility: builder.query({
      query: () => {
        return {
          url: "/manage/accessibility",
          method: "GET",
        };
      },
      providesTags: ["accessibility"],
    }),
    createAccessibility: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/accessibility",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["accessibility"],
    }),
    getHelp: builder.query({
      query: () => {
        return {
          url: "manage/get-help",
          method: "GET",
        };
      },
      providesTags: ["help"],
    }),
    createHelp: builder.mutation({
      query: (data) => {
        return {
          url: "manage/create-help",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["help"],
    }),
    getContact: builder.query({
      query: () => {
        return {
          url: "manage/get-contact-us",
          method: "GET",
        };
      },
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: (data) => {
        return {
          url: "manage/add-contact-us",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["contact"],
    }),
    getTermsAndCondition: builder.query({
      query: () => {
        return {
          url: "/manage/get-terms-conditions",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),
    createTermsAndCondition: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-terms-conditions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          url: "/manage/get-privacy-policy",
          method: "GET",
        };
      },
      providesTags: ["privacyPolicy"],
    }),
    createPrivacyPolicy: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-privacy-policy",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["privacyPolicy"],
    }),
    createFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-faq",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["faq"],
    }),
    getFaq: builder.query({
      query: () => {
        return {
          url: "/manage/all-faq",
          method: "GET",
        };
      },
      providesTags: ["faq"],
    }),

    /** read notification api */
    readNotification: builder.mutation({
      query: () => ({
        url: `/notification/see-notification`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["notification"],
    }),
    /** transaction api */
    getTransaction: builder.query({
      query: ({ searchParams, page, limit }) => {
        return {
          url: `/transaction/get-all-transaction?searchTerm=${searchParams}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),

    /** Change order status */
    changeOrderStatus: builder.mutation({
      query: ({ orderId, status }) => {
        return {
          url: `/order/change-order-status/${orderId}`,
          method: "PATCH",
          body: status,
        };
      },
      invalidatesTags: ["orderStatus", "financialManagement"],
    }),
    financialManagement: builder.query({
      query: ({ applied, page }) => {
        return {
          url: `/order/get-all-orders?isApproved=${applied}&page=${page}&orderType=FINANCE`,
          method: "GET",
        };
      },
      providesTags: ["financialManagement"],
    }),
    approveFinancialOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order/approve-finance-order/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["financialManagement"],
    }),
    declineFinancialOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order/decline-finance-order/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["financialManagement"],
    }),
    sentPaymentLink: builder.mutation({
      query: ({ id, paymentLink }) => {
        return {
          url: `/order/send-payment-link/${id}`,
          method: "PATCH",
          body: paymentLink,
        };
      },
      invalidatesTags: ["financialManagement"],
    }),
    sendCredits: builder.mutation({
      query: ({ id, creditAmount }) => {
        return {
          url: `/dashboard/send-credit/${id}`,
          method: "POST",
          body: creditAmount,
        };
      },
    }),
    makePaid: builder.mutation({
      query: (id) => {
        return {
          url: `/order/make-paid/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["financialManagement"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetUserChartDataQuery,
  useGetSubscriptionChartDataQuery,
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetBannerQuery,
  useGetNotificationQuery,
  useGetAllUsersQuery,
  useBlockUnblockUserMutation,
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useCreateTipsTricksMutation,
  useGetTipsTricksQuery,
  useCreateAccessibilityMutation,
  useGetAccessibilityQuery,
  useCreateTermsAndConditionMutation,
  useGetTermsAndConditionQuery,
  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useCreateFaqMutation,
  useGetFaqQuery,
  useReadNotificationMutation,
  useGetTransactionQuery,
  useChangeOrderStatusMutation,
  useDeleteNotificationMutation,
  useFinancialManagementQuery,
  useApproveFinancialOrderMutation,
  useDeclineFinancialOrderMutation,
  useSentPaymentLinkMutation,
  useSendCreditsMutation,
  useMakePaidMutation,
  useCreateHelpMutation,
  useGetHelpQuery,
  useCreateContactMutation,
  useGetContactQuery,
} = dashboardApi;
