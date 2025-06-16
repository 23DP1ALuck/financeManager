import * as React from "react"
import { SVGProps } from "react"
const Food = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={12}
        fill="none"
        {...props}
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.6}
            d="M1.5 1v3.5c0 .55.45 1 1 1h2a1 1 0 0 0 1-1V1M3.5 1v10M10.5 7.5V1A2.5 2.5 0 0 0 8 3.5v3c0 .55.45 1 1 1h1.5Zm0 0V11"
        />
    </svg>
)
export default Food;
