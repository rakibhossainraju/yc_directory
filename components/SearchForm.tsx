import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "@/components/SearchFormReset";

const SearchForm = ({ query }: { query: string }) => {
  return (
    <Form className="search-form" action="/" scroll={false}>
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="search-input"
        type="text"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn">
          <Search className="text-white" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
