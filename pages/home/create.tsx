import { CreateLinkProps } from "@/api/dto/link.dto";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select";
import React, { useState } from "react";
import * as Api from "@/api";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/Label";
import MetaHead from "@/components/meta/MetaHead";
import { Loader2 } from "lucide-react";




const Create = () => {
	const [linkName, setLinkName] = useState("");
	const [linkPath, setLinkPath] = useState("");
	const [linkIcon, setLinkIcon] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const links = [
		{
			id: 1,
			name: "Instagram",
			href: "/images/links/instagram.png",
		},
		{
			id: 2,
			name: "Twitter",
			href: "/images/links/twitter.svg",
		},
		{
			id: 3,
			name: "Reddit",
			href: "/images/links/reddit.png",
		},
		{
			id: 4,
			name: "Vkontakte",
			href: "/images/links/vk.svg",
		},
		{
			id: 5,
			name: "Github",
			href: "/images/links/github.png",
		},
		{
			id: 6,
			name: "Viber",
			href: "/images/links/viber.png",
		},
		{
			id: 7,
			name: "Pinterest",
			href: "/images/links/pinterest.png",
		},
		{
			id: 8,
			name: "Odnoklassniki",
			href: "/images/links/ok.png",
		},
		{
			id: 9,
			name: "Facebook",
			href: "/images/links/facebook.png",
		},
		{
			id: 10,
			name: "Discord",
			href: "/images/links/discord.png",
		},
		{
			id: 11,
			name: "iMessage",
			href: "/images/links/imessage.png",
		},
		{
			id: 12,
			name: "TikTok",
			href: "/images/links/tiktok.png",
		},
		{
			id: 13,
			name: "Telegram",
			href: "/images/links/telegram.png",
		},
		{
			id: 14,
			name: "Snapchat",
			href: "/images/links/snapchat.png",
		},
		{
			id: 15,
			name: "YouTube",
			href: "/images/links/youtube.png",
		},
		{
			id: 16,
			name: "LinkedIn",
			href: "/images/links/linkedin.png",
		},
	];



	const values = { linkName, linkPath, linkIcon };

	const onSubmit = async (values: CreateLinkProps) => {
		if (
			!values.linkName.trim() ||
			!values.linkPath.trim() ||
			!values.linkIcon
		) {
			toast.error("Please fill in all the fields.");
			return;
		}
		setIsLoading(true);
		try {
			await Api.links.createLink(values);

			toast.success("Link Created!");
			setLinkName("");
			setLinkPath("");
			setLinkIcon("");
			setIsLoading(false);
			location.href = "/home/links";
		} catch (error) {
			toast.error("Error creating the link...");
			console.error(error);
			setIsLoading(false);
		}
	};

return (
	<>
		<MetaHead title="Create New Link" />
		<div className="w-full  flex items-center justify-center ">
			<div className="flex flex-col items-start gap-3 w-[500px] bg-transparent rounded-lg px-10 py-12 ">
				<h2 className="text-xl font-bold mb-6">Create Link</h2>
				<div className="grid w-full items-center gap-3">
					<Label htmlFor="link-name">App or Website Name</Label>
					<Input
						name="link-name"
						placeholder="Instagram"
						maxLength={20}
						value={linkName}
						onChange={(e) => setLinkName(e.target.value)}
					/>
				</div>
				<div className="grid w-full items-center gap-3">
					<Label htmlFor="link-path">URL</Label>
					<Input
						name="linkPath"
						placeholder="https://instagram.com/account/example"
						value={linkPath}
						onChange={(e) => setLinkPath(e.target.value)}
					/>
				</div>
				<Label htmlFor="link-icon">Choose the Icon</Label>
				<Select
					defaultValue={linkIcon}
					onValueChange={(value) => setLinkIcon(value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Choose the Icon" />
					</SelectTrigger>
					<SelectContent className="bg-white max-h-[300px] overflow-y-auto">
						{links.map((link) => (
							<SelectItem
								key={link.id}
								className="hover:text-gray-200 "
								value={link.href}
							>
								
								<div className="w-full flex items-center gap-1">
									<img className="w-7 h-7 rounded-full p-1" src={link.href}  alt={"Link"}/>
									<p>{link.name}</p>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					variant="default"
					className="w-full text-white px-4 py-2 rounded-md mt-6"
					onClick={() => onSubmit(values)}
				>
					{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Create
				</Button>
			</div>
		</div>
	</>
);

};

export default Create;
