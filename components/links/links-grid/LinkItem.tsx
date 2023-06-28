import { LinkItemProps } from "@/api/dto/link.dto";
import React, { FC, useState } from "react";
import { useLinkColorStore, getLinkColorByIcon } from "@/hooks/useLinkColor";
import { useRouter } from "next/router";
import * as Api from "@/api";
import { toast } from "react-toastify";

const LinkItem: FC<LinkItemProps> = ({ linkName, linkIcon, linkPath, id, onDelete }) => {
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

  const handleContextMenu = async (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		event.preventDefault();

		if (router.pathname === "/home/links") {
			const confirmed = window.confirm("Are you sure you want to delete this post?");

			if (confirmed) {
				try {
						setIsDeleted(true);
					onDelete(id);
				
					await Api.links.deleteLink(id);
					toast.success("Link deleted");
					
				} catch (error) {
					toast.error("Error deleting link");
				}
			}
		}
	};
	return (
		<a
			href={linkPath}
			target="_blank"
			className={`cursor-pointer `}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onContextMenu={handleContextMenu}
		>
			<div
				className={` w-full h-[160px] transition duration-200 ease-in-out backdrop-blur-md bg-white/50 border border-slate-200  drop-shadow-sm hover:border-accent/60 rounded-lg group `}
			>
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
		</a>
	);
};

export default LinkItem;
