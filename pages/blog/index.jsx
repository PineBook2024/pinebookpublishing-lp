import { client } from '../../lib/contentful/client'
import Head from "next/head";
import PostCard from '../components/posts/PostCard'
import BrandPrimaryHeader from '../components/BrandPrimaryHeader'
import BrandNavbar from '../components/BrandNavbar'
import BrandFooter from '../components/BrandFooter';

const Posts = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Book Publishing Blog | Insightful Guides For Authors</title>
        <meta
          name="description"
          content="Read blog posts related to book publishing, formatting, and marketing and stay updated with self-publishing guides written by industry experts"
        />
        <link rel="shortcut icon" href="/images/fav.png" />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
      </Head>
      <BrandNavbar />
      <BrandPrimaryHeader
        subtitle="Our Blog - Learn. Write. Improve"
        title=""
        desc="Read our insightful blog posts written by publishing experts and writers who stay updated with industry trends and the challenges faced by both new and experienced authors. Stay informed with expert tips and practical guides on book publishing, formatting, marketing, and other key aspects of the publishing process."
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
      <BrandFooter />
    </>

  )
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'post' })
  const posts = [...(response.items || [])].sort((a, b) => {
    const aDate = new Date(a?.fields?.date || a?.sys?.createdAt || 0).getTime()
    const bDate = new Date(b?.fields?.date || b?.sys?.createdAt || 0).getTime()
    return bDate - aDate
  })

  return {
    props: {
      posts,
    },
    revalidate: 60
  }
}

export default Posts
