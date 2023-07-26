import { useState } from "react";

export default function useModal() {
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    return {
        showModal,
        openModal,
        closeModal,
    };
}
