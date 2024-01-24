import React from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const Breadcrumb = () => {
  const categories = useSelector((state) => state.specificCategories.length > 0
    ? state.specificCategories
    : state.generalCategories);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-end-12">
          <ol className="list-none p-0 inline-flex breadcrumb-list">
            {categories.map((category, index) => (
              <li key={index} className="flex items-center">
                <span className="breadcrumb-text">{category}</span>
                {index < categories.length - 1 && (
                  <span className="mx-2 breadcrumb-text">{">"}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;