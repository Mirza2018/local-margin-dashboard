import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const queryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllqueryList: build.query({
      query: () => ({
        url: `/query/query_list`,
        method: "Get",
      }),
      providesTags: [tagTypes.query],
    }),

    getAllFeedbackList: build.query({
      query: () => ({
        url: `/feedback/feedback_list`,
        method: "Get",
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
      query: () => {
        return {
          url: `/feedback/feedback_statistic?year=2025`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllqueryListQuery,
  useGetAllFeedbackListQuery,
  useFeedbackActionMutation,
  useFeedbackRatioQuery
} = queryApi;
