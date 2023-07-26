"use client";

import { useState } from "react";
import Button from "../button/ButtonPrimary";
import { Plus } from "react-bootstrap-icons";
import Modal from "./Modal";
import useModal from "@/hooks/useModal";
import RegisterForm from "../forms/register/Register";

export default function ModalUser() {
    const { showModal, closeModal, openModal } = useModal();

    return (
        <>
            <Button
                className="bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-sm py-1 px-3"
                onClick={openModal}
            >
                <span>Agregar</span>
                <Plus className="ml-1 text-2xl font-extrabold" />
            </Button>

            {showModal && (
                <Modal title="Hola" closeModal={closeModal}>
                    <RegisterForm />
                </Modal>
            )}
        </>
    );
}
