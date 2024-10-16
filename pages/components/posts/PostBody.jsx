import RichText from '../RichText'
import { client } from '../../../lib/contentful/client'

const PostBody = ({ post }) => {
  const { content } = post.fields

  return (
    <div className='mx-auto prose'>
      <RichText content={content} />
    </div>
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
export default PostBody
