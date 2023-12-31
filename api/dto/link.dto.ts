import { User } from "./auth.dto";

export interface LinkItemProps {
	id: number;
	linkName: string;
	linkPath: string;
	linkIcon: string;
	user: User;
	onDelete?: (id: number ) => void | undefined;
	
}

export interface CreateLinkProps {
	linkName: string;
	linkPath: string;
	linkIcon: string;
}