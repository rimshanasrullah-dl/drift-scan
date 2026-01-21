import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={20}
      height={19}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 3.647l7.32 4.148c2.698 1.529 3.838 1.529 6.537 0l7.32-4.148"
        stroke="#C2A15A"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M1.017 11.562c.069 3.246.104 4.87 1.301 6.072 1.198 1.202 2.865 1.244 6.198 1.327 2.055.052 4.09.052 6.144 0 3.334-.083 5-.125 6.198-1.327 1.198-1.203 1.233-2.826 1.302-6.072a72.66 72.66 0 000-3.124c-.07-3.246-.104-4.87-1.302-6.071-1.197-1.203-2.864-1.245-6.198-1.328-2.055-.052-4.089-.052-6.144 0-3.333.083-5 .125-6.198 1.328-1.197 1.202-1.232 2.825-1.301 6.07a73.12 73.12 0 000 3.125z"
        stroke="#C2A15A"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
