import { useState } from "react";

export default function TaskAttachments({
  attachments = [],
  onAdd,
  onRemove,
}) {
  const safeAttachments = Array.isArray(attachments)
    ? attachments
    : [];

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-2">Attachments</h4>

      {/* ADD ATTACHMENT */}
      <label
        className="
          inline-block cursor-pointer text-sm text-blue-600
          hover:underline
        "
      >
        + Add attachment
        <input
          type="file"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onAdd(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </label>

      {/* EMPTY STATE */}
      {safeAttachments.length === 0 && (
        <div className="mt-3 text-xs text-gray-500">
          No attachments added yet
        </div>
      )}

      {/* ATTACHMENT LIST */}
      {safeAttachments.length > 0 && (
        <div className="space-y-2 mt-3">
          {safeAttachments.map((a) => {
            const fileUrl = a.file || "";
            const fileName =
              fileUrl?.split("/").pop() ||
              a.name ||
              "Attachment";

            return (
              <div
                key={a.id}
                className="
                  relative
                  flex justify-between items-center
                  border border-gray-200 dark:border-white/10
                  rounded p-2
                  bg-gray-50 dark:bg-white/5
                "
              >
                {/* FILE INFO */}
                <div className="flex flex-col max-w-[85%]">
                  {fileUrl ? (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 break-all"
                    >
                      {fileName}
                    </a>
                  ) : (
                    <span className="text-sm break-all">
                      {fileName}
                    </span>
                  )}

                  {a.created_at && (
                    <span className="text-xs text-gray-500">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* THREE DOT MENU */}
                <button
                  className="text-xl px-2"
                  onClick={() =>
                    setMenuOpenId(
                      menuOpenId === a.id ? null : a.id
                    )
                  }
                >
                  ⋮
                </button>

                {/* DROPDOWN */}
                {menuOpenId === a.id && (
                  <div className="
                    absolute right-2 top-8
                    w-28 bg-white dark:bg-gray-800
                    border rounded shadow z-20
                  ">
                    <button
                      className="w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
                      onClick={() => {
                        alert("Edit attachment (future)");
                        setMenuOpenId(null);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        setConfirmDeleteId(a.id);
                        setMenuOpenId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded p-4 w-80">
            <h4 className="font-semibold mb-2">
              Delete attachment?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete this attachment?
            </p>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 text-sm"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                onClick={() => {
                  onRemove(confirmDeleteId); // 🔥 API CALL parent me
                  setConfirmDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
