<template>
  <div class="container">

    <div v-if="!jugadorId">
      <input v-model="nombreJugador" placeholder="Ingresa tu nombre" />
      <button @click="registrarJugador">Registrar</button>
    </div>

    <div v-else>
      <div class="word">
        <p v-for="(letra, index) in palabraOculta" :key="index" class="letra">
          {{ letra }}
        </p>
      </div>

      <div>
        <input v-model="letra" maxlength="1" @keyup.enter="adivinarLetra" />
        <button @click="adivinarLetra">Intentar</button>
      </div>

      <p>Intentos restantes: {{ intentosRestantes }}</p>

      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

      <button v-if="terminado" @click="reiniciarJuego">Reiniciar Juego</button>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      palabra: '',
      palabraOculta: [],
      intentosRestantes: 6,
      letra: '',
      mensaje: '',
      terminado: false,
      jugadorId: null,
      nombreJugador: '',
      palabraId: null, 
    };
  },
  async mounted() {
    if (this.jugadorId) {
      await this.obtenerPalabra();
    }
  },
  methods: {

    async registrarJugador() {
      try {
        const response = await axios.post('http://localhost:3000/registro', {
          nombre: this.nombreJugador
        });
        this.jugadorId = response.data.jugador.id; 
        this.nombreJugador = '';
        await this.obtenerPalabra(); 
      } catch (error) {
        console.error('Error al registrar el jugador:', error);
      }
    },

    async obtenerPalabra() {
      try {
        const response = await axios.get('http://localhost:3000/palabra');
        this.palabra = response.data.palabra.toUpperCase();
        this.palabraId = response.data.id;  
        this.palabraOculta = this.palabra.split('').map(() => '_');
      } catch (error) {
        console.error('Error al obtener la palabra:', error);
      }
    },

    adivinarLetra() {
      if (!this.letra || this.terminado) return;

      const letra = this.letra.toUpperCase();
      this.letra = ''; 

      if (this.palabra.includes(letra)) {

        this.palabra.split('').forEach((char, index) => {
          if (char === letra) {
            this.palabraOculta[index] = letra;
          }
        });
      } else {
        this.intentosRestantes--;
      }

      if (!this.palabraOculta.includes('_')) {
        this.mensaje = '¡Ganaste!';
        this.terminado = true;
        this.guardarPuntuacion();
      }

      if (this.intentosRestantes === 0) {
        this.mensaje = 'Perdiste. La palabra era: ' + this.palabra;
        this.terminado = true;
        this.guardarPuntuacion();
      }
    },

    async guardarPuntuacion() {
      try {
        const intentosRealizados = 6 - this.intentosRestantes;

        await axios.post('http://localhost:3000/puntuacion', {
          idjugador: this.jugadorId, 
          idpalabra: this.palabraId,   
          intentos: intentosRealizados, 
        });

        console.log('Puntuación guardada correctamente');
      } catch (error) {
        console.error('Error al guardar la puntuación:', error);
      }
    },

    reiniciarJuego() {
      this.jugadorId = null; 
      this.nombreJugador = ''; 
      this.palabra = ''; 
      this.palabraOculta = []; 
      this.intentosRestantes = 6; 
      this.mensaje = ''; 
      this.terminado = false; 
    },

    volverAlMenu() {
      this.$emit('volverAlMenu');  
    }
  }
};
</script>

<style scoped>

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #2c3e50; 
}

th {
  background-color: #34495e; 
  color: white; 
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2980b9; 
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #1f6f94; 
}

.container {
  text-align: center;
  font-family: 'Arial', sans-serif;
  margin-top: 50px;
}

h1 {
  color: #1f6f94; 
}

.word {
  font-size: 24px;
  margin-bottom: 20px;
}

.letra {
  display: inline-block;
  margin: 0 5px;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid #ddd;
  width: 30px;
  text-align: center;
}

input {
  font-size: 20px;
  padding: 10px;
  width: 300px;
  text-align: center;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color: #1f6f94;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #1f6f94;
}

.mensaje {
  font-size: 20px;
  color: #FF0000; 
  margin-top: 20px;
}

button:disabled {
  background-color: #ccc; 
}
</style>
