import { useEffect, useState } from "react";
import Avatar from "../commons/Avatar";
import {
  getTaskActivityApi,
  createTaskActivityApi,
  updateTaskActivityApi,
  deleteTaskActivityApi,
} from "../../services/taskApi";

/* ================= UTIL ================= */
const timeAgo = (dateString) => {
  const diff = (new Date() - new Date(dateString)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
  return `${Math.floor(diff / 86400)} day ago`;
};

export default function TaskActivity({ activeTask }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editAttachment, setEditAttachment] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  /* ================= FETCH ================= */
  const fetchComments = async () => {
    if (!activeTask?.id) return;

    const res = await getTaskActivityApi(activeTask.id);
    const list = res?.data?.results || [];
    setComments(list.filter((i) => i.action === "comment"));
  };

  useEffect(() => {
    if (open && activeTask?.id) {
      fetchComments();
    }
  }, [open, activeTask?.id]);

  /* ================= CREATE ================= */
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!attachment && !newComment.trim()) return;

    try {
      setLoading(true);

      await createTaskActivityApi({
        task: activeTask.id,
        comment: newComment.trim(),
        attachment: attachment || null,
      });

      setNewComment("");
      setAttachment(null);
      fetchComments();
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!editText.trim() && !editAttachment) return;

    try {
      await updateTaskActivityApi({
        id: editingId,
        task: activeTask.id,
        comment: editText,
        attachment: editAttachment || null,
      });

      setEditingId(null);
      setEditText("");
      setEditAttachment(null);
      fetchComments();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    await deleteTaskActivityApi(deleteId);
    setDeleteId(null);
    fetchComments();
  };

  return (
    <div className="border rounded p-2">
      <div
        className="font-semibold cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Activity
      </div>

      {open && (
        <>
          <div className="mt-3 space-y-3 max-h-80 overflow-y-auto pr-2">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-2 relative">
                <Avatar letter="U" size="sm" />

                <div className="flex-1">
                  {editingId === c.id ? (
                    <>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border p-1 text-sm"
                      />

                      <input
                        type="file"
                        onChange={(e) =>
                          setEditAttachment(e.target.files[0])
                        }
                        className="text-xs mt-1"
                      />

                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={handleUpdate}
                          className="text-xs text-blue-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditText("");
                            setEditAttachment(null);
                          }}
                          className="text-xs text-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm">{c.comment}</p>

                      {c.file && (
                        <a
                          href={c.file}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 underline block"
                        >
                          View attachment
                        </a>
                      )}

                      <span className="text-xs text-gray-400">
                        {timeAgo(c.created_at)}
                      </span>
                    </>
                  )}
                </div>

                <button
                  className="text-lg"
                  onClick={() =>
                    setMenuOpenId(menuOpenId === c.id ? null : c.id)
                  }
                >
                  ⋮
                </button>

                {menuOpenId === c.id && (
                  <div className="absolute right-0 top-6 bg-white border rounded shadow text-xs z-10">
                    <button
                      className="block px-3 py-1 hover:bg-gray-100"
                      onClick={() => {
                        setEditingId(c.id);
                        setEditText(c.comment);
                        setMenuOpenId(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="block px-3 py-1 hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        setDeleteId(c.id);
                        setMenuOpenId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleCreate} className="mt-4 border p-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border p-2 text-sm"
              placeholder="Add a comment..."
            />

            <div className="flex items-center justify-between mt-2 gap-2">
              <input
                type="file"
                onChange={(e) => setAttachment(e.target.files[0])}
                className="text-xs"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-3 py-1 text-xs rounded"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNewComment("");
                    setAttachment(null);
                  }}
                  className="text-xs text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-64">
            <p className="text-sm mb-3">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-red-600"
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
