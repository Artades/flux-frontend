import { LinkItemProps } from "@/api/dto/link.dto";
import React, { FC, useState } from "react";
import { useLinkColorStore, getLinkColorByIcon } from "@/hooks/useLinkColor";
import { useRouter } from "next/router";
import * as Api from "@/api";
import { toast } from "react-toastify";
import { ArrowTopRightOnSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const LinkItem: FC<LinkItemProps> = ({
	linkName,
	linkIcon,
	linkPath,
	id,
	onDelete,
}) => {
	const router = useRouter();
	const { setLinkColor } = useLinkColorStore();
	const [isDeleted, setIsDeleted] = useState(false);

	const handleMouseEnter = () => {
		const linkAppName = linkIcon.substring(
			linkIcon.lastIndexOf("/") + 1,
			linkIcon.lastIndexOf(".")
		);
		setLinkColor(getLinkColorByIcon(linkAppName));
	};

	const handleMouseLeave = () => {
		setLinkColor("transparent");
	};

	const handleDeleteLink = async (
	
	) => {
	

		if (router.pathname === "/home/links") {
			const confirmed = window.confirm(
				"Are You Sure you want to Delete this Link?"
			);

			if (confirmed) {
				try {
					setIsDeleted(true);
					onDelete ? onDelete(id) : console.log("It's not clickable");

					await Api.links.deleteLink(id);
					toast.success("Link deleted");
				} catch (error) {
					toast.error("Error deleting link");
				}
			}
		}
	};

	


return (
	<div
		className={`cursor-pointer `}
		onMouseEnter={handleMouseEnter}
		onMouseLeave={handleMouseLeave}
	>
		<div
			className={`group
			 w-full relative h-[160px] transition duration-200 ease-in-out backdrop-blur-md bg-white/50 border border-slate-200  drop-shadow-sm hover:border-accent/60 rounded-lg group `}
		>
			<div className=" hidden group-hover:block transition w-full h-full z-30 absolute rounded-lg backdrop-blur-[25px]  bg-white/80">
				<div className="w-full h-full flex  items-center justify-center ">
					<div className="w-full flex items-center  justify-center gap-3">
						<TrashIcon
							className="w-8 h-8 text-accent hover:text-accent/40 cursor-pointer "
							onClick={handleDeleteLink}
						/>
						<ArrowTopRightOnSquareIcon
							className="w-8 h-8 text-accent hover:text-accent/40 cursor-pointerF"
							onClick={() => router.push(linkPath)}
						/>
					</div>
				</div>
			</div>
			<div className="w-full h-full flex flex-col items-center justify-between py-3  transition">
				<div className="w-full flex items-center justify-center">
					<img
						src={linkIcon}
						className="drop-shadow-md h-[55px] w-[55px]"
						alt="Link"
					/>
				</div>
				<p className="text-lg text-slate-700">{linkName}</p>
			</div>
		</div>
	</div>
);
};

export default LinkItem;
