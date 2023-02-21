<template>

  <form id="payment-form" :action="`${store.apiBaseUrl}/order/payment`" method="post">
    <!-- Putting the empty container you plan to pass to
      `braintree.dropin.create` inside a form will make layout and flow
      easier to manage -->
    <div id="dropin-container"></div>
    <!-- <input type="submit" class="text-center buy-buttons" /> -->
    <button type="submit" class="btn text-center buy-buttons mb-4" :disabled="store.loading"><i class="fa-solid fa-credit-card"></i>{{ store.loading ? 'Attendi...' : 'Paga' }}</button>
    <input type="hidden" id="nonce" name="payment_method_nonce" />
  </form>
</template>

<script>
import { store } from '../store'
import axios from 'axios';

export default {

  data() {
    return {
      store,
    }
  },
  methods: {
    //     getError(createErr, instance){
    //         this.handler()
    //     },
    //     handler(){
    //         instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
    //     // When the user clicks on the 'Submit payment' button this code will send the
    //     // encrypted payment information in a variable called a payment method nonce
    //     $.ajax({
    //       type: 'POST',
    //       url: `${store.apiBaseUrl}/order/payment`,
    //       data: {'paymentMethodNonce': payload.nonce}
    //     }).done(function(result) {
    //       // Tear down the Drop-in UI
    //       instance.teardown(function (teardownErr) {
    //         if (teardownErr) {
    //           console.error('Could not tear down Drop-in UI!');
    //         } else {
    //           console.info('Drop-in UI has been torn down!');
    //           // Remove the 'Submit payment' button
    //           $('#submit-button').remove();
    //         }
    //       });

    //       if (result.success) {
    //         $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
    //       } else {
    //         console.log(result);
    //         $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
    //       }
    //     });
    //   });
    //     }
  },
  mounted() {

    const form = document.getElementById('payment-form');
    axios.get(`${store.apiBaseUrl}/order`).then((response) => {
      braintree.dropin.create({
        authorization: response.data.token,
        container: '#dropin-container'
      }, (error, dropinInstance) => {
        if (error) console.error(error);

        form.addEventListener('submit', event => {
          event.preventDefault();
          if(!store.cart.length){
              Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Il carrello è vuoto',
              showConfirmButton: false,
              timer: 1500
            });
            return
          }
          store.loading = true;
          
          dropinInstance.requestPaymentMethod((error, payload) => {
            if (error) console.error(error);

            // Step four: when the user is ready to complete their
            //   transaction, use the dropinInstance to get a payment
            //   method nonce for the user's selected payment method, then add
            //   it a the hidden field before submitting the complete form to
            //   a server-side integration
            document.getElementById('nonce').value = payload.nonce;
            //   form.submit();
            axios.post(`${store.apiBaseUrl}/order/payment`, { payment_method_nonce: payload.nonce, amount: store.totalPrice }).then((response) => {
              store.paymentStatus = response.data.success;
              store.saveOrder = !store.saveOrder;
            })
          });
        });
      });
    })

    //         var button = document.querySelector('#submit-button');
    //         axios.get(`${store.apiBaseUrl}/order`).then((response)=>{
    //   braintree.dropin.create({
    //     // Insert your tokenization key here
    //     authorization: response.data.token,
    //     container: '#dropin-container'
    //   }, function (createErr, instance) {
    //     button.addEventListener('click', function () {
    //       instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
    //         // When the user clicks on the 'Submit payment' button this code will send the
    //         // encrypted payment information in a variable called a payment method nonce
    //         $.ajax({
    //           type: 'POST',
    //           url: '/checkout',
    //           data: {'paymentMethodNonce': payload.nonce}
    //         }).done(function(result) {
    //           // Tear down the Drop-in UI
    //           instance.teardown(function (teardownErr) {
    //             if (teardownErr) {
    //               console.error('Could not tear down Drop-in UI!');
    //             } else {
    //               console.info('Drop-in UI has been torn down!');
    //               // Remove the 'Submit payment' button
    //               $('#submit-button').remove();
    //             }
    //           });

    //           if (result.success) {
    //             $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
    //           } else {
    //             console.log(result);
    //             $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
    //           }
    //         });
    //       });
    //     });
    //   });
    // })

  }
}

</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/__variables.scss" as *;

.buy-buttons {
  padding: 0.5rem 1.5rem;
  font-size: 24px;
  text-align: center;
  
  position: relative;
  display: inline-block;
  text-align: center;
  letter-spacing: 1px;
  text-decoration: none;
  color: $red;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid $red;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 $red;

  &:hover{
    color: white;
  box-shadow: inset 0 -100px 0 0 $red;
  }
  &:active{
    transform: scale(0.9);
  }

  i {
    padding-right: 15px;
  }
}
</style>