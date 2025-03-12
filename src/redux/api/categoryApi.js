import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllcategoryList: build.query({
      query: () => ({
        url: `/category/all`,
        method: "Get",
      }),
      providesTags: [tagTypes.categorys],
    }),

    createCtegory: build.mutation({
      query: (category) => ({
        url: `/category/create`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: [tagTypes.categorys],
    }),
  }),
});

export const { useGetAllcategoryListQuery, useCreateCtegoryMutation } =
  categoryApi;
