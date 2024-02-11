export interface HomePageData {
	bio: string
	bioTitle: string
	calendar: string
	calendarTitle: string
	contactInfo: {
		contact: {
			name: string
			email: string
		}
		social: {
			bandcamp?: string
			facebook?: string
			instagram?: string
			reverbnation?: string
			twitterX?: string
		}
	}
	contactSectionTitle: string
	heroImage: { node: { altText: string; mediaItemUrl: string } }
	musicDesc: string
	musicTitle: string
	playerSectionTitle: string
	playerTitle: string
	rnArtistId: string
	title: string
}
