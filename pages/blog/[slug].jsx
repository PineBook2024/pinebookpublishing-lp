import BrandNavbar from '../components/BrandNavbar'
import BrandPrimaryHeader from '../components/BrandPrimaryHeader'
import PostBody from '../components/posts/PostBody'
import PostHeader from '../components/posts/PostHeader'
import Head from "next/head";
// import PreviewAlert from '../components/ui/PreviewAlert'
import Skeleton from '../components/ui/Skeleton'
import ContentfulImage from '../components/ui/ContentfulImage'
import { client } from '../../lib/contentful/client'
import { useRouter } from 'next/router'
import BrandFooter from '../components/BrandFooter';
import DateComponent from '../components/ui/DateComponent';

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

const Post = ({ post, recentPosts }) => {
  const router = useRouter()
  const blogSchema = parseJsonLd(post?.fields?.blogSchema)
  const faqSchema = parseJsonLd(post?.fields?.faqSchema)


  return (
    <>
      <Head>
        
        <title>{post?.fields?.metaTitle || post?.fields?.title}</title>
        <meta
          name="description"
          content={post?.fields?.metaDescription || post?.fields?.excerpt || 'Read this blog post'}
        />
        {post?.fields?.canonicalUrl && (
          <link rel="canonical" href={post.fields.canonicalUrl} key="canonical" />
        )}
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
              <h1 className="text-2xl md:text-4xl font-bold text-white font-poppins drop-shadow-lg pt-20">
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


      <section className='overflow-hidden'>
        <div className='max-w-screen-xl mx-auto px-4 my-20 relative py-22 flex flex-col lg:flex-row'>
          {/* Main Post Column */}
          <article className='prose mx-auto w-full lg:w-2/3'>
            {router.isFallback ? (
              <Skeleton />
            ) : (
              <>
                <PostHeader post={post} />
                <PostBody post={post} />
              </>
            )}
          </article>
          <aside className='w-full lg:w-1/3 lg:pl-8'>
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
