// import {Schema, model} from "mongoose";
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const carritosCollection = "carritos";

const carritoSchema = new mongoose.Schema({
    timestamp: {type: String},
    productos: [],
}, {versionKey: false}) //Para que no agregue '__v'

const carritos = mongoose.model(carritosCollection, carritoSchema)

module.exports = carritos