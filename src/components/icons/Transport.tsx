import * as React from "react"
import { SVGProps } from "react"
const Transport = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={11}
        height={11}
        fill="none"
        {...props}
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.6}
            d="M7.9 9.6 7 5.5l1.75-1.75C9.5 3 9.75 2 9.5 1.5c-.5-.25-1.5 0-2.25.75L5.5 4l-4.1-.9c-.25-.05-.45.05-.55.25L.7 3.6c-.1.25-.05.5.15.65L3.5 6l-1 1.5H1L.5 8 2 9l1 1.5.5-.5V8.5l1.5-1 1.75 2.65c.15.2.4.25.65.15l.25-.1c.2-.15.3-.35.25-.6Z"
        />
    </svg>
)
export default Transport
