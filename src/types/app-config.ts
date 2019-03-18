
/**
 * A configuration of a client in a higher-level (e.g. SSR) context
 */
export interface AppConfig {
    /**
     * path to the entry component, e.g. './src/client/index.tsx'
     */
    entry: string,

    /**
     * name of the client-app
     */
    name: string
}


/**
 * transform a Client-Config to a Webpack-Client-Config
 * @param config
 */
export const toClientWebpackConfig = (config: AppConfig, buildPath: string) => {

    return {
        entry: {
            app: config.entry
        },
        output: {
            path: getBuildPath(config, buildPath),
            filename: `${config.name}.bundle.js`
        },
        target: "web"
    }
}

export const toServerWebpackConfig = (config: AppConfig, buildPath: string) => {

    return {
        entry: {
            handler: config.entry
        },
        output: {
            libraryTarget: "commonjs2",
            path: getBuildPath(config, buildPath),
            filename: 'index.js',
            publicPath: '/'
        },
        target: "node"
    }
}

export const getBuildPath = (config: AppConfig, buildPath: string) => {
    const path = require('path');
    
    return path.resolve(buildPath, config.name);
}