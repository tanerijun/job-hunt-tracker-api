const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  // Get only the job that's associated with the user
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const getJob = (req, res) => {
  res.send('Get a single job')
}

const createJob = async (req, res) => {
  // A job is always associated with a user
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = (req, res) => {
  res.send('Update job')
}

const deleteJob = (req, res) => {
  res.send('Delete job')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
