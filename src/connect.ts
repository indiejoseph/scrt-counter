import { CosmWasmClient } from 'secretjs';

const { SECRET_REST_URL } = process.env;

if (!SECRET_REST_URL) {
  throw new Error('No SECRET_REST_URL');
}

const main = async () => {
  // Create connection to DataHub Secret Network node
  const client = new CosmWasmClient(SECRET_REST_URL);

  // Query chain ID
  const chainId = await client.getChainId();

  // Query chain height
  const height = await client.getHeight();

  console.log('ChainId:', chainId);
  console.log('Block height:', height);

  console.log('Successfully connected to Secret Network');
};

main()
  // eslint-disable-next-line promise/always-return
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.log(err);
  });
