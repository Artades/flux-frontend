import { LinkItemProps } from "@/api/dto/link.dto";
import React, { FC } from "react";
import { useLinkColorStore, getLinkColorByIcon } from "@/hooks/useLinkColor";

const LinkItem: FC<LinkItemProps> = ({ linkName, linkIcon, linkPath }) => {
	const { linkColor, setLinkColor } = useLinkColorStore();

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
	
	return (
		<a
			href={linkPath}
			target="_blank"
			className="cursor-pointer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className={`w-full h-[160px] ease-in-out backdrop-blur-md bg-white/50 border border-slate-200 duration-200 drop-shadow-sm hover:border-accent/60 rounded-lg group`}
			>
				<div className="w-full h-full flex flex-col items-center justify-between py-3 group-hover:scale-[0.8] transition">
					<div className="w-full flex items-center justify-center">
						<img
							src={linkIcon}
							className="drop-shadow-md h-[55px] w-[55px]"
							alt="Link"
						/>
					</div>
					<p className="text-lg text-gray-700">{linkName}</p>
				</div>
			</div>
		</a>
	);
};

export default LinkItem;
