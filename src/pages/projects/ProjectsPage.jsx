import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  getProjectsApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from "../../services/projectService";

import ProjectTable from "../../components/projects/ProjectTable";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectFilters from "../../components/projects/ProjectFilters";
import NewProjectModal from "../../components/projects/NewProjectModal";
import DeleteConfirm from "../../components/commons/DeleteConfirm";
import ProjectDetailsModal from "../../components/projects/ProjectDetailsModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [budget, setBudget] = useState("all");

  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await getProjectsApi();
      setProjects(res?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || item.status === status;

      const matchesType =
        type === "all" || item.projectType === type;

      const matchesBudget =
        budget === "all" ||
        (budget === "low" && item.budget < 50000) ||
        (budget === "medium" &&
          item.budget >= 50000 &&
          item.budget <= 100000) ||
        (budget === "high" && item.budget > 100000);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesBudget
      );
    });
  }, [projects, search, status, type, budget]);

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (editingProject) {
        await updateProjectApi(editingProject._id, payload);
      } else {
        await createProjectApi(payload);
      }

      setOpenModal(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProjectApi(deleteId);
      setDeleteId(null);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 sm:items-center">
  <div>
    <h1 className="text-lg text-slate-800">
      Projects
    </h1>
    <p className=" text-xs text-slate-500">
      Manage all company projects
    </p>
  </div>

  <button
    onClick={() => {
      setEditingProject(null);
      setOpenModal(true);
    }}
    className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-xl bg-brand px-2 py-2 text-xs font-medium text-white shadow-sm"
  >
    <Plus size={14} />
    <span>New Project</span>
  </button>
</div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <ProjectFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          type={type}
          setType={setType}
          budget={budget}
          setBudget={setBudget}
        />

        <ProjectTable
          projects={filteredProjects}
          onEdit={(item) => {
            setEditingProject(item);
            setOpenModal(true);
          }}
          onDelete={(id) => setDeleteId(id)}
          onView={(item) => setSelectedProject(item)}
        />

        <div className="grid gap-3 p-3 md:hidden">
          {filteredProjects.map((item) => (
            <ProjectCard
              key={item._id}
              item={item}
              onEdit={(item) => {
                setEditingProject(item);
                setOpenModal(true);
              }}
              onDelete={(id) => setDeleteId(id)}
              onView={(item) => setSelectedProject(item)}
            />
          ))}
        </div>
      </div>

      <NewProjectModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingProject(null);
        }}
        onSubmit={handleCreateOrUpdate}
        editingProject={editingProject}
      />

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <DeleteConfirm
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}