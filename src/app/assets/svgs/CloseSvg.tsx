import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props:any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_1104_1245)">
        <Rect
          x={4.84766}
          y={4.84619}
          width={21}
          height={21}
          rx={10.5}
          fill="#fff"
        />
        <Path
          d="M19.979 19.979a.726.726 0 01-1.029 0l-3.604-3.602-3.604 3.602a.727.727 0 11-1.029-1.03l3.604-3.601-3.604-3.605a.727.727 0 111.03-1.03l3.603 3.606 3.604-3.605a.727.727 0 111.029 1.03l-3.604 3.604 3.604 3.602a.727.727 0 010 1.029z"
          fill="#000"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default SvgComponent
