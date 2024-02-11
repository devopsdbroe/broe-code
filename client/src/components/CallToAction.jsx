import { Button } from "flowbite-react";

export default function CallToAction() {
	return (
		<div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
			<div className="flex-1 justify-center flex flex-col">
				<h2 className="text-2xl">
					Have suggestions on how to improve the site?
				</h2>
				<p className="text-gray-500 my-2">
					Send us an email with your ideas. We're always looking to improve the
					user experience!
				</p>
				{/* TODO: Add link to contact page or email system */}
				<Button
					gradientDuoTone="purpleToPink"
					className="rounded-tr-none rounded-bl-none"
				>
					Contact Us
				</Button>
			</div>
			<div className="p-7 flex-1">
				<img
					src="https://assets.editorial.aetnd.com/uploads/2014/09/gettyimages-76799437.jpg"
					alt="football"
				/>
			</div>
		</div>
	);
}
