interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="logo text-2xl font-bold">Logo</div>
      <input
        type="text"
        placeholder="You're looking for something?"
        className="p-2 border rounded-md w-1/3"
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
};

export default Header;
