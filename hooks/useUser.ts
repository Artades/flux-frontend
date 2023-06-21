// userDataStore.ts
import { User } from "@/api/dto/auth.dto";
import { useEffect, useMemo } from "react";
import { create } from "zustand";
import * as Api from "@/api";

interface UserDataState {
	userData: User | null;
	setUserData: (data: User) => void;
}

const useUserDataStore = create<UserDataState>((set) => ({
	userData: null,
	setUserData: (data) => set({ userData: data }),
}));

export const useGetUserDataFromStore = () => {
	const userData = useUserDataStore((state) => state.userData);
	const setUserData = useUserDataStore((state) => state.setUserData);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await Api.auth.getMe();
				setUserData(response);
			} catch (error) {
				// Обработка ошибки, например, вывод сообщения или запись в лог
				console.log(error)
			}
		};
		getUserData();
	}, [setUserData]);

	return useMemo(() => userData, [userData]);
};

export default useUserDataStore;
