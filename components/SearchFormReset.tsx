"use client";
import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector<HTMLFormElement>("form");
    const searchInput = form?.querySelector<HTMLInputElement>(
      "input[name='query']",
    );
    if (form && searchInput) {
      form.reset();
      searchInput.value = "";
      searchInput.defaultValue = "";
    }
  };
  return (
    <button onClick={reset} className="search-btn" type="reset">
      <Link href="/">
        <X className="text-white" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
