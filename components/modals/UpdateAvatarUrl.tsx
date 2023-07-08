import { useState, useRef } from "react";
import * as Api from "@/api";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useGetUserDataFromStore } from "@/hooks/useUser";
import useUpdateAvatarModal from "@/hooks/useUpdateAvatarModal";
import { Input } from "../ui/Input";
import { PlusIcon } from "@heroicons/react/24/outline";

interface UpdateAvatarModalProps {
	// onAvatarUpdate: (avatarurl: string) => void;
}

const UpdateAvatarModal: React.FC<UpdateAvatarModalProps> = (
	{
		/*onAvatarUpdate */
	}
) => {
	const updateAvatarModal = useUpdateAvatarModal();
	const userData = useGetUserDataFromStore();
	const [avatar, setAvatar] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isSelected, setIsSelected] = useState(false);

	const updateAvatar = async (userId: number | undefined, avatar: File) => {
		try {
			setIsLoading(true);
			if (userId === undefined) {
				throw new Error("User ID is undefined");
			}

			// Создайте экземпляр объекта FormData
			const formData = new FormData();
			formData.append("avatar", avatar);

			await Api.auth.updateAvatar(userId, formData);

			toast.success("Avatar Changed!");
			setIsLoading(false);
			// onAvatarUpdate(avatarurl);
			updateAvatarModal.onClose();
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			console.log(`Avatar: ${avatar}`);
			toast.error("Error updating your Avatar...");
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			setAvatar(file);
			// Read and set the image preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePlusClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
		setIsSelected(true);
	};

	const bodyContent = (
		<div className="flex flex-col gap-4 justify-center items-center ">
			<div className=" p-2 w-full h-[40vh] border border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center">
				<div
					className={`cursor-pointer ${isSelected ? "hidden" : "block"}`}
					onClick={handlePlusClick}
				>
					<PlusIcon className="h-10 w-10  text-slate-800 font-bold" />
					<Input
						className="hidden"
						id="avatar"
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
					/>
				</div>
				{avatarPreview && (
					<img
						src={avatarPreview}
						alt="Avatar Preview"
						className="w-full h-full bg-white rounded-lg object-cover"
					/>
				)}
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={updateAvatarModal.isOpen}
			title="Change Avatar"
			actionLabel="Save Changes"
			onClose={updateAvatarModal.onClose}
			onSubmit={() => updateAvatar(userData?.id, avatar as File)}
			body={bodyContent}
			buttonLoading={isLoading}
		/>
	);
};

export default UpdateAvatarModal;
