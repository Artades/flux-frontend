import { create } from "zustand";

interface UpdateBioModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useUpdateBioModal = create<UpdateBioModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useUpdateBioModal;
