import React from 'react';
import { createRoot } from 'react-dom/client';
import { NodeWithDate } from '../scripts/content';
import { App } from '../App';

export const processEachNode = async (nodes: NodeWithDate[]) => {
  return Promise.all(
    nodes.map(async (node: NodeWithDate, index) => {
      return await injectReactApp(node, index);
    })
  );
};

export const injectReactApp = async (
  nodesWithDate: NodeWithDate,
  index: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const { node, pattern } = nodesWithDate;

      if (node.parentElement) {
        const clonedNode = node.cloneNode(true) as HTMLElement;

        const root = createRoot(clonedNode);
        root.render(
          <App node={clonedNode} pattern={pattern} />
        );
        node.insertAdjacentElement('afterend', clonedNode);
        node.remove();

        return resolve(true);
      }

      throw new Error('Parent element not found');
    } catch (error) {
      return reject(error);
    }
  });
};
