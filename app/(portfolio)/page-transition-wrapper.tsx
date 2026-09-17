'use client'

import type React from 'react'
import { ViewTransition } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	return (
		<ViewTransition
			key={pathname}
			name="portfolio-content"
			share="auto"
			enter="auto"
			default="none"
		>
			<div className="w-full h-full">
				{children}
			</div>
		</ViewTransition>
	)
}
