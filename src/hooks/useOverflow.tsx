import {useState} from "react";

export const useOverflow = (element: HTMLDivElement | null) => {
    // state for checking overflow
    const [isOverflow, setIsOverflow] = useState(false);
    // check overflow
    if (element) {
        setIsOverflow(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth);
    }
    return isOverflow;
}