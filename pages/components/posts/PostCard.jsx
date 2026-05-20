import Link from 'next/link'
// import Avatar from '../ui/Avatar'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'
import { client } from '../../../lib/contentful/client'


export default function PostCard ({ post }) {
  const { title, slug, excerpt, coverImage, author, date } = post.fields
  const imageFile = coverImage?.fields?.file

  return (
    <li className='rounded-md overflow-hidden shadow-md'>
      <Link href={`/blog/${slug}`} aria-label={title}>
        <div className='mb-2'>
          {imageFile ? (
            <ContentfulImage
              alt={`Cover Image for ${title}`}
              src={imageFile.url}
              width={imageFile.details.image.width}
              height={imageFile.details.image.height}
            />
          ) : (
            <div className='w-full h-52 bg-gray-300' />
          )}
        </div>
        <div className='p-4'>
         
          <h3 className='text-md mb-1 leading-snug font-bold'>{title}</h3>
          <div className='text-sm mb-1 mt-3 text-gray-400'>
            <DateComponent dateString={date} />
          </div>
          <p className="text-base mb-4 line-clamp-3">{excerpt}</p>
          <span className='text-green-700'>Read More</span>
          {/* <Avatar name={author.fields.name} picture={author.fields.picture} /> */}
        </div>
      </Link>
    </li>
  )
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'post' })

  return {
    props: {
      post: response?.items?.[0],
      revalidate: 60
    }
  }
}
