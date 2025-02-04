<template>
  <div id="app">
    <h1>Juego de Ahorcado</h1>

    <div v-if="!jugando && !mostrandoPuntuaciones">
      <button @click="iniciarJuego">Jugar</button>
      <button @click="verPuntuaciones">Ver Puntuaciones</button>
    </div>

    <Ahorcado v-if="jugando" @finJuego="finalizarJuego" />

    <TablaPuntuaciones v-if="mostrandoPuntuaciones" @cerrarPuntuaciones="ocultarPuntuaciones" />

    <button v-if="jugando || mostrandoPuntuaciones" @click="volverAlMenu" class="volver-menu">Volver al Menú Principal</button>
  </div>
</template>

<script>
import Ahorcado from './components/JuegoAhorcado.vue';
import TablaPuntuaciones from './components/TablaPuntuaciones.vue';

export default {
  name: 'App',
  components: {
    Ahorcado,
    TablaPuntuaciones
  },
  data() {
    return {
      jugando: false,  
      mostrandoPuntuaciones: false,  
    };
  },
  methods: {
    iniciarJuego() {
      this.jugando = true;
    },
    finalizarJuego() {
      this.jugando = false; 
    },
    verPuntuaciones() {
      this.mostrandoPuntuaciones = true; 
    },
    ocultarPuntuaciones() {
      this.mostrandoPuntuaciones = false; 
    },
    volverAlMenu() {
      this.jugando = false;
      this.mostrandoPuntuaciones = false; 
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  font-family: 'Arial', sans-serif;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  color: #2980b9; 
  font-size: 36px;
  margin-top: 20px;
  font-weight: 700;
}

button {
  margin: 15px;
  padding: 15px 30px;
  font-size: 18px;
  background-color: #2980b9; 
  color: white;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease; 
}

button:hover {
  background-color: #1f6f94; 
  transform: scale(1.05); 
}

.volver-menu {
  padding: 8px 20px; 
  font-size: 16px;
  width: auto; 
  max-width: 250px; 
  margin: 10px auto; 
}


ul {
  list-style-type: none;
  padding: 0;
  margin-top: 30px;
}

li {
  margin: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #34495e; 
  transition: color 0.3s ease; 
}

li:hover {
  color: #2980b9; 
}

@media (max-width: 768px) {
  h1 {
    font-size: 28px;
  }

  button {
    padding: 12px 25px;
    font-size: 16px;
  }

  li {
    font-size: 16px;
  }
}
</style>
