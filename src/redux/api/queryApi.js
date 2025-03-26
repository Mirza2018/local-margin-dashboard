import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const queryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllqueryList: build.query({
      query: ({ page, limit, searchTerm, filter }) => ({
        url: `/query/query_list`,
        method: "Get",
        params: { page, limit, searchTerm, filter },
      }),
      providesTags: [tagTypes.query],
    }),

    getAllFeedbackList: build.query({
      query: ({ page, limit, searchTerm, filter }) => ({
        url: `/feedback/feedback_list`,
        method: "Get",
        params: { page, limit, searchTerm, filter },
      }),
      providesTags: [tagTypes.feedback],
    }),

    feedbackAction: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/feedback/action/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.feedback],
    }),

    feedbackRatio: build.query({
      query: ({year}) => {
        return {
          url: `/feedback/feedback_statistic`,
          method: "GET",
          params:{year}
        };
      },
    }),
  }),
});

export const {
  useGetAllqueryListQuery,
  useGetAllFeedbackListQuery,
  useFeedbackActionMutation,
  useFeedbackRatioQuery,
} = queryApi;
