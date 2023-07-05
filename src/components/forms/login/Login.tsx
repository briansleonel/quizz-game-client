"use client";

import { useForm, FormProvider } from "react-hook-form";
import Input from "../input/Input";
import Button from "../../button/ButtonPrimary";
import { toast } from "react-toastify";
import { loginRequest } from "@/services/user.service";
import { PersonFill } from "react-bootstrap-icons";

interface Inputs {
    username: string;
    password: string;
}

export default function LoginForm() {
    const formMethods = useForm<Inputs>();

    const onSubmit = formMethods.handleSubmit(
        async (data) => {
            try {
                const res = await loginRequest(data);
                toast.success(res.message);
            } catch (error) {
                console.log(error);
                if (error instanceof Error) toast.error(error.message);
            }
        },
        (err) => {
            toast.info("Ingrese sus credenciales");
        }
    );

    return (
        <FormProvider {...formMethods}>
            <form
                action=""
                onSubmit={onSubmit}
                className="max-w-sm p-8 bg-gray-900 text-white rounded-md flex flex-col relative"
            >
                <div className="w-28 h-28 rounded-full bg-slate-800 absolute -top-14 left-1/3 flex justify-center items-center ">
                    <PersonFill size="80%" />
                </div>
                <Input
                    name="username"
                    type="text"
                    placeholder="Nombre de usuario"
                    style="underline"
                    className="mt-8"
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    style="underline"
                    className="mt-6"
                />

                <Button text="Ingresar" className="mt-6" />
            </form>
        </FormProvider>
    );
}

/**
export default function LoginForm() {
    const formMethods = useForm<Inputs>();
    const {
        formState: { errors },
    } = formMethods;

    const onSubmit = formMethods.handleSubmit((data) => console.log(data));

    return (
        <FormProvider {...formMethods}>
            <form
                action=""
                onSubmit={onSubmit}
                className="max-w-sm p-8 bg-gray-900 text-white rounded-md flex flex-col"
            >
                <Input
                    name="username"
                    type="text"
                    placeholder="Nombre de usuario"
                />

                {errors.username && (
                    <AlertDanger
                        text="Nombre de usuario requerido"
                        className="mt-2"
                    />
                )}

                <Input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    className="mt-6"
                />

                {errors.password && (
                    <AlertDanger text="Contraseña requerida" className="mt-2" />
                )}

                <ButtonPrimary text="Iniciar Sesión" className="mt-6" />
            </form>
        </FormProvider>
    );
}
 */
