/* tslint:disable */
/* eslint-disable */
/**
 * Lenceas.Core.Api 接口文档——.NET 7.0.4
 * Lenceas.Core.Api HTTP API v1
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ApiResult } from '../models';
import { LoginWebModel } from '../models';
import { TokenInfoViewModelApiResult } from '../models';
import { UserApiResult } from '../models';
/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 登录
         * @param {LoginWebModel} [body] 登录入参 WebModel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1AuthLoginPost: async (body?: LoginWebModel, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Auth/Login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 退出登录
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1AuthLogoutPost: async (token?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Auth/Logout`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (token !== undefined) {
                localVarQueryParameter['token'] = token;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 请求刷新Token
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1AuthRefreshTokenPost: async (token?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Auth/RefreshToken`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (token !== undefined) {
                localVarQueryParameter['token'] = token;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 注册
         * @param {string} [name] 
         * @param {string} [pwd] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1AuthRegisterPost: async (name?: string, pwd?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Auth/Register`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }

            if (pwd !== undefined) {
                localVarQueryParameter['pwd'] = pwd;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 登录
         * @param {LoginWebModel} [body] 登录入参 WebModel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthLoginPost(body?: LoginWebModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<TokenInfoViewModelApiResult>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).apiV1AuthLoginPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 退出登录
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthLogoutPost(token?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ApiResult>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).apiV1AuthLogoutPost(token, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 请求刷新Token
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthRefreshTokenPost(token?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<TokenInfoViewModelApiResult>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).apiV1AuthRefreshTokenPost(token, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 注册
         * @param {string} [name] 
         * @param {string} [pwd] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthRegisterPost(name?: string, pwd?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserApiResult>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).apiV1AuthRegisterPost(name, pwd, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 登录
         * @param {LoginWebModel} [body] 登录入参 WebModel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthLoginPost(body?: LoginWebModel, options?: AxiosRequestConfig): Promise<AxiosResponse<TokenInfoViewModelApiResult>> {
            return AuthApiFp(configuration).apiV1AuthLoginPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 退出登录
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthLogoutPost(token?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ApiResult>> {
            return AuthApiFp(configuration).apiV1AuthLogoutPost(token, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 请求刷新Token
         * @param {string} [token] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthRefreshTokenPost(token?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<TokenInfoViewModelApiResult>> {
            return AuthApiFp(configuration).apiV1AuthRefreshTokenPost(token, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 注册
         * @param {string} [name] 
         * @param {string} [pwd] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1AuthRegisterPost(name?: string, pwd?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<UserApiResult>> {
            return AuthApiFp(configuration).apiV1AuthRegisterPost(name, pwd, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @summary 登录
     * @param {LoginWebModel} [body] 登录入参 WebModel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async apiV1AuthLoginPost(body?: LoginWebModel, options?: AxiosRequestConfig) : Promise<AxiosResponse<TokenInfoViewModelApiResult>> {
        return AuthApiFp(this.configuration).apiV1AuthLoginPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 退出登录
     * @param {string} [token] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async apiV1AuthLogoutPost(token?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<ApiResult>> {
        return AuthApiFp(this.configuration).apiV1AuthLogoutPost(token, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 请求刷新Token
     * @param {string} [token] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async apiV1AuthRefreshTokenPost(token?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<TokenInfoViewModelApiResult>> {
        return AuthApiFp(this.configuration).apiV1AuthRefreshTokenPost(token, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 注册
     * @param {string} [name] 
     * @param {string} [pwd] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async apiV1AuthRegisterPost(name?: string, pwd?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<UserApiResult>> {
        return AuthApiFp(this.configuration).apiV1AuthRegisterPost(name, pwd, options).then((request) => request(this.axios, this.basePath));
    }
}