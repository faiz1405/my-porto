import type React from 'react'
import { NavigationBar } from '../../components/navigation-bar'
import { PageTransitionWrapper } from './page-transition-wrapper'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-screen bg-[#0a0a0c] text-white flex flex-col relative selection:bg-violet-600 selection:text-white">
			<NavigationBar />
			<div className="flex-1 w-full overflow-x-hidden">
				<PageTransitionWrapper>
					{children}
				</PageTransitionWrapper>
			</div>
		</div>
	)
}
