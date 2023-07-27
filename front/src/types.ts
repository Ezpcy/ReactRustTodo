export interface Todo {
    todo_id: number;
    title: string | null;
    description: string | null;
    createdAt: string;
    completed: boolean;
}