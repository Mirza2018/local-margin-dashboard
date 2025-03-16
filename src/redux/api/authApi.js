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
        url: `/auth/forgot_password`,
        method: "POST",
        body: emailData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    forgotPassOtp: build.mutation({
      query: (otpData) => {
        return {
          url: `/auth/verify_otp`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    forgotPassReset: build.mutation({
      query: (resetPass) => {
        return {
          url: `/auth/reset_password`,
          method: "POST",
          body: resetPass,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    passReset: build.mutation({
      query: (resetPass) => {
        return {
          url: `/auth/change_password`,
          method: "POST",
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
