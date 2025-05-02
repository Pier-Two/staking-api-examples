import { PierTwoStakingApi, URL } from "@pier_two/staking-ts";
const apiKey = "your-api-key";

const stakingApi = new PierTwoStakingApi({
    apiKey: apiKey,
    baseUrl: URL.TESTNET,
});

async function main() {
    const account = await stakingApi.account.getAccount();
    console.log(account);
}

main();
