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

  // Generate Article/BlogPosting Schema
  const generateArticleSchema = () => {
    // Parse blogSchema if it exists
    let blogSchemaData = {};
    if (post?.fields?.blogSchema) {
      try {
        blogSchemaData = typeof post.fields.blogSchema === 'string' 
          ? JSON.parse(post.fields.blogSchema) 
          : post.fields.blogSchema;
      } catch (e) {
        console.error('Invalid blog schema JSON:', e);
      }
    }

    // Build the schema with fallbacks
    const schema = {
      "@context": "https://schema.org",
      "@type": blogSchemaData.schemaType || "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://pinebookpublishing.com/blog/${post?.fields?.slug}`
      },
      "headline": blogSchemaData.headline || post?.fields?.title,
      "description": blogSchemaData.description || post?.fields?.metaDescription || post?.fields?.excerpt,
      "author": {
        "@type": blogSchemaData.authorType || "Organization",
        "name": blogSchemaData.authorName || post?.fields?.author?.fields?.name || "Pine Book Publishing",
        "url": "https://pinebookpublishing.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": blogSchemaData.publisherName || "Pine Book Publishing",
        "logo": {
          "@type": "ImageObject",
          "url": blogSchemaData.publisherLogo || "https://pinebookpublishing.com/_next/image?url=%2Fbrand-img%2Flogo.png&w=256&q=75"
        }
      },
      "datePublished": post?.fields?.date || post?.sys?.createdAt,
      "dateModified": blogSchemaData.dateModified || post?.sys?.updatedAt
    };

    // Add image from coverImage or blogSchema
    const imageUrl = blogSchemaData.image || post?.fields?.coverImage?.fields?.file?.url;
    if (imageUrl) {
      schema.image = imageUrl.startsWith('http') ? imageUrl : `https:${imageUrl}`;
    }

    return JSON.stringify(schema, null, 2);
  };

  // Generate FAQ Schema
  const generateFAQSchema = () => {
    if (!post?.fields?.faqSchema) return null;

    let faqData;
    try {
      // Parse if it's a string, otherwise use as is
      faqData = typeof post.fields.faqSchema === 'string' 
        ? JSON.parse(post.fields.faqSchema) 
        : post.fields.faqSchema;
    } catch (e) {
      console.error('Invalid FAQ JSON:', e);
      return null;
    }

    // Make sure it's an array and has content
    if (!Array.isArray(faqData) || faqData.length === 0) return null;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    return JSON.stringify(faqSchema, null, 2);
    
  };

  const faqSchemaString = generateFAQSchema();


  return (
    <>
      <Head>
        <title>{post?.fields?.metaTitle || post?.fields?.title}</title>
        <meta
          name="description"
          content={post?.fields?.metaDescription || post?.fields?.excerpt || 'Read this blog post'}
        />
        <link rel="shortcut icon" href="/images/fav.png" />

        {/* Article/BlogPosting Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateArticleSchema() }}
        />

        {/* FAQ Schema  */}
        {faqSchemaString && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqSchemaString }}
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

  const postResponse = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })

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
