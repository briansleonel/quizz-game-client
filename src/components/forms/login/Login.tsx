"use client";

import { useForm, FormProvider } from "react-hook-form";
import InputFormContext from "../input/InputFormContext";
import Button from "../../button/ButtonPrimary";
import { PersonFill } from "react-bootstrap-icons";
import { useLoginMutation } from "@/hooks/useLogin";
import { toastInformation } from "@/libs/sonner/sonner.toast";

interface Inputs {
    username: string;
    password: string;
}

export default function LoginForm() {
    const formMethods = useForm<Inputs>();
    const loginMutation = useLoginMutation();

    const handleSubmit = formMethods.handleSubmit(
        async (formData) => {
            await loginMutation.mutateAsync(formData);
        },
        (err) => {
            toastInformation("Ingrese sus credenciales");
        }
    );

    return (
        <FormProvider {...formMethods}>
            <form
                method="POST"
                onSubmit={handleSubmit}
                className="max-w-sm p-8 bg-zinc-900 text-white rounded-md flex flex-col relative shadow-md drop-shadow-xl"
            >
                <div className="w-28 h-28 rounded-full bg-neutral-950 absolute -top-14 left-1/3 flex justify-center items-center ">
                    <PersonFill size="80%" />
                </div>
                <InputFormContext
                    name="username"
                    type="text"
                    placeholder="Nombre de usuario"
                    style="underline"
                    className="mt-8"
                />

                <InputFormContext
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    style="underline"
                    className="mt-6"
                />

                <Button className="mt-6">Ingresar</Button>
            </form>
        </FormProvider>
    );
}
