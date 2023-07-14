import ContentfulImage from './contentful-image'
import Link from 'next/link'

type CoverImageProps = {
  className?: string
  title: string
  url: string
  slug?: string
  width: number
  height: number
}

const CoverImage = ({
  className,
  title,
  url,
  slug,
  width,
  height,
}: CoverImageProps) => {
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
    <div className={className} style={{ display: 'flex' }}>
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

export default CoverImage
