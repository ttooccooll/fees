type Sats = number;
type SatsPerVByte = Sats;
type Transaction = {
    inputs: number;
    outputs: number;
    witness: string;
}

let halfHourFee: SatsPerVByte | undefined;

fetch('https://mempool.space/api/v1/fees/recommended')
  .then(response => response.json())
  .then(data => {
    const halfHourFee = data.medianFee;
  })
  .catch(error => console.error('Error:', error));

function calculateTxFee(tx: Transaction, medianFee: SatsPerVByte): Sats {
    const {inputs, outputs, witness} = tx;

    const inputWeight = inputs * 4;
    const outputWeight = outputs * 4;
    const witnessWeight = witness.length / 2;

    const totalWeight = inputWeight + outputWeight + witnessWeight

    return totalWeight * medianFee;
}

function getTransactionFee(tx: Transaction): Sats | undefined {
    if (halfHourFee === undefined) {
      console.error('medianFee not available yet');
      return undefined;
    }
    return calculateTxFee(tx, halfHourFee as SatsPerVByte);
  }

const transaction: Transaction = {
    inputs: 3,
    outputs: 2,
    witness: "Here is a bunch of stuff.",
}

const txFee = getTransactionFee(transaction);

if (txFee !== undefined) {
    console.log(`The transaction fee is: ${txFee}`);
  } else {
    console.log('Failed to calculate transaction fee');
  }