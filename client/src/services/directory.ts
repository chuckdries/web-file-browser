import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FileObject } from "./directoryTypes";

// Define a service using a base URL and expected endpoints
export const directoryApi = createApi({
  reducerPath: "directoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getDirectory: builder.query<FileObject[], string>({
      query: (path) => `directory/?path=${encodeURI(path)}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDirectoryQuery } = directoryApi;
