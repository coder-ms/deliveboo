import { reactive } from 'vue';
export const store = reactive({
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    imagBasePath: 'http://127.0.0.1:8000/storage/',

    cart: [],

    totalPrice: '',

    paymentStatus: null,

    saveOrder: false,

    cartShow: false,

    loading : false,
});