import MernEstate from "../assets/mernestate.png";
import QuoteGenerator from "../assets/quotegenerator.png";
import AiSummarizer from "../assets/ai_summarizer.png";
import Gamehub from "../assets/gamehub.png";
import DevFlow from "../assets/devflow.png";
import Ecomm from "../assets/ecomm.png";

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
		category: "Web Development",
		image: MernEstate,
		description: "This is a description of project one.",
	},
	{
		id: 2,
		title: "Inspirational Quote Generator",
		url: "https://prod.d2x5at9p7rhcg4.amplifyapp.com/",
		category: "Web Development",
		image: QuoteGenerator,
		description: "This is a description of project one.",
	},
	{
		id: 3,
		title: "AI Summarizer",
		url: "https://ai-summarizer-rho-lilac.vercel.app/",
		category: "Web Development",
		image: AiSummarizer,
		description: "This is a description of project one.",
	},
	{
		id: 4,
		title: "Gamehub",
		url: "https://example.com/project-one",
		category: "Web Development",
		image: Gamehub,
		description: "This is a description of project one.",
	},
	{
		id: 5,
		title: "DevFlow",
		url: "https://example.com/project-one",
		category: "Web Development",
		image: DevFlow,
		description: "This is a description of project one.",
	},
	{
		id: 6,
		title: "Ecomm Website",
		url: "https://ecomm-website.vercel.app/",
		category: "Web Development",
		image: Ecomm,
		description: "A basic front-end ecommerce website.",
	},
];
