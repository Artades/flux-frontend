import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Api from "@/api";
import { User } from "@/api/dto/auth.dto";
import UserInfo from "@/components/user-page/user-info/UserInfo";
import { LinkItemProps } from "@/api/dto/link.dto";
import UserLinks from "@/components/user-page/user-links/UserLinks";

import { useLinkColorStore } from "@/hooks/useLinkColor";

const UserPage = () => {
	const router = useRouter();
	const { nickName } = router.query;
	const [userData, setUserData] = useState<User | null>(null);
	const [links, setLinks] = useState<LinkItemProps[] | undefined>();
	
	const { linkColor } = useLinkColorStore();

	useEffect(() => {
		const getUser = async (nickName: string | string[] | undefined) => {
			try {
				if (!nickName || typeof nickName === "undefined") {
					return;
				}
				const response = await Api.auth.getUserByNickName(nickName);
				setUserData(response);
			} catch (error) {
				console.log(error);
			}
		};

		const getLinks = async (nickName: string) => {
			try {
				if (!nickName) {
					return;
				}
				const response = await Api.auth.getLinksByNickName(nickName);
				setLinks(response);
			} catch (error) {
				console.log(error);
			}
		};

		
		if (typeof nickName === "string") {
			getUser(nickName);
			getLinks(nickName);
		}
	}, [nickName]);

	return (
		<>
			<div className="w-full h-screen flex flex-col items-center relative transition">
				<svg
					viewBox="0 0 1024 1024"
					className="absolute blur-[100px] -z-60 w-full h-auto top-0 left-0 right-0 sm:-mt-40 md:-mt-20 opacity-50"
					aria-hidden="true"
				>
					<circle
						cx="512"
						cy="512"
						r="250"
						fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
						fillOpacity="0.7"
					/>
					<defs>
						<radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
							<stop
								offset="1"
								stopColor={linkColor}
								style={{ transition: "0.5s" }}
							/>
						</radialGradient>
					</defs>
				</svg>
				<div className="container">
					<UserInfo info={userData} />
					<UserLinks links={links} />
				</div>
			</div>
		</>
	);
};

export default UserPage;
