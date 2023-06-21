import { PlusSmallIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

const ButtonItem = () => {
    return (
			<Link href={"/home/create"} className="cursor-pointer ">
				<div
					className={` group w-full h-[160px] ease-in-out  duration-200 rounded-lg transition border-2 border-accent
					 hover:animate-pulse hover:border-accent/50
					`}
				>
					<div className="group-hover:scale-[0.8] transition w-full h-full flex items-center justify-center ">
						<div className=" w-full flex items-center justify-center">
							<PlusSmallIcon className='w-14 h-14 font-bold text-accent ' />
						</div>
					
					</div>
				</div>
			</Link>
		);
};

export default ButtonItem;