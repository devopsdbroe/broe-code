export default function About() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-2xl mx-auto p-3 text-center">
				<div>
					<h1 className="text-3xl font-semibold text-center my-7">
						About Football Blog
					</h1>
					<div className="text-md text-gray-500 flex flex-col gap-6">
						<p>
							Welcome to my football blog, where I'll share my horrible NFL
							opinions with you.
						</p>
						<p>New articles every week!</p>
						<p>
							Discussion and debate is one of the things that makes this game so
							great, so I encourage you to engage in the comments section to
							tell me how bad my takes are.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
