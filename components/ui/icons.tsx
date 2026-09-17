import type React from 'react'

export interface IconProps {
	className?: string
	size?: number
}

export const ArrowRightIcon = ({ className = 'w-4 h-4', size = 16 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	)
}

export const ArrowLeftIcon = ({ className = 'w-4 h-4', size = 16 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<line x1="19" y1="12" x2="5" y2="12" />
			<polyline points="12 19 5 12 12 5" />
		</svg>
	)
}

export const ArrowDownIcon = ({ className = 'w-5 h-5', size = 20 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<polyline points="19 12 12 19 5 12" />
		</svg>
	)
}

export const ArrowUpRightIcon = ({ className = 'w-3.5 h-3.5', size = 14 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	)
}

export const GithubIcon = ({ className = 'w-4 h-4', size = 16 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
			/>
		</svg>
	)
}

export const LinkedInIcon = ({ className = 'w-4 h-4', size = 16 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.99 0 1.79-.8 1.79-1.79s-.8-1.79-1.79-1.79-1.79.8-1.79 1.79.8 1.79 1.79 1.79m1.4 9.74v-8.37H5.06v8.37h2.8z" />
		</svg>
	)
}

export const MailIcon = ({ className = 'w-4 h-4', size = 16 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
			<polyline points="22,6 12,13 2,6" />
		</svg>
	)
}

export const WhatsAppIcon = ({ className = 'w-5 h-5', size = 20 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.33 7.35 9 7.42 8.72 7.73C8.44 8.04 7.66 8.77 7.66 10.25C7.66 11.73 8.74 13.16 8.89 13.36C9.04 13.56 11 16.61 14.04 17.79C16.57 18.77 17.08 18.57 17.63 18.52C18.17 18.47 19.38 17.8 19.63 17.11C19.88 16.41 19.88 15.82 19.8 15.7C19.73 15.57 19.53 15.5 19.23 15.35C18.92 15.2 17.43 14.47 17.15 14.37C16.88 14.27 16.68 14.22 16.48 14.52C16.28 14.83 15.7 15.5 15.53 15.7C15.35 15.9 15.18 15.93 14.88 15.78C14.58 15.63 13.6 15.31 12.44 14.28C11.54 13.47 10.93 12.47 10.75 12.17C10.58 11.87 10.73 11.71 10.88 11.56C11.02 11.42 11.19 11.2 11.34 11.03C11.49 10.85 11.54 10.73 11.64 10.53C11.74 10.33 11.69 10.15 11.62 10C11.54 9.85 10.95 8.4 10.7 7.8C10.46 7.22 10.22 7.3 10.04 7.29C9.87 7.29 9.68 7.35 9.53 7.35Z" />
		</svg>
	)
}

export const CheckIcon = ({ className = 'w-4 h-4', size = 16 }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	)
}
