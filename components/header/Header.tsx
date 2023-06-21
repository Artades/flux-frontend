import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Api from "@/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGetUserDataFromStore } from "@/hooks/useUser";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const router = useRouter();
	const navigation = [
		{
			name: "My Links",
			href: "/home/links",
			current: router.pathname === "/home/links",
		},
		{
			name: "Create new",
			href: "/home/create",
			current: router.pathname === "/home/create",
		},
		// Add more navigation items as needed
	];

	const onClickLogout = () => {
		Api.auth.logout();
		location.href = "/";
	};

	const userData = useGetUserDataFromStore();

	return (
		<Disclosure as="nav" className="bg-transparent">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start transition">
								<div className="flex flex-shrink-0 items-center">
									<img
										className="block h-8 w-auto lg:hidden"
										src="/images/logo.png"
										alt="Your Company"
									/>
									<img
										className="hidden h-8 w-auto lg:block"
										src="/images/logo.png"
										alt="Your Company"
									/>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "border border-accent text-accent"
														: "text-neutral-600 border border-neutral-300 hover:border-accent hover:text-accent",
													"rounded-md px-3 py-2 text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>

							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex h-9 w-9 rounded-full ring-2 ring-neutral-600 text-sm focus:outline-none focus:ring-accent items-center justify-center">
											{userData ? (
												<p className="font-bold text-gray-800 text-md">
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

					<Transition
						show={open}
						enter="menu-slide-in"
						enterFrom="transform opacity-0 -translate-x-full"
						enterTo="transform opacity-100 translate-x-0"
						leave="menu-slide-out"
						leaveFrom="transform opacity-100 translate-x-0"
						leaveTo="transform opacity-0 -translate-x-full"
					>
						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-800 hover:bg-gray-700 hover:text-white",
											"block rounded-md px-3 py-2 text-base font-medium"
										)}
										aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
}
