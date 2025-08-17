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
