"use client";

import Button from "@/components/button/ButtonPrimary";
import { IUser } from "@/types/user";
import { FormProvider, useForm } from "react-hook-form";
import InputLabel from "../input/InputLabel";
import Title from "@/components/layout/Title";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/hooks/useRegister";

export default function RegisterForm() {
    const formMethods = useForm<IUser>();
    const registerMutation = useRegisterMutation();

    const handleSubmit = formMethods.handleSubmit(
        async (formData) => {
            try {
                await registerMutation.mutateAsync(formData);
            } catch (err) {
                if (err instanceof Error) console.log(err.message);
            }
        },
        (err) => {
            toast.info("Complete todos los campos");
        }
    );

    return (
        <FormProvider {...formMethods}>
            <form
                action=""
                onSubmit={handleSubmit}
                className="max-w-lg w-full md:w-5/12 lg:w-4/12 p-8 bg-white rounded-md shadow drop-shadow-xl"
            >
                <Title title="Crear cuenta" mb="mb-6" />

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

                <Button
                    text="Registrarse"
                    className="mt-10 w-full shadow shadow-blue-950"
                />
            </form>
        </FormProvider>
    );
}
