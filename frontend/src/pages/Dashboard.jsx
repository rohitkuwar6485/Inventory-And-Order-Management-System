import { Link } from "react-router-dom";

function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const cards = [
    {
      title: "Products",
      desc: "Manage Products (Create, Read, Update, Deactivate)",
      path: "/products",
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      desc: "Manage Orders (Create, Read, Track, Cancel)",
      path: "/orders",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-black text-white flex justify-between p-4">
        <h1 className="font-bold text-xl">Inventory Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">

        {cards.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`${item.color} text-white p-6 rounded shadow hover:scale-105 transition`}
          >
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="mt-2">{item.desc}</p>
          </Link>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;