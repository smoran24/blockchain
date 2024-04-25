// blockchain.js
const Block = require('./block');
const SHA256 = require('crypto-js/sha256');
const Voting = require('./voting'); // Importa la clase Voting

class Blockchain {
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
        this.voting = new Voting(); // Crea una instancia de Voting
    }

    async initializeChain() {
        if (this.height == -1) {
            const block = new Block({ data: 'Genesis Block' });
            await this.addBlock(block);
        }
    }

    addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            block.height = self.chain.length;
            block.time = new Date().getTime().toString();

            if (self.chain.length > 0) {
                block.previousBlockHash = self.chain[self.chain.length - 1].hash;
            }

            let errors = await self.validateChain();
            if (errors.length > 0) {
                resolve(new Error('La cadena no es válida: ', errors));
            }

            block.hash = SHA256(JSON.stringify(block)).toString();

            self.chain.push(block);

            resolve(block);
        });
    }

    async voteOnBlock(blockIndex, candidateIndex, voterAddress) {
        const block = this.chain[blockIndex];
        await this.voting.vote(candidateIndex, voterAddress);
        block.voted = true; // Marcamos el bloque como votado
    }

    validateChain() {
        let self = this;
        const errors = [];

        return new Promise(async (resolve, reject) => {
            self.chain.map(async (block) => {
                try {
                    let isValid = await block.validate();
                    if (!isValid) {
                        errors.push(new Error(`El bloque ${block.height} no es válido.`));
                    }
                } catch (err) {
                    errors.push(err);
                }
            });
            resolve(errors);
        });
    }

    print() {
        let self = this;
        for (let block of self.chain) {
            console.log(block.toString());
        }
    }
}

module.exports = Blockchain;
