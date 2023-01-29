// import {Schema, model} from "mongoose";
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    timestamp: {type: String},
    products: [],
}, {versionKey: false}) //skips adding '__v' to DB object

const carts = mongoose.model(cartsCollection, cartsSchema)

module.exports = carts