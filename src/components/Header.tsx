interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <div className="flex-shrink-0">
        <img
          src="/icons/collection-search-logo.svg"
          className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32"
          alt="Logo"
        />
      </div>

      <div className="relative md:flex-grow max-w-xs sm:max-w-sm lg:max-w-md">
        <img
          src="/icons/search-icon.svg"
          className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2"
          alt="Search icon"
        />
        <input
          type="text"
          placeholder="You're looking for something?"
          className="w-full placeholder:text-xs bg-[#F6F6F6] placeholder-opacity-50 pl-9 pb-[2px] sm:pb-0 rounded-xl focus:outline-none focus:ring-0"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
