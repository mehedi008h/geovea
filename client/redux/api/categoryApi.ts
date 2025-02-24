import { CategoryI } from "@/@types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/v1",
    }),
    tagTypes: ["Category"],
    endpoints: (build) => ({
        addCategory: build.mutation<CategoryI, Partial<CategoryI>>({
            query: (body) => ({
                url: `category`,
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Category", id: "LIST" }],
        }),
    }),
});

export const { useAddCategoryMutation } = categoryApi;
