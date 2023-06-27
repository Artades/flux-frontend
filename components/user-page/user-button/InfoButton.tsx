
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { InfoIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const InfoButton = ({ dob, nickName }: { dob: Date | undefined, nickName: string | undefined }) => {
	const handleButtonClick = () => {
		const CustomToast = () => (
			<div className="flex flex-col items-start gap-5">
				<div>
					<h2 className="font-bold mb-1">Birth Day:</h2>
					<p>{dob ? format(new Date(dob), "dd MMMM yyyy") : ""}</p>
				</div>
				<div>
					<h2 className="font-bold mb-1">Nick Name:</h2>
					<p className="text-sm text-accent font-thin ">@{nickName}</p>
				</div>
			</div>
		);

		toast.info(<CustomToast />, {
			position: toast.POSITION.TOP_RIGHT,
			icon: false,
			closeButton: true,
			closeOnClick: false,
			draggable: true,
			autoClose: false,
			hideProgressBar: true,
		});
	};

	return (
		<button
			onClick={handleButtonClick}
			className="group  flex items-center justify-center p-1 rounded-lg border border-slate-600  hover:border-accent transition duration-200"
		>
			<InformationCircleIcon
				
				className="group-hover:text-accent w-5 h-5  text-slate-600 text-sm transtion duration-200"
			/>
		</button>
	);
};

export default InfoButton;
