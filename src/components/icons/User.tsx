import * as React from "react"
import { SVGProps } from "react"
const User = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={19}
        fill="none"
        {...props}
    >
        <g fill="#000" fillOpacity={0.9} clipPath="url(#a)">
            <path d="M9 9.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM9 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM9 11a6.758 6.758 0 0 0-6.75 6.75.75.75 0 1 0 1.5 0 5.25 5.25 0 1 1 10.5 0 .75.75 0 1 0 1.5 0A6.758 6.758 0 0 0 9 11Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 .5h18v18H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default User
