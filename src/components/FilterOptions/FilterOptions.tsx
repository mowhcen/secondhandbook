import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
    filterOptions: {
        category: string;
        artist: string;
    };
    setFilterOptions: Dispatch<
        SetStateAction<{
            category: string;
            artist: string;
        }>
    >;
}

export function FilterOptions({ filterOptions, setFilterOptions }: Props) {
    function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
        setFilterOptions({
            ...filterOptions,
            category: event.target.value,
        });
    }

    function handleAuthorChange(event: ChangeEvent<HTMLInputElement>) {
        setFilterOptions({
            ...filterOptions,
            artist: event.target.value,
        });
    }

    return (
        <div>
            {/* Category filter */}
            <select value={filterOptions.category} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
            </select>
            {/* Author filter */}
            <input type="text" placeholder="Filter by author..." value={filterOptions.artist} onChange={handleAuthorChange} />
        </div>
    );
}
