import * as React from "react"
import { SVGProps } from "react"
const SortBy = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={3}
        height={10}
        fill="none"
        viewBox="0 0 3 10"
        {...props}
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            d="M1.5 1.719a.469.469 0 1 1 0-.938.469.469 0 0 1 0 .938Zm0 3.75a.469.469 0 1 1 0-.938.469.469 0 0 1 0 .938Zm0 3.75a.469.469 0 1 1 0-.938.469.469 0 0 1 0 .938Z"
        />
    </svg>
)
export default SortBy;
