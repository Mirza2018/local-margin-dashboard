import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `/profile/my_profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    profileUpdsate: build.mutation({
      query: ({ id, data }) => ({
        url: `/profile/update_profile/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery, useProfileUpdsateMutation } = profileApi;
