export interface LoginFormDTO {
	email: string;
	password: string;
}

export interface LoginResponseDTO {
	token: string;
}

export type RegisterFormDTO = LoginFormDTO & {
	fullName: string;
	nickName: string;
	activity: string;
	bio: string;
	isPrime: boolean;
	gender: string;
	dateOfBirth: Date | undefined;
	avatar: string | undefined;
};
export type RegisterResponseDTO = LoginResponseDTO;

export interface User {
	id: number;
	email: string;
	fullName: string;
	nickName: string;
	activity: string;
	isPrime: boolean;
	bio: string;
	gender: string;
	dateOfBirth: Date;
	avatar: string;
}
export interface UpdateUserBio {
	id: number;
	bio: string;
}
export interface UpdateUserAvatar {
	id: number;
	avatar: File;
}
