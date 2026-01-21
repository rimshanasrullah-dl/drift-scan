import * as React from "react"
import Svg, { Path } from "react-native-svg"
import AppColors from "../../../share/constants/AppColors"

function SvgComponent(props:any) {
  return (
    <Svg
      width={8}
      height={14}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.383.237a.817.817 0 00-1.152 0 .798.798 0 000 1.123l5.79 5.648-5.774 5.631a.798.798 0 000 1.124.817.817 0 001.152 0l6.358-6.201a.77.77 0 000-1.124L1.383.238z"
        fill={props?.color?props?.color:AppColors.THEME_GREEN}
      />
    </Svg>
  )
}

export default SvgComponent
