import { User } from '@/api/dto/auth.dto';

import React, { FC } from "react";

import { CheckBadgeIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import UserButton from '../user-button/UserButton';
import Avatar from '@/components/profile/Avatar';
import InfoButton from '../user-button/InfoButton';



interface UserInfoProps {
    info: User | null;
}
const UserInfo:FC<UserInfoProps> = ({info}) => {

    return (
			<div className="w-full border border-slate-200  drop-shadow-sm  rounded-lg backdrop-blur-md bg-white/50 transition duration-200">
				<div className="absolute top-3 right-3 gap-1 h-full flex flex-col items-center justify-start">
					<UserButton bio={info?.bio} />
					<InfoButton nickName={info?.nickName} dob={info?.dateOfBirth} />
				</div>
			
				<div className="flex flex-col w-full items-center h-full p-8">
					<Avatar gender={info?.gender} />
					<div className="my-2 flex flex-col items-center">
						<h1 className="text-3xl text-gray-700 font-bold  flex items-center">
							{info?.fullName}
							{info?.isPrime && (
								<CheckBadgeIcon className="w-7 h-7 text-accent" />
							)}
						</h1>
						<p className="text-md my-3 text-neutral-400">{info?.activity}</p>
					</div>
					<div className="flex items-center">
						<a
							href={`mailto:${info?.email}`}
							rel="noreferrer"
							target="_blank"
							className=" group flex items-center py-2 px-7 text-md font-bold rounded-md text-white bg-accent transition hover:shadow hover:bg-transparent hover:text-accent  border-2 border-fuchsia-500"
						>
							<EnvelopeIcon className="w-5 h-5 text-white mr-2 group-hover:text-accent transition " />
							<p>Email</p>
						</a>
					</div>
				</div>
			</div>
		);
};

export default UserInfo;