
import MetaHead from "@/components/meta/MetaHead";
import * as Api from "@/api";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { checkAuth } from "@/utils/checkAuth";
import { GetServerSidePropsContext, NextPage } from "next";
import { LinkItemProps } from "@/api/dto/link.dto";
import LinksGrid from "@/components/links/links-grid/LinksGrid";

import { useGetUserDataFromStore } from "@/hooks/useUser";

interface LinksProps {
	items: LinkItemProps[];
}

const Links: NextPage<LinksProps> = ({ items }) => {
	

 const userData = useGetUserDataFromStore();


	return (
		<>
			<MetaHead title="My Links" />
			{userData ? (
				
				
				<LinksGrid userData={userData} links={items} />
			) : (
				<div className="w-full h-[80vh] flex  items-center justify-center ">
					<Loader2 className="mr-2 text-accent h-12 w-12 animate-spin" />
				</div>
			)}
		</>
	);
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const authProps = await checkAuth(ctx);

	if ("redirect" in authProps) {
		return authProps;
	}

	try {
		const items = await Api.links.getAll();

		return {
			props: {
				items,
			},
		};
	} catch (err) {
		console.log(err);
		return {
			props: { items: [] },
		};
	}
};

export default Links;
