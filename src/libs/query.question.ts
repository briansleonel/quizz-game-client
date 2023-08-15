import { Verified } from "./enums/filter.enum";

export function convertVerifiedQuery(verified: string) {
    return verified === Verified.VERIFIED
        ? "true"
        : verified === Verified.NOVERIFIED
        ? "false"
        : "";
}

interface Params {
    recents: boolean;
    verified: string;
    category: string;
    user: string;
    searchText: string;
}

export function getQueryQuestion({
    category,
    recents,
    searchText,
    user,
    verified,
}: Params) {
    const verifiedQuery = `verified=${convertVerifiedQuery(verified)}`;
    const recentQuery = `recents=${recents}`;
    const categoryQuery = `category=${category === "all" ? "" : category}`;
    const userQuery = `user=${user === "all" ? "" : user}`;
    const textQuery = `text=${searchText}`;

    return `&${verifiedQuery}&${recentQuery}&${categoryQuery}&${userQuery}&${textQuery}`;
}
