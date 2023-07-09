import MetaHead from "@/components/meta/MetaHead";
import UpdateAvatarModal from "@/components/modals/UpdateAvatarUrl";
import UpdateBioModal from "@/components/modals/UpdateBioModal";
import Avatar from "@/components/profile/Avatar";
import useUpdateAvatarModal from "@/hooks/useUpdateAvatarModal";

import useUpdateBioModal from "@/hooks/useUpdateBioModal";
import { useGetUserDataFromStore } from "@/hooks/useUser";
import { CalendarIcon,  PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const Profile = () => {
	 const userData = useGetUserDataFromStore();
	 const updateAvatarModal = useUpdateAvatarModal()
	const updateBioModal = useUpdateBioModal();
	const [bio, setBio] = useState(userData?.bio);

  const handleUpdateBio = (newBio: string) => {
		setBio(newBio);
	};

	useEffect(() => {
		setBio(userData?.bio);
	}, [userData?.bio]);

	const dob = userData?.dateOfBirth;
	

	return (
		<>
			<UpdateBioModal onBioUpdate={handleUpdateBio} />
			<UpdateAvatarModal  />
			<MetaHead title="Profile" />
			<div className=" bg-white border  border-slate-200 rounded-lg ">
				<div className=" flex items-center justify-between h-44 relative rounded-t-xl px-3">
					<div className="relative">
						<div
							onClick={() => alert("Developing now ...")}
							className=" absolute top-0  bg-white right-0 w-8 h-8 rounded-full flex justify-center items-center border rounded"
						>
							<PhotoIcon className=" w-5 h-5 text-neutral-600 hover:text-accent hover:cursor-pointer focus:text-accent" />
						</div>
						<Avatar avatar={userData?.avatar} gender={userData?.gender} id={userData?.id}/>
					</div>

					<PencilSquareIcon
						onClick={updateBioModal.onOpen}
						title="Update Bio"
						className="absolute top-3 right-5 w-6 h-6 text-neutral-600 hover:text-accent hover:cursor-pointer focus:text-accent"
					/>
				</div>
				<div className=" bg-white py-10  border-t border-t-gray-200  px-4">
					<div className="flex flex-col">
						{!userData && (
							<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
						)}
						<p className="text-gray-700 text-2xl font-semibold">
							{userData?.fullName}
						</p>

						<p className="text-md text-neutral-500">@{userData?.nickName}</p>
					</div>
					<div className="flex flex-col mt-5 gap-2">
						{/* There has to be user's bio */}
						<div className="flex items-center text-gray-700 font-bold gap-2 ">
							Email:
							{!userData && (
								<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
							)}
							<p className="text-accent">{userData?.email}</p>
						</div>
						<div className="flex items-center text-gray-700 font-bold gap-2 ">
							Account:
							{!userData && (
								<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
							)}
							<p
								className={`${
									userData?.isPrime ? "text-accent" : "text-neutral-500"
								}`}
							>
								{userData?.isPrime ? "Prime" : "Default"}{" "}
							</p>
						</div>
						<div className="flex flex-col items-start text-gray-700 font-bold gap-2 mb-5 border-t border-b  py-4">
							{!userData && (
								<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
							)}
							<p className="font-medium max-w-[400px]">
								{bio && bio.length > 100 ? `${bio.slice(0, 100)} ...` : bio}
							</p>
						</div>
						<div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
							<CalendarIcon className="w-6 h-6 text-neutral-600" />
							{!userData && (
								<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
							)}
							<p>{dob ? format(new Date(dob), "dd MMMM yyyy") : ""}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
