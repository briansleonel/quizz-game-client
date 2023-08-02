import { Dialog, Transition } from "@headlessui/react";
import Button from "../button/ButtonPrimary";
import { Fragment } from "react";
import { XLg } from "react-bootstrap-icons";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children: React.ReactNode;
}

export default function ModalDialog({
    closeModal,
    isOpen,
    title,
    children,
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full md:w-8/12 lg:w-6/12 transform overflow-hidden bg-white p-2 text-left align-middle transition-all rounded shadow-md shadow-gray-950/30">
                                <div className="flex justify-between items-center border-b border-neutral-100">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-normal text-base uppercase pl-2 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <Button
                                        className="bg-white text-zinc-950 hover:bg-white hover:drop-shadow transition-all shadow-none drop-shadow-none"
                                        onClick={closeModal}
                                    >
                                        <XLg className="text-xl" />
                                    </Button>
                                </div>

                                <div className="mt-2 p-2 flex flex-col items-center">{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
