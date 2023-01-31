import type { Status } from "./Status";
import type { Priority } from "./Priority";
import type {Category} from "./Category";

interface Todo {
	id: string;
	name: string;
	status: Status;
	priority: Priority;
	categories: string[];
}

export type { Todo };
