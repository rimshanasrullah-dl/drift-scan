import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={74}
      height={74}
      viewBox="0 0 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M52.416 10.292a30.692 30.692 0 00-15.417-4.125C19.971 6.167 6.166 19.97 6.166 37c0 17.029 13.805 30.833 30.833 30.833 17.029 0 30.834-13.804 30.834-30.833 0-2.112-.213-4.174-.617-6.167"
        stroke="#C2A15A"
        strokeWidth={4.625}
        strokeLinecap="round"
      />
      <Path
        d="M24.666 38.542s4.625 0 10.792 10.791c0 0 17.14-28.264 32.375-33.916"
        stroke="#C2A15A"
        strokeWidth={4.625}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
