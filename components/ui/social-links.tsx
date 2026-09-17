import type React from 'react'
import { ArrowUpRightIcon } from './icons'
import { PERSONAL_INFO } from '../../data/portfolio-data'

export interface SocialLinksProps {
	className?: string
	itemClassName?: string
}

export const SocialLinks = ({ className = 'flex items-center gap-4 md:gap-6', itemClassName = 'text-neutral-400 hover:text-white transition-colors flex items-center gap-1 text-sm md:text-base font-normal group' }: SocialLinksProps) => {
	return (
		<div className={className}>
			<a
				href={`mailto:${PERSONAL_INFO.email}`}
				tabIndex={0}
				aria-label="Kirim email ke Yusuf Nurfaizi Putra"
				className={itemClassName}
			>
				<span>Email</span>
				<ArrowUpRightIcon className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
			</a>
			<a
				href={PERSONAL_INFO.github}
				target="_blank"
				rel="noopener noreferrer"
				tabIndex={0}
				aria-label="Buka profil GitHub Yusuf Nurfaizi Putra"
				className={itemClassName}
			>
				<span>Github</span>
				<ArrowUpRightIcon className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
			</a>
			<a
				href={PERSONAL_INFO.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				tabIndex={0}
				aria-label="Buka profil LinkedIn Yusuf Nurfaizi Putra"
				className={itemClassName}
			>
				<span>LinkedIn</span>
				<ArrowUpRightIcon className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
			</a>
		</div>
	)
}
