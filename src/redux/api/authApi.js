// import { decodedToken } from "@/utils/jwt";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userSignUp: build.mutation({
      query: (signupData) => ({
        url: `/users/create`,
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userForgotEmail: build.mutation({
      query: (emailData) => ({
        url: `/auth/forgot-password-otpByEmail`,
        method: "POST",
        body: emailData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    forgotPassOtp: build.mutation({
      query: (otpData) => {
        return {
          url: `/auth/forgot-password-otp-match`,
          method: "PATCH",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    forgotPassReset: build.mutation({
      query: (resetPass) => {
        return {
          url: `/auth/forgot-password-reset`,
          method: "PATCH",
          body: resetPass,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    passReset: build.mutation({
      query: (resetPass) => {
        return {
          url: `/auth/change-password`,
          method: "PATCH",
          body: resetPass,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useUserForgotEmailMutation,
  useForgotPassOtpMutation,
  useForgotPassResetMutation,
  usePassResetMutation
} = authApi;
