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
        <div>
            <input
                type="text"
                placeholder="Search books..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
}
