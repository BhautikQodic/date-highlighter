import React, { useEffect } from 'react';
import { NodeWithDate } from '../scripts/content';

export function App({ node, pattern }: NodeWithDate) {

    const [date, setDate] = React.useState<string | null>(null);

    // console.log(date, "datedatedatedate");


    useEffect(() => {
        console.log(pattern, "pattern pattern pattern");
        
        if (node.parentElement) {

            console.log(node.innerHTML, "<<<<<<<<<<<<<<<<<<<<<node.innerHTML>>>>>>>>>>>>>>>>>>>>>");  
            
            const date = node.innerHTML.match(pattern);
            console.log(date, "<<<<<<<<<<<<<<<<<<<<<<<date>>>>>>>>>>>>>>>>>>>>>>>");
            
            // const newDate = node.parentElement.innerHTML.replace(date[0], `<mark class="highlighted-date" >${date[0]}</mark>`)
            // const tag = node.parentElement.getElementsByTagName(node.nodeName.toLowerCase())
            // setDate(`<${tag}>${newDate}</${tag}>`);
            // console.log(newDate, "newDate");
        } else {
            setDate("");
        }
    }, []);





    return (
        // <div style={{ display: "inline-block" }} dangerouslySetInnerHTML={{ __html: "<p>Bhautik</p>" }}></div>
    )
}