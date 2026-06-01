import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerEmployeeThunk } from "../features/auth/authSlice";

export default function EmployeeRegister() {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "employee",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await dispatch(registerEmployeeThunk(form));

    setOpen(false);

  };

  return (

    <div>

      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        Register Employee
      </button>

      {/* Modal */}
      {open && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Register Employee
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                name="full_name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <select
                name="role"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </select>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded"
              >
                Register
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}