import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice.js";

export const uniApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET /universities
        getUniversities: builder.query({
            query: () => "universities",
            providesTags: ["Universities"],
        }),
        getUniversitiesByIds: builder.query({
            query: (ids, refreshUpdate) => {
                // convert array of ids to a string of individual ids separated by commas
                const idsString = "ids[]=" + ids.join("&ids[]=");
                console.log(idsString);
                return `universities/?${idsString}`;
            },
            providesTags: ["UniversitiesShortList"],
        }),
        // GET /universities/:id
        getUniversityById: builder.query({
            query: id => `/universities/${id}`,
        }),
    }),
});

export const {
    useGetUniversitiesQuery,
    useGetUniversitiesByIdsQuery,
    useGetUniversityByIdQuery,
} = uniApiSlice;
