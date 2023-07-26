"use client";

import React, { MouseEvent, useState } from "react";
import { X, XLg } from "react-bootstrap-icons";
import Button from "../button/ButtonPrimary";

interface Props {
    closeModal: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ children, closeModal, title }: Props) {
    /*
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }
    */

    function closeModalBgClick(e: MouseEvent<HTMLDivElement>) {
        if (e.currentTarget.id === "modal-bg") {
            console.log("closing");

            closeModal();
        }
    }

    return (
        <div
            id="modal-bg"
            className="fixed z-50 inset-0 w-full min-h-screen bg-zinc-700/50 flex flex-col justify-center items-center"
        >
            <div className="bg-white w-full md:w-8/12 lg:w-6/12  max-w-screen-md max-h-screen rounded flex flex-col relative drop-shadow-xl shadow-md shadow-gray-950/30">
                <div className="flex justify-between items-center p-2 border-b border-neutral-100">
                    <span className="font-light text-base uppercase pl-2">
                        {title ? title : ""}
                    </span>
                    <Button
                        className="bg-white text-zinc-950 hover:bg-white hover:drop-shadow transition-all shadow-none drop-shadow-none"
                        onClick={closeModal}
                    >
                        <XLg className="text-xl" />
                    </Button>
                </div>
                <div className="w-full flex flex-col items-center overflow-y-auto p-8 pt-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
