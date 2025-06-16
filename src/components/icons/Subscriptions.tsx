import * as React from "react"
import { SVGProps } from "react"
const Subscriptions = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={12}
        fill="none"
        {...props}
    >
        <path
            fill="#000"
            fillOpacity={0.6}
            d="M5.5 3v.5h1V3h-1ZM6 2h.5a.5.5 0 0 0-.5-.5V2Zm-2-.5a.5.5 0 0 0 0 1v-1ZM6 3h.5V2h-1v1H6Zm0-1v-.5H4v1h2V2Z"
        />
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.6}
            d="M9 4H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM7.5 6.5v1M4.5 6.5v1"
        />
    </svg>
)
export default Subscriptions;
