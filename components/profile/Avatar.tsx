import React from "react";
import Image from "next/image";

const Avatar = ({
	gender,
	isPrime,
}: {
	gender: string | undefined;
	isPrime?: boolean | undefined;
}) => {
	let imageUrl;
	switch (gender) {
		case "male":
			imageUrl = "/images/user-mal.png";
			break;
		case "female":
			imageUrl = "/images/user-female.png";
			break;
		default:
			imageUrl = ""; // Путь к изображению по умолчанию
			break;
	}

	return (
		<div
			className={`flex items-center justify-center rounded-full ${
				isPrime ? "bg-gradient-to-r from-accent to-indigo-500" : "bg-accent"
			} p-1`}
		>
			<Image
				alt="Avatar"
				className="w-32 h-32 bg-white rounded-full"
				src={imageUrl}
				width={40}
				height={40}
				quality={80}
			/>
		</div>
	);
};

export default Avatar;
