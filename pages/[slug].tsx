import { useRouter } from "next/router"
import Head from "next/head"
import ErrorPage from "next/error"
import Container from "../components/container"
import PostBody from "../components/post-body"
import MoreStories from "../components/more-stories"
import Header from "../components/header"
import PostHeader from "../components/post-header"
import SectionSeparator from "../components/section-separator"
import Layout from "../components/layout"
import { getAllPages, getPage } from "../lib/api"
import PostTitle from "../components/post-title"
import { CMS_NAME } from "../lib/constants"

export default function Post({ page, preview }) {
  const router = useRouter()

  if (!router.isFallback && !page) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${page.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
              </Head>
              <PostBody content={page.body} />
            </article>
            <SectionSeparator />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { page } = await getPage(params.slug, preview)
  return {
    props: {
      preview,
      page: page ?? null,
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
