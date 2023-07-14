import Image from 'next/image'
import styled from 'styled-components'

type RichTextProps = {
  className?: string
  id: string
  assets: any[]
}

const RichTextAsset = styled(({ className, id, assets }: RichTextProps) => {
  const asset = assets?.find(asset => asset.sys.id === id)

  if (asset?.url) {
    return (
      <div className={className}>
        <Image
          src={asset.url}
          alt={asset.description}
          width={asset.width}
          height={asset.height}
        />
      </div>
    )
  }

  return null
})`
  max-width: 100%;
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
`

export default RichTextAsset
