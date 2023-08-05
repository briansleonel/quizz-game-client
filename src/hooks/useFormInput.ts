import { useState } from "react";

export function useFormInput(initialValue: string) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        setValue(e.currentTarget.value);
    }

    function resetInput(): void {
        setValue("");
    }

    function setInput(value: string) {
        setValue(value);
    }

    const inputProps = {
        value: value,
        onChange: handleChange,
    };

    return { inputProps, resetInput, setInput };
}

export function useFormTextArea(initialValue: string) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        setValue(e.currentTarget.value);
    }

    function resetInput(): void {
        setValue("");
    }

    function setInput(value: string) {
        setValue(value);
    }

    const inputProps = {
        value: value,
        onChange: handleChange,
    };

    return { inputProps, resetInput, setInput };
}
