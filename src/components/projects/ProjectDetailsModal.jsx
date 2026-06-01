import Modal from "../commons/Modal";

export default function ProjectDetailsModal({ project, onClose }) {
  if (!project) return null;

  return (
    <Modal
      title="Project Details"
      onClose={onClose}
      actions={
        <button
          onClick={onClose}
          className="h-8 rounded-lg border border-slate-200 px-3 text-xs"
        >
          Close
        </button>
      }
    >
      <div className="space-y-3 text-xs">
        <div>
          <p className="text-slate-400">Project Name</p>
          <p className="font-medium text-slate-800">{project.name}</p>
        </div>

        <div>
          <p className="text-slate-400">Description</p>
          <p className="text-slate-700">{project.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-slate-400">Department</p>
            <p>{project.department?.name || project.department}</p>
          </div>

          <div>
            <p className="text-slate-400">HR</p>
            <p>{project.hr?.fullName || project.hr}</p>
          </div>

          <div>
            <p className="text-slate-400">Team Leader</p>
            <p>{project.teamLeader?.fullName || project.teamLeader}</p>
          </div>

          <div>
            <p className="text-slate-400">Budget</p>
            <p>₹{project.budget}</p>
          </div>

          <div>
            <p className="text-slate-400">Type</p>
            <p className="capitalize">{project.projectType}</p>
          </div>

          <div>
            <p className="text-slate-400">Status</p>
            <p className="capitalize">{project.status}</p>
          </div>

          <div>
            <p className="text-slate-400">Start Date</p>
            <p>{project.startDate?.slice(0, 10)}</p>
          </div>

          <div>
            <p className="text-slate-400">Deadline</p>
            <p>{project.deadline?.slice(0, 10)}</p>
          </div>
          <p className="text-xs text-slate-600">
  <span className="text-slate-400">Project ID :</span>{" "}
  <span className="font-medium text-slate-800">
    {project._id || project.id || "-"}
  </span>
</p>
        </div>
      </div>
    </Modal>
  );
}