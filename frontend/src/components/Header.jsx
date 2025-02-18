import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-between px-8">
        {/* Product Grid (visible on large screens) */}
        <div className="hidden lg:grid grid-cols-2 gap-4 w-full lg:w-1/2">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>

        {/* Carousel (visible on all screens) */}
        <div className="w-full lg:w-1/2">
          <ProductCarousel />
        </div>
      </div>
    </>
  );
};

export default Header;
