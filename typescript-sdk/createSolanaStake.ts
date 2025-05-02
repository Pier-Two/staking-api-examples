import { PierTwoStakingApi, URL } from "@pier_two/staking-ts";
const apiKey = "your-api-key";

const stakingApi = new PierTwoStakingApi({
    apiKey: apiKey,
    baseUrl: URL.TESTNET,
});

async function main() {
    // create 2 Pectra validators (0x02 withdrawal credentials)
    const newStake = await stakingApi.solana.buildTransactionPayload({
      'feePayer': 'ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8',
      'instructions': [{
        'type': 'createAndDelegate',
        'input': {
          'fromPubkey': 'ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8',
          'stakeAuthority': 'ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8',
          "withdrawAuthority": "ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8",
          "reference": "example stake account",
          "label": "example SOL stake",
          "lamports": 1000000000
        }
      }]
    });

    const serializedTransaction = newStake.data.serialized;

    // sign with specified fromPubkey and submit the transaction to confirm the operation 
    console.log(serializedTransaction);
}

main();
