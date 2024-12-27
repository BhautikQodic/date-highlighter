import { injectReactApp, processEachNode } from "../helpers/injectElement";


console.log('content script loaded and searching for dates');
// /\b(?:\d{1,2}[-/thstndrd\s]?\d{1,2}[-/thstndrd\s]?\d{4}|\d{1,2}[-/thstndrd\s]?\d{4})\b/g, // MM/DD/YYYY, DD/MM/YYYY, etc.
// /\b(?:\d{4}[-/thstndrd\s]?\d{1,2}[-/thstndrd\s]?\d{1,2})\b/g, // YYYY-MM-DD

const datePatterns = [
    /\b(?:\w{3,9} \d{1,2}, \d{4})\b/g, // Month DD, YYYY
    /\b(?:\d{1,2} \w{3,9} \d{4})\b/g, // DD Month YYYY
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2}$/g, // Month DD
    /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/g, // 12/25/2024
    /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/g, // 25/12/2024
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g, // 2024-12-25
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}, \d{4}$/g, // Dec 25, 2024
    /^\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/g, // 25 Dec 2024
];

/**
 * This function loops through all nodes in the body of the page, checks for dates in the innerHTML of the node using a list of regex patterns, and if a match is found, it adds the node to an array and highlights the date by wrapping it in a span tag with a class of "highlighted-date".
 * The function returns a Promise that resolves with the array of nodes that had dates in their innerHTML.
 * @returns {Promise<HTMLElement[]>} a Promise that resolves with an array of nodes that had dates in their innerHTML.
 */

export interface NodeWithDate {
    node: HTMLElement;
    pattern: RegExp;
}


const getNodesWithDates = async (): Promise<NodeWithDate[]> => {
    return new Promise((resolve, reject) => {
        try {
            // get all nodes from the body
            const allNodes: NodeListOf<Element> = document.querySelectorAll('body *:not(script)');

            const nodeWithDates: NodeWithDate[] = [];

            // loop through each node and check for dates in the innerHTML of the node and highlight them if found 

            for (let index = 0; index < datePatterns.length; index++) {
                const pattern = datePatterns[index];

                for (let node of allNodes) {
                    if (node instanceof HTMLElement) {

                        const htmlTagRegex = /<([a-z][\s\S]*?)>/i;

                        if (htmlTagRegex.test(node.innerHTML)) continue;

                        const numbers = node.innerHTML.match(pattern);

                        if (numbers) {
                            // console.log(node, "node");

                            // console.log(numbers, "numbers");
                            // console.log(node.parentElement, "node.parentElement");

                            if (node.parentElement) {
                                nodeWithDates.push({node, pattern});
                                // node.parentElement.innerHTML = node.parentElement.innerHTML.replace(numbers[0], ` <span class="date-highlighter" ><mark class="highlighted-date" >${numbers[0]}</mark></span>`);
                                // node.style.backgroundColor = "yellow";
                            }
                        }
                    }
                }

            }
            return resolve(nodeWithDates);
        } catch (error) {
            console.error(error);
            return reject(error);

        }
    });
}

/**
 * Main function that runs on page load.
 * Finds all nodes in the body of the page, filters out the ones without a parent, and then loops through the rest.
 * For each node, it checks if the innerHTML contains a date in the format "Month DD, YYYY" or "DD Month YYYY".
 * If it does, it wraps the date in a span with a class of "highlighted-date" and logs the node and the date to the console.
 */
async function main() {

    // get nodes with dates from the page
    const nodesWithDates: NodeWithDate[] = await getNodesWithDates();

    console.log(nodesWithDates, "nodesWithDates");

    // inject react app into the page and highlight the dates
    await processEachNode(nodesWithDates);
    


}

// const observer = new MutationObserver(main);
// observer.observe(document.body, { childList: true, subtree: true });


main();