import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <section className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="lg:w-[50%] w-full p-8 lg:p-12 flex items-center justify-center">
            <div className="w-full">
              <h1 className="text-3xl font-semibold text-white mb-6">Sign In</h1>

              <form onSubmit={submitHandler}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-300"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {isLoading && <Loader />}
              </form>

              <div className="mt-4 text-center">
                <p className="text-white">
                  New Customer?{" "}
                  <Link
                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                    className="text-pink-500 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-[50%] w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
              alt="Login Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
