import ContentfulImage from './ContentfulImage'

const Avatar = ({ name, picture }) => {
  if (!post || !post.fields) {
    return <p>Loading...</p>; // You can replace this with a loader or a fallback UI
  }
  return (
    <div className='flex items-center'>
      <div className='relative w-10 h-10 mr-4'>
        <ContentfulImage
          src={picture.fields.file.url}
          layout='fill'
          className='rounded-full m-0'
          alt={name}
        />
      </div>
      <div className='font-semibold'>{name}</div>
    </div>
  )
}

export default Avatar
