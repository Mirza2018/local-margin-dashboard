import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const restaurentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRestaurant: build.query({
      query: ({ page, limit, filter, searchTerm }) => ({
        url: `/restaurant/restaurant_list`,
        method: "Get",
        params: { page, limit, filter, searchTerm },
      }),
      providesTags: [tagTypes.restaurent],
    }),

    createRestaurant: build.mutation({
      query: (restaurantData) => ({
        url: "/restaurant/create",
        method: "Post",
        body: restaurantData,
      }),
      providesTags: [tagTypes.restaurent],
    }),

    restaurentAction: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/users/action/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.restaurent],
    }),

    getRestaurantCount: build.query({
      query: () => ({
        url: `/restaurant/total_count`,
        method: "Get",
      }),
      providesTags: [tagTypes.restaurent],
    }),
  }),
});

export const {
  useGetAllRestaurantQuery,
  useCreateRestaurantMutation,
  useRestaurentActionMutation,
  useGetRestaurantCountQuery,
} = restaurentApi;
