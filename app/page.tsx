import { CoverHero } from '../components/cover-hero'

export default function HomePage() {
	return (
		<main className="min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col relative selection:bg-violet-600 selection:text-white">
			<CoverHero />
		</main>
	)
}
