export interface TodoResponse {
  id: number;
  title: string;
  description: string;
}

export interface CreateTodoModel {
  title: string;
  description: string;
}

export interface DeleteMethodResponse {
  status: string;
}
