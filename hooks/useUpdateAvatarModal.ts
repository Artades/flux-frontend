import { create } from "zustand";

interface UpdateAvatarModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useUpdateAvatarModal = create<UpdateAvatarModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useUpdateAvatarModal;
