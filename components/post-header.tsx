import styled from 'styled-components'
import Avatar from './avatar'
import DateComponent from './date'
import CoverImage from './cover-image'
import { Title } from './typography'

const PostHeader = styled(({ className, title, coverImage, date, author }) => (
  <header className={className}>
    <Title>{title}</Title>
    <CoverImage
      className='cover-image'
      title={title}
      url={coverImage.url}
      width={coverImage.width}
      height={coverImage.height}
    />
    {author && <Avatar name={author.name} picture={author.picture} />}
    <DateComponent dateString={date} />
  </header>
))`
  .cover-image {
    margin-bottom: 2rem;
  }
`

export default PostHeader
