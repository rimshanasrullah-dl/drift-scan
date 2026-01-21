import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={28} height={28} rx={14} fill="#F2EFDC" />
      <Path
        d="M6.877 12.418a7.986 7.986 0 012.187-4.075A7.975 7.975 0 0114.72 6c2.209 0 4.21.895 5.657 2.343A7.974 7.974 0 0122.72 14a7.975 7.975 0 01-2.343 5.657A7.976 7.976 0 0114.72 22a7.976 7.976 0 01-5.773-2.463l.682-.656a7.03 7.03 0 005.09 2.17 7.03 7.03 0 004.986-2.065A7.03 7.03 0 0021.772 14c0-1.947-.79-3.71-2.066-4.986a7.028 7.028 0 00-4.985-2.065c-1.947 0-3.71.79-4.986 2.065A7.03 7.03 0 007.8 12.64l1.097-1.195a.473.473 0 11.696.642L7.55 14.314a.474.474 0 01-.772-.09l-1.444-2.667a.473.473 0 11.834-.448l.709 1.309z"
        fill="#C2A15A"
        stroke="#C2A15A"
        strokeWidth={0.5}
      />
      <Path
        d="M14.246 9.3a.475.475 0 01.95 0v4.504l2.65 2.65a.475.475 0 01-.67.671l-2.783-2.781a.475.475 0 01-.147-.344V9.3z"
        fill="#C2A15A"
        stroke="#C2A15A"
        strokeWidth={0.5}
      />
    </Svg>
  )
}

export default SvgComponent
