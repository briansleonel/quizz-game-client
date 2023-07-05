"use client";

import Button from "@/components/button/ButtonPrimary";
import { IUser } from "@/types/user";
import { FormProvider, useForm } from "react-hook-form";
import InputLabel from "../input/InputLabel";
import Title from "@/components/layout/Title";

export default function RegisterForm() {
    const formMethods = useForm<IUser>();

    const onSubmit = formMethods.handleSubmit((formData) => {
        console.log(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form
                action=""
                onSubmit={onSubmit}
                className="max-w-lg w-full md:w-5/12 lg:w-4/12  p-8"
            >
                <Title title="Crear cuenta" mb="mb-6" />

                <InputLabel
                    name="firstName"
                    label="Nombre/s"
                    type="text"
                    className="mt-4"
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
                />
                <InputLabel
                    name="password"
                    label="Contraseña"
                    type="password"
                    className="mt-4"
                />

                <Button text="Registrarse" className="mt-10" />
            </form>
        </FormProvider>
    );
}
