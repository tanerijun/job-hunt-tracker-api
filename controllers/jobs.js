const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  // Get only the job that's associated with the user
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({
    createdBy: userId,
    _id: jobId,
  })

  if (!job) {
    throw new NotFoundError(`No job with ID ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  // A job is always associated with a user
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError("Both company and position fields can't be empty")
  }

  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  )

  if (!job) {
    throw new NotFoundError(`No job with ID ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  })

  if (!job) {
    throw new NotFoundError(`No job with ID ${jobId}`)
  }

  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
