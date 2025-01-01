import React, { ReactNode, useEffect, useLayoutEffect } from 'react';
import { NodeWithDate } from '../scripts/content';
import { PopOver } from './components/Popover';

export function App({ node, pattern }: NodeWithDate) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const date = node.innerHTML.match(pattern);
  const text = node.innerHTML.replace(
    pattern,
    `<mark class="highlighted-date" >${date[0]}</mark>`
  );

  return (
    <>
      <span className="date-highlighter" >
        <span dangerouslySetInnerHTML={{ __html: text }} onClick={() => setIsOpen(!isOpen)} />
      </span>
      <PopOver isOpen={isOpen}>{date[0]}</PopOver>
    </>
  );
}
