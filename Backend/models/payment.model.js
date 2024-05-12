import {model,Schema} from 'mongoose'

const paymentSchema= new Schema({
  payment_id:{
    type:String,
    required:true
  },
  PushSubscription_id:{
    type:String,
    required:true
  },
  signature_id:{
    type:String,
    required:true
  }
},{
    timestamps:true
})

const Payment= model('Payment',paymentSchema);
export default Payment;