import React from 'react';
import Image from "next/image";

const Avatar = ({gender}: {gender: string | undefined}) => {
    return (
			<Image
				
				
				alt="Avatar"
				className="w-32 h-32 border-accent border-4  bg-white rounded-full"
				src={`/images/${gender === "male" ? "user-male.png" : "user-female.png"}`}
                width={40}
                height={40}
                quality={80}
			
			/>
		);
};

export default Avatar;