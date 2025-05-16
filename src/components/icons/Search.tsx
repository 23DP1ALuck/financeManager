import * as React from "react"
import { SVGProps } from "react"
const Search = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={15}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                fill="#000"
                fillOpacity={0.49}
                d="m13.829 13.505-3.482-3.482a5.843 5.843 0 1 0-.825.825l3.482 3.481a.583.583 0 0 0 .825-.824ZM5.833 11a4.667 4.667 0 1 1 0-9.333 4.667 4.667 0 0 1 0 9.333Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 .5h14v14H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default Search
