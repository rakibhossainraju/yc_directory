'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@router/customized';
import { Search, X } from 'lucide-react';

const SearchForm = ({ query }: { query: string }) => {
  const [searchValue, setSearchValue] = useState(query);
  const router = useRouter();

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      setSearchValue('');
    } else {
      router.push(`/?query=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    router.push('/');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        name="query"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Startups"
        className="search-input"
        type="text"
      />
      <div className="flex gap-2">
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="search-btn cursor-pointer"
            aria-label="Clear search"
          >
            <X className="text-white" />
          </button>
        )}
        <button type="submit" className="search-btn">
          <Search className="text-white" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
