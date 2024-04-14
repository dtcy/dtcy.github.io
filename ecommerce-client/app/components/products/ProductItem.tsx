import Link from "next/link";
import React from "react";
import { Product } from "@/app/type/ProductModel";
function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card bg-base-300 shadow-xl mb-4">
      <Link href={`/product/${product.slug}`}>
        <img
          className="mt-5 ml-9"
          alt={product.name}
          src={product.image}
          width={300}
          height={300}
        />
        <div className="card-body">
          <h2 className="card-title font-normal">{product.name}</h2>
          <p className="mb-2">{product.brand}</p>
          <div className="card-actions flex items-center justify-between"></div>
          <span className="text-2xl">KRW {product.price}</span>
        </div>{" "}
      </Link>
    </div>
  );
}

export default ProductItem;
