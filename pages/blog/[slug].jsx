import BrandNavbar from '../components/BrandNavbar'
import BrandPrimaryHeader from '../components/BrandPrimaryHeader'
import PostBody from '../components/posts/PostBody'
import PostHeader from '../components/posts/PostHeader'
import BlogAudioPlayer from '../components/BlogAudioPlayer'
import BlogShareLinks from '../components/BlogShareLinks'
import Head from "next/head";
// import PreviewAlert from '../components/ui/PreviewAlert'
import Skeleton from '../components/ui/Skeleton'
import ContentfulImage from '../components/ui/ContentfulImage'
import { client } from '../../lib/contentful/client'
import { useRouter } from 'next/router'
import BrandFooter from '../components/BrandFooter';
import DateComponent from '../components/ui/DateComponent';
import { BLOCKS } from '@contentful/rich-text-types'

const parseJsonLd = (value) => {
  if (!value) return null
  if (typeof value === 'object') return value

  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (error) {
      return null
    }
  }

  return null
}

const normalizeSlug = (value = '') =>
  decodeURIComponent(String(value)).trim().replace(/^\/+|\/+$/g, '').toLowerCase()

const getTextFromNode = (node) => {
  if (!node?.content) return ''

  return node.content
    .map((item) => {
      if (item.nodeType === 'text') return item.value || ''
      return getTextFromNode(item)
    })
    .join('')
}

const getReadableTextFromNode = (node) => {
  if (!node?.content) return ''

  return node.content
    .map((item) => {
      if (item.nodeType === 'text') return item.value || ''
      return getReadableTextFromNode(item)
    })
    .filter(Boolean)
    .join(' ')
}

const getBlogAudioText = (post) => {
  const title = post?.fields?.title || ''
  const excerpt = post?.fields?.excerpt || ''
  const content = getReadableTextFromNode(post?.fields?.content)

  return [title, excerpt, content]
    .filter(Boolean)
    .join('. ')
    .replace(/\s+/g, ' ')
    .trim()
}

const slugify = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const headingLevels = {
  [BLOCKS.HEADING_1]: 1,
  [BLOCKS.HEADING_2]: 2,
  [BLOCKS.HEADING_3]: 3,
  [BLOCKS.HEADING_4]: 4,
  [BLOCKS.HEADING_5]: 5,
  [BLOCKS.HEADING_6]: 6,
}

const getTableOfContents = (content, title) => {
  const counts = new Map()
  const headings = []

  content?.content?.forEach((node) => {
    const level = headingLevels[node.nodeType]
    if (!level) return

    const text = getTextFromNode(node).trim()
    if (!text) return

    const base = slugify(text) || 'section'
    const count = counts.get(base) || 0
    counts.set(base, count + 1)

    headings.push({
      id: count ? `${base}-${count + 1}` : base,
      level,
      text,
    })
  })

  if (headings.length) return headings

  return title
    ? [{ id: 'top', level: 2, text: title }]
    : []
}

const BlogContents = ({ items }) => {
  if (!items?.length) return null

  return (
    <div className='bg-white p-6 mb-8 lg:sticky lg:top-28'>
      <h3 className='text-2xl font-medium text-black mb-6'>Contents</h3>
      <nav className='border-l-4 border-[rgb(37_36_91)] pl-6'>
        <ul className='space-y-4'>
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level > 2 ? 'pl-4 md:pl-6' : ''}
            >
              <a
                href={`#${item.id}`}
                className='block text-base leading-relaxed text-black hover:text-[#ff2b5f] transition-colors'
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

const Post = ({ post, recentPosts }) => {
  const router = useRouter()
  const blogSchema = parseJsonLd(post?.fields?.blogSchema)
  const faqSchema = parseJsonLd(post?.fields?.faqSchema)
  const contents = getTableOfContents(post?.fields?.content, post?.fields?.title)
  const blogAudioText = getBlogAudioText(post)
  const blogSlug = post?.fields?.slug || ''
  const blogShareUrl = `https://pinebookpublishing.com/blog/${blogSlug}`
  const blogShareTitle = post?.fields?.metaTitle || post?.fields?.title || 'Pine Book Publishing Blog'
  const blogShareDescription =
    post?.fields?.metaDescription || post?.fields?.excerpt || 'Read this blog post'
  const blogCoverImage = post?.fields?.coverImage?.fields?.file?.url
  const blogShareImage = blogCoverImage
    ? `https:${blogCoverImage}`
    : 'https://pinebookpublishing.com/_next/image?url=%2Fbrand-img%2Flogo.webp&w=256&q=75'


  return (
    <>
      <Head>
        
        <title>{blogShareTitle}</title>
        <meta
          name="description"
          content={blogShareDescription}
        />
        <link rel="canonical" href={blogShareUrl} key="canonical" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={blogShareTitle} key="og:title" />
        <meta property="og:description" content={blogShareDescription} key="og:description" />
        <meta property="og:url" content={blogShareUrl} key="og:url" />
        <meta property="og:image" content={blogShareImage} key="og:image" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={blogShareTitle} key="twitter:title" />
        <meta name="twitter:description" content={blogShareDescription} key="twitter:description" />
        <meta name="twitter:image" content={blogShareImage} key="twitter:image" />
        <link rel="shortcut icon" href="/images/fav.png" />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
        {blogSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(blogSchema),
            }}
          />
        )}

        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />
        )}

      </Head>
      <BrandNavbar />
      
      {/* Header Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-32"
        style={{
          backgroundColor: `#2e3845`,
        }}
      >
        <div className="container max-w-screen-xl mx-auto">
          <div className="row">
            <div className="col-12 text-center px-5">
              <h1 id="top" className="text-2xl md:text-4xl font-bold text-white font-poppins drop-shadow-lg pt-20">
                {post?.fields?.title}
              </h1>
              {post?.fields?.date && (
                <p className="text-sm text-white mb-3 pt-3">
                  {new Date(post.fields.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
              {post?.fields?.author?.fields?.name && (
                <span className="ml-2 text-white font-bold text-xl"> By {post.fields.author.fields.name}</span>
              )}
            </div>
          </div>
        </div>
      </section>
      <BlogShareLinks title={post?.fields?.title} url={blogShareUrl} />


      <section className='overflow-hidden'>
        <div className='max-w-screen-xl mx-auto px-4 my-20 relative py-22 flex flex-col lg:flex-row'>
          {/* Main Post Column */}
          <article className='prose mx-auto w-full lg:w-2/3'>
            {router.isFallback ? (
              <Skeleton />
            ) : (
              <>
                <PostHeader post={post} />
                <BlogAudioPlayer title={post?.fields?.title} text={blogAudioText} />
                <PostBody post={post} />
              </>
            )}
          </article>
          <aside className='w-full lg:w-1/3 lg:pl-8 mt-10 lg:mt-0'>
            <BlogContents items={contents} />
            <div className='bg-gray-100 p-6 rounded-lg'>
              <h3 className='text-xl font-semibold mb-4'>Recent Blogs</h3>
              <hr className='mb-3'></hr>
              <ul>
                {recentPosts && recentPosts.length > 0 ? (
                  recentPosts.map((recentPost) => (
                    <li key={recentPost.sys.id} className='mb-4 '>
                      <a href={`/blog/${recentPost.fields.slug}`} className='text-black hover:underline'>
                        <div className='flex items-center'>
                          {recentPost?.fields?.coverImage?.fields?.file ? (
                            <ContentfulImage
                              alt={`Cover Image for ${recentPost.fields.title}`}
                              src={recentPost.fields.coverImage.fields.file.url}
                              width={recentPost.fields.coverImage.fields.file.details.image.width}
                              height={recentPost.fields.coverImage.fields.file.details.image.height}
                              className='w-24 h-16 object-cover mr-4 rounded-lg'
                            />
                          ) : (
                            <div className='w-24 h-16 mr-4 rounded-lg bg-gray-300 shrink-0' />
                          )}
                          <h2 className='font-bold'>
                            {recentPost.fields.title}
                          </h2>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <p>No recent posts available.</p>
                )}
              </ul>
            </div>
          </aside>

        </div>
      </section>
      <BrandFooter />
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const requestedSlug = normalizeSlug(params?.slug)

  const blogContentTypes = ['post', 'blogPost', 'blog']
  let matchedPost = null
  let matchedType = 'post'

  for (const type of blogContentTypes) {
    const exactResponse = await client.getEntries({
      content_type: type,
      'fields.slug': requestedSlug,
      limit: 1
    })

    if (exactResponse?.items?.length) {
      matchedPost = exactResponse.items[0]
      matchedType = type
      break
    }

    const fallbackResponse = await client.getEntries({
      content_type: type,
      'fields.slug[match]': requestedSlug,
      limit: 10
    })

    const matchedItem = fallbackResponse?.items?.find(
      (item) => normalizeSlug(item?.fields?.slug) === requestedSlug
    )

    if (matchedItem) {
      matchedPost = matchedItem
      matchedType = type
      break
    }
  }

  const recentPostsResponse = await client.getEntries({
    content_type: matchedType,
    select: 'fields.title,fields.slug,fields.coverImage,fields.excerpt',
    limit: 5,
    order: '-sys.createdAt'
  })

  if (!matchedPost) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false
      }
    }
  }

  return {
    props: {
      post: matchedPost,
      recentPosts: recentPostsResponse.items,
    }
  }
}

export default Post
