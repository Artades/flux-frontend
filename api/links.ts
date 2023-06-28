import axios from "@/core/axios";
import { CreateLinkProps, LinkItemProps } from "./dto/link.dto";

export const getAll = async (): Promise<LinkItemProps[]> => {
	return (await axios.get("/links")).data;
};
export const createLink = async (
	values: CreateLinkProps
): Promise<CreateLinkProps> => {
	return await (
		await axios.post("/links", values)
	).data;
};

export const deleteLink = async (linkId: number): Promise<void> => {
	await axios.delete(`/links/${linkId}`);
};

export function updateBio(bio: string) {
	throw new Error("Function not implemented.");
}
