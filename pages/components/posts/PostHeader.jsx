// import Avatar from '../ui/Avatar'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'

const PostHeader = ({ post }) => {
  const { title, coverImage, author, date } = post.fields
  const imageFile = coverImage?.fields?.file

  return (
    <>
      {/* <h1 className='text-3xl font-bold mb-4'>{title}</h1> */}
      <div className='hidden md:flex md:justify-between md:items-center mb-4'>
        {/* <Avatar name={author.fields.name} picture={author.fields.picture} /> */}
        {/* <DateComponent dateString={date} className='text-sm text-gray-400' /> */}
      </div>
      <div className='mb-8 sm:mx-0'>
        {imageFile ? (
          <ContentfulImage
            alt={`Cover Image for ${title}`}
            src={imageFile.url}
            width={imageFile.details.image.width}
            height={imageFile.details.image.height}
          />
        ) : (
          <div className='w-full h-64 bg-gray-300 rounded' />
        )}
      </div>
      <div className='flex justify-between items-center md:hidden mb-6'>
        {/* <Avatar name={author.fields.name} picture={author.fields.picture} /> */}
        <DateComponent dateString={date} className='text-sm text-gray-400' />
      </div>
    </>
  )
}
export default PostHeader
