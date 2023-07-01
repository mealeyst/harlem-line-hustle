const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
  width
  height
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
        width
        height
      }
    }
  }
}
`

const PAGE_GRAPHQL_FIELDS = `
slug
title
body {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
        width
        height
      }
    }
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  ).then(response => response.json())
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPage(fetchResponse) {
  return fetchResponse?.data?.pageCollection?.items?.[0]
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items
}

function extractPageEntries(fetchResponse) {
  return fetchResponse?.data?.pageCollection?.items
}

function extractNavigationLinks(fetchResponse) {
  return fetchResponse?.data?.navigationCollection?.items[0].linksCollection.items.reduce(
    (acc, { title, slug }) => {
      return [
        ...acc,
        { children: title, href: `/${slug !== null ? slug : ''}` },
      ]
    },
    [],
  )
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}

export async function getPage(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  )
  return {
    page: extractPage(entry),
  }
}

export async function getAllPages() {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug_exists: true } limit: 100){
        items {
          slug
          title
        }
      }
    }`,
  )
  return extractPageEntries(entries)
}

export async function getSiteNavigation(preview) {
  const entries = await fetchGraphQL(
    `query {
      navigationCollection(where: {title: "Site Navigation"} preview: ${
        preview ? 'true' : 'false'
      }){
        items{
          title
          linksCollection(limit: 100) {
            items {
              __typename
              ... on Page {
                title
                slug
              }
              ... on Post {
                title
                slug
              }
              ... on StaticRoute {
                title
                slug
              }
            }
          }
        }
      }
    }`,
  )
  return extractNavigationLinks(entries)
}
