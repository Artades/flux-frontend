import { useCallback } from "react";
import { Button } from "../ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

interface ModalProps {
	buttonLoading?: boolean;
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void; // Updated to remove VoidFunction
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	actionLabel,
	footer,
	disabled,
	buttonLoading
}) => {
	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}

		onClose();
	}, [onClose, disabled]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div
				className="
				px-2
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
			>
				<div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-auto ">
					{/*content*/}
					<div
						className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-white
            outline-none 
            focus:outline-none
            "
					>
						{/*header*/}
						<div
							className="
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              "
						>
							<h3 className="text-3xl font-semibold text-black">{title}</h3>
							<button
								className="
                  p-1 
                  ml-auto
                  border-0 
                  text-black 
                  hover:opacity-70
                  transition
                "
								onClick={handleClose}
							>
								<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						{/*body*/}
						<div className="relative p-10 flex-auto">{body}</div>
						{/*footer*/}
						<div className="flex flex-col gap-2 p-10">
							<Button
								size={"lg"}
								disabled={disabled}
								onClick={onSubmit} // Updated to pass the function reference directly
							>
								{buttonLoading && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								{actionLabel}
							</Button>
							{footer}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
