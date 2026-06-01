import { useState } from "react";
import DesignationForm from "../../components/designation/DesignationForm";
import useDesignation from "../../hooks/useDesignation";
import Modal from "../../components/commons/Modal";
// import Button from "../../components/commons/Button";
import Button from "../../components/commons/Button";


export default function DesignationPage() {
  const [open, setOpen] = useState(false);
  const { createDesignationHandler, loading } = useDesignation();

  const handleSubmit = async (data) => {
    try {
      const res = await createDesignationHandler(data);
      alert(res.message);
      setOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Designations
          </h1>
          <p className="text-sm text-slate-500">
            Manage company designations
          </p>
        </div>

        <Button
          text="Create Designation"
          variant="brand"
          width="auto"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* EMPTY STATE (abhi ke liye) */}
      <div className="bg-white border rounded-xl p-10 text-center text-slate-400">
        No designations yet
      </div>

      {/* MODAL */}
      {open && (
        <Modal
          title="Create Designation"
          onClose={() => setOpen(false)}
        >
          <DesignationForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
}