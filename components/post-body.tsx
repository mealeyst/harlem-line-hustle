import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import markdownStyles from './markdown-styles.module.css'
import RichTextAsset from './rich-text-asset'
import { H1, P } from './typography'

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
    [BLOCKS.PARAGRAPH]: (_node, children) => <P>{children}</P>,
  },
})

export default function PostBody({ content }) {
  return (
    <div className='max-w-2xl mx-auto'>
      <div className={markdownStyles['markdown']}>
        {documentToReactComponents(
          content.json,
          customMarkdownOptions(content),
        )}
      </div>
    </div>
  )
}
