import React from "react";
import { useGetApplicationsByUniIdQuery } from "./redux/api/applicationApi.js";
// import { useGetSampleDataQuery } from "./redux/api/apiSlice";

export default function UniversityAdmin() {
    const {
        data: Applications,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetApplicationsByUniIdQuery("638c043031111c396dc2bad7");
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    if (isSuccess) {
        return (
            <div>
                <h1>UniversityAdmin </h1>
            </div>
        );
    }
}
