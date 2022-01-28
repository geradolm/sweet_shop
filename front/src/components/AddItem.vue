<template>
  <div>
    <h1>Add New Item</h1>
    <div class="newItem">
      <form id="submitNewItem" class="submit_iem" action="/">
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
        <button class="btn" type="submit" @click="addItem">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: { row: { type: Object }, propCheck: String },
  data() {
    return {
      items: [{}],
      //   idProduct: "",
      //   productName: "",
      //   productQuantity: "",
      //   productPrice: "",
      //   productDescription: "",
    };
  },
  methods: {
    addItem() {
      axios
        .post(`http://localhost:5000/stock/add/`, {
          id: this.idProduct,
          productName: this.productName,
          productQuantity: this.productQuantity,
          productPrice: this.productPrice,
          productDescription: this.productDescription,
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
      this.newStock();
    },
    newStock() {
      this.$emit("new");
    },
  },
};
</script>

<style></style>
