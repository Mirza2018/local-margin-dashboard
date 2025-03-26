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
      invalidatesTags: [tagTypes.privacy, tagTypes.faq],
    }),
    getFaq: build.query({
      query: () => ({
        url: `/static_content?type=faq`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),
  }),
});

export const { usePrivacyTermsMutation,useGetFaqQuery } = settingsApi;
