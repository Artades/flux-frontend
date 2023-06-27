import { useState } from "react";
import * as Api from "@/api";
import Modal from "./Modal";

import { toast } from "react-toastify";
import useUpdateBioModal from "@/hooks/useUpdateBioModal";

import { useGetUserDataFromStore } from "@/hooks/useUser";
import { Textarea } from "../ui/Textarea";

interface UpdateBioModalProps {
	onBioUpdate: (bio: string) => void;
}

const UpdateModal: React.FC<UpdateBioModalProps> = ({ onBioUpdate }) => {
	const updateBioModal = useUpdateBioModal();
	const userData = useGetUserDataFromStore();
	const [bio, setBio] = useState(userData?.bio || "");
	const [isLoading, setIsLoading] = useState(false);

	const updateBio = async (newBio: string, userId?: number) => {
		try {
			setIsLoading(true);
			if (userId === undefined) {
				throw new Error("User ID is undefined");
			}

			await Api.auth.updateBio(userId, newBio);

			toast.success("Bio Updated!");
			setIsLoading(false);
			onBioUpdate(bio); 
			updateBioModal.onClose();
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			toast.error("Error updating your Bio...");
		}
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Textarea
				placeholder="Come up with new Bio"
				onChange={(e) => setBio(e.target.value)}
				value={bio}
				className="resize-none h-[170px]"
				disabled={isLoading}
			/>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={updateBioModal.isOpen}
			title="Update Bio"
			actionLabel="Save Changes"
			onClose={updateBioModal.onClose}
			onSubmit={() => updateBio(bio, userData?.id)}
			body={bodyContent}
			buttonLoading={isLoading}
		/>
	);
};

export default UpdateModal;


