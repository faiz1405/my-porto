'use client'

import React, { useRef } from 'react'
import { PERSONAL_INFO, SKILL_GROUPS } from '../data/portfolio-data'
import { Mascot } from 'page-mascot'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const AboutView = () => {
	const containerRef = useRef<HTMLElement>(null)
	const skillsRef = useRef<HTMLDivElement>(null)
	const [isMetalMode, setIsMetalMode] = React.useState(false)

	useGSAP(() => {
		const tl = gsap.timeline()

		// 1. Entrance: "Hello I'm" slides down
		tl.fromTo('.greeting-text', 
			{ y: -30, opacity: 0 }, 
			{ y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
		)

		// 1.5 Entrance: Metal Button & Tooltip pop in
		tl.fromTo('.metal-btn-entrance', 
			{ scale: 0, rotation: -45, opacity: 0 }, 
			{ scale: 1, rotation: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(2)' },
			'-=0.4'
		)

		// 2. Name "YUSUF" scales and bounces in
		tl.fromTo('.name-text', 
			{ scale: 0.8, opacity: 0, x: -50 }, 
			{ scale: 1, opacity: 1, x: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
			'-=0.4'
		)

		// 3. Mascot Pop-in
		tl.fromTo('.mascot-container', 
			{ scale: 0, rotation: -45, opacity: 0 }, 
			{ scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.4)' },
			'-=0.8'
		)

		// 4. Bio text slide up
		tl.fromTo('.bio-text', 
			{ y: 30, opacity: 0 }, 
			{ y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
			'-=0.6'
		)
		// ScrollTrigger for Skills Columns
		if (skillsRef.current) {
			gsap.fromTo('.skill-column', 
				{ y: 60, opacity: 0 },
				{ 
					y: 0, 
					opacity: 1, 
					duration: 0.8, 
					stagger: 0.15, 
					ease: 'power3.out',
					scrollTrigger: {
						trigger: skillsRef.current,
						start: 'top 85%', // Starts when top of skills hits 85% of viewport
					}
				}
			)
		}

	}, { scope: containerRef })

	// Name Hover Effect (Mind-blowing Barrel Roll + Glow)
	const handleNameEnter = () => {
		gsap.killTweensOf('.name-char')
		gsap.to('.name-char', {
			rotationX: 360, // Memutar huruf penuh ke depan
			color: '#c4b5fd', // Berubah menjadi warna violet muda
			y: -15,
			scale: 1.1,
			textShadow: '0px 10px 25px rgba(167, 139, 250, 0.6)',
			duration: 0.6,
			stagger: 0.05,
			ease: 'back.out(1.7)'
		})
	}

	const handleNameLeave = () => {
		if (isMetalMode) return // Jangan reset warna jika sedang mode metal
		gsap.killTweensOf('.name-char')
		gsap.to('.name-char', {
			rotationX: 0, // Reset rotasi
			color: '#ffffff',
			y: 0,
			scale: 1,
			textShadow: '0px 0px 0px rgba(167, 139, 250, 0)',
			duration: 0.5,
			stagger: 0.04,
			ease: 'power3.out'
		})
	}

	const toggleMetalMode = () => {
		const willBeMetal = !isMetalMode
		setIsMetalMode(willBeMetal)

		if (willBeMetal) {
			// Intense headbang animation
			gsap.to('.mascot-container', {
				rotation: "random(-25, 25)",
				y: "random(-15, 15)",
				x: "random(-5, 5)",
				scale: 1.15,
				repeat: -1,
				yoyo: true,
				duration: 0.08,
				ease: "none"
			})

			// Page background to chaotic red/black
			gsap.to(containerRef.current, {
				background: 'linear-gradient(to bottom, #2a0808, #000000)',
				duration: 0.3
			})
			
			// Make name text glow red and shake
			gsap.to('.name-char', {
				color: '#ef4444',
				textShadow: '0px 0px 25px rgba(239, 68, 68, 0.9)',
				y: "random(-5, 5)",
				repeat: -1,
				yoyo: true,
				duration: 0.1
			})

			// Make Giant Hand Pop Out
			gsap.fromTo('.giant-metal-hand', 
				{ y: '100%', rotation: 45, scale: 0.5, opacity: 0 },
				{ y: 0, rotation: -10, scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.3)' }
			)
			// Make Giant Hand Rock
			gsap.to('.giant-metal-hand', {
				rotation: 10,
				y: 20,
				repeat: -1,
				yoyo: true,
				duration: 0.2,
				ease: 'power1.inOut',
				delay: 0.8
			})

		} else {
			// Reset animations
			gsap.killTweensOf('.mascot-container')
			gsap.killTweensOf('.name-char')
			
			gsap.killTweensOf('.giant-metal-hand')
			gsap.to('.giant-metal-hand', {
				y: '100%',
				rotation: 45,
				opacity: 0,
				duration: 0.5,
				ease: 'back.in(1.5)'
			})
			
			gsap.to('.mascot-container', {
				rotation: 0,
				y: 0,
				x: 0,
				scale: 1,
				duration: 0.4,
				ease: 'back.out(1.5)'
			})
			gsap.to(containerRef.current, {
				background: 'linear-gradient(to bottom, #121212, #170F3A)',
				duration: 0.5
			})
			gsap.to('.name-char', {
				color: '#ffffff',
				textShadow: '0px 0px 0px rgba(167, 139, 250, 0)',
				y: 0,
				rotationX: 0,
				scale: 1,
				duration: 0.4
			})
		}
	}

	return (
		<section
			ref={containerRef}
			aria-label="About Section"
			className="relative min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-[#121212] to-[#170F3A] text-white p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-between overflow-x-hidden"
		>
			<div className="max-w-7xl mx-auto w-full flex flex-col">
				{/* Top Hero Section of About */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-4 sm:pt-8 md:pt-12">
					{/* Left Title */}
					<div className="lg:col-span-6 flex flex-col perspective-1000">
						<div className="flex items-center gap-3 relative group/metal-trigger w-fit z-20">
							<span className="greeting-text text-xl sm:text-2xl md:text-3xl text-neutral-300 font-light tracking-wide" style={{ opacity: 0 }}>
								{PERSONAL_INFO.aboutGreeting}
							</span>
							
							<div className="metal-btn-entrance relative flex items-center" style={{ opacity: 0 }}>
								{/* Metal Head Easter Egg Button */}
								<button 
									onClick={toggleMetalMode}
									className={`relative z-20 text-2xl transition-all duration-300 hover:scale-125 focus:outline-none ${isMetalMode ? 'animate-bounce drop-shadow-[0_0_10px_rgba(239,68,68,1)]' : 'opacity-70 hover:opacity-100'}`}
									aria-label="Toggle Metal Mode"
								>
									🤘
								</button>
								{/* Tooltip to make them curious */}
								<span className={`absolute -top-10 -right-12 bg-neutral-900/90 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md transition-all duration-300 whitespace-nowrap pointer-events-none border border-white/20 shadow-xl ${isMetalMode ? 'opacity-0 scale-50' : 'opacity-100 scale-100 animate-pulse'}`}>
									PRESS ME!
								</span>
							</div>
						</div>
						
						<h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white uppercase mt-1 flex items-center gap-4 lg:gap-6 perspective-1000">
							<span 
								className="name-text flex origin-left drop-shadow-2xl cursor-pointer"
								style={{ opacity: 0 }}
								onMouseEnter={handleNameEnter}
								onMouseLeave={handleNameLeave}
							>
								{PERSONAL_INFO.shortName.split('').map((char, index) => (
									<span key={index} className="name-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
										{char}
									</span>
								))}
							</span>
							<span className="mascot-container inline-block relative w-[1.1em] h-[1em] drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" style={{ opacity: 0 }}>
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20">
									<Mascot
										directions="/mascots/yusuf-directions.webp"
										reactions="/mascots/yusuf-reactions.webp"
										size={140}
										label="Yusuf Mascot"
									/>
								</div>
							</span>
						</h1>
					</div>

					{/* Right Paragraph */}
					<div className="lg:col-span-6 flex flex-col justify-center h-full pt-2">
						<p className="bio-text text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-light" style={{ opacity: 0 }}>
							{PERSONAL_INFO.aboutBio}
						</p>
					</div>
				</div>

				{/* Divider Line */}
				<div className="w-full h-px bg-white/10 my-12 md:my-16" />

				{/* Bottom Skills 4-Column Grid */}
				<div
					id="skills-section"
					ref={skillsRef}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-8"
				>
					{SKILL_GROUPS.map((group) => {
						return (
							<div key={group.title} className="skill-column flex flex-col">
								{/* Underlined Heading */}
								<h3 className="text-base md:text-lg font-medium text-white underline underline-offset-8 decoration-white/40 mb-5 pb-1">
									{group.title}
								</h3>

								{/* Items List */}
								<ul className="flex flex-col space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
									{group.items.map((item) => {
										return (
											<li
												key={item}
												className="group/item flex items-center gap-3 cursor-default"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-neutral-600 transition-colors duration-300 group-hover/item:bg-violet-400 group-hover/item:shadow-[0_0_8px_rgba(167,139,250,0.8)]" aria-hidden="true" />
												<span className="transition-all duration-300 group-hover/item:text-white group-hover/item:translate-x-1">{item}</span>
											</li>
										)
									})}
								</ul>
							</div>
						)
					})}
				</div>
			</div>
			
			{/* Giant 3D Metal Hand (Right) */}
			<div 
				className="giant-metal-hand fixed -bottom-10 right-4 md:right-20 text-[150px] md:text-[250px] lg:text-[350px] z-50 origin-bottom pointer-events-none drop-shadow-[0_0_50px_rgba(239,68,68,0.6)]"
				style={{ transform: 'translateY(100%)', opacity: 0 }}
				aria-hidden="true"
			>
				🤘
			</div>
			{/* Giant 3D Metal Hand (Left) */}
			<div 
				className="giant-metal-hand fixed -bottom-10 left-4 md:left-20 text-[150px] md:text-[250px] lg:text-[350px] z-50 origin-bottom pointer-events-none drop-shadow-[0_0_50px_rgba(239,68,68,0.6)]"
				style={{ transform: 'translateY(100%)', opacity: 0 }}
				aria-hidden="true"
			>
				<div style={{ transform: 'scaleX(-1)' }}>🤘</div>
			</div>

			{/* Hidden MP3 Audio Player for Metal Easter Egg */}
			{isMetalMode && (
				<audio autoPlay src="/audio/bmth.mp3#t=45" className="hidden" />
			)}
		</section>
	)
}
