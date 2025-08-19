"use client";
import { X } from "lucide-react";
import { redirect } from "next/navigation";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector<HTMLFormElement>("form.search-form");
    const searchInput = form?.querySelector<HTMLInputElement>(
      "input[name='query']",
    );
    if (form && searchInput) {
      form.reset();
      searchInput.value = "";
      searchInput.defaultValue = "";
      redirect("/");
    }
  };
  return (
    <button onClick={reset} className="search-btn cursor-pointer" type="reset">
      <X className="text-white" />
    </button>
  );
};

export default SearchFormReset;
