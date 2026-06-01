import api from "../api/axios";

export const getTaskByIdApi = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};
export const getTasksApi = async () => {
  const res = await api.get("/tasks/get");
  return res.data;
};

export const createTaskApi = async (payload) => {
  const body = {
    title: payload.title?.trim() || "",

    project:
      typeof payload.project === "object"
        ? payload.project._id
        : String(payload.project),

    label: payload.label?.trim() || "",

    assignedTo: Array.isArray(payload.assigned_to)
      ? payload.assigned_to
      : Array.isArray(payload.assignedTo)
      ? payload.assignedTo
      : [],

    status: payload.status || "pending",
    priority: payload.priority || "medium",

    startDate: payload.startDate || null,
    dueDate: payload.due || payload.dueDate || null,
  };

  console.log("CREATE TASK BODY 👉", body);

  const res = await api.post("/tasks/create", body);

  return res.data;
};

export const updateTaskApi = async (id, payload) => {
  const body = {
    title: payload.title?.trim() || "",

    project:
      typeof payload.project === "object"
        ? payload.project._id
        : String(payload.project),

    label: payload.label?.trim() || "",

    assignedTo: Array.isArray(payload.assigned_to)
      ? payload.assigned_to
      : Array.isArray(payload.assignedTo)
      ? payload.assignedTo
      : [],

    status: payload.status || "pending",
    priority: payload.priority || "medium",

    startDate: payload.startDate || null,
    dueDate: payload.due || payload.dueDate || null,
  };

  console.log("UPDATE TASK BODY 👉", body);

  const res = await api.put(`/tasks/update/${id}`, body);

  return res.data;
};

export const deleteTaskApi = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

export const createSubtaskApi = async (
  taskId,
  assignedTo,
  label,
  priority = "low",
  note = ""
) => {
  const res = await api.post(`/tasks/${taskId}/subtask`, {
    assignedTo,
    label,
    priority,
    note,
    dateAssigned: new Date().toISOString(),
  });

  return res.data;
};

export const updateSubtaskApi = async (subtaskId, status) => {
  const res = await api.put(`/tasks/subtask/status/${subtaskId}`, {
    status,
  });

  return res.data;
};

export const deleteSubtaskApi = async (taskId, subtaskId) => {
  const res = await api.delete(`/tasks/${taskId}/subtask/${subtaskId}`);
  return res.data;
};

export const uploadTaskAttachmentApi = async (taskId, files) => {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("attachments_files", file);
  });

  const res = await api.patch(`/tasks/${taskId}`, formData);

  return res.data;
};

export const deleteTaskAttachmentApi = async (attachmentId) => {
  const res = await api.delete(`/attachments/${attachmentId}`);
  return res.data;
};

export const getTaskActivityApi = async (taskId) => {
  const res = await api.get("/task-activity", {
    params: { task: taskId },
  });

  return res.data;
};

export const createTaskActivityApi = async ({
  task,
  comment,
  attachment,
}) => {
  const formData = new FormData();

  formData.append("task", task);

  if (comment) {
    formData.append("comment", comment);
  }

  if (attachment) {
    formData.append("file", attachment);
  }

  const res = await api.post("/task-activity", formData);

  return res.data;
};

export const updateTaskActivityApi = async ({
  id,
  task,
  comment,
  attachment,
}) => {
  const formData = new FormData();

  formData.append("task", task);

  if (comment) {
    formData.append("comment", comment);
  }

  if (attachment) {
    formData.append("file", attachment);
  }

  const res = await api.put(`/task-activity/${id}`, formData);

  return res.data;
};

export const deleteTaskActivityApi = async (id) => {
  const res = await api.delete(`/task-activity/${id}`);
  return res.data;
};