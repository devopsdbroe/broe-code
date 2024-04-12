import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
	return (
		<div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
			<div className="flex-1 justify-center flex flex-col">
				<h2 className="text-2xl">Did I get you excited about coding?</h2>
				<p className="text-gray-500 my-2">
					Check out some of the projects that I&apos;ve already finished and/or
					am currently working on!
				</p>
				<Button
					gradientDuoTone="purpleToPink"
					className="rounded-tr-none rounded-bl-none"
				>
					<Link to="/projects">Projects Page</Link>
				</Button>
			</div>
			<div className="p-7 flex-1">
				<img
					src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
					alt="code"
				/>
			</div>
		</div>
	);
}
