import Avatar from './avatar'
import DateComponent from './date'
import CoverImage from './cover-image'
import PostTitle from './post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div>
        <CoverImage
          title={title}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
      <div>
        <div>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div>
          <DateComponent dateString={date} />
        </div>
      </div>
    </>
  )
}
