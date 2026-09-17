export type ActiveTab = 'about' | 'experience' | 'projects' | 'contact'

export type ViewState = 'cover' | ActiveTab

export interface ProjectItem {
	id: string
	title: string
	category: string
	year: string
	description: string
	highlights: string[]
	technologies: string[]
	liveUrl?: string
	githubUrl?: string
	imageTheme: {
		background: string
		accentColor: string
		deviceType: 'mobile' | 'desktop'
		imageUrl?: string
	}
}

export interface ExperienceItem {
	id: string
	period: string
	role: string
	company: string
	location: string
	description: string
	technologies: string[]
}

export interface SkillGroup {
	title: string
	items: string[]
}

export interface ContactFormData {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	message: string
}
