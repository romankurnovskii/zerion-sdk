<div align="center">
  <a href="https://github.com/romankurnovskii/zerion-sdk">
    <img src="./assets/icon.png" alt="Logo" width="250" style="border-radius: 10px; object-fit: cover;">
  </a>

  <h1 align="center">Zerion SDK</h1>

  <p align="center">
    <strong>A comprehensive TypeScript SDK for the <a href="https://zerion.io/api">Zerion API</a>, providing access to rich web3 wallet data and analytics.</strong>
  </p>

  <p align="center">
    <a href="https://www.npmjs.com/package/zerion">
      <img src="https://img.shields.io/npm/v/zerion?style=flat-square&color=blue" alt="NPM Version">
    </a>
    <a href="https://github.com/romankurnovskii/zerion-sdk/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/romankurnovskii/zerion-sdk?style=flat-square&color=green" alt="License">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript" alt="TypeScript">
    </a>
  </p>
</div>

---

## 🚀 Features

- **Wallet Portfolio**: Get comprehensive portfolio data including tokens, NFTs, and DeFi positions
- **Wallet Charts**: Historical balance charts with multiple time periods (hour, day, week, month, year, max)
- **Profit & Loss (PnL)**: Detailed PnL analytics including realized/unrealized gains
- **Transactions**: Full transaction history with filtering and pagination
- **NFT Support**: NFT positions, collections, and portfolio data
- **Fungibles**: Search and retrieve fungible asset data with market information
- **Chains**: Access to all supported blockchain networks
- **Swap**: Get available swap offers and fungibles for bridge exchange
- **Gas Prices**: Real-time gas prices across supported networks
- **TypeScript Support**: Full type definitions for all API responses

## 🛠️ Installation

```bash
npm install zerion
```

## 📖 Usage

### Basic Example

```typescript
import { ZerionAPI, createZerionClient } from 'zerion';

// Create client with API key
const client = new ZerionAPI({ apiKey: 'your-api-key' });

// Or use the factory function
const client = createZerionClient({ apiKey: 'your-api-key' });
```

### Get Wallet Portfolio

```typescript
const portfolio = await client.getWalletPortfolio('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.dir(portfolio, { depth: null, colors: true });
```

```text
{
  links: {
    self: 'https://api.zerion.io/v1/wallets/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/portfolio?currency=usd&filter%5Bpositions%5D=only_simple'
  },
  data: {
    type: 'portfolio',
    id: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    attributes: {
      positions_distribution_by_type: {
        wallet: 1380089.1673926937,
        deposited: 0,
        borrowed: 0,
        locked: 0,
        staked: 0
      },
      positions_distribution_by_chain: {
        '0g': 0.005795038458999999,
        abstract: 2.00493128,
        ape: 0.45940373881025776,
        arbitrum: 1002.4340336665684,
        aurora: 4.054911379405513,
        avalanche: 6.473193923961652,
        base: 9253.568876498903,
        berachain: 1.2889769425459379,
        'binance-smart-chain': 15535.228649402487,
        blast: 2.3428171557799726,
        celo: 0.1542475544613521,
        degen: 0.16105618365677402,
        ethereum: 1351462.8211516857,
        fantom: 1.0124296314225816,
        'gravity-alpha': 0.0052583332763408396,
        hyperevm: 0.19429912112837444,
        ink: 0.3219281703,
        katana: 0.020919221,
        lens: 0.0001230153962421,
        linea: 19.767910118160508,
        mantle: 0.1938779954539404,
        megaeth: 2.61347216462,
        monad: 0.6914252346195,
        optimism: 592.5831771213623,
        plasma: 3.009890478713088,
        polygon: 654.9415877832487,
        'polygon-zkevm': 44.914584119007735,
        scroll: 149.81111818001622,
        soneium: 4.413756508847324,
        sonic: 0.0001268201883,
        unichain: 37.487719608206405,
        world: 131.33850059088147,
        xdai: 11.872909054641655,
        zero: 0.0414242,
        'zksync-era': 37.294364191445794,
        zora: 1125.4385465803794
      },
      total: { positions: 1380088.9673926937 },
      changes: {
        absolute_1d: 7803.4353636475025,
        percent_1d: 0.5686450847309643
      }
    }
  }
}
```

### Get Wallet Positions

```typescript
const positions = await client.listWalletPositions('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', {
  positions: 'no_filter',
  currency: 'usd',
});
console.log(positions);
```

### Get Wallet Transactions

```typescript
const transactions = await client.listWalletTransactions('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', {
  page: { size: 50 },
});
console.log(transactions);
```

### Get NFT Positions

```typescript
const nftPositions = await client.listWalletNFTPositions('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', {
  currency: 'usd',
});
console.log(nftPositions);
```

### Get Fungibles

```typescript
const fungibles = await client.listFungibles({
  searchQuery: 'bitcoin',
  currency: 'usd',
});
console.log(fungibles);
```

### Get Chains

```typescript
const chains = await client.listChains();
console.log(chains);
```

### Get Gas Prices

```typescript
const gasPrices = await client.listGasPrices();
console.log(gasPrices);
```

### CLI Usage

```bash
# Initialize the CLI
npx zerion --api-key your-api-key

# Query a wallet
npx zerion --api-key your-api-key --address 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

## 💻 Development

### Setup

```bash
# Clone the repository
git clone https://github.com/romankurnovskii/zerion-sdk.git

# Install dependencies
npm install
```

### Scripts

- `npm run build`: Build for production
- `npm run test`: Run tests with Vitest
- `npm run test:watch`: Run tests in watch mode
- `npm run lint`: Lint code with ESLint
- `npm run format`: Format code with Prettier
- `npm run release`: Create a release with Changesets

## API Endpoints

The SDK provides access to the following Zerion API endpoints:

### Wallets
- `getWalletChart` - Get wallet's balance chart
- `getWalletPNL` - Get wallet's PnL
- `getWalletPortfolio` - Get wallet's portfolio
- `listWalletPositions` - Get list of wallet's fungible positions
- `listWalletTransactions` - Get list of wallet's transactions
- `listWalletNFTPositions` - Get list of wallet's NFT positions
- `listWalletNFTCollections` - Get list of NFT collections held by a wallet
- `getWalletNFTPortfolio` - Get wallet's NFT portfolio

### Fungibles
- `listFungibles` - Get list of fungible assets
- `getFungibleById` - Get fungible asset by ID
- `getFungibleChart` - Get a chart for a fungible asset

### Chains
- `listChains` - Get list of all chains
- `getChainById` - Get chain by ID

### Swap
- `getSwapFungibles` - Get fungibles available for bridge
- `getSwapOffers` - Get available swap offers

### Gas
- `listGasPrices` - Get list of all available gas prices

### NFTs
- `listNFTs` - Get list of NFTs
- `getNFTById` - Get single NFT by ID

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT © [Roman Kurnovskii](https://romankurnovskii.com)
