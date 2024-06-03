export default function ProjectCard({ project }) {
	return (
		<div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
			<a href={`${project.url}`}>
				<img
					src={project.image}
					alt="project cover"
					className="h-[260px] w-full object-cover group-hover:h-[240px] transition-all duration-300 z-20"
				/>
			</a>
			<div className="p-3 flex flex-col gap-2">
				<p className="text-lg font-semibold line-clamp-2">{project.title}</p>
				<span className="italic text-sm">{project.category}</span>
				<a
					href={project.url}
					className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
				>
					View Project
				</a>
			</div>
		</div>
	);
}
