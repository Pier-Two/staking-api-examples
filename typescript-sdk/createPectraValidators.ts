import { PierTwoStakingApi, URL } from "@pier_two/staking-ts";
const apiKey = "your-api-key";

const stakingApi = new PierTwoStakingApi({
    apiKey: apiKey,
    baseUrl: URL.TESTNET,
});

async function main() {
    // create 2 Pectra validators (0x02 withdrawal credentials)
    const newStake = await stakingApi.ethereum.createStakeV3({
        // stake 2500 ETH with maximum of 1000 ETH per validator
        // will result in 3 validators, 2 with 1000 ETH and 1 with 500 ETH
        stakeAmountGwei: "2500000000000",
        maxEthPerValidatorGwei: "1000000000000",
        withdrawalAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        suggestedFeeRecipient: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        reference: "example validator account",
        label: "example pectra validators"
    });

    const depositData = newStake.data.stake.validators.map(async (validator) => {
        return {
            pubkey: validator.pubkey,
            withdrawal_credentials: validator.withdrawal_credentials,
            signature: validator.signature,
            deposit_data_root: validator.deposit_data_root,
        }
    });

    // all the data you need to perform an on-chain deposit
    console.log(depositData);
}

main();
