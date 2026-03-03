// ============================================
// Zerion API SDK - TypeScript Implementation
// ============================================

import {Buffer} from 'node:buffer';

// ============================================
// Types & Interfaces
// ============================================

export type UserDataType = {
  [key: string]: unknown;
  exp: number;
};

export interface ZerionOptions {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

export type ChartPeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'max';
export type PositionFilter = 'only_simple' | 'only_complex' | 'no_filter';
export type TrashFilter = 'only_trash' | 'only_non_trash' | 'no_filter';
export type SortOrder = 'asc' | 'desc';
export type Environment = 'testnet';

// ============================================
// Request/Response Types
// ============================================

export interface WalletChartResponse {
  links: {
    self: string;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      begin_at: string;
      end_at: string;
      points: [number, number][];
    };
  };
}

export interface WalletPNLResponse {
  links: {
    self: string;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      realized_gain?: number;
      unrealized_gain?: number;
      total_fee?: number;
      net_invested?: number;
      received_external?: number;
      sent_external?: number;
      sent_for_nfts?: number;
      received_for_nfts?: number;
    };
  };
}

export interface WalletPortfolioResponse {
  links: {
    self: string;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      positions_distribution_by_type?: Record<string, number>;
      positions_distribution_by_chain?: Record<string, number>;
      total?: {
        amount: number;
        changes?: {
          absolute_1d?: number;
          percent_1d?: number;
        };
      };
    };
  };
}

export interface WalletPosition {
  type: string;
  id: string;
  attributes: {
    parent?: string | null;
    protocol?: string | null;
    pool_address?: string | null;
    name: string;
    group_id?: string;
    position_type: string;
    quantity: {
      float: number;
      string: string;
    };
    value?: number | null;
    price?: number;
    fungible_info?: {
      name: string;
      symbol: string;
      description?: string | null;
      icon?: string | null;
      flags?: Record<string, boolean>;
      implementations?: Array<{
        chain_id: string;
        fungible_id: string;
        address: string;
      }>;
    };
    updated_at?: string;
  };
  relationships?: {
    chain: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export interface WalletPositionsResponse {
  links: {
    self: string;
  };
  data: WalletPosition[];
}

export interface Transaction {
  type: string;
  id: string;
  attributes: {
    operation_type: string;
    hash: string;
    mined_at_block: number;
    mined_at: string;
    sent_from: string;
    sent_to: string;
    status: 'confirmed' | 'failed' | 'pending';
    nonce: number;
    fee?: {
      float: number;
      string: string;
    };
    transfers: Array<{
      fungible_info?: {
        name: string;
        symbol: string;
      };
      nft_info?: {
        name: string;
        description?: string;
        collection_name?: string;
      };
      quantity: {
        float: number;
        string: string;
      };
      direction: 'in' | 'out';
      from?: string;
      to?: string;
    }>;
    approvals?: Array<{
      fungible_info?: {
        name: string;
        symbol: string;
      };
      quantity: {
        float: number;
        string: string;
      };
      sender: string;
    }>;
  };
}

export interface WalletTransactionsResponse {
  links: {
    self: string;
    next?: string;
  };
  data: Transaction[];
}

export interface NFTPosition {
  type: string;
  id: string;
  attributes: {
    changed_at?: string;
    amount: string;
    price?: number;
    value?: number;
    nft_info?: {
      name?: string;
      description?: string;
      collection_name?: string;
      image_url?: string;
      animation_url?: string;
    };
    collection_info?: {
      name: string;
      description?: string;
      image_url?: string;
      floor_price?: number;
    };
  };
}

export interface WalletNFTPositionsResponse {
  links: {
    self: string;
  };
  data: NFTPosition[];
}

export interface WalletNFTCollectionsResponse {
  links: {
    self: string;
  };
  data: Array<{
    type: string;
    id: number;
    attributes: {
      nfts_count: string;
      total_floor_price?: number;
      collection_info: {
        name: string;
        description?: string;
        image_url?: string;
        floor_price?: number;
      };
    };
  }>;
}

export interface NFTPortfolioResponse {
  links: {
    self: string;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      total_value?: number;
      changes?: {
        absolute_1d?: number;
        percent_1d?: number;
      };
    };
  };
}

export interface Fungible {
  type: string;
  id: string;
  attributes: {
    name: string;
    symbol: string;
    description?: string;
    icon?: string;
    flags?: {
      verified: boolean;
      hide_balance: boolean;
    };
    implementations?: Array<{
      chain_id: string;
      fungible_id: string;
      address: string;
    }>;
    market_data?: {
      price?: {
        last: number;
        percent_change_1d?: number;
        percent_change_30d?: number;
        percent_change_90d?: number;
        percent_change_365d?: number;
      };
      market_cap?: number;
      volume_24h?: number;
    };
  };
}

export interface FungiblesResponse {
  links: {
    self: string;
    next?: string;
  };
  data: Fungible[];
}

export interface FungibleChartResponse {
  links: {
    self: string;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      begin_at: string;
      end_at: string;
      points: [number, number][];
    };
  };
}

export interface Chain {
  type: string;
  id: string;
  attributes: {
    name: string;
    short_name?: string;
    codename?: string;
    logo?: string;
    color?: string;
    coin?: string;
    chain_id?: number;
    rpc_url?: string;
    explorer_url?: string;
    explorer_name?: string;
    backend_name?: string;
  };
}

export interface ChainsResponse {
  links: {
    self: string;
  };
  data: Chain[];
}

export interface SwapFungiblesResponse {
  links: {
    self: string;
  };
  data: Array<{
    type: string;
    id: string;
    attributes: {
      name: string;
      symbol: string;
      Fungible_id: string;
      logo?: string;
      chains: string[];
    };
  }>;
}

export interface SwapOffer {
  type: string;
  id: string;
  attributes: {
    provider: {
      name: string;
      logo?: string;
    };
    from: {
      fungible_id: string;
      chain_id: string;
      asset_address: string;
      amount: number;
    };
    to: {
      fungible_id: string;
      chain_id: string;
      asset_address: string;
      amount: number;
    };
    fee?: {
      amount: number;
      percent?: number;
    };
    gas?: {
      estimated_gas: number;
      gas_price: number;
    };
    action: {
      from_address: string;
      to_address: string;
      data: string;
      value: string;
    };
  };
}

export interface SwapOffersResponse {
  links: {
    self: string;
  };
  data: SwapOffer[];
}

export interface GasPrice {
  chain_id: string;
  gas_type: string;
  price: {
    amount: string;
    unit: string;
    price_in_default_currency: number;
  };
}

export interface GasPricesResponse {
  links: {
    self: string;
  };
  data: GasPrice[];
}

export interface NFT {
  type: string;
  id: string;
  attributes: {
    name?: string;
    description?: string;
    collection_name?: string;
    image_url?: string;
    animation_url?: string;
    is_spam?: boolean;
  };
}

export interface NFTsResponse {
  links: {
    self: string;
  };
  data: NFT[];
}

// ============================================
// API Client
// ============================================

export class ZerionAPI {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;
  private retryAttempts: number;
  private retryDelay: number;

  constructor(options: ZerionOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || 'https://api.zerion.io';
    this.timeout = options.timeout || 30000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & {
      queryParams?: Record<string, string | string[] | number | undefined | object>;
    } = {},
  ): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`;

    // Add query parameters
    if (options.queryParams) {
      const params = new URLSearchParams();
      Object.entries(options.queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            params.set(key, value.join(','));
          } else {
            params.set(key, String(value));
          }
        }
      });
      const queryString = params.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    // Create basic auth header
    const auth = Buffer.from(`${this.apiKey}:`).toString('base64');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    };

    // Merge custom headers
    if (options.headers) {
      const customHeaders = options.headers as Record<string, string>;
      Object.assign(headers, customHeaders);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(
            `HTTP ${response.status}: ${response.statusText} - ${errorBody}`,
          );
        }

        return (await response.json()) as T;
      } catch (error) {
        lastError = error as Error;

        // Check retry limit first
        if (attempt === this.retryAttempts - 1) {
          throw lastError;
        }

        // Check for abort error (timeout) - retry on transient timeouts
        const isAbortError = error instanceof Error && error.name === 'AbortError';
        if (isAbortError) {
          // Timeout errors should be retried
        }

        // Exponential backoff with jitter
        const delay = this.retryDelay * Math.pow(2, attempt) + Math.random() * 100;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error('Request failed after maximum retries');
  }

  // ============================================
  // Wallet Endpoints
  // ============================================

  /**
   * Get wallet's balance chart
   * @param address - Wallet address
   * @param chartPeriod - Chart period (hour, day, week, month, year, max)
   * @param options - Additional options
   * @returns Portfolio balance chart data
   */
  async getWalletChart(
    address: string,
    chartPeriod: ChartPeriod = 'day',
    options: {
      currency?: string;
      chainIds?: string[];
      fungibleIds?: string[];
    } = {},
  ): Promise<WalletChartResponse> {
    return this.request(`/v1/wallets/${address}/charts/${chartPeriod}`, {
      queryParams: {
        currency: options.currency || 'usd',
        'filter[chain_ids]': options.chainIds,
        'filter[fungible_ids]': options.fungibleIds,
      },
    });
  }

  /**
   * Get wallet's PnL
   * @param address - Wallet address
   * @param options - Additional options
   * @returns Profit and Loss details
   */
  async getWalletPNL(
    address: string,
    options: {
      currency?: string;
      chainIds?: string[];
      fungibleIds?: string[];
    } = {},
  ): Promise<WalletPNLResponse> {
    return this.request(`/v1/wallets/${address}/pnl/`, {
      queryParams: {
        currency: options.currency || 'usd',
        'filter[chain_ids]': options.chainIds,
        'filter[fungible_ids]': options.fungibleIds,
      },
    });
  }

  /**
   * Get wallet's portfolio
   * @param address - Wallet address
   * @param options - Additional options
   * @returns Portfolio overview
   */
  async getWalletPortfolio(
    address: string,
    options: {
      positions?: PositionFilter;
      currency?: string;
      env?: Environment;
    } = {},
  ): Promise<WalletPortfolioResponse> {
    return this.request(`/v1/wallets/${address}/portfolio`, {
      queryParams: {
        'filter[positions]': options.positions || 'only_simple',
        currency: options.currency || 'usd',
      },
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  /**
   * Get list of wallet's fungible positions
   * @param address - Wallet address
   * @param options - Additional options
   * @returns List of wallet positions
   */
  async listWalletPositions(
    address: string,
    options: {
      positions?: PositionFilter;
      currency?: string;
      chainIds?: string[];
      fungibleIds?: string[];
      dappIds?: string[];
      positionTypes?: string[];
      trash?: TrashFilter;
      sort?: '-value' | 'value';
      env?: Environment;
      page?: {
        size?: number;
        lastId?: string;
      };
    } = {},
  ): Promise<WalletPositionsResponse> {
    const queryParams: Record<string, string | string[] | number | undefined> = {
      'filter[positions]': options.positions || 'only_simple',
      currency: options.currency || 'usd',
      'filter[chain_ids]': options.chainIds,
      'filter[fungible_ids]': options.fungibleIds,
      'filter[dapp_ids]': options.dappIds,
      'filter[position_types]': options.positionTypes,
      'filter[trash]': options.trash,
      sort: options.sort || 'value',
    };

    if (options.page) {
      if (options.page.size) queryParams['page[size]'] = options.page.size;
      if (options.page.lastId) queryParams['page[lastId]'] = options.page.lastId;
    }

    return this.request(`/v1/wallets/${address}/positions/`, {
      queryParams,
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  /**
   * Get list of wallet's transactions
   * @param address - Wallet address
   * @param options - Additional options
   * @returns List of wallet transactions
   */
  async listWalletTransactions(
    address: string,
    options: {
      currency?: string;
      chainIds?: string[];
      fungibleIds?: string[];
      fungibleImplementations?: string[];
      operationTypes?: string[];
      assetTypes?: string[];
      searchQuery?: string;
      minMinedAt?: number;
      maxMinedAt?: number;
      trash?: TrashFilter;
      sort?: string;
      env?: Environment;
      page?: {
        size?: number;
        lastId?: string;
        lastTimestamp?: string;
      };
    } = {},
  ): Promise<WalletTransactionsResponse> {
    const queryParams: Record<string, string | string[] | number | undefined> = {
      currency: options.currency || 'usd',
      'filter[chain_ids]': options.chainIds,
      'filter[fungible_ids]': options.fungibleIds,
      'filter[fungible_implementations]': options.fungibleImplementations,
      'filter[operation_types]': options.operationTypes,
      'filter[asset_types]': options.assetTypes,
      'filter[search_query]': options.searchQuery,
      'filter[min_mined_at]': options.minMinedAt?.toString(),
      'filter[max_mined_at]': options.maxMinedAt?.toString(),
      'filter[trash]': options.trash || 'no_filter',
      sort: options.sort,
    };

    if (options.page) {
      if (options.page.size) queryParams['page[size]'] = options.page.size;
      if (options.page.lastId) queryParams['page[lastId]'] = options.page.lastId;
      if (options.page.lastTimestamp)
        queryParams['page[lastTimestamp]'] = options.page.lastTimestamp;
    }

    return this.request(`/v1/wallets/${address}/transactions/`, {
      queryParams,
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  /**
   * Get list of wallet's NFT positions
   * @param address - Wallet address
   * @param options - Additional options
   * @returns List of wallet NFT positions
   */
  async listWalletNFTPositions(
    address: string,
    options: {
      chainIds?: string[];
      collectionsIds?: number[];
      currency?: string;
      sort?: 'created_at' | '-created_at' | 'floor_price' | '-floor_price';
      include?: string[];
      env?: Environment;
      page?: {
        size?: number;
        lastId?: string;
      };
    } = {},
  ): Promise<WalletNFTPositionsResponse> {
    const queryParams: Record<string, string | string[] | number | undefined> = {
      'filter[chain_ids]': options.chainIds,
      'filter[collections_ids]': options.collectionsIds?.map(String),
      currency: options.currency || 'usd',
      sort: options.sort,
      include: options.include,
    };

    if (options.page) {
      if (options.page.size) queryParams['page[size]'] = options.page.size;
      if (options.page.lastId) queryParams['page[lastId]'] = options.page.lastId;
    }

    return this.request(`/v1/wallets/${address}/nft-positions/`, {
      queryParams,
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  /**
   * Get list of NFT collections held by a wallet
   * @param address - Wallet address
   * @param options - Additional options
   * @returns List of wallet NFT collections
   */
  async listWalletNFTCollections(
    address: string,
    options: {
      chainIds?: string[];
      currency?: string;
      sort?: string;
      include?: string[];
      env?: Environment;
      page?: {
        size?: number;
        lastId?: string;
      };
    } = {},
  ): Promise<WalletNFTCollectionsResponse> {
    const queryParams: Record<string, string | string[] | number | undefined> = {
      'filter[chain_ids]': options.chainIds,
      currency: options.currency || 'usd',
      sort: options.sort,
      include: options.include,
    };

    if (options.page) {
      if (options.page.size) queryParams['page[size]'] = options.page.size;
      if (options.page.lastId) queryParams['page[lastId]'] = options.page.lastId;
    }

    return this.request(`/v1/wallets/${address}/nft-collections/`, {
      queryParams,
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  /**
   * Get wallet's NFT portfolio
   * @param address - Wallet address
   * @param options - Additional options
   * @returns NFT portfolio overview
   */
  async getWalletNFTPortfolio(
    address: string,
    options: {
      currency?: string;
      env?: Environment;
    } = {},
  ): Promise<NFTPortfolioResponse> {
    return this.request(`/v1/wallets/${address}/nft-portfolio`, {
      queryParams: {
        currency: options.currency || 'usd',
      },
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  // ============================================
  // Fungibles Endpoints
  // ============================================

  /**
   * Get list of fungible assets
   * @param options - Additional options
   * @returns List of fungible assets
   */
  async listFungibles(
    options: {
      currency?: string;
      searchQuery?: string;
      implementationChainId?: string;
      implementationAddress?: string;
      fungibleIds?: string[];
      sort?: string;
      page?: {
        size?: number;
        before?: string;
        after?: string;
      };
    } = {},
  ): Promise<FungiblesResponse> {
    const queryParams: Record<string, string | string[] | number | undefined> = {
      currency: options.currency || 'usd',
      'filter[search_query]': options.searchQuery,
      'filter[implementation_chain_id]': options.implementationChainId,
      'filter[implementation_address]': options.implementationAddress,
      'filter[fungible_ids]': options.fungibleIds,
      sort: options.sort || '-market_data.market_cap',
    };

    if (options.page) {
      if (options.page.size) queryParams['page[size]'] = options.page.size;
      if (options.page.before) queryParams['page[before]'] = options.page.before;
      if (options.page.after) queryParams['page[after]'] = options.page.after;
    }

    return this.request('/v1/fungibles/', {queryParams});
  }

  /**
   * Get fungible asset by ID
   * @param fungibleId - Unique fungible ID
   * @param options - Additional options
   * @returns Fungible asset details
   */
  async getFungibleById(
    fungibleId: string,
    options: {
      currency?: string;
    } = {},
  ): Promise<{links: {self: string}; data: Fungible}> {
    return this.request(`/v1/fungibles/${fungibleId}`, {
      queryParams: {
        currency: options.currency || 'usd',
      },
    });
  }

  /**
   * Get a chart for a fungible asset
   * @param fungibleId - Unique fungible ID
   * @param chartPeriod - Chart period
   * @param options - Additional options
   * @returns Fungible price chart
   */
  async getFungibleChart(
    fungibleId: string,
    chartPeriod: ChartPeriod = 'day',
    options: {
      currency?: string;
    } = {},
  ): Promise<FungibleChartResponse> {
    return this.request(`/v1/fungibles/${fungibleId}/charts/${chartPeriod}`, {
      queryParams: {
        currency: options.currency || 'usd',
      },
    });
  }

  // ============================================
  // Chains Endpoints
  // ============================================

  /**
   * Get list of all chains
   * @param options - Additional options
   * @returns List of chains
   */
  async listChains(
    options: {
      env?: Environment;
    } = {},
  ): Promise<ChainsResponse> {
    return this.request('/v1/chains/', {
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  /**
   * Get chain by ID
   * @param chainId - Unique chain ID
   * @param options - Additional options
   * @returns Chain details
   */
  async getChainById(
    chainId: string,
    options: {
      env?: Environment;
    } = {},
  ): Promise<{links: {self: string}; data: Chain}> {
    return this.request(`/v1/chains/${chainId}`, {
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  // ============================================
  // Swap Endpoints
  // ============================================

  /**
   * Get fungibles available for bridge/swap
   * @param options - Additional options
   * @returns List of fungibles available for swap
   */
  async getSwapFungibles(
    options: {
      inputChainId?: string;
      outputChainId?: string;
      direction?: 'input' | 'output' | 'both';
    } = {},
  ): Promise<SwapFungiblesResponse> {
    const params = new URLSearchParams();
    if (options.inputChainId) params.set('input[chain_id]', options.inputChainId);
    if (options.outputChainId) params.set('output[chain_id]', options.outputChainId);
    if (options.direction) params.set('direction', options.direction);

    return this.request(`/v1/swap/fungibles/?${params.toString()}`);
  }

  /**
   * Get available swap offers
   * @param options - Swap options
   * @returns List of swap offers
   */
  async getSwapOffers(
    options: {
      from?: {
        address?: string;
        chainId: string;
        fungibleId?: string;
        assetAddress: string;
        amount: number;
      };
      to?: {
        to?: string;
        chainId: string;
        fungibleId?: string;
        assetAddress: string;
        amount?: number;
      };
      gasPrice?: number;
      liquiditySourceId?: string;
      sort?: 'amount' | 'time';
      slippagePercent?: number;
      integrator?: {
        feePercent?: number;
        beneficiary?: string;
      };
    } = {},
  ): Promise<SwapOffersResponse> {
    return this.request('/v1/swap/offers/', {
      queryParams: {
        input: options.from,
        output: options.to,
        gas_price: options.gasPrice,
        liquidity_source_id: options.liquiditySourceId,
        sort: options.sort,
        slippage_percent: options.slippagePercent,
        integrator: options.integrator,
      },
    });
  }

  // ============================================
  // Gas Prices Endpoints
  // ============================================

  /**
   * Get list of all available gas prices
   * @param options - Additional options
   * @returns List of gas prices
   */
  async listGasPrices(
    options: {
      chainIds?: string[];
      gasTypes?: string[];
    } = {},
  ): Promise<GasPricesResponse> {
    return this.request('/v1/gas-prices/', {
      queryParams: {
        'filter[chain_ids]': options.chainIds,
        'filter[gas_types]': options.gasTypes,
      },
    });
  }

  // ============================================
  // NFTs Endpoints
  // ============================================

  /**
   * Get list of NFTs
   * @param options - Additional options
   * @returns List of NFTs
   */
  async listNFTs(
    options: {
      references: string[];
      currency?: string;
      include?: string[];
      env?: Environment;
      page?: {
        size?: number;
        before?: string;
        after?: string;
      };
    } = {} as {references: string[]},
  ): Promise<NFTsResponse> {
    const queryParams: Record<string, string | string[] | number | undefined> = {
      'filter[references]': options.references,
      currency: options.currency || 'usd',
      include: options.include,
    };

    if (options.page) {
      if (options.page.size) queryParams['page[size]'] = options.page.size;
      if (options.page.before) queryParams['page[before]'] = options.page.before;
      if (options.page.after) queryParams['page[after]'] = options.page.after;
    }

    return this.request('/v1/nfts/', {
      queryParams,
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }

  /**
   * Get single NFT by ID
   * @param nftId - NFT unique identifier
   * @param options - Additional options
   * @returns NFT details
   */
  async getNFTById(
    nftId: string,
    options: {
      currency?: string;
      include?: string[];
      env?: Environment;
    } = {},
  ): Promise<{links: {self: string}; data: NFT}> {
    return this.request(`/v1/nfts/${nftId}`, {
      queryParams: {
        currency: options.currency || 'usd',
        include: options.include,
      },
      headers: options.env ? {'X-Env': options.env} : undefined,
    });
  }
}

// ============================================
// Factory Function
// ============================================

export function createZerionClient(options: ZerionOptions): ZerionAPI {
  return new ZerionAPI(options);
}

export default ZerionAPI;
