import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const restaurentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRestaurant: build.query({
      query: ({ page, limit }) => ({
        url: `/restaurant/restaurant_list?page=${page}&limit=${limit}`,
        method: "Get",
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
  }),
});

export const {
  useGetAllRestaurantQuery,
  useCreateRestaurantMutation,
  useRestaurentActionMutation,
} = restaurentApi;
