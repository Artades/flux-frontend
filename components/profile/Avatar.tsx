import { Loader2 } from "lucide-react";


const Avatar = ({
	gender,
	
	avatar,
	id,
}: {
	gender: string | undefined;
	isPrime?: boolean | undefined;
	avatar?: string | undefined;
	id?: number ;
}) => {
	let imageUrl;

	
	
// if (avatar === "" ) {
	
// 	switch (gender) {
// 		case "male":
// 			imageUrl = "/images/user-mal.png";
// 			break;
// 		case "female":
// 			imageUrl = "/images/user-female.png";
// 			break;
// 		default:
// 			imageUrl = ""; // Путь к изображению по умолчанию
// 			break;
// 	}
// } else if( typeof id !== undefined ){
// 	imageUrl = `https://fluux-server-0712fc9cf32e.herokuapp.com/avatars/${id}`;
	
// }

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
		<>
			<div
				className={` w-36 h-36 flex items-center justify-center rounded-full border-dotted border-4 border-accent `}
			>
				{!id ? (
					<Loader2 className="w-5 h-5 animate-spin " />
				) : (
					<img
						alt="Avatar"
						className=" flex items-center justify-center w-32 h-32 bg-white rounded-full object-cover"
						src={imageUrl}
					/>
				)}
			</div>
		</>
	);
};


export default Avatar;
