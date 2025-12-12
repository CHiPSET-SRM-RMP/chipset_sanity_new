import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://chipsetsrm.vercel.app'

    // Define all your static routes (with trailing slashes for Google)
    const staticRoutes = [
        '/',
        '/about/',
        '/contact/',
        '/events/',
        '/gallery/',
        '/notice/',
        '/recruitment/',
        '/team/',
        '/tools/',
        '/tools/cgpa-calculator/',
        '/tools/articles/',
    ]

    // Fetch all published articles from Sanity
    const articles = await client.fetch<{ slug: string; _updatedAt: string }[]>(
        `*[_type == "articles" && published == true]{ "slug": slug.current, _updatedAt }`
    )

    // Generate static route entries
    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/' ? 'daily' : 'weekly',
        priority: route === '/' ? 1 : 0.8,
    }))

    // Generate dynamic article entries (with trailing slashes)
    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/tools/articles/${article.slug}/`,
        lastModified: new Date(article._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    // Combine and return all entries
    return [...staticEntries, ...articleEntries]
}
