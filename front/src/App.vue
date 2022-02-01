<template>
  <div class="container" id="app">
    <Stock />
    <AddItem />
  </div>
</template>

<script>
// import axios from "axios";
import Stock from "./components/Stock.vue";
import AddItem from "./components/AddItem";

export default {
  name: "App",
  components: {
    Stock,
    AddItem,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.container > div {
  border-radius: 0.313rem;
  padding: 0.625rem;
  background-color: rgb(255, 255, 255);
  border: 0.125rem solid #137faa;
}
/* .container {
  display: grid;
  width: 50rem;
  grid-template-columns: repeat(2, 40rem);
  grid-template-rows: 35em;
  grid-gap: 2.5rem;
} */
</style>
