import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: userData,
      }),
    }),
    signin: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
    }),
    deleteProfile: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/profile`,
        method: "DELETE",
        body: userData,
        credentials: "include",
      }),
    }),
    oauthLoginUser: builder.mutation({
      query: (userdata) => ({
        url: `${USER_URL}/oauth-login`,
        method: "post",
        body: userdata,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useOauthLoginUserMutation,
} = usersApi;
