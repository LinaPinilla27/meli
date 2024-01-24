import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetailsAsync } from "../../store/slices/searchSlice";
import "./index.scss";

const ProductItem = ({ id: propId }) => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();

  const id = propId || paramId;
  const isPropIdPresent = propId !== undefined;

  const productRef = useRef();
  productRef.current = useSelector((state) => {
    if (isPropIdPresent) {
      return state.data.find((item) => item.id === id);
    } else {
      return state.productDetails[id];
    }
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
  }, [dispatch, id, isPropIdPresent]);

  const product = productRef.current;

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  const { picture, title, price } = product;

  return (
    <Link
      to={`/items/${id}`}
      className="mx-auto bg-white overflow-hidden shadow-md flex border-solid border-b border-gray-200"
      style={{
        borderRadius: "0",
        borderBottomWidth: "0.5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "180px",
          height: "180px",
          margin: "0 12px",
          overflow: "hidden",
        }}
      >
        <img
          src={`${picture}`}
          x
          alt={`Imagen de ${title}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="w-2/3 p-4">
        <p className="text-sm titlePrice mb-2">{price}</p>
        <p className="titlePrice mb-2">{title}</p>
      </div>
      <div className="w-3/3 p-4">
        <p className="text-sm titlePrice mb-2">Mendoza</p>
      </div>
    </Link>
  );
};

export default ProductItem;
