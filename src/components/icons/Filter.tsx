import * as React from "react"
import { SVGProps } from "react"
const Filter = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={11}
        height={12}
        viewBox="0 0 11 12"
        fill="none"
        {...props}
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            d="M1.75 6.938V.843m0 6.093a.937.937 0 1 1 0 1.875m0-1.874a.937.937 0 1 0 0 1.875m0 0v2.343m7.5-4.219V.845m0 6.093a.937.937 0 1 1 0 1.875m0-1.874a.937.937 0 1 0 0 1.875m0 0v2.343M5.5 3.187V.845m0 2.344a.937.937 0 1 1 0 1.874m0-1.875a.937.937 0 1 0 0 1.876m0 0v6.093"
        />
    </svg>
)
export default Filter;
