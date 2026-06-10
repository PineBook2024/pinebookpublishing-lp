import RichText from '../RichText'

const PostBody = ({ post }) => {
  const content = post?.fields?.content

  return (
    <div className='mx-auto prose'>
      {content ? <RichText content={content} /> : <p>Content will be available soon.</p>}
    </div>
  )
}
export default PostBody
