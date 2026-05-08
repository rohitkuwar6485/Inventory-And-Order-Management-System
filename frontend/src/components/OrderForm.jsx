import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../apis/orderApi";
import { getProducts } from "../apis/productApi";

function OrderForm() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([
        { product: "", quantity: 1 },
    ]);

    // GET PRODUCTS
    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // HANDLE CHANGE
    const handleChange = (index, field, value) => {
        const updated = [...orderItems];
        updated[index][field] = value;
        setOrderItems(updated);
    };

    // ADD ROW
    const addRow = () => {
        setOrderItems([
            ...orderItems,
            { product: "", quantity: 1 },
        ]);
    };

    // REMOVE ROW
    const removeRow = (index) => {
        const updated = orderItems.filter((_, i) => i !== index);
        setOrderItems(updated);
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await createOrder({
                products: orderItems,
            });

            alert(res.data.message);

            setOrderItems([
                { product: "", quantity: 1 },
            ]);

            // REDIRECT TO ORDERS PAGE
            navigate("/orders");
            
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate("/orders")}
                className="absolute top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800"
            >
                Back
            </button>

            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl"
            >

                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
                    Create Order
                </h1>

                {/* ORDER ITEMS */}
                {orderItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row gap-3 mb-4"
                    >

                        {/* PRODUCT SELECT */}
                        <select
                            value={item.product}
                            onChange={(e) =>
                                handleChange(index, "product", e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">
                                Select Product
                            </option>

                            {products.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.name} (Stock: {p.stock})
                                </option>
                            ))}
                        </select>

                        {/* QUANTITY */}
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                                handleChange(index, "quantity", e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* REMOVE BUTTON */}
                        <button
                            type="button"
                            onClick={() => removeRow(index)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Remove
                        </button>

                    </div>
                ))}

                {/* ADD BUTTON */}
                <button
                    type="button"
                    onClick={addRow}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg mb-5"
                >
                    + Add Product
                </button>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded-lg text-lg font-semibold"
                >
                    Place Order
                </button>

            </form>

        </div>
    );
}

export default OrderForm;