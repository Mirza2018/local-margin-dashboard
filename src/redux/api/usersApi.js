import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllusersList: build.query({
      query: () => ({
        url: `/users/user_list`,
        method: "Get",
      }),
      providesTags: [tagTypes.allUsers],
    }),

    userRatio: build.query({
      query: () => ({
        url: `/users/user_ratio`,
        method: "GET",
      }),
      invalidatesTags: [tagTypes.allUsers],
    }),

    userAction: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/users/action/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.allUsers],
    }),

    getAllStaffList: build.query({
      query: () => ({
        url: `/restaurant/staff_list`,
        method: "Get",
      }),
      providesTags: [tagTypes.staff],
    }),

    getAllStaffRatio: build.query({
      query: () => ({
        url: `/restaurant/restaurant_staff_ratio?year=2025`,
        method: "Get",
      }),
      providesTags: [tagTypes.staff],
    }),

    staffAction: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/users/action/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.staff],
    }),

    getRestaurentQueryRatio: build.query({
      query: () => ({
        url: `/restaurant/restaurant_query_ratio?year=2025`,
        method: "Get",
      }),
      providesTags: [tagTypes.staff],
    }),
    getRestaurentCategoryRatio: build.query({
      query: () => ({
        url: `/restaurant/restaurant_top_category_ratio?year=2025`,
        method: "Get",
      }),
      providesTags: [tagTypes.staff],
    }),
    getRestaurentStaffSatisfactionRatio: build.query({
      query: () => ({
        url: `/restaurant/restaurant_staff_staisfaction_ratio?year=2025`,
        method: "Get",
      }),
      providesTags: [tagTypes.staff],
    }),
  }),
});

export const {
  useGetAllusersListQuery,
  useUserRatioQuery,
  useUserActionMutation,
  useGetAllStaffListQuery,
  useGetAllStaffRatioQuery,

  useStaffActionMutation,
  useGetRestaurentCategoryRatioQuery,
  useGetRestaurentQueryRatioQuery,
  useGetRestaurentStaffSatisfactionRatioQuery,
} = usersApi;
