"use client";

import Button from "@/components/button/ButtonPrimary";
import { IUser } from "@/types/user";
import { FormProvider, useForm } from "react-hook-form";
import InputLabel from "../input/InputLabel";
import { SubTitle } from "@/components/layout/Title";
import { useRegisterMutation } from "@/hooks/useRegister";
import { toastInformation } from "@/libs/sonner/sonner.toast";

export default function RegisterForm() {
    const formMethods = useForm<IUser>();
    const registerMutation = useRegisterMutation();

    const handleSubmit = formMethods.handleSubmit(
        async (formData) => {
            await registerMutation.mutateAsync(formData);
        },
        (err) => {
            toastInformation("Complete todos los campos");
        }
    );

    return (
        <FormProvider {...formMethods}>
            <form
                action=""
                onSubmit={handleSubmit}
                className="max-w-lg w-full "
            >
                <SubTitle className="mb-6">Crear cuenta</SubTitle>

                <InputLabel
                    name="firstName"
                    label="Nombre/s"
                    type="text"
                    className=""
                />
                <InputLabel
                    name="lastName"
                    label="Apellido/s"
                    type="text"
                    className="mt-4"
                />

                <InputLabel
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    className="mt-4"
                />

                <InputLabel
                    name="username"
                    label="Nombre de usuario"
                    type="text"
                    className="mt-4"
                />
                <InputLabel
                    name="password"
                    label="Contraseña"
                    type="password"
                    className="mt-4"
                />

                <Button className="mt-10 w-full shadow shadow-blue-950">
                    Registrarse
                </Button>
            </form>
        </FormProvider>
    );
}
