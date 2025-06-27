import {useEffect, useRef, useState} from "react";

const getIsMobile = () => window.innerWidth < 1024;

export const useIsLaptot = () => {
    const [isMobile, setIsMobile] = useState(getIsMobile());
    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
        }
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    return isMobile;
}