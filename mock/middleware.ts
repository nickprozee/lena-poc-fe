let id = 5001

const processed = ['']

module.exports = function (req, res, next) {
    const METHOD = req.method
    const PATH = req.path

    console.log(PATH)

    const MethodNotAllowed = () => res.status(405).send()
    const ProcessingSummarize = () => res.status(202).send()

    if (PATH === '/investigations') {
        if (METHOD !== 'POST' && METHOD !== 'PUT') return MethodNotAllowed()

        req.body = { id, status: 'CREATED' }
        id++
    }

    if (PATH.indexOf('/upload') > -1 && METHOD !== 'PUT')
        return MethodNotAllowed()

    if (PATH.indexOf('/summarize/') > -1) {
        if (METHOD !== 'GET' && METHOD !== 'POST') return MethodNotAllowed()

        if (METHOD === 'POST') return next()

        const request_id = PATH.substring(
            '/summarize/'.length,
            '/summarize/'.length + 4
        )

        console.log('REQUEST ID: ' + request_id)

        const summarize_processed = processed.some((p) => p === request_id)

        if (!summarize_processed) {
            processed.push(request_id)

            fetch(`http://localhost:4000/summarize`, {
                method: 'POST',
                headers: new Headers({
                    'Content-type': 'application/json',
                }),
                body: JSON.stringify({
                    id: parseInt(request_id),
                    summary: 'Hello World! ' + request_id,
                }),
            })

            return ProcessingSummarize()
        }
    }

    // Continue to JSON Server router
    next()
}
