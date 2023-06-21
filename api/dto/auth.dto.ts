export interface LoginFormDTO {
	email: string;
	password: string;
}

export interface LoginResponseDTO {
	token: string;
}

export type RegisterFormDTO = LoginFormDTO & { fullName: string, nickName: string, activity: string, bio: string, isPrime: boolean  };
export type RegisterResponseDTO = LoginResponseDTO;

export interface User {
	id: number;
	email: string;
	fullName: string;
	nickName: string;
	activity: string;
	isPrime: boolean;
	bio: string;
}
export interface UpdateUserBio {
	id: number;
	bio: string;
}
