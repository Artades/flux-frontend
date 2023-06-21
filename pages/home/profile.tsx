import MetaHead from "@/components/meta/MetaHead";
import UpdateBioModal from "@/components/modals/UpdateBioModal";
import Avatar from "@/components/profile/Avatar";
import useUpdateBioModal from "@/hooks/useUpdateBioModal";
import { useGetUserDataFromStore } from "@/hooks/useUser";
import { CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const Profile = () => {
	 const userData = useGetUserDataFromStore();
	const updateBioModal = useUpdateBioModal();
	const [bio, setBio] = useState(userData?.bio);

  const handleUpdateBio = (newBio: string) => {
		setBio(newBio);
	};

	useEffect(() => {
		setBio(userData?.bio);
	}, [userData?.bio]);

	

	return (
		<>
			<UpdateBioModal onBioUpdate={handleUpdateBio} />
			<MetaHead title="Profile" />
			<div className="border rounded-xl bg-gray-100 ">
				<div className=" flex items-center justify-start  h-44 relative rounded-t-xl px-3">
					<Avatar />
				</div>
				<div className=" bg-white py-10 rounded-xl border-t border-t-gray-200 drop-shadow-md px-4">
					<div className="flex flex-col">
						{!userData && (
							<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
						)}
						<p className="text-gray-700 text-2xl font-semibold">
							{userData?.fullName}
						</p>

						<p className="text-md text-neutral-500">@{userData?.nickName}</p>
					</div>
					<div className="flex flex-col mt-5">
						<div className="flex items-start text-gray-700 font-bold gap-2 mb-5">
							Bio:
							{!userData && (
								<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
							)}
							<p className="font-medium">
								{bio && bio.length > 30 ? `${bio.slice(0, 30)}...` : bio}
							</p>
							<PencilSquareIcon
								onClick={updateBioModal.onOpen}
								className="w-6 h-6 text-neutral-600 hover:text-accent hover:cursor-pointer focus:text-accent"
							/>
						</div>
						{/* There has to be user's bio */}
						<div className="flex items-center text-gray-700 font-bold gap-2 mb-5">
							Email:
							{!userData && (
								<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
							)}
							<p className="text-accent">{userData?.email}</p>
						</div>
						<div className="flex items-center text-gray-700 font-bold gap-2 mb-5">
							Account:
							{!userData && (
								<p className="w-60 h-5 bg-neutral-300 rounded-lg animate-pulse"></p>
							)}
							<p
								className={`${
									userData?.isPrime ? "text-yellow-500" : "text-neutral-500"
								}`}
							>
								{userData?.isPrime ? "Prime" : "Default"}{" "}
							</p>
						</div>
						<div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
							<CalendarIcon className="w-6 h-6 text-neutral-600" />
							<p>Joined Recently</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
