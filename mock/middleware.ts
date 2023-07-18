let id = Math.floor(Math.random() * 1000001)

const processed = ['']
const mockMessage =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

module.exports = function (req, res, next) {
    const METHOD = req.method
    const PATH = req.path

    const MethodNotAllowed = () => res.status(405).send()
    const Accepted = () => res.status(204).send()
    const ProcessingSummarize = () => res.status(202).send()

    if (PATH === '/investigations') {
        if (METHOD === 'PATCH') return next()
        if (METHOD !== 'POST' && METHOD !== 'PUT') return MethodNotAllowed()

        req.body = {
            identifier: id,
            summary: `${mockMessage}\r\n\r\n${mockMessage}\r\n\r\n${mockMessage}`,
            created_at: new Date(Date.now()).toJSON(),
            updated_at: new Date(Date.now()).toJSON(),
        }

        id++
    }

    if (PATH.indexOf('/upload') > -1 && METHOD === 'PUT') return Accepted()

    if (PATH.indexOf('/summarize/') > -1) {
        if (METHOD !== 'GET' && METHOD !== 'POST') return MethodNotAllowed()

        if (METHOD === 'POST') return next()

        const request_id = PATH.substring(
            '/summarize/'.length,
            '/summarize/'.length + 4
        )

        const summarize_processed = processed.some((p) => p === request_id)

        if (!summarize_processed) {
            processed.push(request_id)

            fetch(`http://localhost:4000/summarize`, {
                method: 'POST',
                headers: new Headers({
                    'Content-type': 'application/json',
                }),
                body: JSON.stringify({
                    identifier: parseInt(request_id),
                    summary: `${mockMessage}\r\n\r\n${mockMessage}\r\n\r\n${mockMessage}`,
                    created_at: new Date(Date.now()).toJSON(),
                    updated_at: new Date(Date.now()).toJSON(),
                }),
            })

            return ProcessingSummarize()
        }
    }

    // Continue to JSON Server router
    next()
}
