import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from "react";

interface Props {
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
}

export function SearchBar({ searchQuery, setSearchQuery }: Props) {
    // State for search input value
    const [inputValue, setInputValue] = useState("");

    // Update search query state when input value changes
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    // Trigger search when Enter key is pressed
    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            setSearchQuery(inputValue);
        }
    }

    return (
        <div className="w-full md:w-1/3 px-3 mb-6 mt-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="search">
                Search Book
            </label>
            <input
                type="text"
                id="search"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Search books..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
}
