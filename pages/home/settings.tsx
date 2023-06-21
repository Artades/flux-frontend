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
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Settings = () => {
	const userData = useUserDataStore();
	const [isCopied, setIsCopied] = useState(false);
	const link = `https://flux-pi.vercel.app/users/${userData?.userData?.nickName}`;
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
			}, 300);
		})
		.catch((error) => {
			console.log("Error copying link:", error);
		});
}, []);
	return (
		<>
			<MetaHead title="Settings" />
			<div className="w-full flex flex-col items-start">
				<h1 className="text-3xl text-gray-700 font-bold mb-10">Settings</h1>

				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>How to get Prime account ?</AccordionTrigger>
						<AccordionContent>
							You can always send a message to developer&apos;s any messenger to
							upgrade your account status.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>My personal link</AccordionTrigger>
						<AccordionContent>
							<div className="flex items-center gap-2 cursor-pointer">
								<Link href={link}>
									<p className="text-accent border border-accent px-2 py-1 text-sm rounded-lg hover:text-white hover:bg-accent transition">Redirect</p>
								</Link>
								<ClipboardDocumentIcon
									onClick={() => onClickCopy(link)}
									className={`w-6 h-6 p-1 border border-gray-400 rounded-md hover:text-gray-500 ${
										isCopied ? "hidden" : "text-gray-700 "
									}`}
								/>
								{isCopied && (
									<Loader2 className="text-green-600 w-3 h-3 animate-spin" />
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Is it animated?</AccordionTrigger>
						<AccordionContent>
							Yes. It&apos;s animated by default, but you can disable it if you
							prefer.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
};

export default Settings;
