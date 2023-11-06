import commonConfig from "./webpack.common";

const config = {
    ...commonConfig,
    mode: "development",
    devServer: {
        open: true,
        historyApiFallback: true,
        port: 3000
    },
    watch: true
};

export default config;
