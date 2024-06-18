import { Container, Layout } from 'components'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { Head, Icon } from 'partials'
import { siBandcamp, siFacebook, siInstagram, siReverbnation, siX } from 'simple-icons'
import { type VCalendar } from 'ts-ics'
import { HomePageData, Preview } from 'types'
import { getContactData, getHomePageData } from 'utils'
import { Calendar, MusicPlayer } from 'widgets'
import { getIcs } from 'widgets/Calendar/utils'
import { HEAD_LINKS, HEAD_META, PLACEHOLDER_IMAGE } from 'utils/constants'

export default function Index({
	data: {
		bio,
		bioTitle,
		calendar,
		calendarTitle,
		contactInfo: {
			contact: { name, email },
			social: { bandcamp, facebook, instagram, reverbnation, twitterX }
		},
		contactSectionTitle,
		heroImage: {
			node: { altText, mediaItemUrl }
		},
		musicDesc,
		musicTitle,
		playerSectionTitle,
		playerTitle,
		rnArtistId,
		title
	},
	preview
}: {
	data: HomePageData
	preview: Preview
}) {
	const headData = {
		title,
		link: HEAD_LINKS,
		meta: HEAD_META({ homeOgImageUrl: mediaItemUrl })
	}
	const { events } = JSON.parse(calendar) as VCalendar
	const h2Class = `text-3xl uppercase font-bold pb-6`
	const panelClass = `flex-1 p-16 pt-14`
	const hasSocial = bandcamp || facebook || instagram || reverbnation || twitterX

	return (
		<Layout preview={preview}>
			<Head data={headData} />
			<Container>
				<h1 className='sr-only'>{title}</h1>
				{mediaItemUrl && (
					<Image
						alt={altText}
						blurDataURL={PLACEHOLDER_IMAGE}
						className={'hero'}
						height={380}
						loading={'lazy'}
						placeholder={'blur'}
						src={mediaItemUrl}
						width={1100}
					/>
				)}
			</Container>
			<Container className={`xl:flex whitespace-pre-wrap`}>
				<div className={panelClass}>
					<h2 className={h2Class}>{calendarTitle}</h2>
					<Calendar events={events} />
					<h2 className={h2Class}>{contactSectionTitle}</h2>
					<p className={`pb-6`}>
						<span className={`block`}>{name}</span>
						<span className={`block`}>
							<a
								href={`mailto:${email}?subject=${title}`}
								className={``}
								title={`Send ${name} an email regarding ${title}`}
							>
								{email}
							</a>
						</span>
					</p>
					{hasSocial && (
						<div className={`social text-center`}>
							<p>{`Follow us on`}</p>
							<ul className={`flex flex-row items-center space-x-2 justify-center flex-wrap`}>
								{bandcamp && (
									<li>
										<a href={bandcamp} className={'flex'} title={`Marmalade on BandCamp`}>
											<Icon className={'block mr-2 icon-social'} icon={siBandcamp} />
											<span className={`block`}>{`BandCamp`}</span>
										</a>
									</li>
								)}
								{facebook && (
									<li>
										<a href={facebook} className={'flex'} title={`Marmalade on Facebook`}>
											<Icon className={'block mr-2 icon-social'} icon={siFacebook} />
											<span className={`block`}>{`Facebook`}</span>
										</a>
									</li>
								)}
								{instagram && (
									<li>
										<a href={instagram} className={'flex'} title={`Marmalade on Instagram`}>
											<Icon className={'block mr-2 icon-social'} icon={siInstagram} />
											<span className={`block`}>{`Instagram`}</span>
										</a>
									</li>
								)}
								{reverbnation && (
									<li>
										<a href={reverbnation} className={'flex'} title={`Marmalade on Reverbnation`}>
											<Icon className={'block mr-2 icon-social'} icon={siReverbnation} />
											<span className={`block`}>{`Reverbnation`}</span>
										</a>
									</li>
								)}
								{twitterX && (
									<li>
										<a
											href={twitterX}
											className={'flex whitespace-nowrap'}
											title={`Marmalade on Twitter (X)`}
										>
											<Icon className={'block mr-2 icon-social'} icon={siX} />
											<span className={`block`}>{`Twitter (X)`}</span>
										</a>
									</li>
								)}
							</ul>
						</div>
					)}
				</div>
				<div className={`${panelClass} bg-gray-2`}>
					<h2 className={h2Class}>{bioTitle}</h2>
					<p className={`pb-6`}>{bio}</p>
					<h2 className={h2Class}>{musicTitle}</h2>
					<p>{musicDesc}</p>
				</div>
				<div className={`${panelClass} bg-gray-3`}>
					<h2 className={h2Class}>{playerTitle}</h2>
					<MusicPlayer rnArtistId={rnArtistId} title={playerSectionTitle} />
				</div>
			</Container>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const [contactInfo, data] = await Promise.all([getContactData(), getHomePageData()])
	data.calendar = JSON.stringify(await getIcs(data?.calendarId as string))
	data.contactInfo = contactInfo

	return {
		props: { data, preview },
		revalidate: 10
	}
}
