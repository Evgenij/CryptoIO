module.exports = (status, res, data) => {
	return res.status(status).json(data);
};
