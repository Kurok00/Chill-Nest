const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Placeholder handlers
const getVouchers = (req, res) => {
  res.status(200).json({ message: 'Get all vouchers' });
};

const getVoucherById = (req, res) => {
  res.status(200).json({ message: `Get voucher with id ${req.params.id}` });
};

const createVoucher = (req, res) => {
  res.status(201).json({ message: 'Create a new voucher' });
};

const updateVoucher = (req, res) => {
  res.status(200).json({ message: `Update voucher with id ${req.params.id}` });
};

const deleteVoucher = (req, res) => {
  res.status(200).json({ message: `Delete voucher with id ${req.params.id}` });
};

const verifyVoucher = (req, res) => {
  res.status(200).json({ message: `Verify voucher with code ${req.params.code}` });
};

router.route('/')
  .get(getVouchers)
  .post(protect, admin, createVoucher);

router.route('/verify/:code')
  .get(protect, verifyVoucher);

router.route('/:id')
  .get(getVoucherById)
  .put(protect, admin, updateVoucher)
  .delete(protect, admin, deleteVoucher)
  .put(protect, admin, updateVoucher)
  .delete(protect, admin, deleteVoucher);

module.exports = router;
