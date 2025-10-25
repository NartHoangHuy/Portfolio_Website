import { Helmet } from 'react-helmet-async'

const SEO = ({
    title = 'My Portfolio - Software Engineer',
    description = 'Portfolio website showcasing my projects, blog, and skills as a full-stack software engineer specializing in React and Go.',
    keywords = 'software engineer, full-stack developer, React, Go, Golang, portfolio, web development',
    image = '/og-image.png',
    url = window.location.href,
    type = 'website'
}) => {
    const siteTitle = 'My Portfolio'
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Your Name" />
            <link rel="canonical" content={url} />
        </Helmet>
    )
}

export default SEO
