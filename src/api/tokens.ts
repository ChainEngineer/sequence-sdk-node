import { Client } from '../client'
import { PageCallback, QueryParams, sharedAPI } from '../shared'

/**
 * More info: {@link https://dashboard.seq.com/docs/tokens}
 *
 * @typedef {Object} TokenGroup
 * @global
 *
 * @property {Number} amount
 * The amount of tokens in the group.
 *
 * @property {String} flavorId
 * The flavor of the tokens in the group.
 *
 * @property {Object} flavorTags
 * The tags of the flavor of the tokens in the group.
 *
 * @property {String} accountId
 * The account containing the tokens.
 *
 * @property {Object} accountTags
 * The tags of the account containing the tokens.
 *
 * @property {Object} tags
 * The tags of the tokens in the group.
 */

/**
 * More info: {@link https://dashboard.seq.com/docs/tokens}
 *
 * @typedef {Object} TokenSum
 * @global
 *
 * @property {Number} amount
 * The amount of tokens in the group.
 *
 * @property {String} [flavorId]
 * The flavor of the tokens in the group.
 *
 * @property {Object} [flavorTags]
 * The tags of the flavor of the tokens in the group.
 *
 * @property {String} [accountId]
 * The account containing the tokens.
 *
 * @property {Object} [accountTags]
 * The tags of the account containing the tokens.
 *
 * @property {Object} [tags]
 * The tags of the tokens in the group.
 */

export interface TokenSumParams extends QueryParams {
  groupBy?: string[]
}

/**
 * API for interacting with {@link Token tokens}.
 *
 * More info: {@link https://dashboard.seq.com/docs/tokens}
 * @module TokensApi
 */
export const tokensAPI = (client: Client) => {
  return {
    list: {
      /**
       * Get one page of token groups matching the specified query.
       *
       * @param {Object} params={} - Filter and pagination information.
       * @param {String} params.filter - Filter string, see {@link https://dashboard.seq.com/docs/queries}.
       * @param {Array<String|Number>} params.filterParams - Parameter values for filter string (if needed).
       * @param {Number} params.pageSize - Number of items to return in result set.
       * @param {pageCallback} [callback] - Optional callback. Use instead of Promise return value as desired.
       * @returns {Promise<Page<TokenGroup>>} Requested page of results.
       */
      page: (params: QueryParams, cb?: PageCallback) =>
        sharedAPI.queryPage(client, 'tokens', 'list', '/list-tokens', params, {
          cb,
        }),
      all: () => {
        throw new Error('Unimplemented')
      },
    },

    sum: {
      /**
       * Get one page of token sums matching the specified query.
       *
       * @param {Object} params={} - Filter and pagination information.
       * @param {String} params.filter - Filter string, see {@link https://dashboard.seq.com/docs/queries}.
       * @param {Array<String|Number>} params.filterParams - Parameter values for filter string (if needed).
       * @param {Array<String>} params.groupBy - Fields in Token object to group by.
       * @param {Number} params.pageSize - Number of items to return in result set.
       * @param {pageCallback} [callback] - Optional callback. Use instead of Promise return value as desired.
       * @returns {Promise<Page<TokenSum>>} Requested page of results.
       */
      page: (params: TokenSumParams, cb?: PageCallback) =>
        sharedAPI.queryPage(client, 'tokens', 'sum', '/sum-tokens', params, {
          cb,
        }),
      all: () => {
        throw new Error('Unimplemented')
      },
    },
  }
}
