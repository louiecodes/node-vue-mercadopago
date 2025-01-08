<template>
  <h1>{{ msg }}</h1>
  <button @click="createPreference()">Pay Now</button>
  <div v-if="preferenceId" id="wallet_container"></div>
</template>

<script setup>
import axios from 'axios';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { onMounted, ref } from 'vue';

defineProps({
  msg: String,
});

const preferenceId = ref(null);

onMounted(async () => {
  await loadMercadoPago();
});


const createPreference = async () => {
  try {
    const mercadoPagoKey = import.meta.env.VITE_PUBLIC_MERCADOPAGO_KEY;
    const mp = new MercadoPago(mercadoPagoKey, { locale: 'es-AR' });
    const bricksBuilder = mp.bricks();

    const response = await axios.post('http://localhost:3000/create-preference', {
      title: 'louie wuz here',
      quantity: 1,
      unit_price: 7000,
    });

    const { id } = response.data;
    preferenceId.value = id;

    bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId.value,
      },
      customization: {
        texts: {
          valueProp: 'smart_option',
        },
      },
    });

    return id;
  } catch (error) {
    console.log(error);
  }
}
</script>