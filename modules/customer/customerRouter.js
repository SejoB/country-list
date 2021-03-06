const express = require('express')
const router = express.Router()
const asm = require('../../utils/asyncMiddleware')
router.use(express.json())

const customerModel = require('./customerModel')

router.post(
	'/',
	asm(async (req, res) => {
		const customer = await customerModel.create(req.body)
		console.log('**Create new Customer**', customer)
		res.status(200).json(customer)
	})
)
router.get(
	'/',
	asm(async (req, res) => {
		const customers = await customerModel.find({})
		console.log('all customers')
		res.status(200).json(customers)
	})
)
router.get(
	'/:CompanyName',
	asm(async (req, res) => {
		const companyName = req.params.CompanyName
		const customer = await customerModel.findOne({ CompanyName: companyName })
		if (!customer) return res.status(404).send(`No ${companyName} founded`)
		res.status(200).json(customer)
	})
)
router.delete(
	'/:CompanyName',
	asm(async (req, res) => {
		const companyName = req.params.CompanyName
		const customer = await customerModel.findOneAndRemove({ CompanyName: companyName })
		console.log('Customer deleted', customer)
		res.status(200).json(customer)
	})
)
router.put(
	'/:id',
	asm(async (req, res) => {
		const Id = req.params.id
		const customer = await customerModel.findOneAndUpdate({ Id: Id }, req.body, {
			new: true,
			upsert: true
		})
		console.log('Customer updated', customer)
		res.status(200).json(customer)
	})
)
module.exports = router
