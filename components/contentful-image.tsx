import Image, { ImageProps } from 'next/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const ContentfulImage = ({ className, ...props }: ImageProps) => {
  return <Image className={className} loader={contentfulLoader} {...props} />
}

export default ContentfulImage
