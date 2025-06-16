import * as React from "react"
import { SVGProps } from "react"
const Other = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={17}
        fill="none"
        {...props}
    >
        <g
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <path d="M8.5 15.583a7.083 7.083 0 1 0 0-14.166 7.083 7.083 0 0 0 0 14.166ZM12.041 8.5h.007M8.5 8.5h.007M4.958 8.5h.007" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h17v17H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default Other
