import "./SelectBar.css";

const SelectBar = ({ handleSearch }) => {
  return (
    <>
      <button className="searchButton" onClick={handleSearch}>
        검색
      </button>
    </>
  );
};

export default SelectBar;
