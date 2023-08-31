import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Check, ChevronExpand } from "react-bootstrap-icons";

interface Props<T> {
    selected: T | undefined;
    setSelected: (arg: T) => void;
    valueShow: string;
    children: React.ReactNode;
}

export function ListBox<S>({
    selected,
    setSelected,
    valueShow,
    children,
}: Props<S>) {
    return (
        <div className="w-full relative">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 border border-gray-400 text-left shadow-md focus:outline-none sm:text-sm">
                        <span className="block truncate text-neutral-900">
                            {valueShow.toUpperCase() || "Seleccione una opción"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronExpand
                                className="h-5 w-5 text-gray-500"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base drop-shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                            {children}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

interface PropsOption<T> {
    value: T;
    children: React.ReactNode;
}

export function ListBoxOption<S>({ children, value }: PropsOption<S>) {
    return (
        <Listbox.Option
            className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-neutral-900 text-white" : "text-gray-900"
                }`
            }
            value={value}
        >
            {({ selected }) => (
                <>
                    <span
                        className={`block truncate uppercase ${
                            selected ? "font-medium" : "font-normal"
                        }`}
                    >
                        {children}
                    </span>
                    {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-500">
                            <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                    ) : null}
                </>
            )}
        </Listbox.Option>
    );
}
