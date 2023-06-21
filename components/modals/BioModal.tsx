import useBioModal from "@/hooks/useBioModal";
import Modal from "./Modal";



interface BioModalProps {
	bio: string | undefined;
}

const BioModal: React.FC<BioModalProps> = ({bio}) => {
	
	const BioModal = useBioModal()

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<p className="text-slate-700">{bio}</p>
		</div>
	);

	return (
		<Modal
			
			isOpen={BioModal.isOpen}
			title="About me"
			actionLabel="Close Bio"
			onClose={BioModal.onClose}
			onSubmit={BioModal.onClose}
			body={bodyContent}
			
		/>
	);
};

export default BioModal;
