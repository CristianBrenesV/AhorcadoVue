<template>
    <div>
      <button @click="iniciarJuego">Jugar</button>
      <button @click="verPuntuaciones">Ver Puntuaciones</button>
    </div>
    
  </template>
  
  <script>
  export default {
    name: 'MenuPrincipal',
    methods: {
      iniciarJuego() {
        this.$emit('iniciarJuego');
      },
      verPuntuaciones() {
        this.$emit('verPuntuaciones');
      }
    }
  };
  </script>
  