

import {  ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { toast } from 'react-toastify';

const UserButton = ({bio}: {bio:string | undefined}) => {
  const handleButtonClick = () => {
		const CustomToast = () => (
			<div className=''>
				<h2 className='font-bold mb-2'>Bio:</h2>
				<p>{bio}</p>
			</div>
		);

		toast.info(<CustomToast />, {
			position: toast.POSITION.TOP_RIGHT,
			icon: false,
			closeButton: true,
			closeOnClick: false,
			draggable: true,
			autoClose: false,
			hideProgressBar: true,
			
			
			
		});
	};

    return (
			<button
				onClick={handleButtonClick}
				className="group  flex items-center justify-center p-1 rounded-lg border border-slate-600  hover:border-accent transition duration-200"
			>
				<ChatBubbleBottomCenterTextIcon
					title="About Me"
					className="group-hover:text-accent w-5 h-5  text-slate-600 text-sm transtion duration-200"
				/>
			</button>
		);
};

export default UserButton;