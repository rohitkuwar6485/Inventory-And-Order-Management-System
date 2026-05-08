import { useState } from "react";
import { loginUser, registerUser } from "../apis/authApi";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.token);

        window.location.reload();
      } else {
        await registerUser(form);
        alert("Registered Successfully");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded w-96"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            className="border w-full p-2 mb-2"
            onChange={handleChange}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-2"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-2"
          onChange={handleChange}
        />

        <button className="bg-black text-white w-full p-2">
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-center mt-2 cursor-pointer text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Create account"
            : "Already have account"}
        </p>
      </form>
    </div>
  );
}

export default AuthPage;