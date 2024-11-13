import Link from 'next/link'
// import Avatar from '../ui/Avatar'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'
import { client } from '../../../lib/contentful/client'


export default function PostCard ({ post }) {
  const { title, slug, excerpt, coverImage, author, date } = post.fields

  return (
    <li className='rounded-md overflow-hidden shadow-md'>
      <Link href={`/blog/${slug}`} aria-label={title}>
        <div className='mb-2'>
          <ContentfulImage
            alt={`Cover Image for ${title}`}
            src={coverImage.fields.file.url}
            width={coverImage.fields.file.details.image.width}
            height={coverImage.fields.file.details.image.height}
          />
        </div>
        <div className='p-4'>
          <div className='text-sm mb-4 text-gray-400'>
            <DateComponent dateString={date} />
          </div>
          <h3 className='text-xl mb-1 leading-snug font-bold'>{title}</h3>
          <p className='text-base mb-4'>{excerpt}</p>
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


