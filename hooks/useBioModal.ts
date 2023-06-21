import { create } from "zustand";

interface BioModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useBioModal = create<BioModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useBioModal;
