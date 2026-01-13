import { Search } from 'lucide-react';

const SearchFormSkeleton = () => {
  return (
    <div className="search-form cursor-wait">
      <input
        name="query"
        placeholder="Search Startups"
        className="search-input pointer-events-none"
        type="text"
      />
      <div className="flex gap-2 pointer-events-none">
        <button name="search btn" type="submit" className="search-btn pointer-events-none">
          <Search className="text-white pointer-events-none" />
        </button>
      </div>
    </div>
  );
};

export default SearchFormSkeleton;
