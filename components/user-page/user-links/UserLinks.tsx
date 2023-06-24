import React, { FC } from "react";
import LinkItem from "../../links/links-grid/LinkItem";
import { LinkItemProps } from "@/api/dto/link.dto";

interface UserLinksProps {
	links: LinkItemProps[] | undefined;
}

const UserLinks: FC<UserLinksProps> = ({ links }) => {
	return (
		<div className="w-full  my-10 p-2">
			<div className="w-full grid gap-3 h-full grid-cols-2 lg:grid-cols-4">
				{links &&
					links.length &&
					links.map((link) => (
						<LinkItem
							key={link.id}
							linkName={link.linkName}
							linkIcon={link.linkIcon}
							linkPath={link.linkPath}
							id={link.id}
							user={link.user}
						/>
					))}
			</div>
		</div>
	);
};

export default UserLinks;
