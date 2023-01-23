// import {Schema, model} from "mongoose";
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const productosCollection = "productos";

const productoSchema = new mongoose.Schema({
    timestamp: {type: String},
    nombre: {type: String},
    descripcion: {type: String},
    codigo: {type: String},
    thumbnail: {type: String},
    precio: {type: Number},
    stock: {type: Number}
}, {versionKey: false}) //Para que no agregue '__v'

const productos = mongoose.model(productosCollection, productoSchema)

module.exports = productos