import Link from 'next/link'
import Avatar from './avatar'
import DateComponent from './date'
import CoverImage from './cover-image'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <CoverImage
          title={title}
          slug={slug}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
      <h3 className='text-3xl mb-3 leading-snug'>
        <Link href={`/posts/${slug}`} className='hover:underline'>
          {title}
        </Link>
      </h3>
      <div className='text-lg mb-4'>
        <DateComponent dateString={date} />
      </div>
      <p className='text-lg leading-relaxed mb-4'>{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}
