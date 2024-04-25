// Definición del contrato Voting
class Voting {
    // Constructor
    constructor() {
        // Inicialización de la lista de candidatos
        this.candidates = [];
        // Inicialización del mapa de votantes
        this.voters = {};
    }

    // Función para agregar un candidato a la lista de candidatos
    addCandidate(name) {
        this.candidates.push({
            name: name,
            voteCount: 0
        });
    }

    // Función para votar por un candidato
    vote(candidateIndex, voterAddress) {
        // Verificar que el índice del candidato sea válido
        if (candidateIndex >= this.candidates.length) {
            throw new Error("El índice del candidato no es válido.");
        }
        // Verificar si el votante ya ha votado
        if (this.voters[voterAddress]) {
            throw new Error("Ya ha votado en esta votación.");
        }

        // Incrementar el contador de votos del candidato seleccionado
        this.candidates[candidateIndex].voteCount++;
        // Marcar al votante como que ya ha votado
        this.voters[voterAddress] = true;
    }

    // Función para obtener el número total de candidatos
    getCandidateCount() {
        return this.candidates.length;
    }

    // Función para obtener el número de votos para un candidato en particular
    getVoteCount(candidateIndex) {
        // Verificar que el índice del candidato sea válido
        if (candidateIndex >= this.candidates.length) {
            throw new Error("El índice del candidato no es válido.");
        }
        // Devolver el número de votos del candidato seleccionado
        return this.candidates[candidateIndex].voteCount;
    }
}

// Exportar el contrato Voting para que pueda ser utilizado en otras partes de la aplicación
module.exports = Voting;