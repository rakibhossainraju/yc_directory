'use server';
import 'server-only';

import { updateTag } from 'next/cache';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '@/auth';
import { isSessionInValid } from '@/lib/server-utils';
import { StartupData } from '@/components/StartupForm';
import { writeClient } from '@/sanity/lib/write-client';

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface ActionResponse {
  error: string;
  status: Status;
  id?: string;
}

export type CreateStartupResponse = Promise<ActionResponse>;

export async function createStartup(formValues: StartupData): CreateStartupResponse {
  const session = await auth();
  if (isSessionInValid(session)) return { error: 'Not signed in', status: Status.ERROR };

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
    updateTag('startups-all');
    return { error: '', status: Status.SUCCESS, id: res._id };
  } catch {
    return { error: 'Something went wrong', status: Status.ERROR };
  }
}
