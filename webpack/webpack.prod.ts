import TerserJSPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import commonConfig from "./webpack.common";

const config = {
    ...commonConfig,
    mode: "production",
    optimization: {
        minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
        splitChunks: { chunks: "all" }
    }
    
};

export default config;
