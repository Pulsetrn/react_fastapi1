import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateTodoModel,
  DeleteMethodResponse,
  TodoResponse,
} from "../../models/models";

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/todos" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoResponse[], null>({
      query: () => ({
        url: "/get_all_todos/",
      }),
      providesTags: ["Todo"]
    }),
    getTodoById: builder.query<TodoResponse, number>({
      query: (todo_id) => ({
        url: `/get_all_todo/${todo_id}/`,
      }),
    }),
    createTodo: builder.mutation<TodoResponse, CreateTodoModel>({
      query: (todo_in) => ({
        url: "/create_todo/",
        method: "POST",
        body: todo_in,
      }),
      invalidatesTags: ["Todo"]
    }),
    updateTodo: builder.mutation<TodoResponse, [number, CreateTodoModel]>({
      query: ([todo_id, todo_in]) => ({
        url: `/update_todo/${todo_id}/`,
        method: "PATCH",
        body: todo_in,
      }),
      invalidatesTags: ["Todo"]
    }),
    deleteTodo: builder.mutation<DeleteMethodResponse, number>({
      query: (todo_id) => ({
        url: `/delete_todo/${todo_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"]
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodosQuery,
  useLazyGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
