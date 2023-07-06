import RegisterForm from "@/components/forms/register/Register";

export default function RegisterPage() {
    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-0 py-4 md:p-12 bg-stone-100">
            <RegisterForm />
        </div>
    );
}
