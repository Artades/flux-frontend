import * as Api from "@/api";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, LinkIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useGetUserDataFromStore } from "@/hooks/useUser";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const router = useRouter();
	const navigation = [
		{
			name: "My Links",
			href: "/home/links",
			current: router.pathname === "/home/links",
			icon: LinkIcon 
		},
		{
			name: "Create new",
			href: "/home/create",
			current: router.pathname === "/home/create",
			icon: PlusCircleIcon
		},
	];

	const [open, setOpen] = useState(false);
	const handleLinkClick = () => {
		setOpen(false);
	};

	const userData = useGetUserDataFromStore();
	const onClickLogout = () => {
		Api.auth.logout();
		location.href = "/";
	};

	return (
		<div className="bg-white ">
			<div className="max-w-[860px]  mx-auto">
				<Transition.Root show={open} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 lg:hidden"
						onClose={setOpen}
					>
						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
									<div className="flex py-5 px-5 items-center justify-between">
										<p className="text-lg font-bold">Menu</p>
										<button
											type="button"
											className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
											onClick={() => setOpen(false)}
										>
											<XMarkIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>
									<hr className="mb-5" />
									<div className="w-full flex items-start flex-col px-3">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												onClick={handleLinkClick}
												className={classNames(
													item.current
														? "text-accent flex text-lg items-center"
														: "flex text-neutral-600 text-lg hover:text-accent items-center",
													"px-3 py-3 text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												<item.icon
													className="w-6 h-6 mr-2"
													aria-hidden="true"
												/>
												{item.name}
											</Link>
										))}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<header className="relative bg-transparent">
					<nav
						aria-label="Top"
						className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
					>
						<div className="border-b border-gray-200">
							<div className="flex h-16 items-center">
								<button
									type="button"
									className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
									onClick={() => setOpen(true)}
								>
									<span className="sr-only">Open menu</span>
									<Bars3Icon className="h-6 w-6" aria-hidden="true" />
								</button>
								<div className="ml-4 flex lg:ml-0">
									
										<img className="h-8 w-auto" src="/images/logo.png" alt="" />
									
								</div>
								<div className="ml-2 flex items-center hidden lg:block">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												item.current
													? "text-accent"
													: "text-neutral-600 hover:text-accent",
												"px-3 py-2 text-sm font-medium"
											)}
											aria-current={item.current ? "page" : undefined}
										>
											{item.name}
										</Link>
									))}
								</div>
								<div className="flex items-center ml-auto">
									<div className="absolute inset-y-0 right-3 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
										<Menu as="div" className="relative ml-3">
											<div>
												<Menu.Button className="flex h-9 w-9 rounded-full ring-2 ring-neutral-600 text-sm focus:outline-none focus:ring-accent items-center justify-center">
													{userData ? (
														<p className="font-bold text-gray-800 text-lg">
															{userData?.fullName.split(" ")[0][0]}
														</p>
													) : (
														<Loader2 className="text-slate-500 h-4 w-4 animate-spin" />
													)}
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<Menu.Item>
														{({ active }) => (
															<Link
																href="/home/profile"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700 rounded-t-md"
																)}
															>
																Your Profile
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<Link
																href="/home/settings"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Settings
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{() => (
															<span
																onClick={onClickLogout}
																className="cursor-pointer block rounded-b-md px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-accent"
															>
																Sign out
															</span>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</header>
			</div>
		</div>
	);
}
