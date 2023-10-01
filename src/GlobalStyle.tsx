import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";


interface IGlobalStyle {
  main: string;
  contraryMain: string;
  scroll: string;
  scrollHover: string;
  opacityMain: string
}

const GlobalStyle = createGlobalStyle<IGlobalStyle>`
  :root {
    --component_bg: white;
    --shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 1px 6px rgb(0 0 0 / 24%);
    --border_shadow_lg: rgba(0, 0, 0, 0.388);
    --border_shadow_sm: rgba(0, 0, 0, 0.177);

    /*--------------------custome--------------------*/

    ${(themes) => `
          --scroll: ${themes.scroll};
          --scroll_hover: ${themes.scrollHover}; 
          --main_color: ${themes.main};
          --contrary_main_color: ${themes.contraryMain};
          --opacity_main_color: ${themes.opacityMain};
    `}
`;

const appColors: { [key: string]: IGlobalStyle } = {
  "BlueTheme": {
      main: "rgb(0, 72, 132)",
      contraryMain: "rgb(0, 43, 80)",
      opacityMain: "rgb(230, 239, 253)",
      scroll: "rgb(2, 77, 139)",
      scrollHover: "rgb(1, 37, 69)"
  }
}

const DynamicGlobalStyle = () => {

  const [colors, setColors] = useState<IGlobalStyle>(appColors.BlueTheme)

  useEffect(() => {
      const timer = setTimeout(() => {
          setColors(appColors.BlueTheme)
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

  return (<GlobalStyle {...colors} />)
}

export default DynamicGlobalStyle;

