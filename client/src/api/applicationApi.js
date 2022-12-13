import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice.js";

export const applicationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET /applications/?studentId=studentId
        getApplicationsByStudentId: builder.query({
            query: studentId => `applications/?studentId=${studentId}`,
            providesTags: ["Applications"],
            refetchOnWindowFocus: true,
        }),
    }),
});

export const { useGetApplicationsByStudentIdQuery } = applicationApiSlice;
