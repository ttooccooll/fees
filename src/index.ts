type Sats = number;
type SatsPerVByte = Sats;
type Transaction = {
    inputs: number;
    outputs: number;
    witness: string;
}

function calculateTxFee(tx: Transaction, feeRate: SatsPerVByte): Sats {
    const {inputs, outputs, witness} = tx;

    const inputWeight = inputs * 4;
    const outputWeight = outputs * 4;
    const witnessWeight = witness.length / 2;

    const totalWeight = inputWeight + outputWeight + witnessWeight

    return totalWeight * feeRate;
}

const transaction: Transaction = {
    inputs: 3,
    outputs: 2,
    witness: "Here is a bunch of stuff.",
}

const feeRate: SatsPerVByte = 500;

const txFee = calculateTxFee(transaction, feeRate);

console.log(`The transaction: ${txFee}`)