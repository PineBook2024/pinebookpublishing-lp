import { client } from '../../lib/contentful/client'
import Head from "next/head";
import PostCard from '../components/posts/PostCard'
import BrandPrimaryHeader from '../components/BrandPrimaryHeader'
import BrandNavbar from '../components/BrandNavbar'

const Posts = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blogs | Pine Book Publishing</title>
        <meta
          name="description"
          content="Everything about Pine Book Publishing—your partner in crafting, editing, and publishing your story. Experience seamless service from manuscript to bookshelf."
        />
        <link rel="shortcut icon" href="/images/fav.png" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <BrandNavbar />
      <BrandPrimaryHeader
        subtitle="Enhance Your Book's Readability With"
        title="Blogs"
        desc="Are you in search of expert book formatting services to get your manuscript formatted well? If so, then we're here to help. At Pine Book Publishing, we offer professional book formatting services to blow life into your book. Our expert team of book formatters will work together with you to give your book a professional and polished look. Get a free quote now!"
      />
      <section className='overflow-hidden'>
        <div className='max-w-screen-xl mx-auto px-4 my-20 relative py-22'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10'>
            {posts.map((post, i) => (
              <PostCard key={post.fields.slug} post={post} />
            ))}
          </ul>
        </div>
      </section>
    </>

  )
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'post' })

  return {
    props: {
      posts: response.items,
      revalidate: 60
    }
  }
}

export default Posts
