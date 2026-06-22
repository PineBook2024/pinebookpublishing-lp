import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import ContentfulImage from './ui/ContentfulImage'

const getTextFromNode = (node) => {
  if (!node?.content) return ''

  return node.content
    .map((item) => {
      if (item.nodeType === 'text') return item.value || ''
      return getTextFromNode(item)
    })
    .join('')
}

const slugify = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const makeOptions = () => {
  const headingCounts = new Map()

  const getHeadingId = (node) => {
    const base = slugify(getTextFromNode(node)) || 'section'
    const count = headingCounts.get(base) || 0
    headingCounts.set(base, count + 1)
    return count ? `${base}-${count + 1}` : base
  }

  const renderHeading = (Tag) => (node, children) => (
    <Tag id={getHeadingId(node)} className='scroll-mt-28'>{children}</Tag>
  )

  return {
    renderMark: {
      [MARKS.CODE]: text => {
        return (
          <pre>
            <code>{text}</code>
          </pre>
        )
      }
    },
    renderNode: {
      [BLOCKS.HEADING_1]: renderHeading('h1'),
      [BLOCKS.HEADING_2]: renderHeading('h2'),
      [BLOCKS.HEADING_3]: renderHeading('h3'),
      [BLOCKS.HEADING_4]: renderHeading('h4'),
      [BLOCKS.HEADING_5]: renderHeading('h5'),
      [BLOCKS.HEADING_6]: renderHeading('h6'),
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (
          node.content.find(item =>
            item.marks?.find(mark => mark.type === 'code')
          )
        ) {
          return (
            <div>
              <pre>
                <code>{children}</code>
              </pre>
            </div>
          )
        }

        return <p>{children}</p>
      },

      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className='blog-check-list'>{children}</ul>
      ),

      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className='blog-check-list__item'>
          <span className='blog-check-list__icon' aria-hidden='true'>✓</span>
          <div className='blog-check-list__content'>{children}</div>
        </li>
      ),

      [INLINES.ENTRY_HYPERLINK]: node => {
        if (node.data.target.sys.contentType.sys.id === 'post') {
          return (
            <Link href={`/posts/${node.data.target.fields.slug}`}>
              {node.data.target.fields.title}
            </Link>
          )
        }
      },

      [INLINES.HYPERLINK]: node => {
        const text = node.content.find(item => item.nodeType === 'text')?.value
        return (
          <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
            {text}
          </a>
        )
      },

      [BLOCKS.EMBEDDED_ENTRY]: node => {
        if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
          return (
            <iframe
              height='400'
              width='100%'
              src={node.data.target.fields.embedUrl}
              title={node.data.target.fields.title}
              allowFullScreen={true}
            />
          )
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: node => {
        return (
          <ContentfulImage
            src={node.data.target.fields.file.url}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.title}
            className='h-20 w-20'
          />
        )
      }
    }
  }
}

const RichText = ({ content }) => {
  return <>{documentToReactComponents(content, makeOptions())}</>
}

export default RichText
