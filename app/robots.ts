import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/studio/'],
        },
        sitemap: 'https://chipsetsrm.vercel.app/sitemap.xml',
    }
}
