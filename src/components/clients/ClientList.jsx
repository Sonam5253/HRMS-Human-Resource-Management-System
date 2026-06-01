import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

export default function ClientList({
  clients,
  search,
  setSearch,
  filter,
  setFilter,
  onDelete,
  onEdit,
  onView,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const closeMenus = () => {
      setShowFilter(false);
      setOpenMenu(null);
    };

    window.addEventListener("click", closeMenus);

    return () => window.removeEventListener("click", closeMenus);
  }, []);

  return (
    <>
      <div className="overflow-visible border-b border-slate-100 px-3 py-3">
        <div className="flex items-center gap-3 sm:justify-between">
          <div className="relative flex-1 sm:max-w-[260px]">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="h-10 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-violet-400"
            />
          </div>

          <div
            className="relative shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFilter((prev) => !prev);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 sm:h-10 sm:w-auto sm:min-w-[170px] sm:justify-between sm:px-3"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-violet-500" />

                <span className="hidden text-xs font-medium sm:block">
                  {filter === "all" && "All Clients"}
                  {filter === "Recent" && "Recent Clients"}
                  {filter === "Active" && "Active Clients"}
                </span>
              </div>

              <ChevronDown
                size={14}
                className={`hidden text-slate-400 transition sm:block ${
                  showFilter ? "rotate-180" : ""
                }`}
              />
            </button>

            {showFilter && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[9999] w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] sm:w-52">
                {[
                  { label: "All Clients", value: "all" },
                  { label: "Recent Clients", value: "Recent" },
                  { label: "Active Clients", value: "Active" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setFilter(item.value);
                      setShowFilter(false);
                    }}
                    className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-xs font-medium transition ${
                      filter === item.value
                        ? "bg-violet-50 text-violet-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-[1.2fr_1fr_120px_60px] items-center border-b border-slate-100 bg-slate-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:grid">
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div className="text-center">Action</div>
      </div>

      <div className="min-h-[420px] max-h-[620px] overflow-y-auto">
        {clients.length === 0 ? (
          <div className="flex h-[320px] items-center justify-center text-sm text-slate-400">
            No Clients Found
          </div>
        ) : (
          clients.map((client) => ( 
            <div
              key={client._id}
              onClick={() => onView(client)}
              className="relative grid cursor-pointer grid-cols-1 border-b border-slate-100 px-4 py-3 transition hover:bg-violet-50/30 md:grid-cols-[1.2fr_1fr_120px_60px] md:items-center"
            >
              <div className="flex items-center gap-3 pr-10 md:pr-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-xs font-semibold uppercase text-violet-700">
                  {client?.name?.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {client.name}
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400 md:hidden">
                    {client.email}
                  </p>
                </div>
              </div>

              <div className="mt-2 hidden items-center gap-2 text-xs text-slate-600 md:flex md:mt-0">
                <Mail size={13} className="text-slate-400" />
                <span className="truncate">{client.email}</span>
              </div>

              <div className="mt-1 text-xs text-slate-600 md:mt-0 sm:block">
                {client.phone}
              </div>

              <div
                className="absolute right-2 top-2 md:static md:flex md:justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === client._id ? null : client._id)
                  }
                  className="flex h-2 w-8 items-center justify-center rounded-xl  transition hover:bg-slate-50"
                >
                  <MoreHorizontal size={15} />
                </button>

                {openMenu === client._id && (
                  <div className="absolute right-0 top-10 z-20 w-32 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
                    <button
                      onClick={() => {
                        onEdit(client);
                        setOpenMenu(null);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-600 transition hover:bg-slate-50"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        onDelete(client._id);
                        setOpenMenu(null);
                      }}
                      className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}