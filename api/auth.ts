import axios from "@/core/axios";
import {
	LoginFormDTO,
	LoginResponseDTO,
	RegisterFormDTO,
	RegisterResponseDTO,
	UpdateUserBio,
	User,
} from "@/api/dto/auth.dto";
import { destroyCookie } from "nookies";

export const login = async (
	values: LoginFormDTO
): Promise<LoginResponseDTO> => {
	return (await axios.post("/auth/login", values)).data;
};

export const register = async (
	values: RegisterFormDTO
): Promise<RegisterResponseDTO> => {
	return (await axios.post("/auth/register", values)).data;
};

export const getMe = async (): Promise<User> => {
	return (await axios.get("/users/me")).data;
};

export const getUserByNickName = async(nickName: string | string[] | undefined) => {
	return (await axios.get(`/users?nickName=${nickName}`)).data;
}

export const getLinksByNickName = async(nickName: string) => {
	return (await axios.get(`users/${nickName}/links`)).data;
}
 
export const logout = () => {
	destroyCookie(null, "_token", { path: "/" });
};

export const updateBio = async (
	userId: number,
	newBio: string
): Promise<UpdateUserBio> => {
	return (await axios.patch(`/users/${userId}/bio`, { bio: newBio })).data;
};
