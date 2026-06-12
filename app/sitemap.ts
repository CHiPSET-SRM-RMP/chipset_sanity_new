import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.chipsetsrm.live'

    // Define all your static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/notice`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/recruitment`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/attendance-calculator`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tools/cgpa-calculator`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    try {
        // Fetch all published articles from Sanity to validate they exist
        const articles = await client.fetch<{ slug: string; _updatedAt: string }[]>(
            `*[_type == "articles" && (published == true || published == null)]{ "slug": slug.current, _updatedAt }`,
            {},
            { next: { revalidate: 3600 } }
        )

        console.log(`Fetched ${articles.length} articles from Sanity`)

        // Generate entry for the articles listing page
        const articlesPageEntry: MetadataRoute.Sitemap = [{
            url: `${baseUrl}/tools/articles`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }]

        // Generate entries for each individual article
        const articleEntries: MetadataRoute.Sitemap = articles
            .filter((article) => article.slug)
            .map((article) => ({
                url: `${baseUrl}/tools/articles/${article.slug}`,
                lastModified: new Date(article._updatedAt),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }))

        // Combine and return all entries
        const allEntries = [...staticRoutes, ...articlesPageEntry, ...articleEntries]
        console.log(`Total sitemap entries: ${allEntries.length}`)
        return allEntries
    } catch (error) {
        console.error('Error fetching articles for sitemap:', error)
        // Return only static routes if dynamic fetch fails
        return staticRoutes
    }
}
