import Form from 'next/form';
import { Search, X } from 'lucide-react';
import { Link } from '@router/customized';

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
        {query && (
          <Link href="/" className="search-btn cursor-pointer" aria-label="Clear search">
            <X className="text-white" />
          </Link>
        )}
        <button type="submit" className="search-btn">
          <Search className="text-white" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
