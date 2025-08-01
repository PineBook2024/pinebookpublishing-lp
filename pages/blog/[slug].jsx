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

const Post = ({ post, recentPosts }) => {
  const router = useRouter()


  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/fav.png" />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
      </Head>
      <BrandNavbar />
      {/* Header Banner */}
      {/* <section class="brand-primary-header-bg py-5">
        <div class="container max-w-screen-xl mx-auto">
          <div class="row py-5">
            <div class="col-12 px-5 w-100 md:w-3/5">
              <h1 class="text-3xl text-white  font-poppins pt-10">
                Enhance Your Book's Readability With</h1>
              <p class="text-xl text-white pt-2">Are you in search of expert book formatting services to get your manuscript formatted well? If so, then we're here to help. At Pine Book Publishing, we offer professional book formatting services to blow life into your book. Our expert team of book formatters will work together with you to give your book a professional and polished look. Get a free quote now!</p>
            </div>
          </div>
        </div>
      </section> */}

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
                          <ContentfulImage
                            alt={`Cover Image for ${recentPost.fields.title}`}
                            src={recentPost.fields.coverImage.fields.file.url}
                            width={recentPost.fields.coverImage.fields.file.details.image.width}
                            height={recentPost.fields.coverImage.fields.file.details.image.height}
                            className='w-24 h-16 object-cover mr-4 rounded-lg'
                          />
                          <h2 className='font-bold'>
                            {recentPost.fields.title}
                          </h2>
                        </div>
                        {/* <p className='mt-3'>{recentPost.fields.excerpt}</p> */}
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

export const getStaticProps = async ({ params }) => {
  const { slug } = params

  // Fetch current post
  const postResponse = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })

  // Fetch recent posts
  const recentPostsResponse = await client.getEntries({
    content_type: 'post',
    select: 'fields.title,fields.slug,fields.coverImage,fields.excerpt',
    limit: 5,
    order: '-sys.createdAt'
  })

  if (!postResponse?.items?.length) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false
      }
    }
  }

  return {
    props: {
      post: postResponse?.items?.[0],
      recentPosts: recentPostsResponse.items,
    },
    revalidate: 60
  }
}

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'post' })
  const paths = response.items.map(item => ({
    params: { slug: item.fields.slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export default Post
