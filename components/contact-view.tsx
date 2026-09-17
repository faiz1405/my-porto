'use client'
import { useState, useRef } from 'react'
import type React from 'react'
import { CheckIcon, WhatsAppIcon } from './ui/icons'
import { SocialLinks } from './ui/social-links'
import { PERSONAL_INFO } from '../data/portfolio-data'
import type { ContactFormData } from '../types/portfolio'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const ContactView = () => {
	const [formData, setFormData] = useState<ContactFormData>({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		message: ''
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	// Refs for GSAP
	const containerRef = useRef<HTMLElement>(null)
	const formCardRef = useRef<HTMLDivElement>(null)
	const submitBtnRef = useRef<HTMLButtonElement>(null)
	const rocketRef = useRef<HTMLSpanElement>(null)
	const gridRef = useRef<HTMLDivElement>(null)
	const socialWrapperRef = useRef<HTMLDivElement>(null)

	const handleInputChange = (field: keyof ContactFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
		if (errorMessage) {
			setErrorMessage('')
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// Early returns for validation
		if (!formData.firstName.trim()) {
			setErrorMessage('Silakan isi Nama Depan Anda.')
			return
		}

		if (!formData.email.trim() || !formData.email.includes('@')) {
			setErrorMessage('Silakan masukkan alamat email yang valid.')
			return
		}

		if (!formData.message.trim()) {
			setErrorMessage('Silakan tuliskan pesan Anda.')
			return
		}

		setIsSubmitting(true)

		// Rocket Launch Animation!
		const tl = gsap.timeline()
		
		// 1. Shake the button
		tl.to(submitBtnRef.current, {
			x: 'random(-5, 5)',
			y: 'random(-5, 5)',
			duration: 0.05,
			repeat: 15,
			yoyo: true,
			ease: 'none'
		})
		
		tl.to(submitBtnRef.current, { x: 0, y: 0, duration: 0.1 })
		
		// 2. Launch the rocket icon upwards
		tl.to(rocketRef.current, {
			y: -600,
			x: 100,
			scale: 3,
			opacity: 0,
			duration: 1.2,
			ease: 'power3.in'
		}, "-=0.3")

		// Simulasi pengiriman request setelah roket meluncur
		setTimeout(() => {
			setIsSubmitting(false)
			setIsSubmitted(true)
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				message: ''
			})
			
			// Kembalikan posisi roket untuk next submit
			if (rocketRef.current) {
				gsap.set(rocketRef.current, { y: 0, x: 0, scale: 1, opacity: 1 })
			}
		}, 1800)
	}

	const handleResetForm = () => {
		setIsSubmitted(false)
	}

	// Matrix Grid & Neon Border Flashlight
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!containerRef.current) return
		const rect = containerRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		
		// Spotlight for Grid
		if (gridRef.current) {
			gridRef.current.style.setProperty('--x', `${x}px`)
			gridRef.current.style.setProperty('--y', `${y}px`)
		}
		
		// Tilt & Border Flashlight for Form
		if (formCardRef.current) {
			const formRect = formCardRef.current.getBoundingClientRect()
			const formX = e.clientX - formRect.left
			const formY = e.clientY - formRect.top
			
			// Update CSS variable for the border spotlight
			formCardRef.current.style.setProperty('--mouse-x', `${formX}px`)
			formCardRef.current.style.setProperty('--mouse-y', `${formY}px`)

			// 3D Tilt Logic
			const centerX = formRect.width / 2
			const centerY = formRect.height / 2
			const rotateX = ((formY - centerY) / centerY) * -5 // Max 5 deg tilt
			const rotateY = ((formX - centerX) / centerX) * 5

			gsap.to(formCardRef.current, {
				rotateX,
				rotateY,
				transformPerspective: 1000,
				duration: 0.5,
				ease: 'power2.out'
			})
		}
	}

	const handleMouseLeave = () => {
		// Reset form tilt
		if (formCardRef.current) {
			gsap.to(formCardRef.current, {
				rotateX: 0,
				rotateY: 0,
				duration: 1,
				ease: 'elastic.out(1, 0.3)'
			})
		}
	}

	// Magnetic Social Links
	const handleSocialMove = (e: React.MouseEvent) => {
		if (!socialWrapperRef.current) return
		const rect = socialWrapperRef.current.getBoundingClientRect()
		const x = e.clientX - (rect.left + rect.width / 2)
		const y = e.clientY - (rect.top + rect.height / 2)
		
		gsap.to(socialWrapperRef.current, {
			x: x * 0.4,
			y: y * 0.4,
			duration: 0.4,
			ease: 'power2.out'
		})
	}

	const handleSocialLeave = () => {
		if (!socialWrapperRef.current) return
		gsap.to(socialWrapperRef.current, {
			x: 0,
			y: 0,
			duration: 0.7,
			ease: 'elastic.out(1, 0.3)'
		})
	}

	return (
		<section
			ref={containerRef}
			onMouseMove={handleMouseMove}
			aria-label="Contact Section"
			className="relative min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-[#121212] to-[#170F3A] text-white p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-between overflow-hidden"
		>
			{/* Interactive Matrix Grid Background */}
			<div
				ref={gridRef}
				className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-300"
			>
				<div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
				{/* The spotlight that follows the mouse */}
				<div 
					className="absolute inset-0 mix-blend-overlay transition-opacity duration-300"
					style={{
						background: 'radial-gradient(500px circle at var(--x, 0px) var(--y, 0px), rgba(139, 92, 246, 0.6), transparent 40%)'
					}}
				/>
			</div>

			<div
				className="pointer-events-none absolute -top-40 right-20 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px]"
				aria-hidden="true"
			/>

			<div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-4 sm:pt-8 md:pt-12">
					{/* Left Column: Heading, WhatsApp CTA, Socials */}
					<div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
						<div>
							<span className="text-base sm:text-lg text-neutral-400 font-serif italic mb-2 block">
								Contact
							</span>
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight uppercase">
								LET'S WORK
								<br />
								TOGETHER! 🚀
							</h1>

							<p className="mt-6 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md">
								{PERSONAL_INFO.contactSubtitle}
							</p>


						</div>

						{/* Bottom Social Links in Left Column */}
						<div className="pt-6 border-t border-white/10">
							<span className="text-xs uppercase font-mono tracking-widest text-neutral-400 block mb-3">
								Connect on Socials
							</span>
							{/* Magnetic Wrapper */}
							<div 
								ref={socialWrapperRef}
								onMouseMove={handleSocialMove}
								onMouseLeave={handleSocialLeave}
								className="inline-block p-4 -ml-4"
							>
								<SocialLinks />
							</div>
						</div>
					</div>

					{/* Right Column: Contact Form */}
					<div className="lg:col-span-7 perspective-[1000px] z-10">
						{/* 3D Floating Form with Neon Border Flashlight */}
						<div 
							ref={formCardRef}
							onMouseLeave={handleMouseLeave}
							className="relative rounded-2xl p-[1px] transform-style-3d overflow-hidden group bg-white/5"
						>
							{/* Neon Border Flashlight */}
							<div 
								className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
								style={{
									background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(167, 139, 250, 0.8), transparent 40%)'
								}}
							/>
							
							{/* Form Card Content */}
							<div className="relative h-full w-full rounded-2xl border border-white/10 bg-[#14141d]/90 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
								{isSubmitted ? (
									<div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
										<div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
											<CheckIcon size={28} />
										</div>
										<h2 className="text-2xl font-bold text-white">Terima Kasih!</h2>
										<p className="text-sm text-neutral-300 max-w-sm">
											Pesan Anda telah berhasil terkirim. Saya akan segera menghubungi Anda kembali secepatnya.
										</p>
										<button
											type="button"
											onClick={handleResetForm}
											className="mt-4 px-6 py-2.5 rounded-xl border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
										>
											Kirim Pesan Lain
										</button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
										{/* Name Row: First & Last */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label
													htmlFor="first-name-input"
													className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 transition-colors group-focus-within:text-violet-400"
												>
													{'>'} First Name *
												</label>
												<input
													id="first-name-input"
													type="text"
													tabIndex={0}
													required
													placeholder="John"
													value={formData.firstName}
													onChange={(e) => handleInputChange('firstName', e.target.value)}
													className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 transition-all focus:border-violet-500 focus:bg-violet-900/20 focus:outline-none focus:ring-1 focus:ring-violet-500"
												/>
											</div>
	
											<div>
												<label
													htmlFor="last-name-input"
													className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 transition-colors group-focus-within:text-violet-400"
												>
													{'>'} Last Name
												</label>
												<input
													id="last-name-input"
													type="text"
													tabIndex={0}
													placeholder="Doe"
													value={formData.lastName}
													onChange={(e) => handleInputChange('lastName', e.target.value)}
													className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 transition-all focus:border-violet-500 focus:bg-violet-900/20 focus:outline-none focus:ring-1 focus:ring-violet-500"
												/>
											</div>
										</div>
	
										{/* Email */}
										<div>
											<label
												htmlFor="email-input"
												className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 transition-colors group-focus-within:text-violet-400"
											>
												{'>'} Email *
											</label>
											<input
												id="email-input"
												type="email"
												tabIndex={0}
												required
												placeholder="john@example.com"
												value={formData.email}
												onChange={(e) => handleInputChange('email', e.target.value)}
												className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 transition-all focus:border-violet-500 focus:bg-violet-900/20 focus:outline-none focus:ring-1 focus:ring-violet-500"
											/>
										</div>
	
										{/* Phone Number */}
										<div>
											<label
												htmlFor="phone-input"
												className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 transition-colors group-focus-within:text-violet-400"
											>
												{'>'} Phone Number
											</label>
											<input
												id="phone-input"
												type="tel"
												tabIndex={0}
												placeholder="+62 812 3456 7890"
												value={formData.phoneNumber}
												onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
												className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 transition-all focus:border-violet-500 focus:bg-violet-900/20 focus:outline-none focus:ring-1 focus:ring-violet-500"
											/>
										</div>
	
										{/* Message */}
										<div>
											<label
												htmlFor="message-input"
												className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 transition-colors group-focus-within:text-violet-400"
											>
												{'>'} Message *
											</label>
											<textarea
												id="message-input"
												rows={4}
												tabIndex={0}
												required
												placeholder="Tell me about your project, idea, or team..."
												value={formData.message}
												onChange={(e) => handleInputChange('message', e.target.value)}
												className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 transition-all focus:border-violet-500 focus:bg-violet-900/20 focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
											/>
										</div>
	
										{/* Error feedback */}
										{errorMessage && (
											<p className="text-xs text-rose-400 font-mono" role="alert">
												{errorMessage}
											</p>
										)}
	
										{/* Rocket Submit Button */}
										<button
											ref={submitBtnRef}
											type="submit"
											disabled={isSubmitting}
											tabIndex={0}
											aria-label="Kirim permintaan pesan kontak"
											className="relative w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-purple-700/50 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer disabled:opacity-80 overflow-hidden"
										>
											<span className={`inline-flex items-center gap-2 transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
												Send Request
											</span>
											
											{/* Rocket Launch State Overlay */}
											<span 
												className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 ${isSubmitting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
											>
												<span className="animate-pulse">[ INITIATING LAUNCH... ]</span>
												<span ref={rocketRef} className="inline-block text-xl">🚀</span>
											</span>
										</button>
									</form>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

