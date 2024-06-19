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
        <>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="filter">
                    State
                </label>
                <div className="relative">
                    {/* Category filter */}
                    <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="filter"
                        value={filterOptions.category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="filter-input">
                    Author Search
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="filter-input"
                    type="text"
                    placeholder="Filter by author..."
                    value={filterOptions.artist}
                    onChange={handleAuthorChange}
                />
            </div>
        </>
    );
}
