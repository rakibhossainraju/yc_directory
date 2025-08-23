import NextLink from 'next/link';
import React, { forwardRef } from 'react';

import { onStart } from '../events';
import { shouldTriggerStartEvent } from './should-trigger-start-event';

type NextLinkProps = React.ComponentProps<typeof NextLink>;
type AnchorProps = React.ComponentProps<'a'>;
// Accept anchor props and optionally NextLink props; we’ll forward safely based on target element
type Props = AnchorProps & Partial<NextLinkProps>;

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  { href, onClick, ...rest },
  ref,
) {
  // Determine if this is an internal navigation:
  // - string href that is app-relative (starts with '/') or relative (no scheme like http:, mailto:, tel:)
  // - UrlObject will be treated as internal (NextLink supports it)
  const isStringHref = typeof href === 'string';
  const isRelativeNoScheme = isStringHref && !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href as string); // no URL scheme
  const useLink =
    href != null && (!isStringHref || (href as string).startsWith('/') || isRelativeNoScheme);

  if (!useLink) {
    // External or non-internal: render plain anchor
    const anchorProps: AnchorProps = {
      href: href as AnchorProps['href'],
      onClick,
      ...rest,
    } as AnchorProps;
    return <a {...anchorProps} ref={ref} />;
  }

  // Internal: render NextLink and trigger start event
  const nextProps = rest as Omit<NextLinkProps, 'href' | 'onClick' | 'ref'>;
  return (
    <NextLink
      href={href as NextLinkProps['href']}
      onClick={(event) => {
        if (shouldTriggerStartEvent(String((href as any) ?? ''), event)) onStart();
        if (onClick) onClick(event as any);
      }}
      {...nextProps}
      ref={ref as any}
    />
  );
});
