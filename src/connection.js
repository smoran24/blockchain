const Web3 = require("web3");
const contractAbi = require("./contract-abi.json");

// Dirección del contrato inteligente
const contractAddress = "0x1234567890abcdef";

// Conexión a la red de Ethereum
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));

// Crear una instancia del contrato inteligente
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

// Función para votar
async function vote(candidateIndex, voterAddress, voterPrivateKey) {
  try {
    // Obtener el número de votos totales antes de la votación
    const initialTotalVotes = await contractInstance.methods.totalVotes().call();
    
    // Crear el objeto de transacción
    const encodedData = contractInstance.methods.vote(candidateIndex).encodeABI();
    const nonce = await web3.eth.getTransactionCount(voterAddress, "pending");
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      data: encodedData,
      value: "0x0"
    };

    // Firmar y enviar la transacción
    const signedTx = await web3.eth.accounts.signTransaction(txObject, voterPrivateKey);
    const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Obtener el número de votos totales después de la votación
    const updatedTotalVotes = await contractInstance.methods.totalVotes().call();

    // Verificar que el número de votos totales ha aumentado
    if (parseInt(updatedTotalVotes) === parseInt(initialTotalVotes) + 1) {
      console.log("¡Voto exitoso!");
    } else {
      console.log("¡El voto falló! Inténtalo de nuevo.");
    }
  } catch (err) {
    console.error(err);
  }
}