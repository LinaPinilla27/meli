import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoml from "../../Assets/Logo_ML.png";
import SearchInput from "../searchInput";
import Breadcrumb from "../breadcrumb";
import { useDispatch } from "react-redux";
import { searchAsync } from "../../store/slices/searchSlice";
import "./index.scss";

const SearchLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (searchValue) => {
    navigate(`/items?search=${searchValue}`);
  };

  useEffect(() => {
    dispatch(searchAsync("initialQuery"));
  }, [dispatch]);

  return (
    <>
      <nav className="p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-start-2 col-end-3">
              <img src={logoml} alt="logo" />
            </div>
            <div className="col-start-3 col-end-12">
              <SearchInput onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </nav>
      <Breadcrumb />
      <main className="mt-2">{children}</main>
    </>
  );
};

export default SearchLayout;
