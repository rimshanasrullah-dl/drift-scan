import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.853 22.282V20.43H0v1.854A3.735 3.735 0 003.718 26H5.57v-1.864H3.718a1.867 1.867 0 01-1.865-1.854zM1.853 3.718c0-1.02.845-1.865 1.865-1.865H5.57V0H3.718A3.735 3.735 0 000 3.718V5.57h1.853V3.718zM24.136 22.282c0 1.02-.833 1.854-1.853 1.854H20.43V26h1.853a3.735 3.735 0 003.718-3.718V20.43h-1.865v1.854zM22.283 0H20.43v1.853h1.853c1.02 0 1.853.845 1.853 1.865V5.57h1.865V3.718A3.735 3.735 0 0022.283 0zM12.998 5.57c0-1.02-.833-1.853-1.853-1.853h-5.57c-1.02 0-1.854.833-1.854 1.853v5.57c0 1.02.833 1.854 1.853 1.854h5.57c1.02 0 1.854-.833 1.854-1.853V5.57zm-1.853 5.571h-5.57v-5.57h5.57v5.57z"
        fill="#fff"
      />
      <Path d="M9.29 7.424H7.426v1.864H9.29V7.424z" fill="#fff" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.28 20.428v-5.57c0-1.02-.833-1.865-1.853-1.865h-5.57c-1.02 0-1.865.845-1.865 1.865v5.57c0 1.02.845 1.853 1.864 1.853h5.57c1.02 0 1.854-.833 1.854-1.853zm-7.424-5.57h5.57v5.57h-5.57v-5.57z"
        fill="#fff"
      />
      <Path d="M18.566 16.711h-1.853v1.854h1.853V16.71z" fill="#fff" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.429 11.141h1.853v-5.57c0-1.02-.833-1.854-1.853-1.854h-1.864V5.57h1.864v5.571z"
        fill="#fff"
      />
      <Path
        d="M18.566 9.287h-3.707v1.854h3.707V9.287zM18.566 5.57h-1.853v1.854h1.853V5.57zM16.713 3.718h-1.854V5.57h1.854V3.718z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.574 14.53H3.72v5.57c0 1.02.833 1.853 1.853 1.853h1.853V20.1H5.574v-5.57z"
        fill="#fff"
      />
      <Path
        d="M11.143 14.53H7.426v1.853h3.717V14.53zM9.29 18.236H7.426V20.1H9.29v-1.864zM11.14 20.1H9.287v1.852h1.853V20.1z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
