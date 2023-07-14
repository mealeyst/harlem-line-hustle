import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import RichTextAsset from './rich-text-asset'
import { H1, H2, H3, H4, H5, H6, P } from './typography'

const customMarkdownOptions = content => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      )
    },
    [BLOCKS.HEADING_1]: (_node, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (_node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (_node, children) => <H3>{children}</H3>,
    [BLOCKS.HEADING_4]: (_node, children) => <H4>{children}</H4>,
    [BLOCKS.HEADING_5]: (_node, children) => <H5>{children}</H5>,
    [BLOCKS.HEADING_6]: (_node, children) => <H6>{children}</H6>,
    [BLOCKS.PARAGRAPH]: (_node, children) => <P>{children}</P>,
  },
})

export default function PostBody({ content }) {
  return (
    <div>
      <div>
        {documentToReactComponents(
          content.json,
          customMarkdownOptions(content),
        )}
      </div>
    </div>
  )
}
