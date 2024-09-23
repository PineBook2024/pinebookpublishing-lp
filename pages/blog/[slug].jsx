import BrandNavbar from '../components/BrandNavbar'
import BrandPrimaryHeader from '../components/BrandPrimaryHeader'
import PostBody from '../components/posts/PostBody'
import PostHeader from '../components/posts/PostHeader'
// import PreviewAlert from '../components/ui/PreviewAlert'
// import Skeleton from '../components/ui/Skeleton'
import { client } from '../lib/contentful/client' // Removed previewClient import
import { useRouter } from 'next/router'

const Post = ({ post }) => {
  const router = useRouter()

  return (
    <>
      <BrandNavbar />
      <BrandPrimaryHeader
        subtitle="Enhance Your Book's Readability With"
        title="Blogs"
        desc="Are you in search of expert book formatting services to get your manuscript formatted well? If so, then we're here to help. At Pine Book Publishing, we offer professional book formatting services to blow life into your book. Our expert team of book formatters will work together with you to give your book a professional and polished look. Get a free quote now!"
      />
      <section className='overflow-hidden'>
        {/* Removed PreviewAlert condition */}
        <div className='max-w-screen-xl mx-auto px-4 my-20 relative py-22'>
          <article className='prose mx-auto'>
            {router.isFallback ? (
              <Skeleton />
            ) : (
              <>
                <PostHeader post={post} />
                <PostBody post={post} />
              </>
            )}
          </article>
        </div>
      </section>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const response = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false
      }
    }
  }

  return {
    props: {
      post: response?.items?.[0],
      revalidate: 60
    }
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
