import React, { FC, useState } from "react";
import { LinkItemProps } from "@/api/dto/link.dto";
import LinkItem from "./LinkItem";
import ButtonItem from "./ButtonItem";
import { User } from "@/api/dto/auth.dto";


interface LinksProps {
	links: LinkItemProps[] | undefined;
	userData: User | null;
}

const LinksGrid: FC<LinksProps> = ({ links, userData }) => {
	const [linkItems, setLinkItems] = useState<LinkItemProps[]>(links || []);

	const handleLinkDelete = (id: number) => {
		
			setLinkItems((prevItems) => prevItems.filter((item) => item.id !== id));
		
	};

	if (!linkItems || linkItems.length === 0) {
		return (
			<div className="w-full h-[80vh] flex flex-col items-center justify-center">
				<img src="/images/no-links.png" className="w-40 h-40" alt="" />
				<p className="text-xl text-gray-700 font-bold mt-7">No Links Yet</p>
			</div>
		);
	}

	return (
		<div className="h-full w-full mt-10 px-2 transition duration-200">
			<div className="w-full grid gap-3 h-full grid-cols-2 lg:grid-cols-4">
				<ButtonItem />
				{linkItems.map((link) => (
					<LinkItem
						key={link.id}
						linkName={link.linkName}
						linkIcon={link.linkIcon}
						linkPath={link.linkPath}
						id={link.id}
						user={link.user}
						onDelete={handleLinkDelete}
					/>
				))}
			</div>
		</div>
	);
};

export default LinksGrid;
