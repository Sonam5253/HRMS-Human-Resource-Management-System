import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../../services/clientApi";
import DeleteConfirm from "../../components/commons/DeleteConfirm";
import ClientStats from "../../components/clients/ClientStats";
import ClientList from "../../components/clients/ClientList";
import ClientModal from "../../components/clients/ClientModal";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
const [openModal, setOpenModal] = useState(false);
const [editingClient, setEditingClient] = useState(null);
const [selectedClient, setSelectedClient] = useState(null);
const [deleteClientId, setDeleteClientId] = useState(null);
const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
});

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response?.data || []);
    } catch (error) {
      console.log("GET CLIENT ERROR", error);
    }
  };
  const filteredClients = useMemo(() => {
  let data = clients.filter(
    (client) =>
      client &&
      (
        client.name?.toLowerCase().includes(search.toLowerCase()) ||
        client.email?.toLowerCase().includes(search.toLowerCase()) ||
        client.phone?.includes(search)
      )
  );

  if (filter === "Recent") {
    data = [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (filter === "Active") {
    data = data.filter((client) => client?.name);
  }

  return data;
}, [clients, search, filter]);
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
  setForm({
    name: "",
    email: "",
    phone: "",
  });

  

  setEditingClient(null);
};

 const handleSubmit = async () => {
  if (!form.name || !form.email || !form.phone) return;

  try {
    if (editingClient) {
      await updateClient(editingClient._id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
    } else {
      await createClient({
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
    }

    await fetchClients();
    resetForm();
    setOpenModal(false);
  } catch (error) {
    console.log("SUBMIT CLIENT ERROR", error);
  }
  };

  const handleEdit = (client) => {
  setEditingClient(client);

  setForm({
    name: client.name || "",
    email: client.email || "",
    phone: client.phone || "",
  });

  setOpenModal(true);
};

 

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((client) => client._id !== id));
    } catch (error) {
      console.log("DELETE CLIENT ERROR", error);
    }
  };
  return (
    <div className="space-y-2 bg-[#f8f8fc]">
      <div className="flex items-start justify-between gap-3 sm:items-center">
  <div>
    <h1 className="text-lg  text-slate-900">Clients</h1>
    <p className="  text-sm text-slate-500">
      Manage all your clients and company records in one place.
    </p>
  </div>

  <button
    onClick={() => setOpenModal(true)}
    className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-xl bg-brand px-2 py-2 text-xs font-medium text-white shadow-sm"
  >
    <Plus size={14} />
    <span className="whitespace-nowrap">Add Client</span>
  </button>
</div>
      <ClientStats clients={clients} />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ClientList
  clients={filteredClients}
  search={search}
  setSearch={setSearch}
  filter={filter}
  setFilter={setFilter}
  onDelete={(id) => setDeleteClientId(id)}
  onEdit={handleEdit}
  onView={setSelectedClient}
/>

<ClientModal
  open={openModal}
  onClose={() => {
    setOpenModal(false);
    resetForm();
  }}
  form={form}
  handleChange={handleChange}
  onSubmit={handleSubmit}
  isEdit={!!editingClient}
/>
{selectedClient && (
  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 p-2 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Client Details
          </h2>
          
        </div>

        <button
          onClick={() => setSelectedClient(null)}
          className="rounded-xl px-2 py-1 text-slate-400 hover:bg-slate-100"
        >
          ✕
        </button>
      </div>
      <div className="    grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
          <p className="text-[11px] uppercase text-slate-400">Name</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {selectedClient.name}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
  <p className="text-[11px] uppercase text-slate-400">Email</p>
  <p className="mt-1 break-all text-sm text-slate-700">
    {selectedClient.email}
  </p>
</div>

        
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
  <p className="text-[11px] uppercase text-slate-400">Phone</p>
  <p className="mt-1 text-sm text-slate-700">
    {selectedClient.phone}
  </p>
</div>

<div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
  <p className="text-[11px] uppercase text-slate-400">Created</p>
  <p className="mt-1 text-sm text-slate-700">
    {new Date(selectedClient.createdAt).toLocaleDateString()}
  </p>
</div>
          
        
      </div>
      </div>
  </div>
)}

<DeleteConfirm
  open={!!deleteClientId}
  onClose={() => setDeleteClientId(null)}
  onConfirm={async () => {
    await handleDelete(deleteClientId);
    setDeleteClientId(null);
  }}
  title="Delete Client?"
  message="Are you sure you want to delete this client? This action cannot be undone."
/>
    </div>
    </div>
    
  );

}


