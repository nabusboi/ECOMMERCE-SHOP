import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          {/* Align header and Shop button horizontally */}
          <div className="flex justify-between items-center mx-8 my-10">
            <h1 className="text-4xl font-bold">Special Products</h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-8 hover:bg-pink-700 transition duration-300 ease-in-out"
            >
              Shop
            </Link>
          </div>

          {/* Align products in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {data?.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
