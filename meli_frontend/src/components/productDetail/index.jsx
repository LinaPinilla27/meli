import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchLayout from "../searchLayout";
import { getProductDetailsAsync } from "../../store/slices/searchSlice";
import "./index.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productRef = useRef();
  productRef.current = useSelector((state) => {
    return state.productDetails[id];
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productRef.current) {
        try {
          const response = await dispatch(getProductDetailsAsync(id));
        } catch (error) {}
      }
    };

    fetchProductDetails();
  }, [dispatch, id]);

  const product = productRef.current;

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  const { picture, title, description, price, initial_quantity } = product;

  return (
    <>
      <SearchLayout />
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-end-12">
            <div className="mx-auto bg-white overflow-hidden shadow-md border-solid border-b border-gray-200">
              <Link to={`/items/${id}`} className="block">
                <div className="grid grid-cols-12">
                  <div className="col-span-8">
                    <img
                      src={picture}
                      alt={`Imagen de ${title}`}
                      style={{
                        width: "680px",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-span-3 p-4 mt-5">
                    <p className="text-sm text-gray-500 mb-2">
                      Nuevo - {initial_quantity} vendidos
                    </p>
                    <p className="titleProduct text-sm mb-2">{title}</p>
                    <p className="text-lg font-bold mb-2">{price}</p>
                    <button className="meli-blue text-white px-2 py-1 rounded-md text-sm w-full">
                      Comprar
                    </button>
                  </div>
                  <div className="col-start-2 col-end-8 p-2">
                    <h5 className="descriptionTitle">
                      Descripción del producto
                    </h5>
                    <p className="max-w-full descriptionStyle mt-5">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
