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

async function fetchFees() {
    const url = 'https://mempool.space/api/v1/fees/recommended';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching national debt data:', error);
        return null;
    }
}

(async () => {
    const data = await fetchFees();
    if (data) {
        console.log(data)
        const feeRate: SatsPerVByte = data.hourFee;
        const fastRate: SatsPerVByte = data.fastestFee;
        const txFee = calculateTxFee(transaction, feeRate);
        const fastFee = calculateTxFee(transaction, fastRate);
        console.log(`The transaction fee is: ${txFee} if you can wait for an hour. It will be ${fastFee} if you need it now.`);
    } else {
        console.error('Failed to fetch fees.');
    }
})();