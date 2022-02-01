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
          <tr class="data" v-for="row in items" v-bind:key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.productName }}</td>
            <td>{{ row.productQuantity }}</td>
            <td>£{{ row.productPrice }}</td>
            <td>{{ row.productDescription }}</td>
            <td>
              <button type="button" v-on:click="deleteClick(row.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br /><br /><br />
    </div>
    <h1>Update Item</h1>
    <div class="update">
      <form id="itemUpdate" class="item_update">
        <label><b>Product ID</b></label>
        <input
          type="number"
          id="idProduct"
          placeholder="Id"
          class="id_product"
          v-model="idProduct"
          required
        />
        <label><b>Product Name</b></label>
        <input
          type="text"
          id="productName"
          placeholder="Name"
          class="product_name"
          v-model="productName"
          required
        />
        <label><b>Product Quantity</b></label>
        <input
          type="number"
          id="productQuantity"
          placeholder="Quantity"
          class="product_quantity"
          v-model="productQuantity"
          required
        />
        <label><b>Product Price</b></label>
        <input
          type="number"
          min="0.00"
          max="100.00"
          step="0.01"
          id="productPrice"
          placeholder="Price"
          class="product_price"
          v-model="productPrice"
          required
        />
        <label><b>Product Description</b></label>
        <input
          type="text"
          id="productDescription"
          placeholder="Description"
          class="product_description"
          v-model="productDescription"
          required
        /><br />
        <button class="btn" type="submit" @click="updateItem()">Update</button>
      </form>
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
      idProduct: "",
      productName: "",
      productQuantity: "",
      productPrice: "",
      productDescription: "",
    };
  },
  methods: {
    stockTotal() {
      return this.items.reduce(function (total, item) {
        return total + item.productQuantity * item.productPrice;
      }, 0);
    },
    refreshData() {
      axios
        .get(`http://localhost:5000/stock/`)
        .then((response) => {
          this.items = response.data;
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
    updateItem() {
      axios
        .put(`http://localhost:5000/stock/update/${this.idProduct}`, {
          idProduct: this.idProduct,
          productName: this.productName,
          productQuantity: this.productQuantity,
          productPrice: this.productPrice,
          productDescription: this.productDescription,
        })
        .then((response) => {
          console.log(response);
          this.refreshData();
          alert("success");
          // alert(response.data);
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
    deleteClick(id) {
      if (!confirm("Are you sure?")) {
        return;
      }
      axios
        .delete("http://localhost:5000/stock/delete/" + id)
        .then((response) => {
          this.refreshData();
          alert("success");
        });
    },
  },
  mounted: function () {
    this.refreshData();
  },
  // mounted() {
  //   axios
  //     .get(`http://localhost:5000/stock/`)
  //     .then((response) => {
  //       this.items = response.data;
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
};
</script>

<style></style>
