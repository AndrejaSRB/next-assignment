type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => (
  <input
    type="text"
    placeholder="Search assets..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-1/2 rounded-lg bg-customDarkerGray px-4 py-2 text-md focus:outline-none"
  />
);

export default SearchInput;
