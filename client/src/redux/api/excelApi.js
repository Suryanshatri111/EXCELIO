import { EXCELS_FILE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const excelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadExcelFile: builder.mutation({
      query: (fileData) => ({
        url: `${EXCELS_FILE_URL}/upload`,
        method: "POST",
        body: fileData,
        credentials: "include",
      }),
    }),
    fetchAllUserExcelFiles: builder.query({
      query: () => ({
        url: `${EXCELS_FILE_URL}/`,
        method: "GET",
        credentials: "include",
      }),
    }),
    fetchExcelFileById: builder.query({
      query: (id) => ({
        url: `${EXCELS_FILE_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    removeExcelFile: builder.mutation({
      query: (id) => ({
        url: `${EXCELS_FILE_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    modifyChartConfig: builder.mutation({
      query: ({ id, fileData }) => ({
        url: `${EXCELS_FILE_URL}/${id}/chart-config`,
        method: "PATCH",
        body: fileData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUploadExcelFileMutation,
  useFetchAllUserExcelFilesQuery,
  useFetchExcelFileByIdQuery,
  useRemoveExcelFileMutation,
  useModifyChartConfigMutation,
} = excelsApi;
