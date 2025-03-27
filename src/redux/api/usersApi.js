import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllusersList: build.query({
      query: ({ page, limit, filter, searchTerm }) => ({
        url: `/users/user_list`,
        method: "Get",
        params: { page, limit, filter, searchTerm },
      }),
      providesTags: [tagTypes.allUsers],
    }),

    userRatio: build.query({
      query: ({ year }) => ({
        url: `/users/user_ratio?year=${year}`,
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
      query: ({ page, limit, filter, searchTerm }) => ({
        url: `/restaurant/staff_list`,
        method: "Get",
        params: { page, limit, filter, searchTerm },
      }),
      providesTags: [tagTypes.staff],
    }),

    getAllStaffRatio: build.query({
      query: ({ year }) => {
        return {
          url: `/restaurant/restaurant_staff_ratio?year=${year}`,
          method: "Get",
        };
      },
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
      query: ({ year }) => {
        console.log("need", year);

        return {
          url: `/restaurant/restaurant_query_ratio?year=${year}`,
          method: "Get",
        };
      },
      providesTags: [tagTypes.staff],
    }),
    getRestaurentCategoryRatio: build.query({
      query: ({ year }) => ({
        url: `/restaurant/restaurant_top_category_ratio?year=${year}`,
        method: "Get",
      }),
      providesTags: [tagTypes.staff],
    }),
    getRestaurentStaffSatisfactionRatio: build.query({
      query: ({ year }) => ({
        url: `/restaurant/restaurant_staff_staisfaction_ratio?year=${year}`,
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
