import { PierTwoStakingApi, URL } from "@pier_two/staking-ts";
const apiKey = "your-api-key";

const stakingApi = new PierTwoStakingApi({
    apiKey: apiKey,
    baseUrl: URL.TESTNET,
});

async function main() {
    // create 2 Shapella validators (0x01 withdrawal credentials)
    const newStake = await stakingApi.ethereum.createStakeV2({
        validatorCount: 2,
        withdrawalAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        suggestedFeeRecipient: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        reference: "example validator account",
        label: "example shapella validators",
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
