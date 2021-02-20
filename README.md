# A counter on Secret Network

An example of a smart contract development on Secret Network

## Development

Follow the instruction to spin up the local dev environment:

https://build.scrt.network/dev/quickstart.html#setup-the-local-developer-testnet

### Initiate the WASM contract on dev container

```shell
# Compile the contract to be wasm
npm run compile

# Upload to local container
docker exec secretdev bash -c "mkdir -p /root/code"
docker cp ./contract/contract.wasm.gz secretdev:/root/code/contract.wasm.gz

# Store the contact
docker exec secretdev bash -c "cd code; secretcli tx compute store contract.wasm.gz --from a --gas 1000000 -y --keyring-backend test"

# List current smart contract code
docker exec secretdev bash -c "secretcli query compute list-code"

# Instantiate the contract
docker exec -e INIT='{"count": 100000000}' -e CODE_ID=1 secretdev bash -c "secretcli tx compute instantiate \$CODE_ID \"\$INIT\" --from a --label \"my counter\" -y --keyring-backend test"

# Get the contract address
docker exec secretdev bash -c "secretcli query compute list-contract-by-code 1"

# Query the contract
docker exec secretdev bash -c "CONTRACT=\$(secretcli query compute list-contract-by-code 1 | jq -r \".[0].address\");
secretcli query compute query \$CONTRACT '{\"get_count\": {}}'"
```

### Connect to the local node

```shell
env $(cat .env.local | grep -v \"#\" | xargs) $(npm bin)/ts-node src/connect.ts
```
