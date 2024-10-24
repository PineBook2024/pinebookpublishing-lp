// import Avatar from '../ui/Avatar'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'
import { client } from '../../../lib/contentful/client'

const PostHeader = ({ post }) => {
  const { title, coverImage, author, date } = post.fields

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>{title}</h1>
      <div className='hidden md:flex md:justify-between md:items-center md:mb-10'>
        {/* <Avatar name={author.fields.name} picture={author.fields.picture} /> */}
        <DateComponent dateString={date} className='text-sm text-gray-400' />
      </div>
      <div className='mb-8 md:mb-16 sm:mx-0'>
        <ContentfulImage
          alt={`Cover Image for ${title}`}
          src={coverImage.fields.file.url}
          width={coverImage.fields.file.details.image.width}
          height={coverImage.fields.file.details.image.height}
        />
      </div>
      <div className='flex justify-between items-center md:hidden mb-6'>
        {/* <Avatar name={author.fields.name} picture={author.fields.picture} /> */}
        <DateComponent dateString={date} className='text-sm text-gray-400' />
      </div>
    </>
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
export default PostHeader
