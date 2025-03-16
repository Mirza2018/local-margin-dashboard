import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "../getBaseUrl";
import { tagTypesList } from "../tagTypes";
import { getFromLocalStorage } from "../utils/local-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    const forgotPassToken = getFromLocalStorage("localMargin-forgetToken");
    const otpMatchToken = getFromLocalStorage("localMargin-otpMatchToken");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if (forgotPassToken) {
      headers.set("authorization", `forgotPasswordToken ${forgotPassToken}`);
    }
    if (otpMatchToken) {
      headers.set("authorization", `forgotPasswordToken ${otpMatchToken}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
