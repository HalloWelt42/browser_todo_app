import type { Status } from "./Status";
import type { Priority } from "./Priority";

interface Todo {
	id: string;
	name: string;
	create_time: number;
	start_time: number;
	duration_time: number;
	end_time: number;
	status: Status;
	priority: Priority;
	categories: string[];
}

export type { Todo };
