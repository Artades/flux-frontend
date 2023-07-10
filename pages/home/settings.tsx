import MetaHead from "@/components/meta/MetaHead";
import React, { useCallback, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/Accordion";
import useUserDataStore from "@/hooks/useUser";
import * as Api from "@/api";
import { useRouter } from "next/router";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

const Settings = () => {
	const userData = useUserDataStore();
	const [isCopied, setIsCopied] = useState(false);
	const link = `https://fluux.vercel.app/users/${userData?.userData?.nickName}`;
	const router = useRouter();
	const redirectToLink = useCallback(() => {
		router.push(link);
		Api.auth.logout();
	}, [link,router]);
const onClickCopy = useCallback((link: string) => {
	navigator.clipboard
		.writeText(link)
		.then(() => {
			setIsCopied(true);
			setTimeout(() => {
				setIsCopied(false);
			}, 1500);
		})
		.catch((error) => {
			console.log("Error copying link:", error);
		});
}, []);
	return (
		<>
			<MetaHead title="Settings" />
			<div className="w-full flex flex-col items-start mt-10">
				<h1 className="text-3xl text-gray-700 font-bold mb-5">Settings</h1>

				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>How to get Prime account ?</AccordionTrigger>
						<AccordionContent>
							You can always send a message to developer&apos;s any messenger to
							upgrade your account status.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Share your page</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col items-start gap-2 cursor-pointer">
								<p className="text-sm text-neutral-500">
									Tip: Paste this link anywhere!
								</p>
								<div className="flex items-center gap-2 mt-2">
									<Link href={link} onClick={redirectToLink}>
										<p className="text-accent border border-accent px-5 py-1  text-sm rounded-lg hover:text-white hover:bg-accent transition">
											Visit 
										</p>
									</Link>
									<ClipboardDocumentIcon
										onClick={() => onClickCopy(link)}
										className={`w-7 h-7 py-1 border border-gray-400 rounded-lg hover:text-gray-500 ${
											isCopied ? "hidden" : "text-gray-700 "
										}`}
									/>
									{isCopied && <p className="text-green-600">Copied!</p>}
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger >
							What does Prime status do?
						</AccordionTrigger>
						<AccordionContent className="">
							<ul className="list-disc flex flex-col items-start gap-3">
								<li className="">
									<span className="font-semibold">Ability to have a custom avatar:</span> With Prime status, you can set and use your own custom avatar, giving your profile a personalized touch.
								</li>
								<li className="">
									<span className="font-semibold">Ability to receive donations from foreigners:</span> As a Prime member, you can accept donations from users all around the world via Ko-Fi, allowing you to receive financial support and gratitude from a global community.
								</li>
								<li>
									<span className="font-semibold">Ability to attach your own card:</span> Prime status enables you to attach your own card to your account, giving you the convenience to make payments, purchases, and other financial transactions directly through the platform.
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>
					
				</Accordion>
			</div>
		</>
	);
};

export default Settings;
