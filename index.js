// index.js
const Blockchain = require('./src/blockchain');
const Block = require('./src/block');
const Voting = require('./src/voting'); // Importa la clase Voting

async function run() {
    const blockchain = await new Blockchain();
    const block1 = new Block({ data: "Block 1" });
    await blockchain.addBlock(block1);
    const block2 = new Block({ data: "Block 2" });
    await blockchain.addBlock(block2);
    const block3 = new Block({ data: "Block 3" });
    await blockchain.addBlock(block3);

    blockchain.print();

    // Simular voto en el bloque 2 para el candidato 0 (por ejemplo)
    const candidateIndex = 0;
    const voterAddress = "dirección_del_votante";
    await blockchain.voteOnBlock(2, candidateIndex, voterAddress);
}

run();
