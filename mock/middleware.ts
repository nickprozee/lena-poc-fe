let summarize_processed = false

module.exports = function (req, res, next) {
    const METHOD = req.method
    const PATH = req.path

    const MethodNotAllowed = () => res.status(405).send()
    const ProcessingSummarize = () => res.status(202).send()

    if (PATH === '/create') {
        if (METHOD !== 'POST') return MethodNotAllowed()

        req.method = 'GET'
        req.query = req.body
    }

    if (PATH.indexOf('/upload') > -1 && METHOD !== 'PUT')
        return MethodNotAllowed()

    if (PATH.indexOf('/summarize') > -1) {
        if (METHOD !== 'GET') return MethodNotAllowed()

        if (!summarize_processed) {
            summarize_processed = !summarize_processed
            return ProcessingSummarize()
        }
    }

    console.log(req)

    // Continue to JSON Server router
    next()
}
