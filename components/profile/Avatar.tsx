import React from 'react';
import Image from "next/image";

const Avatar = () => {
    return (
			<Image
				
				
				alt="Avatar"
				className="w-32 h-32 border-accent border-4  rounded-full"
				src={"/images/user.png"}
                width={40}
                height={40}
                quality={80}
			
			/>
		);
};

export default Avatar;