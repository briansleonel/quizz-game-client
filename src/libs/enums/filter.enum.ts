import { IData } from "@/types/util";

export enum Verified {
    ALL = "all",
    VERIFIED = "verified",
    NOVERIFIED = "no-verified",
}

export const optionsRecents: Array<IData> = [
    { label: "Más recientes", value: "true" },
    { label: "Más antiguos", value: "false" },
];

export const optionsVerified: Array<IData> = [
    { label: "Todos", value: Verified.ALL },
    { label: "Verificados", value: Verified.VERIFIED },
    { label: "No verificados", value: Verified.NOVERIFIED },
];
