import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={11}
      height={9}
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.001 8.658c.21.228.486.342.764.342.277 0 .552-.114.763-.342l6.157-6.664a1.24 1.24 0 000-1.652 1.023 1.023 0 00-1.527 0L3.765 6.18 1.842 4.099a1.023 1.023 0 00-1.526 0 1.24 1.24 0 000 1.652L3 8.658z"
        fill="#fff"
        fillOpacity={1}
      />
    </Svg>
  )
}

export default SvgComponent
