import React from 'react';
import { createRoot } from 'react-dom/client';
import { NodeWithDate } from '../scripts/content';
import { App } from '../App';

export const processEachNode = async (nodes: NodeWithDate[]) => {
    return Promise.all(
        nodes.map(async (node: NodeWithDate, index) => {
            return await injectReactApp(node, index);
        }
        )
    )
}

export const injectReactApp = async (nodesWithDate: NodeWithDate, index: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {

        try {

            const { node, pattern } = nodesWithDate;

            if (node.parentElement) {


                // console.log(node, "node", node.nodeName.toLowerCase());

                const date = node.innerHTML.match(pattern);



                // node.id = `highlighted-date-${index}`;

                // console.log(node.nodeName);



                // Create a new div element
                let element = Array.from(node.parentElement.getElementsByTagName(node.nodeName.toLowerCase())).pop();

                // Object.assign(element.style);

                console.log(element, "element");


                // Set class name and styles for the indicator element
                // element.className = "react-date-highlighter";
                // node.prepend(element);

                // const App = node.parentElement.innerHTML.replace(date[0], `<mark class="highlighted-date" >${date[0]}</mark>`)
                const root = createRoot(element);
                root.render(
                    <App node={nodesWithDate.node} pattern={nodesWithDate.pattern} />
                );

                // node.parentElement.innerHTML.replace(date[0], `<mark class="highlighted-date" >${date[0]}</mark>`);
                // node.parentElement.innerHTML = node.parentElement.innerHTML.replace(date[0], `<mark class="highlighted-date" >${date[0]}</mark>`);
                return resolve(true);
            }

            throw new Error("Parent element not found");



        } catch (error) {
            console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<error>>>>>>>>>>>>>>>>>>>>>>>>");
            
            return reject(error);
        }
    });
}