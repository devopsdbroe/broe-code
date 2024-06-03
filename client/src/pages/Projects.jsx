import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../../constants/data";

export default function ProjectsPage() {
	return (
		<div className="w-full">
			<h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
				Projects:
			</h1>
			<div className="p-3 flex justify-center flex-wrap gap-4">
				{projectsData.length === 0 && (
					<p className="text-xl text-gray-500">No projects found</p>
				)}
				{projectsData.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
					/>
				))}
			</div>
		</div>
	);
}
