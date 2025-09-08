import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

const theme = extendTheme({
    fonts: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif",
    },

    fontWeights: {
        hairline: 300,
        thin: 300,
        light: 400,
        normal: 500,
        medium: 600,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 800,
      },

      styles: {
        global: {
            body: {
                bg: "#000000",
            },
        },
      },

      components: {
        Button: {
            baseStyle: {
                borderRadius: "16px",
            },

            sizes: {
                default: {
                    width: "62px",
                    height: "60px",
                },
            },
            
        },
      },

});

export default theme;