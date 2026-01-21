import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={20}
      height={19}
      viewBox="0 0 19 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.281 18.687c.236 1.754 1.689 3.128 3.457 3.209C6.225 21.964 7.736 22 9.4 22c1.664 0 3.175-.036 4.662-.104 1.768-.081 3.22-1.455 3.457-3.209.154-1.145.28-2.317.28-3.512 0-1.194-.126-2.367-.28-3.512-.237-1.754-1.69-3.127-3.457-3.209A100.21 100.21 0 009.4 8.35c-1.664 0-3.175.036-4.662.104-1.768.082-3.22 1.455-3.457 3.21C1.127 12.807 1 13.98 1 15.174c0 1.195.127 2.367.281 3.512z"
        stroke="#C2A15A"
        strokeWidth={2}
      />
      <Path
        d="M4.674 8.35V5.725a4.725 4.725 0 019.45 0V8.35M13.6 15.164v.012M9.4 15.164v.012M5.2 15.164v.012"
        stroke="#C2A15A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
