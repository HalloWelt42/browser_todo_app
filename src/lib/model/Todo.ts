import type {Status} from "./Status";
import type {Category} from "./Category";

interface Todo {
    id: string;
    name: string;
    status: Status;
    categories: string[]
}

export type {Todo};