import { LinkItemProps } from "@/api/dto/link.dto";
import React, { FC } from "react";

const LinkItem: FC<LinkItemProps> = ({
	linkName,
	linkIcon,
	linkPath,
	
}) => {
	console.log;
	return (
		<a href={linkPath} target="_blank" className="cursor-pointer">
			<div
				className={`w-full h-[160px] ease-in-out bg-zinc-50  duration-200   border border-slate-200 hover:border-accent/60 rounded-lg backdrop-blur-sm 
				group   hover:shadow-accent/50
					`}
			>
				<div className=" w-full h-full flex flex-col items-center justify-between py-3 group-hover:scale-[0.8] transition">
					<div className="w-full flex items-center justify-center">
						<img
							src={linkIcon}
							className="drop-shadow-md h-[55px] w-[55px] "
							alt="Link"
						/>
					</div>
					<p className="text-lg  text-gray-700">{linkName}</p>
				</div>
			</div>
		</a>
	);
};

export default LinkItem;
