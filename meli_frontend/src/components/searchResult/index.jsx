import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductItem from "../productoItem";
import SearchLayout from "../searchLayout";

const SearchResult = () => {
  const results = useSelector((state) => state.data);

  useEffect(() => {
  }, [results]);

  return (
    <SearchLayout>
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-end-12">
            {results?.length > 0 ? (
              <div>
                {results.map((result) => (
                  <ProductItem key={result.id} id={result.id} />
                ))}
              </div>
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        </div>
      </div>
    </SearchLayout>
  );
};

export default SearchResult;