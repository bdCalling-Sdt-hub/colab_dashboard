import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: "/user/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    getUserProfile: builder.query({
      query: () => {
        return {
          url: "/admin/auth/profile",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/auth/update-profile",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/auth/change-password",
          method: "PATCH",
          body: data,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "auth/forget-password",
          method: "POST",
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "auth/verify-reset-otp",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
    resendResetCode: builder.mutation({
      query: (data) => {
        return {
          url: "auth/resend-reset-code",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginAdminMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useResendResetCodeMutation,
} = userApi;
