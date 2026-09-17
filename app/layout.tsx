import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	metadataBase: new URL('https://yusufnurfaizi.dev'),
	title: 'Yusuf Nurfaizi Putra | Frontend Engineer',
	description: 'Portofolio Yusuf Nurfaizi Putra - Senior Frontend Engineer dengan 4 tahun pengalaman membangun antarmuka web modern, responsif, dan accessible menggunakan React, Next.js, dan Tailwind CSS.',
	keywords: [
		'Yusuf Nurfaizi Putra',
		'Frontend Engineer',
		'React Developer',
		'Next.js',
		'TypeScript',
		'Tailwind CSS',
		'Portfolio'
	],
	authors: [{ name: 'Yusuf Nurfaizi Putra' }],
	creator: 'Yusuf Nurfaizi Putra',
	openGraph: {
		type: 'website',
		locale: 'id_ID',
		url: 'https://yusufnurfaizi.dev',
		title: 'Yusuf Nurfaizi Putra | Frontend Engineer',
		description: 'Turning Ideas Into Interfaces. Crafting responsive, accessible, and visually engaging websites.',
		siteName: 'Yusuf Nurfaizi Putra Portfolio'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Yusuf Nurfaizi Putra | Frontend Engineer',
		description: 'Turning Ideas Into Interfaces. Crafting responsive, accessible, and visually engaging websites.',
		creator: '@yusufnurfaizi'
	}
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang="id"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
		>
			<body className="min-h-full flex flex-col bg-[#0a0a0c] text-white selection:bg-violet-600 selection:text-white">
				{children}
			</body>
		</html>
	)
}
