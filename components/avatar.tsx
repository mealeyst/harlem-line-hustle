import styled from 'styled-components'
import ContentfulImage from './contentful-image'

type AvatarProps = {
  className?: string
  name: string
  picture: {
    url: string
  }
}

const Avatar = styled(({ className, name, picture }: AvatarProps) => (
  <div className={className}>
    <div style={{ position: 'relative' }}>
      <ContentfulImage src={picture.url} width={40} height={40} alt={name} />
    </div>
    <span>{name}</span>
  </div>
))`
  img {
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
`

export default Avatar
