import { useState } from 'react'

const icons = {
  facebook: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M15.1 8.2h-2V6.9c0-.6.4-.8.7-.8h1.2V3.9L13.3 3.8c-2 0-3.1 1.2-3.1 3.3v1.1H8.4v2.5h1.8V20h2.9v-9.3h1.9l.1-2.5Z' />
    </svg>
  ),
  instagram: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M7.7 2.8h8.6c2.7 0 4.9 2.2 4.9 4.9v8.6c0 2.7-2.2 4.9-4.9 4.9H7.7c-2.7 0-4.9-2.2-4.9-4.9V7.7c0-2.7 2.2-4.9 4.9-4.9Zm0 2.2c-1.5 0-2.7 1.2-2.7 2.7v8.6c0 1.5 1.2 2.7 2.7 2.7h8.6c1.5 0 2.7-1.2 2.7-2.7V7.7c0-1.5-1.2-2.7-2.7-2.7H7.7Zm4.3 3.1a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8Zm0 2.2a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm4.2-2.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z' />
    </svg>
  ),
  linkedin: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M5.2 8.8h3.1V19H5.2V8.8Zm1.6-5A1.8 1.8 0 1 1 6.7 7.4a1.8 1.8 0 0 1 .1-3.6ZM10.2 8.8h3v1.4h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V19H17v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.7v5h-3.2V8.8Z' />
    </svg>
  ),
  link: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M8.5 12.9a1 1 0 0 1 0-1.8h7a2.6 2.6 0 0 0 0-5.2h-3a2.6 2.6 0 0 0-2.4 1.6 1 1 0 0 1-1.8-.8 4.6 4.6 0 0 1 4.2-2.8h3a4.6 4.6 0 0 1 0 9.2h-7Zm-4.1-1.8a4.6 4.6 0 0 1 4.1-2.6h7a1 1 0 0 1 0 2h-7a2.6 2.6 0 0 0 0 5.2h3a2.6 2.6 0 0 0 2.4-1.6 1 1 0 0 1 1.8.8 4.6 4.6 0 0 1-4.2 2.8h-3a4.6 4.6 0 0 1-4.1-6.6Z' />
    </svg>
  ),
}

export default function BlogShareLinks({ title, url }) {
  const [copied, setCopied] = useState(false)

  const getCurrentUrl = () =>
    url ||
    (typeof window !== 'undefined' ? window.location.href : '')

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=720,height=640')
  }

  const copyLink = async () => {
    const currentUrl = getCurrentUrl()
    if (!currentUrl) return

    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      setCopied(false)
    }
  }

  const shareToFacebook = () => {
    const currentUrl = getCurrentUrl()
    if (!currentUrl) return

    const shareTitle = encodeURIComponent(title || 'Pine Book Publishing Blog')
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${shareTitle}`)
  }

  const shareToLinkedIn = () => {
    const currentUrl = getCurrentUrl()
    if (!currentUrl) return

    const shareTitle = encodeURIComponent(title || 'Pine Book Publishing Blog')
    openShareWindow(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${shareTitle}`)
  }

  const shareToInstagram = async () => {
    await copyLink()
    openShareWindow('https://www.instagram.com/')
  }

  return (
    <div className='blog-share-links' aria-label='Share this blog'>
      <button
        type='button'
        className='blog-share-links__item'
        onClick={shareToFacebook}
        aria-label='Share on Facebook'
      >
        {icons.facebook}
      </button>
      <button
        type='button'
        className='blog-share-links__item'
        onClick={async () => {
          await shareToInstagram()
        }}
        aria-label='Copy link and open Instagram'
      >
        {icons.instagram}
      </button>
      <button
        type='button'
        className='blog-share-links__item'
        onClick={shareToLinkedIn}
        aria-label='Share on LinkedIn'
      >
        {icons.linkedin}
      </button>
      <button
        type='button'
        className='blog-share-links__item'
        onClick={copyLink}
        aria-label={copied ? 'Blog link copied' : 'Copy blog link'}
        title={copied ? 'Copied' : 'Copy link'}
      >
        {icons.link}
      </button>
      {copied ? <span className='blog-share-links__copied'>Copied</span> : null}
    </div>
  )
}
