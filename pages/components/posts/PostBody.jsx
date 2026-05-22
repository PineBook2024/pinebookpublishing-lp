import RichText from '../RichText'

const PostBody = ({ post }) => {
  if (!post?.fields) return null
  const { content } = post.fields

  return (
    <div className='mx-auto prose'>
      <RichText content={content} />
    </div>
  )
}

export default PostBody
