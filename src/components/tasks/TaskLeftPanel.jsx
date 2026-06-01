import { useEffect, useRef, useState } from "react";
import TaskActivity from "./TaskActivity";
import TaskAttachments from "./TaskAttachments";
import {
  createSubtaskApi,
  uploadTaskAttachmentApi,
  deleteTaskAttachmentApi,
  getTaskByIdApi,
  updateSubtaskApi,
  deleteSubtaskApi,
} from "../../services/taskApi";

export default function TaskLeftPanel({
  activeTask,
  setActiveTask,
  collapsed,
}) {
  const [showAddInput, setShowAddInput] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editSubtaskTitle, setEditSubtaskTitle] = useState("");
  const [confirmDeleteSubtaskId, setConfirmDeleteSubtaskId] = useState(null);

  const descRef = useRef(null);

  /* 🔥 Load fresh task when id changes */
  useEffect(() => {
    const fetchTask = async () => {
      if (!activeTask?.id) return;

      const res = await getTaskByIdApi(activeTask.id);
      const updated = res?.data;

      if (updated?.id) {
        setActiveTask((prev) => ({
          ...prev,
          ...updated,
        }));
      }
    };

    fetchTask();
  }, [activeTask?.id]);

  /* 🔥 Keep description stable */
  useEffect(() => {
    if (descRef.current) {
      descRef.current.innerHTML = activeTask?.desc || "";
    }
  }, [activeTask?.id]);

  /* ================= ATTACHMENTS ================= */

  const handleAddAttachment = async (files) => {
    if (!activeTask?.id) return;

    await uploadTaskAttachmentApi(activeTask.id, files);

    // Refresh task to get updated attachments
    const res = await getTaskByIdApi(activeTask.id);
    if (res?.data) {
      setActiveTask((prev) => ({
        ...prev,
        attachments: res.data.attachments,
      }));
    }
  };

  const handleRemoveAttachment = async (id) => {
    if (!activeTask?.id) return;

    await deleteTaskAttachmentApi(id);

    const res = await getTaskByIdApi(activeTask.id);
    if (res?.data) {
      setActiveTask((prev) => ({
        ...prev,
        attachments: res.data.attachments,
      }));
    }
  };

  const subtasks = activeTask?.subtasks || [];

  return (
    <div
      className={`w-full lg:flex-1 p-4 sm:p-6 overflow-y-auto border-r bg-white ${
        collapsed ? "lg:hidden" : ""
      }`}
    >
      {/* ================= TITLE ================= */}
      <input
        className="w-full mb-3 p-2 text-lg font-semibold rounded border"
        value={activeTask?.title || ""}
        onChange={(e) =>
          setActiveTask({
            ...activeTask,
            title: e.target.value,
          })
        }
        placeholder="Add a summary"
      />

      {/* ================= DESCRIPTION ================= */}
      <div className="border rounded mb-4">
        <div
          ref={descRef}
          contentEditable
          className="min-h-[150px] p-3 outline-none text-sm"
          onInput={(e) =>
            setActiveTask({
              ...activeTask,
              desc: e.currentTarget.innerHTML,
            })
          }
        />
      </div>

      {/* ================= ATTACHMENTS ================= */}
      <TaskAttachments
        attachments={activeTask?.attachments || []}
        onAdd={handleAddAttachment}
        onRemove={handleRemoveAttachment}
      />

      {/* ================= SUBTASKS ================= */}
      {!activeTask?.isSubtask && (
        <div className="mt-6 mb-4">
          <h4 className="font-semibold mb-3">Subtasks</h4>

          {subtasks.map((s) => (
            <div
              key={s.id}
              className="relative border rounded p-2 mb-2 flex justify-between items-center bg-gray-50"
            >
              {/* EDIT MODE */}
              {editingSubtaskId === s.id ? (
                <input
                  className="flex-1 text-sm border rounded px-2 py-1"
                  value={editSubtaskTitle}
                  autoFocus
                  onChange={(e) => setEditSubtaskTitle(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter" && editSubtaskTitle.trim()) {
                      const res = await updateSubtaskApi(
                        s.id,
                        editSubtaskTitle.trim()
                      );

                      setActiveTask((prev) => ({
                        ...prev,
                        subtasks: prev.subtasks.map((st) =>
                          st.id === s.id
                            ? { ...st, title: res.data.title }
                            : st
                        ),
                      }));

                      setEditingSubtaskId(null);
                      setEditSubtaskTitle("");
                    }
                  }}
                />
              ) : (
                <p className="text-sm flex-1">{s.title}</p>
              )}

              {/* THREE DOT */}
              <button
                className="text-lg px-2 leading-none"
                onClick={() =>
                  setMenuOpenId(menuOpenId === s.id ? null : s.id)
                }
              >
                ⋮
              </button>

              {/* MENU */}
              {menuOpenId === s.id && (
                <div className="absolute right-2 top-8 bg-white border rounded shadow text-sm z-20">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setEditingSubtaskId(s.id);
                      setEditSubtaskTitle(s.title);
                      setMenuOpenId(null);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="block px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left"
                    onClick={() => {
                      setConfirmDeleteSubtaskId(s.id);
                      setMenuOpenId(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ADD SUBTASK */}
          {!showAddInput ? (
            <div
              className="text-sm cursor-pointer p-2 text-gray-500"
              onClick={() => setShowAddInput(true)}
            >
              + Add subtask
            </div>
          ) : (
            <input
              className="w-full p-2 text-sm rounded border"
              autoFocus
              placeholder="Enter subtask name"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter" && newSubtask.trim()) {
                  const res = await createSubtaskApi(
                    activeTask.id,
                    newSubtask.trim(),
                    activeTask.project // 👈 pass project ID
                  );

                  setActiveTask((prev) => ({
                    ...prev,
                    subtasks: [
                      ...prev.subtasks,
                      { id: res.data.id, title: res.data.title },
                    ],
                  }));

                  setNewSubtask("");
                  setShowAddInput(false);
                }
              }}
            />
          )}
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmDeleteSubtaskId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded p-5 w-80 shadow-lg">
            <h4 className="font-semibold mb-3">
              Delete Subtask?
            </h4>

            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-1 text-sm"
                onClick={() => setConfirmDeleteSubtaskId(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-1 text-sm bg-red-600 text-white rounded"
                onClick={async () => {
                  await deleteSubtaskApi(confirmDeleteSubtaskId);

                  setActiveTask((prev) => ({
                    ...prev,
                    subtasks: prev.subtasks.filter(
                      (st) => st.id !== confirmDeleteSubtaskId
                    ),
                  }));

                  setConfirmDeleteSubtaskId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY */}
      <TaskActivity activeTask={activeTask} />
    </div>
  );
}