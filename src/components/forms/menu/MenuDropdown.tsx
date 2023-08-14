import { optionsRecents } from "@/libs/enums/filter.enum";
import { IData } from "@/types/util";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Check, ChevronDown } from "react-bootstrap-icons";

interface Props<T> {
    children: React.ReactNode;
    title: string;
}

export function MenuDropdown<S>({ children, title }: Props<S>) {
    return (
        <Menu as="div" className="relative text-left">
            <Menu.Button className="relative flex w-full justify-between items-center rounded-md px-3 py-2 text-left  focus:outline-none sm:text-sm text-neutral-800 border shadow-md bg-white">
                {title}
                <ChevronDown
                    className="ml-2 -mr-1 h-5 w-5 text-neutral-500 hover:text-neutral-600"
                    aria-hidden="true"
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {children}
                    {/*optionsRecents.map((item, i) => (
                        <div key={i} className="">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-neutral-900 text-white"
                                                : "text-gray-800"
                                        } group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm`}
                                        onClick={() => setSelected(item)}
                                    >
                                        {item.label}
                                        {selected === item ? (
                                            <Check className="h-5 w-5 text-emerald-500" />
                                        ) : (
                                            ""
                                        )}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    ))*/}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export function MenuItem<S>({
    children,
    setSelected,
}: {
    children: React.ReactNode;
    setSelected: () => void;
}) {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    className={`${
                        active ? "bg-neutral-900 text-white" : "text-gray-800"
                    } group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm`}
                    onClick={() => setSelected()}
                >
                    {children}
                </button>
            )}
        </Menu.Item>
    );
}
