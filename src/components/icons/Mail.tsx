import * as React from "react"
import { SVGProps } from "react"
const Mail = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={15}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                fill="#000"
                fillOpacity={0.8}
                d="M12.375.625h-8.75A3.129 3.129 0 0 0 .5 3.75v7.5a3.129 3.129 0 0 0 3.125 3.125h8.75A3.129 3.129 0 0 0 15.5 11.25v-7.5A3.129 3.129 0 0 0 12.375.625Zm-8.75 1.25h8.75a1.875 1.875 0 0 1 1.738 1.18L9.326 7.84a1.88 1.88 0 0 1-2.652 0L1.887 3.054a1.875 1.875 0 0 1 1.738-1.18Zm8.75 11.25h-8.75A1.875 1.875 0 0 1 1.75 11.25V4.687l4.04 4.038a3.13 3.13 0 0 0 4.42 0l4.04-4.038v6.563a1.875 1.875 0 0 1-1.875 1.875Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M.5 0h15v15H.5z" />
            </clipPath>
        </defs>
    </svg>
)
export default Mail;
