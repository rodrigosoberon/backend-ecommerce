const ProductsService = require('../services/products.service')
const productsService = new ProductsService()

const admin = true

class ProductsController {
  async getProductsController (req, res) {
    const products = await productsService.getProducts()
    res.json(products)
  }

  async getProductByIdController (req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      // validates correct _id format for mongoDB
      productsService.getProductById(req.params.id).then(product => {
        if (product.length) {
          res.send(product[0])
        } else {
          res.status(404).json({ error: 'product not found' })
        }
      })
    } else {
      res.status(400).json({ error: 'invalid id format' })
    }
  }

  async postProductController (req, res) {
    if (admin) {
      productsService.postProduct(req.body).then(response => res.status(201).json(response))
    } else {
      res.status(401).json({
        error: -1,
        description: `route ${req.originalUrl} method ${req.method} not authorized`
      })
    }
  }

  async putProductController (req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      // validates correct _id format for mongoDB
      if (admin) {
        productsService.getProductById(req.params.id).then(product => {
          if (product.length) {
            productsService.putProduct(req.params.id, req.body).then(() => res.sendStatus(200))
          } else {
            res.status(400).json({ error: 'product not found' })
          }
        })
      } else {
        res.status(400).json({
          error: -1,
          description: `route ${req.originalUrl} method ${req.method} not authorized`
        })
      }
    } else {
      res.status(400).json({ error: 'invalid id format' })
    }
  }

  async deleteProductController (req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      // validates correct _id format for mongoDB
      if (admin) {
        productsService.getProductById(req.params.id).then(product => {
          if (product.length) {
            productsService.deletProduct(req.params.id).then(() => {
              res.sendStatus(200)
            })
          } else {
            res.status(400).json({ error: 'product not found' })
          }
        })
      } else {
        res.status(400).json({
          error: -1,
          description: `route ${req.originalUrl} method ${req.method} not authorized`
        })
      }
    } else {
      res.status(400).json({ error: 'invalid id format' })
    }
  }
}

module.exports = ProductsController
