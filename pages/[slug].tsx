import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../components/container'
import PostBody from '../components/post-body'
import SectionSeparator from '../components/section-separator'
import { Layout } from '../components/layout'
import { getAllPages, getPage, getSiteNavigation } from '../lib/api'
import PostTitle from '../components/post-title'

export default function Post({ page, navigation }) {
  const router = useRouter()

  if (!router.isFallback && !page) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout navigation={navigation}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{`${page.title} | Harlem Line Hustle Studios`}</title>
              </Head>
              <PostBody content={page.body} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { page } = await getPage(params.slug, preview)
  const navigation = (await getSiteNavigation(preview)) ?? []
  return {
    props: {
      page: page ?? null,
      navigation,
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPages()
  return {
    paths: allPages?.map(({ slug }) => `/${slug}`) ?? [],
    fallback: true,
  }
}
