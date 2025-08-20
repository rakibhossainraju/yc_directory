import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type=="startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc) {
  _id, title, slug,
  _createdAt,views,
  category, image,
  author -> {
    _id, name, image
  },
}`);

export const STARTUPS_BY_AUTHOR_ID_QUERY = defineQuery(
  `*[_type=="startup" && author._ref == $id ] | order(_createdAt desc) {
  _id, title, slug,
  _createdAt,views,
  category, image,
  author -> {
    _id, name, image
  },
}`,
);

export const STARTUP_DETAIL_QUERY = defineQuery(
  `*[_type == 'startup' && _id == $id][0] {
    _id, title, slug,
    _createdAt, views, pitch,
    category, image, description,
    author -> {
      _id, name, image, username
    },
  }`,
);

export const STARTUP_VIEWS_QUERY = defineQuery(
  `*[_type == 'startup' && _id == $id][0].views`,
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == 'author' && id == $id][0] {
    _id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == 'author' && _id == $id][0] {
    _id,
    name,
    username,
    image,
    bio
}
`);
