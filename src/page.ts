import { Client } from './client'
import { ObjectCallback } from './shared'

/**
 * @callback PageCallback
 * @param {error} error
 * @param {Page} page - Requested page of results.
 */

/**
 * @class
 * One page of results returned from an API request. With any given page object,
 * the next page of results in the query set can be requested.
 */
export class Page {
  public items: any[]
  public next: {}
  public cursor: string
  public lastPage: boolean
  public client: any
  public memberPath: string
  public method: string

  /**
   * Create a page object
   *
   * @param  {Object} data API response for a single page of data.
   * @param  {Client} client Chain Client.
   * @param  {String} memberPath key-path pointing to module implementing the
   *                  desired `query` method.
   * @param  {String} method is the name of the `query` method on the member.
   */
  constructor(
    data: object,
    client: Client,
    memberPath: string,
    method: string
  ) {
    /**
     * Array of Sequence objects. Available types are documented in the
     * {@link global global namespace}.
     *
     * @type {Array}
     */
    this.items = []

    /**
     * String encoding the query object to request the next page of items.
     *
     * @type {String}
     */
    this.cursor = ''

    /**
     * Indicator that there are more results to load if true.
     * @type {Boolean}
     */
    this.lastPage = false

    /**
     * Object representing the query for the immediate next page of results. Can
     * be passed without modification to the `query` method that generated the
     * Page object containing it.
     * 
     * @deprecated Use {@link Page#nextPage} or {@link Page#cursor} instead.
     * 
     * @type {Object}
     */
    this.next = {}

    Object.assign(this, data)

    this.client = client
    this.memberPath = memberPath
    this.method = method
  }

  /**
   * Fetch the next page of data for the query specified in this object.
   *
   * @param {objectCallback} [callback] - Optional callback. Use instead of Promise return value as desired.
   * @returns {Promise<Page>} A promise resolving to a Page object containing
   *                         the requested results.
   */
  public nextPage(cb?: ObjectCallback) {
    let queryOwner = this.client
    const memberPath = this.memberPath.split('.')
    memberPath.forEach(member => {
      queryOwner = queryOwner[member]
    })

    const next = this.cursor !== '' ? { cursor: this.cursor } : this.next

    if (typeof queryOwner[this.method] === 'function') {
      if (this.method === 'list' || this.method === 'sum') {
        return queryOwner[this.method]({}).page(next, cb)
      } else {
        return queryOwner[this.method](next, cb)
      }
    }
    return queryOwner.queryPage(next, cb)
  }
}
