'use server';

import 'server-only';
import { auth } from '@/auth';
import { isSessionInValid } from '@/lib/server-utils';
import { StartupData } from '@/components/StartupForm';
import { writeClient } from '@/sanity/lib/write-client';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export async function createStartup(formValues: StartupData) {
  const session = await auth();
  if (isSessionInValid(session)) return { error: 'Not signed in', status: 'ERROR' };

  try {
    const slug = slugify(formValues.title, { lower: true, strict: true });
    Object.assign(formValues, {
      slug: { _type: slug, current: slug },
      author: { _type: 'reference', _ref: session?.id },
    });
    const res = await writeClient.create({ _type: 'startup', ...formValues });

    // Add the startup reference to the author's startup_refs array
    writeClient
      .patch(session!.id)
      .append('startup_refs', [
        {
          _key: uuidv4(),
          _type: 'reference',
          _ref: res._id,
        },
      ])
      .commit();

    return { error: '', status: 'SUCCESS', id: res._id };
  } catch {
    return { error: 'Something went wrong', status: 'ERROR' };
  }
}
