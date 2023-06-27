import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Api from "@/api";
import { User } from "@/api/dto/auth.dto";
import UserInfo from "@/components/user-page/user-info/UserInfo";
import { LinkItemProps } from "@/api/dto/link.dto";
import UserLinks from "@/components/user-page/user-links/UserLinks";
import MetaHead from "@/components/meta/MetaHead";



const UserPage = () => {
	const router = useRouter();
	const { nickName } = router.query;
	const [userData, setUserData] = useState<User | null>(null);
	const [links, setLinks] = useState<LinkItemProps[] | undefined>();
	
	

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
		<MetaHead title={`Flux / ${userData ? userData?.fullName : ""}`}/>
			<div className="w-full h-screen flex flex-col items-center relative transition"
			
			
			>
				
				<div className="container">
					<UserInfo info={userData} />
					<UserLinks links={links} />
				</div>
			</div>
		</>
	);
};

export default UserPage;
