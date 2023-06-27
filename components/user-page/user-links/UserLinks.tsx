import React, { FC } from "react";
import LinkItem from "../../links/links-grid/LinkItem";
import { LinkItemProps } from "@/api/dto/link.dto";

interface UserLinksProps {
	links: LinkItemProps[] | undefined;
}

const UserLinks: FC<UserLinksProps> = ({ links }) => {
	const isLoading = !links; // Проверяем, загружены ли данные

	return (
		<div className="w-full my-10 p-2">
			<div className="w-full grid gap-3 h-full grid-cols-2 lg:grid-cols-4">
				{isLoading
					? // Если данные загружаются, отображаем каркасы
					  Array.from({ length: 9 }).map((_, idx) => (
							<div
								key={idx}
								className="w-full h-[160px] ease-in-out backdrop-blur-md bg-white/50 border border-slate-200 drop-shadow-sm hover:border-accent/60 rounded-lg animate-pulse"
							></div>
					  ))
					: // Если данные загружены, отображаем карточки LinkItem
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
