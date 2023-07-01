import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import { Layout } from '../components/layout'
import { getAllPostsForHome, getSiteNavigation } from '../lib/api'
import Head from 'next/head'
import { SITE_NAME } from '../lib/constants'

export default function Index({ preview, allPosts, navigation }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  console.log(heroPost.coverImage)
  return (
    <>
      <Layout navigation={navigation}>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  const navigation = (await getSiteNavigation(preview)) ?? []
  return {
    props: { allPosts, navigation },
  }
}
