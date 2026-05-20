import Head from "next/head";
import dynamic from "next/dynamic";
import BrandPrimaryHeader from '../components/BrandPrimaryHeader'
import BrandNavbar from '../components/BrandNavbar'
import BrandFooter from '../components/BrandFooter';

// PostCard nests an <a> inside an <a>, which is invalid HTML and triggers a
// React hydration mismatch. Rendering it client-only avoids the server/client
// markup divergence without modifying PostCard itself.
const PostCard = dynamic(() => import('../components/posts/PostCard'), { ssr: false });

// Dummy blog data — shaped to match what PostCard expects (Contentful-style)
const buildCoverImage = (url) => ({
  fields: {
    file: {
      url,
      details: { image: { width: 1200, height: 800 } }
    }
  }
});

const dummyPosts = [
  {
    sys: { id: '1' },
    fields: {
      title: 'Welcome to PineBook Publishing Blog',
      slug: 'welcome-to-pinebook',
      excerpt: 'Discover expert tips on writing, editing, and publishing your book with PineBook Publishing.',
      date: '2024-01-15',
      author: { fields: { name: 'PineBook Team' } },
      coverImage: buildCoverImage('/images/banner-lp3.jpg')
    }
  },
  {
    sys: { id: '2' },
    fields: {
      title: 'How to Format Your Book Professionally',
      slug: 'book-formatting-guide',
      excerpt: 'Learn the essential formatting techniques to make your book look polished and professional.',
      date: '2024-02-20',
      author: { fields: { name: 'Editorial Team' } },
      coverImage: buildCoverImage('/images/features-img.jpg')
    }
  },
  {
    sys: { id: '3' },
    fields: {
      title: 'Self-Publishing vs Traditional Publishing',
      slug: 'self-publishing-vs-traditional',
      excerpt: 'Explore the pros and cons of self-publishing and traditional publishing routes.',
      date: '2024-03-10',
      author: { fields: { name: 'Publishing Expert' } },
      coverImage: buildCoverImage('/images/new-lp-banner.jpg')
    }
  }
];

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
      </Head>
      <BrandNavbar />
      <BrandPrimaryHeader
        subtitle="Our Blog - Learn. Write. Improve"
        title=""
        desc="Read our insightful blog posts written by publishing experts and writers who stay updated with industry trends and the challenges faced by both new and experienced authors. Stay informed with expert tips and practical guides on book publishing, formatting, marketing, and other key aspects of the publishing process."
      />
      <section className='overflow-hidden'>
        <div className='relative max-w-screen-xl px-4 mx-auto my-20 py-22'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10'>
            {posts.map((post, i) => (
              <PostCard key={post.fields.slug} post={post} />
            ))}
          </ul>

        </div>
      </section>
      <BrandFooter />
      <BrandFooter />
    </>
  )
}

export const getStaticProps = async () => {
  // No Contentful needed — return dummy data
  return {
    props: {
      posts: dummyPosts,
    },
    revalidate: 60
  }
}

export default Posts