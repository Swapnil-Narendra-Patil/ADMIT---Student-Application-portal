import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", // optional
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/",
        prepareHeaders: headers => {
            headers.set("Access-Control-Allow-Origin", "*");
            const token = localStorage.getItem("token");
            headers.set("x-auth-token", token);
            return headers;
        },
    }),
    tagTypes: ["universities", "applications", "shortlistedUniversities"],
    endpoints: builder => ({}),
});
