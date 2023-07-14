import ContentfulImage from './contentful-image'
import Link from 'next/link'
import cn from 'classnames'

type CoverImageProps = {
  title: string
  url: string
  slug?: string
  width: number
  height: number
}

export default function CoverImage({
  title,
  url,
  slug,
  width,
  height,
}: CoverImageProps) {
  const image = (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: `${(height / width) * 100}%`,
      }}
    >
      <ContentfulImage
        layout='fill'
        objectFit='contain'
        alt={`Cover Image for ${title}`}
        src={url}
      />
    </div>
  )

  return (
    <div style={{ display: 'flex' }}>
      {slug ? (
        <Link
          style={{ position: 'relative', width: '100%' }}
          href={`/posts/${slug}`}
          aria-label={title}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
