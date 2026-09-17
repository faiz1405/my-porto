'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ArrowUpRightIcon } from './ui/icons'
import { EXPERIENCES } from '../data/portfolio-data'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Custom Hook for Scramble Text Effect (Hacker / Cyberpunk vibe)
const useScrambleText = (originalText: string, delay: number = 300) => {
	const [text, setText] = useState('')
	const [isScrambling, setIsScrambling] = useState(true)
	
	useEffect(() => {
		const chars = '!<>-_\\\\/[]{}—=+*^?#________'
		let iteration = 0
		let interval: NodeJS.Timeout
		
		const startScrambling = () => {
			interval = setInterval(() => {
				setText(
					originalText
						.split('')
						.map((char, index) => {
							// If the character is a space, keep it a space
							if (char === ' ') return ' '
							if (index < iteration) {
								return originalText[index]
							}
							return chars[Math.floor(Math.random() * chars.length)]
						})
						.join('')
				)
				
				if (iteration >= originalText.length) {
					clearInterval(interval)
					setIsScrambling(false)
				}
				
				iteration += 1 / 3 // Controls the speed of resolving letters (lower is slower)
			}, 30)
		}
		
		const timeout = setTimeout(startScrambling, delay)
		
		return () => {
			clearTimeout(timeout)
			clearInterval(interval)
		}
	}, [originalText, delay])

	return { text, isScrambling }
}

export const ExperienceView = () => {
	const containerRef = useRef<HTMLElement>(null)
	const timelineRef = useRef<HTMLDivElement>(null)
	const laserRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const hoverAreaRef = useRef<HTMLDivElement>(null)
	
	// Setup scramble hooks
	const { text: scrambleText1 } = useScrambleText('PROFESSIONAL', 300)
	const { text: scrambleText2 } = useScrambleText('EXPERIENCE', 800)
	
	const [isButtonGlitch, setIsButtonGlitch] = useState(false)

	useGSAP(() => {
		// 1. Entrance animation for the titles
		gsap.fromTo('.heading-scramble',
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
		)
		
		// 2. Laser Timeline Drawing & Card Popping
		if (timelineRef.current && laserRef.current) {
			const cards = gsap.utils.toArray('.job-card') as HTMLElement[]
			
			// Draw the laser line downwards based on scroll
			gsap.fromTo(laserRef.current, 
				{ height: '0%' },
				{
					height: '100%',
					ease: 'none',
					scrollTrigger: {
						trigger: timelineRef.current,
						start: 'top 60%', // starts when timeline top reaches 60% of viewport
						end: 'bottom 80%', // ends when timeline bottom reaches 80% of viewport
						scrub: 0.5,
					}
				}
			)

			// Animate each card popping in as the scroll hits it
			cards.forEach((card) => {
				gsap.fromTo(card,
					{ opacity: 0, x: 50, scale: 0.9 },
					{
						opacity: 1,
						x: 0,
						scale: 1,
						duration: 0.8,
						ease: 'back.out(1.5)',
						scrollTrigger: {
							trigger: card,
							start: 'top 75%', // triggers when the card is 75% down the viewport (roughly matches laser)
							toggleActions: 'play none none reverse'
						}
					}
				)
			})
		}
	}, { scope: containerRef })

	// Magnetic & Glitch Button Logic
	const handleButtonMove = (e: React.MouseEvent) => {
		if (!hoverAreaRef.current || !buttonRef.current) return
		
		const { clientX, clientY } = e
		const { left, top, width, height } = hoverAreaRef.current.getBoundingClientRect()
		
		const centerX = left + width / 2
		const centerY = top + height / 2
		
		const distanceX = clientX - centerX
		const distanceY = clientY - centerY

		gsap.to(buttonRef.current, {
			x: distanceX * 0.4,
			y: distanceY * 0.4,
			duration: 0.3,
			ease: 'power2.out'
		})
	}

	const handleButtonEnter = () => {
		setIsButtonGlitch(true)
		// Add violent glitch shake effect
		gsap.to(buttonRef.current, {
			x: "random(-5, 5)",
			y: "random(-5, 5)",
			repeat: -1,
			yoyo: true,
			duration: 0.05,
			ease: "none"
		})
	}

	const handleButtonLeave = () => {
		setIsButtonGlitch(false)
		gsap.killTweensOf(buttonRef.current)
		if (buttonRef.current) {
			gsap.to(buttonRef.current, {
				x: 0,
				y: 0,
				duration: 0.7,
				ease: 'elastic.out(1, 0.3)'
			})
		}
	}

	// 3D Holographic Card Logic
	const handleCardMove = (e: React.MouseEvent, cardId: string) => {
		const card = document.getElementById(`card-${cardId}`)
		if (!card) return
		
		const rect = card.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2
		
		const mouseX = e.clientX - centerX
		const mouseY = e.clientY - centerY
		
		// Calculate rotation limits (max 10 degrees)
		const rotateX = (mouseY / (rect.height / 2)) * -10
		const rotateY = (mouseX / (rect.width / 2)) * 10
		
		gsap.to(card, {
			rotateX,
			rotateY,
			scale: 1.02,
			transformPerspective: 1000,
			duration: 0.4,
			ease: 'power2.out'
		})

		// Move glare effect to follow mouse
		const glare = document.getElementById(`glare-${cardId}`)
		if (glare) {
			gsap.to(glare, {
				x: mouseX,
				y: mouseY,
				opacity: 0.2, // Make glare visible
				duration: 0.4
			})
		}
	}

	const handleCardLeave = (cardId: string) => {
		const card = document.getElementById(`card-${cardId}`)
		if (!card) return
		
		// Reset rotation and scale
		gsap.to(card, {
			rotateX: 0,
			rotateY: 0,
			scale: 1,
			duration: 0.7,
			ease: 'elastic.out(1, 0.3)'
		})

		// Hide glare
		const glare = document.getElementById(`glare-${cardId}`)
		if (glare) {
			gsap.to(glare, {
				opacity: 0,
				duration: 0.4
			})
		}
	}

	const handleDownloadResume = () => {
		window.open('#', '_blank')
	}

	return (
		<section
			ref={containerRef}
			aria-label="Experience Section"
			className="relative min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-[#121212] to-[#170F3A] text-white p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-between overflow-hidden"
		>
			<div className="max-w-7xl mx-auto w-full flex flex-col">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-4 sm:pt-8 md:pt-12">
					{/* Left Column: Heading & Resume CTA */}
					<div className="lg:col-span-5 flex flex-col">
						<span className="text-base sm:text-lg text-neutral-400 font-serif italic mb-2">
							Experience
						</span>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight uppercase font-mono h-[120px] md:h-[144px]">
							<span className="heading-scramble block opacity-0">{scrambleText1}</span>
							<span className="heading-scramble block opacity-0 text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
								{scrambleText2}
							</span>
						</h1>

						<p className="mt-6 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm">
							From crafting user interfaces to optimizing performance and accessibility. 4 years of dedicated front-end craftsmanship.
						</p>

						<div className="mt-12 flex items-center justify-start z-20">
							<div 
								ref={hoverAreaRef}
								className="relative p-6 -m-6 cursor-pointer"
								onMouseMove={handleButtonMove}
								onMouseEnter={handleButtonEnter}
								onMouseLeave={handleButtonLeave}
								onClick={handleDownloadResume}
							>
								<button
									ref={buttonRef}
									type="button"
									tabIndex={0}
									aria-label="Download CV atau Resume"
									className={`group relative flex items-center justify-center gap-2 rounded-none border-2 border-white/40 px-6 py-4 font-mono font-bold uppercase transition-colors duration-300 focus:outline-none pointer-events-none min-w-[280px] h-[60px] ${
										isButtonGlitch 
										? 'bg-red-600 text-white border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]' 
										: 'text-white hover:border-white'
									}`}
								>
									{isButtonGlitch ? (
										<span className="tracking-widest absolute inset-0 flex items-center justify-center bg-red-600 text-white">[ STEAL RESUME ]</span>
									) : (
										<>
											<span>Download My Resume</span>
											<ArrowUpRightIcon className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
										</>
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Right Column: Laser Timeline Items */}
					<div className="lg:col-span-7 relative" ref={timelineRef}>
						{/* Laser Timeline Track */}
						<div className="absolute left-0 sm:left-4 top-2 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden">
							{/* Laser Beam */}
							<div ref={laserRef} className="w-full bg-gradient-to-b from-transparent via-violet-500 to-red-500 rounded-full shadow-[0_0_15px_rgba(167,139,250,0.8)]" style={{ height: '0%' }} />
						</div>

						<div className="flex flex-col space-y-12 pl-8 sm:pl-16 py-8">
							{EXPERIENCES.map((exp) => {
								return (
									<article 
										key={exp.id} 
										id={`card-${exp.id}`}
										className="job-card relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-crosshair transform-gpu"
										onMouseMove={(e) => handleCardMove(e, exp.id)}
										onMouseLeave={() => handleCardLeave(exp.id)}
										style={{ opacity: 0 }}
									>
										{/* Holographic Glare Layer */}
										<div 
											id={`glare-${exp.id}`}
											className="absolute top-1/2 left-1/2 w-[150%] h-[150%] rounded-full bg-gradient-radial from-violet-300/30 to-transparent blur-xl pointer-events-none opacity-0 mix-blend-overlay"
											style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
										/>

										{/* Connection Node */}
										<div className="absolute -left-[35px] sm:-left-[51px] top-8 w-4 h-4 rounded-full bg-neutral-900 border-2 border-violet-500 shadow-[0_0_10px_rgba(167,139,250,0.5)] z-10" />
										
										{/* Connecting Line (Horizontal) */}
										<div className="absolute -left-[27px] sm:-left-[43px] top-[39px] h-0.5 w-[27px] sm:w-[43px] bg-gradient-to-r from-violet-500 to-transparent opacity-50" />

										{/* Content */}
										<div className="relative z-10 pointer-events-none">
											{/* Top Row: Period & Company */}
											<div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-violet-300/80 font-mono mb-3 gap-2">
												<span className="font-medium tracking-wider bg-violet-900/40 px-2 py-1 rounded text-violet-200 w-fit">{exp.period}</span>
												<span className="text-neutral-400 font-bold uppercase tracking-widest">{exp.company}</span>
											</div>

											{/* Role Title */}
											<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mt-2 drop-shadow-md">
												{exp.role}
											</h2>

											{/* Description */}
											<p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
												{exp.description}
											</p>

											{/* Tech Stack Pills */}
											<div className="mt-6 flex flex-wrap gap-2">
												{exp.technologies.map((tech) => {
													return (
														<span
															key={tech}
															className="rounded bg-black/40 border border-white/10 px-2.5 py-1 text-xs text-neutral-300 font-mono shadow-inner"
														>
															{tech}
														</span>
													)
												})}
											</div>
										</div>
									</article>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

