import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import constants from '../../constants'

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: constants.API_URL,
    timeout: 10000,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${constants.API_TOKEN}`)
      return headers
    }
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => constants.USER_ENDPOINT,
      providesTags: ['Users']
    }),
    getUserById: builder.query({
      query: (id) => `${constants.USER_ENDPOINT}/${id}`
    }),
    saveUser: builder.mutation({
      query: (payload) => ({
        url: constants.USER_ENDPOINT,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['Users']
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `${constants.USER_ENDPOINT}/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${constants.USER_ENDPOINT}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery,
  useDeleteUserMutation, 
  useUpdateUserMutation,
  useSaveUserMutation 
} = userApi