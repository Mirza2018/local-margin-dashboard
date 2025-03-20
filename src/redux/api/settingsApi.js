import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    privacyTerms: build.mutation({
      query: (privacy) => ({
        url: `/static_content/create`,
        method: "POST",
        body: privacy,
      }),
      invalidatesTags: [tagTypes.privacy],
    }),
  }),
}); 

export const { usePrivacyTermsMutation } = settingsApi;
