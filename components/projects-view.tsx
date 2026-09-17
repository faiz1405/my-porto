'use client'
import { useState, useRef, useEffect } from 'react'
import type React from 'react'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from './ui/icons'
import { PROJECTS } from '../data/portfolio-data'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const ProjectsView = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	
	const containerRef = useRef<HTMLElement>(null)
	const mockupRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)
	const gridRef = useRef<HTMLDivElement>(null)

	const currentProject = PROJECTS[currentIndex]

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1))
	}

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1))
	}

	const handlePrevKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key !== 'Enter' && event.key !== ' ') {
			return
		}
		event.preventDefault()
		handlePrev()
	}

	const handleNextKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key !== 'Enter' && event.key !== ' ') {
			return
		}
		event.preventDefault()
		handleNext()
	}

	const handleSelectProject = (index: number) => {
		setCurrentIndex(index)
	}

	// 1. Initial Load: Heavy Metal Text Smash
	useGSAP(() => {
		const tl = gsap.timeline()
		
		// The sub-header fades in normally
		tl.fromTo('.header-sub',
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
		)
		
		// The main title SMASHES into the ground
		tl.fromTo('.header-text-smash',
			{ y: -300, scale: 1.5, opacity: 0, rotationX: 45 },
			{ y: 0, scale: 1, opacity: 1, rotationX: 0, duration: 0.8, ease: 'bounce.out' },
			'-=0.5'
		)



		tl.fromTo('.thumbnail-btn',
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' },
			'-=0.2'
		)
	}, { scope: containerRef })

	// 2. Project Change: VHS Glitch Transition
	useGSAP(() => {
		const tl = gsap.timeline()

		// Left panel elements stagger animation
		tl.fromTo('.anim-item', 
			{ opacity: 0, x: -40, filter: 'blur(8px)' },
			{ opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.08, ease: 'power3.out' }
		)

		// VHS Glitch on the mockup container
		if (mockupRef.current) {
			gsap.killTweensOf(mockupRef.current)
			
			// Heavy glitch frame
			tl.fromTo(mockupRef.current,
				{ 
					opacity: 0.3, 
					scale: 0.95, 
					skewX: 15,
					filter: 'hue-rotate(90deg) contrast(300%) blur(4px) invert(20%)'
				},
				{ 
					opacity: 1, 
					scale: 1, 
					skewX: 0,
					filter: 'hue-rotate(0deg) contrast(100%) blur(0px) invert(0%)',
					duration: 0.5, 
					ease: 'elastic.out(1, 0.4)' 
				},
				'<0.1'
			)
			
			// Stutter shake
			tl.to(mockupRef.current, { x: -10, duration: 0.05, yoyo: true, repeat: 3 }, "<")
			tl.to(mockupRef.current, { x: 0, duration: 0.05 })
		}

		// Smooth transition for background accent
		gsap.to('.bg-sphere', {
			backgroundColor: currentProject.imageTheme.accentColor,
			duration: 1.2,
			ease: 'power3.inOut'
		})

		// Reset parallax scroll position
		if (imageRef.current) {
			gsap.to(imageRef.current, { objectPosition: 'center 0%', duration: 0.1 })
		}

	}, { dependencies: [currentIndex], scope: containerRef })

	// 3. Spotlight Effect for Grid
	const handleGridMouseMove = (e: React.MouseEvent) => {
		if (!gridRef.current) return
		const rect = gridRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		gridRef.current.style.setProperty('--mouse-x', `${x}px`)
		gridRef.current.style.setProperty('--mouse-y', `${y}px`)
	}

	// 4. Parallax Auto-Scroll & 3D Tilt for Mockup
	const handleMockupMove = (e: React.MouseEvent) => {
		if (!mockupRef.current) return
		const rect = mockupRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		
		const centerX = rect.width / 2
		const centerY = rect.height / 2
		
		const rotateX = ((y - centerY) / centerY) * -12 // Max 12 deg
		const rotateY = ((x - centerX) / centerX) * 12
		
		gsap.to(mockupRef.current, {
			rotateX,
			rotateY,
			scale: 1.02,
			transformPerspective: 1000,
			duration: 0.4,
			ease: 'power2.out'
		})
	}

	const handleMockupEnter = () => {
		// Auto scroll image inside the mockup (Parallax)
		if (imageRef.current) {
			gsap.to(imageRef.current, {
				objectPosition: 'center 100%',
				duration: 8, // Slow scroll to bottom
				ease: 'power1.inOut',
				overwrite: 'auto'
			})
		}
	}

	const handleMockupLeave = () => {
		if (!mockupRef.current) return
		// Reset Tilt
		gsap.to(mockupRef.current, {
			rotateX: 0,
			rotateY: 0,
			scale: 1,
			duration: 0.7,
			ease: 'elastic.out(1, 0.3)'
		})
		
		// Reset Parallax Scroll
		if (imageRef.current) {
			gsap.to(imageRef.current, {
				objectPosition: 'center 0%',
				duration: 1.5,
				ease: 'power3.out',
				overwrite: 'auto'
			})
		}
	}

	return (
		<section
			ref={containerRef}
			aria-label="Projects Section"
			className="relative min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-[#121212] to-[#170F3A] text-white p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-between overflow-hidden"
		>
			<div className="max-w-7xl mx-auto w-full flex flex-col">
				{/* Header */}
				<div className="flex flex-col pt-4 sm:pt-8 mb-8 md:mb-12">
					<span className="header-sub text-base sm:text-lg text-neutral-400 font-serif italic mb-2 block">
						Projects
					</span>
					<h1 className="header-text-smash text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase drop-shadow-[0_10px_20px_rgba(139,92,246,0.3)]">
						MY RECENT WORKS
					</h1>
				</div>

				{/* Main Projects Showcase Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
					{/* Left Info Panel */}
					<div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
						<div>
							<div className="anim-item">
								<span className="text-xs font-mono uppercase tracking-widest text-violet-400">
									{currentProject.category} — {currentProject.year}
								</span>
							</div>

							<div className="anim-item">
								{currentProject.liveUrl || currentProject.githubUrl ? (
									<a
										href={currentProject.liveUrl || currentProject.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`Buka live preview atau repository untuk ${currentProject.title}`}
										className="group flex items-center gap-2 mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-white hover:text-violet-300 transition-colors inline-flex"
									>
										<span>{currentProject.title}</span>
										<ArrowUpRightIcon className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
									</a>
								) : (
									<h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
										{currentProject.title}
									</h2>
								)}
							</div>

							<p className="anim-item mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
								{currentProject.description}
							</p>

							{/* Key Highlights */}
							<ul className="anim-item mt-4 space-y-2">
								{currentProject.highlights.map((highlight) => {
									return (
										<li key={highlight} className="text-xs sm:text-sm text-neutral-400 flex items-start gap-2 font-light">
											<span className="text-violet-400 mt-0.5">•</span>
											<span>{highlight}</span>
										</li>
									)
								})}
							</ul>

							{/* Technologies Pills */}
							<div className="anim-item mt-6 flex flex-wrap gap-2">
								{currentProject.technologies.map((tech) => {
									return (
										<span
											key={tech}
											className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-300 font-mono hover:bg-white/10 transition-colors"
										>
											{tech}
										</span>
									)
								})}
							</div>
						</div>

						{/* Navigation Arrows & Counter */}
						<div className="anim-item flex items-center gap-6 pt-4 border-t border-white/10">
							<div className="flex items-center gap-3">
								<button
									type="button"
									tabIndex={0}
									aria-label="Proyek Sebelumnya"
									onClick={handlePrev}
									onKeyDown={handlePrevKeyDown}
									className="p-3 rounded-full border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white bg-white/5 backdrop-blur-sm"
								>
									<ArrowLeftIcon size={18} />
								</button>
								<button
									type="button"
									tabIndex={0}
									aria-label="Proyek Selanjutnya"
									onClick={handleNext}
									onKeyDown={handleNextKeyDown}
									className="p-3 rounded-full border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white bg-white/5 backdrop-blur-sm"
								>
									<ArrowRightIcon size={18} />
								</button>
							</div>

							<div className="text-xs font-mono text-neutral-400 tracking-wider">
								<span className="text-white font-bold">
									{String(currentIndex + 1).padStart(2, '0')}
								</span>
								<span> / {String(PROJECTS.length).padStart(2, '0')}</span>
							</div>
						</div>
					</div>

					{/* Right Visual Showcase Mockup Cards */}
					<div className="lg:col-span-7 flex flex-col space-y-4 perspective-[1000px] z-10">
						<div 
							ref={mockupRef} 
							onMouseMove={handleMockupMove}
							onMouseEnter={handleMockupEnter}
							onMouseLeave={handleMockupLeave}
							className="relative w-full rounded-2xl border border-white/10 bg-[#0e0e12]/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center justify-center transform-style-3d cursor-crosshair"
						>
							{/* Background gradient sphere */}
							<div
								className="bg-sphere pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[90px] opacity-40 transition-colors duration-1000"
								style={{ backgroundColor: currentProject.imageTheme.accentColor }}
								aria-hidden="true"
							/>

							{/* Mockup Presentation */}
							{currentProject.imageTheme.deviceType === 'mobile' ? (
								<div className="relative z-10 w-[240px] sm:w-[280px] bg-neutral-900 rounded-[36px] p-3 border-[6px] border-neutral-700/80 shadow-2xl shadow-black/80 pointer-events-none">
									{/* Notch */}
									<div className="w-24 h-4 bg-neutral-800 rounded-full mx-auto mb-3" />
									{/* Screen Content */}
									<div className="bg-[#181820] rounded-[24px] overflow-hidden text-left flex flex-col w-full h-[360px] relative">
										{currentProject.imageTheme.imageUrl ? (
											<div className="relative w-full h-full bg-white">
												<Image
													ref={imageRef}
													src={currentProject.imageTheme.imageUrl}
													alt={currentProject.title}
													fill
													className="object-cover"
													style={{ objectPosition: 'center 0%' }}
													unoptimized
												/>
											</div>
										) : (
											<div className="flex-1 flex flex-col items-center justify-center space-y-3 p-6 text-neutral-500 h-full">
												<span className="text-[10px] font-mono uppercase tracking-widest text-center">Preview Not Available</span>
											</div>
										)}
									</div>
								</div>
							) : (
								<div className="relative z-10 w-[95%] max-w-2xl bg-[#14141c] rounded-xl border border-white/10 shadow-2xl overflow-hidden pointer-events-none">
									{/* Browser / Laptop Top Bar */}
									<div className="flex items-center justify-between px-4 py-2.5 bg-[#1f1f2a] border-b border-white/10">
										<div className="flex items-center space-x-1.5">
											<span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
											<span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
											<span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
										</div>
										<div className="px-3 py-0.5 rounded-md bg-[#121218] text-[10px] font-mono text-neutral-400 truncate max-w-[50%]">
											{currentProject.liveUrl ? currentProject.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'app.domain.com'}
										</div>
										<span className="text-[10px] text-neutral-500 font-mono">v2.4</span>
									</div>

									{/* Screen View */}
									<div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-video bg-[#14141c] overflow-hidden">
										{currentProject.imageTheme.imageUrl ? (
											<div className="relative w-full h-full bg-white">
												<Image
													ref={imageRef}
													src={currentProject.imageTheme.imageUrl}
													alt={currentProject.title}
													fill
													className="object-cover"
													style={{ objectPosition: 'center 0%' }}
													unoptimized
												/>
											</div>
										) : (
											<div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
												<span className="text-sm font-mono uppercase tracking-widest">Preview Not Available</span>
											</div>
										)}
									</div>
								</div>
							)}
						</div>

						{/* Horizontal Thumbnails Row with Spotlight Effect */}
						<div 
							ref={gridRef}
							onMouseMove={handleGridMouseMove}
							className="group relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2 max-h-[160px] md:max-h-[220px] overflow-y-auto custom-scrollbar pr-2 md:pr-1"
						>
							{/* Spotlight Overlay */}
							<div 
								className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-50"
								style={{
									background: 'radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(139, 92, 246, 0.25), transparent 40%)',
								}}
							/>

							{PROJECTS.map((project, index) => {
								const isSelected = index === currentIndex
								return (
									<button
										key={project.id}
										type="button"
										tabIndex={0}
										aria-label={`Pilih proyek ${project.title}`}
										onClick={() => handleSelectProject(index)}
										className={`thumbnail-btn relative p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white overflow-hidden ${
											isSelected
												? 'border-violet-500 bg-violet-950/40 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-[1.02]'
												: 'border-white/10 bg-[#121212] hover:border-white/30'
										}`}
									>
										<span className={`block relative z-10 text-[10px] font-mono transition-colors duration-300 ${isSelected ? 'text-violet-300' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
											{String(index + 1).padStart(2, '0')}
										</span>
										<span className={`block relative z-10 text-xs font-medium truncate mt-1 transition-colors duration-300 ${isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
											{project.title}
										</span>
									</button>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
