import { Dialog, Transition } from "@headlessui/react";
import Button from "../button/ButtonPrimary";
import { Fragment } from "react";
import { XLg } from "react-bootstrap-icons";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function ModalDialog({
    closeModal,
    isOpen,
    title,
    children,
    className,
}: Props) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-2 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`w-full md:max-w-md lg:max-w-lg transform overflow-hidden bg-white text-left align-middle transition-all rounded shadow-md shadow-gray-950/30 ${
                                    className ? className : ""
                                }`}
                            >
                                <div className="flex justify-between items-center border-b border-neutral-100">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-normal text-sm uppercase pl-2 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <Button
                                        className="bg-white text-zinc-800 hover:bg-white hover:drop-shadow transition-all shadow-none drop-shadow-none text-lg"
                                        onClick={closeModal}
                                    >
                                        <XLg />
                                    </Button>
                                </div>

                                <div className="p-4 flex flex-col items-center">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
