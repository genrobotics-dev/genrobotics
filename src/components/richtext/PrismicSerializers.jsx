import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const serializers = {
  heading1: ({ children }) => <h1 className="text-4xl font-bold mb-4 text-white">{children}</h1>,
  heading2: ({ children }) => <h2 className="text-3xl font-semibold mb-3 text-white">{children}</h2>,
  heading3: ({ children }) => <h3 className="text-2xl font-medium mb-2 text-white">{children}</h3>,
  heading4: ({ children }) => <h4 className="text-xl font-semibold mb-2 text-[#FCD901]">{children}</h4>,
  heading5: ({ children }) => <h5 className="text-lg font-medium mb-2 text-white">{children}</h5>,
  heading6: ({ children }) => <h6 className="text-base font-medium mb-2 text-white">{children}</h6>,
  paragraph: ({ children }) => <p className="mb-4 text-gray-200">{children}</p>,
  list: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-200">{children}</ul>,
  oList: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-200">{children}</ol>,
  listItem: ({ children }) => <li className="mb-1 text-gray-200">{children}</li>,
  preformatted: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-auto text-sm mb-4">{children}</pre>
  ),
  code: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-auto text-sm mb-4">{children}</pre>
  ),
  embed: ({ node }) => {
    // node.oembed contains OEmbed data when using Prismic embed
    const html = node.oembed?.html || node.oembed?.embed_html || null
    if (!html) return null
    return (
      <div className="my-6 w-full max-w-full" dangerouslySetInnerHTML={{ __html: html }} />
    )
  },
  image: ({ node }) => {
    const src = node.url
    const alt = node.alt || ''
    const width = node.dimensions?.width || 800
    const height = node.dimensions?.height || 450
    return (
      <div className="my-6 rounded-md overflow-hidden shadow-md">
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto object-cover" />
        {node.copyright && <small className="text-xs text-gray-400 block mt-1">{node.copyright}</small>}
      </div>
    )
  },
  hyperlink: ({ node, children }) => {
    // Prismic hyperlink nodes can be either Web links or Document links.
    const target = node.target || node.data?.target || node.data?.link?.target || null

    // External web link — try common locations
    const webUrl = node.url || node.data?.url || node.data?.link?.url || null
    if (webUrl) {
      return (
        <a
          href={webUrl}
          target={target || undefined}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-300 underline hover:text-blue-100"
        >
          {children}
        </a>
      )
    }

    // Document link (internal) — node.data.link may contain { id, type, uid }
    const doc = node.data?.link || node.data?.document || null
    if (doc && doc.link_type === 'Document') {
      // Construct a reasonable path: prefer known document types (blogs)
      let href = '/'
      if (doc.type === 'blogs' || doc.type === 'blog' || doc.type === 'post') {
        href = `/blogs/${doc.uid}`
      } else if (doc.uid) {
        href = `/${doc.type}/${doc.uid}`
      } else if (doc.id) {
        href = `/${doc.type}/${doc.id}`
      }

      return (
        <Link href={href} className="text-blue-300 underline hover:text-blue-100">
          {children}
        </Link>
      )
    }

    // If we couldn't resolve a URL, render children inline
    return <>{children}</>
  },
}

export default serializers
