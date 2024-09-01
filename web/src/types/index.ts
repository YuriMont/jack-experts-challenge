export interface Color {
    id: number;
    name: string;
    code: string;
}

export interface Task {
    id: number;
    title: string;
    content: string;
    color: Color;
    completed: boolean;
}

export interface CreateTaskParams{
    title: string;
    content: string;
    color_id?: number;
}

