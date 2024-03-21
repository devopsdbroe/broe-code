export default function About() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-2xl mx-auto p-3 text-center">
				<div>
					<h1 className="text-3xl font-semibold text-center my-7">
						About Broe Code
					</h1>
					<div className="text-md text-gray-500 flex flex-col gap-6">
						<p>
							Welcome to Broe Code where I document my attempt at becoming a
							full stack web developer! Here, I&apos;ll share the projects
							I&apos;ve been working on, and the lessons I learn along the way.
						</p>
						<p>
							I plan to post here as frequently as possible. It&apos;s open to
							interpretation if that means only once a week or several times a
							day. It could be a bit of both depending how I&apos;m feeling on a
							given day.
						</p>
						<p>
							I&apos;ve found that discussion is one of the most effective ways
							to learn, so if I&apos;ve posted an article with incorrect
							information, I encourage you to let me know (politely, of course
							🙂). I also welcome you to share your opinions on all of the
							topics I cover here. This would be a very boring place if we
							agreed on everything!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
