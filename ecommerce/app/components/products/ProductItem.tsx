import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <div style={{ border: "1px solid red", marginBottom: "1rem" }}>
      {/* <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            alt={product.name}
            src={product.image}
            width={300}
            height={300}
          />
          <div className="card-body">
            <h2>{product.name}</h2>
            <p>{product.brand}</p>
            <span>{product.price}</span>
          </div>
        </a>
      </Link> */}
    </div>
  );
};

export default ProductItem;
