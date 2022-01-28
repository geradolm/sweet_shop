<template>
  <div>
    <div>
      <b>Total Stock: £{{ stockTotal() }}</b>
    </div>
    <h1>Sweet Shop Stock</h1>
    <div>
      <table class="sweets">
        <thead class="sweets_product">
          <tr class="sweets_name">
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody class="body">
          <tr class="data" v-for="row in items" v-bind:key="row">
            <td>{{ row.id }}</td>
            <td>{{ row.productName }}</td>
            <td>{{ row.productQuantity }}</td>
            <td>£{{ row.productPrice }}</td>
            <td>{{ row.productDescription }}</td>
          </tr>
        </tbody>
      </table>
      <br /><br /><br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddItem from "./AddItem.vue";
export default {
  components: {
    AddItem,
  },
  props: { row: { type: Object }, propCheck: String },
  data() {
    return {
      items: [{}],
    };
  },
  methods: {
    stockTotal() {
      return this.items.reduce(function (total, item) {
        return total + item.productQuantity * item.productPrice;
      }, 0);
    },
    // stock() {
    //   axios
    //     .get(`http://localhost:5000/stock/`)
    //     .then((response) => {
    //       this.items = response.data.item;
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         console.log(error.response.status);
    //       } else if (error.request) {
    //         console.log(error.request);
    //       } else {
    //         console.log(error.message);
    //       }
    //     });
    // },
  },
  mounted() {
    axios
      .get(`http://localhost:5000/stock/`)
      .then((response) => {
        this.items = response.data.item;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
      });
  },
};
</script>

<style></style>
