import Link from 'next/link'
// import Avatar from '../ui/Avatar'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'


export default function PostCard ({ post }) {
  const fields = post?.fields || {}
  const { title, slug, excerpt, coverImage, date } = fields
  const imageFile = coverImage?.fields?.file
  const postUrl = slug ? `/blog/${slug}` : '#'

  return (
    <li className='rounded-md overflow-hidden shadow-md'>
      <Link href={postUrl} aria-label={title || 'Blog post'}>
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
         
          <h3 className='text-md mb-1 leading-snug font-bold'>{title || 'Untitled Post'}</h3>
          <div className='text-sm mb-1 mt-3 text-gray-400'>
            {date ? <DateComponent dateString={date} /> : null}
          </div>
          <p className="text-base mb-4 line-clamp-3">{excerpt || 'No excerpt available.'}</p>
          <span className='text-green-700'>Read More</span>
          {/* <Avatar name={author.fields.name} picture={author.fields.picture} /> */}
        </div>
      </Link>
    </li>
  )
}

