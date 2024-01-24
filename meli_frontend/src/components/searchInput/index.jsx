import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchAsync } from "../../store/slices/searchSlice";
import imgButton from "../../Assets/ic_Search.png";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (searchValue.length >= 3) {
      dispatch(searchAsync(searchValue));
      navigate(`/items?search=${searchValue}`);
    }
  };

  const handleSearchClick = () => {
    if (searchValue.length > 3) {
      dispatch(searchAsync(searchValue));
      navigate(`/items?search=${searchValue}`);
    }
  };

  return (
    <div className="flex items-center">
      <input
        className="flex-1 px-4 py-2 rounded-l-md"
        placeholder="Nunca dejes de buscar"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleSearchKeyPress}
      />
      <button
        className="bg-gray-200 px-4 py-2 rounded-r-md"
        style={{ height: "40px" }}
        onClick={handleSearchClick}
      >
        <img src={imgButton} alt="Search" />
      </button>
    </div>
  );
};

export default SearchInput;