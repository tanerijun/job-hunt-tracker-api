const getAllJobs = (req, res) => {
  res.send('Get all jobs')
}

const getJob = (req, res) => {
  res.send('Get a single job')
}

const createJob = (req, res) => {
  res.json(req.user)
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
