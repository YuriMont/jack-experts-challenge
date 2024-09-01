export interface CreateTaskParams{
    title: string;
    content: string;
    author_id: string;
    color_id?: number;
}

export interface ITask{
    id: number;
    title: string;
    content: string;
    color?: number;
}

export interface CreateUserParams{
    name: string;
    email: string;
    password: string;
}