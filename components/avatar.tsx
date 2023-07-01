import ContentfulImage from './contentful-image'

export default function Avatar({ name, picture }) {
  return (
    <div className='flex items-center'>
      <div style={{ position: 'relative' }}>
        <ContentfulImage
          src={picture.url}
          width={40}
          height={40}
          className='rounded-full'
          alt={name}
        />
      </div>
      <div className='text-xl font-bold'>{name}</div>
    </div>
  )
}
