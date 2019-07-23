/**
 * loads and parses VCAP_SERVICES json from process.env if possible, otherwise falls back to local vcap_servcies json file
 *
 * @export
 * @param {(string | undefined)} vcap_services contents of process.env.vcap_services
 * @param {string} [vcaplocalPath="./vcap_services.json"] local vcap_servcies file path
 * @returns
 */
export declare function loadVcapServices(vcap_services: string | undefined, vcaplocalPath?: string): any;
/**
 * object specifying the local path of the yml file to load
 *
 * @export
 * @interface LocalLoaderConfig
 */
export interface LocalLoaderConfig {
    path: string;
}
/**
 * loads config from local yml file based on the path provided
 *
 * @export
 * @param {LocalLoaderConfig} config object containing the path of the local yml file to load
 * @returns {Promise<any>} returns config object parsed from remote yml file
 */
export declare function loadLocal(config: LocalLoaderConfig): Promise<any>;
/**
 * object specifying connection details of a Spring Cloud Config Server
 *
 * @export
 * @interface RemoteLoaderConfig
 */
export interface RemoteLoaderConfig {
    appName: string;
    profile: string;
    access_token_uri: string;
    uri: string;
    client_id: string;
    client_secret: string;
}
/**
 * Uses credentials pulled from VCAP_SERVICES to authenticate via OAUTH2 and pulls configuration from bound Spring Cloud Config Server based on app name and profile
 *
 * @export
 * @param {RemoteLoaderConfig} config object specifying connection details of a Spring Cloud Config Server
 * @param {any} [request=rp] optional request object to use for making calls to config server (defaults to request-promise-native)
 * @returns {Promise<any>} returns config object parsed from remote yml file
 */
export declare function loadRemote(config: RemoteLoaderConfig, request?: any): Promise<any>;
/**
 * object specifying connection details of a Spring Cloud Config Server
 * but skipping the authorization step
 *
 * @export
 * @interface RemoteSkipAuthLoaderConfig
 */
export interface RemoteSkipAuthLoaderConfig {
    appName: string;
    profile: string;
    uri: string;
}
/**
 * Pulls configuration from bound Spring Cloud Config Server based on app name and profile
 * This method skips the authentication step
 *
 * @export
 * @param {RemoteSkipAuthLoaderConfig} config object specifying connection details of a Spring Cloud Config Server
 * @param {any} [request=rp] optional request object to use for making calls to config server (defaults to request-promise-native)
 * @returns {Promise<any>} returns config object parsed from remote yml file
 */
export declare function loadRemoteSkipAuth(config: RemoteSkipAuthLoaderConfig, request?: any): Promise<any>;
export declare type LoaderConfig = LocalLoaderConfig | RemoteLoaderConfig | RemoteSkipAuthLoaderConfig;
/**
 * Tests to see if provided LoaderConfig is a LocalLoaderConfig
 *
 * @export
 * @param {LoaderConfig} config
 * @returns {config is LocalLoaderConfig}
 */
export declare function isLocalConfig(config: LoaderConfig): config is LocalLoaderConfig;
/**
 * Tests to see if provided LoaderConfig is a RemoteLoaderConfig
 *
 * @export
 * @param {LoaderConfig} config
 * @returns {config is RemoteLoaderConfig}
 */
export declare function isRemoteConfig(config: LoaderConfig): config is RemoteLoaderConfig;
/**
 * Loads configuration from either remote or local location based on provided configuration object
 *
 * @export
 * @param {LoaderConfig} config Object containing parameters to use for loading configuration
 * @param {any} [loadLocalFunc=loadLocal] function responsible for loading local yml file
 * @param {any} [loadRemoteFunc=loadRemote] function responsible for loading config from Spring Cloud Config Server
 * @param {any} [loadRemoteSkipAuthFunc=loadRemoteSkipAuth] function responsible for loading config from
 * Spring Cloud Config Server skipping the authorization step
 * @returns {Promise<any>} returns loaded configuration object
 */
export declare function load(config: LoaderConfig, params: ConfigParams, loadLocalFunc?: typeof loadLocal, loadRemoteFunc?: typeof loadRemote, loadRemoteSkipAuthFunc?: typeof loadRemoteSkipAuth): Promise<any>;
export declare type ConfigLocation = "local" | "remote" | "remoteSkipAuth";
/**
 * Generated appropriate loader config file based on whether configuration is to be loaded locally or remotely
 *
 * @export
 * @param {ConfigParams} params contains parameters used to load correct configuration
 * @returns {LoaderConfig} either a LocalLoaderConfig or a RemoteLoaderConfig
 */
export declare function getLoaderConfig(params: ConfigParams, loadVcapServicesFunc?: typeof loadVcapServices): LoaderConfig;
/**
 * Wraps config load call inside optional setInterval for auto-updating
 * @param config
 * @param params
 * @param updateFunc
 * @param loadLocalFunc
 * @param loadRemoteFunc
 */
export declare function loadAndRepeat(config: any, params: any, updateFunc: any, loadLocalFunc?: typeof loadLocal, loadRemoteFunc?: typeof loadRemote): Promise<void>;
/**
 * contains required parameters for loading application configuration
 *
 * @export
 * @interface ConfigParams
 */
export interface ConfigParams {
    appName: string;
    profile: string;
    configServerName: string;
    configLocation: ConfigLocation;
    logProperties?: boolean;
    interval?: number;
}
/**
 * Config class contains the global app configuration once loaded
 *
 * @export
 * @class Config
 */
export declare class Config {
    /**
     * the currently loaded app config
     *
     * @static
     * @type {*}
     * @memberof Config
     */
    static current: any;
    /**
     * loads the app config *must be called during the start of the application*
     *
     * @static
     * @param {ConfigParams} params
     * @returns {Promise<void>}
     * @memberof Config
     */
    static load(params: ConfigParams): Promise<void>;
}
