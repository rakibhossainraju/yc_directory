import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityWriteToken } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: sanityWriteToken,
  useCdn: false,
});
