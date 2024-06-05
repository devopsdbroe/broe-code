import MernEstate from "../assets/mernestate.png";
import QuoteGenerator from "../assets/quotegenerator.png";
import Ecomm from "../assets/ecomm.png";
import DevFlow from "../assets/devflow.png";
import Gericht from "../assets/gericht.png";
import GPT3 from "../assets/gpt3.png";

export const topics = [
	{ id: 1, value: "html/css", name: "HTML/CSS" },
	{ id: 2, value: "python", name: "Python" },
	{ id: 3, value: "javascript", name: "JavaScript" },
	{ id: 4, value: "tailwind", name: "Tailwind" },
	{ id: 5, value: "react", name: "React" },
	{ id: 6, value: "nextjs", name: "Next.js" },
	{ id: 7, value: "other", name: "Other" },
];

export const projectsData = [
	{
		id: 1,
		title: "MERN Estate",
		url: "https://mern-estate-b28f.onrender.com/",
		category: "Full Stack",
		image: MernEstate,
		description:
			"A real estate website built using MERN stack and deployed using Render",
	},
	{
		id: 2,
		title: "Inspirational Quote Generator",
		url: "https://prod.d2x5at9p7rhcg4.amplifyapp.com/",
		category: "Full Stack",
		image: QuoteGenerator,
		description:
			"An inspirational quote generator project built with Next.js and deployed using AWS Amplify",
	},
	{
		id: 3,
		title: "Ecomm Website",
		url: "https://ecomm-website.vercel.app/",
		category: "Front End",
		image: Ecomm,
		description: "A basic front-end ecommerce website.",
	},
	{
		id: 4,
		title: "DevFlow",
		url: "devflow-gules.vercel.app",
		category: "Full Stack",
		image: DevFlow,
		description: "A Stack Overflow clone built using Next.js",
	},
	{
		id: 5,
		title: "Gericht Restuarant",
		url: "https://gericht-restaurant-rho-beige.vercel.app/",
		category: "Front End",
		image: Gericht,
		description: "A landing page for a fancy restaurant.",
	},
	{
		id: 6,
		title: "GPT-3 Demo Site",
		url: "https://gpt3-jsm-eta.vercel.app/",
		category: "Front End",
		image: GPT3,
		description: "A demo page for the now outdated GPT-3.",
	},
];
