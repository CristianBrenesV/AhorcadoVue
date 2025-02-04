<template>
  <div>
    <h1>Lista de Puntuaciones</h1>
    <table>
      <thead>
        <tr>
          <th>ID Jugador</th>
          <th>Nombre Jugador</th>
          <th>Palabra</th>
          <th>Intentos</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="puntuacion in puntuaciones" :key="puntuacion.id">
          <td>{{ puntuacion.id }}</td>
          <td>{{ puntuacion.jugador || 'Desconocido' }}</td>
          <td>{{ puntuacion.palabra || 'Desconocida' }}</td>
          <td>{{ puntuacion.intentos }}</td>
          <td>{{ puntuacion.fecha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      puntuaciones: []
    };
  },
  async mounted() {
    await this.obtenerPuntuaciones();
  },
  methods: {
    async obtenerPuntuaciones() {
      try {
        const response = await axios.get('http://localhost:3000/puntuaciones');
        console.log(response.data); 
        this.puntuaciones = response.data;
      } catch (error) {
        console.error('Error al obtener las puntuaciones:', error);
      }
    },
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
</style>
