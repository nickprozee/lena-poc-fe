const getMockText = async () => {
    const result = await fetch(
        'https://baconipsum.com/api/?type=all-meat&sentences=20&start-with-lorem=1'
    ).then((r) => r.json())
    const mockMessage = result[0]

    return `${mockMessage}\r\n\r\n${mockMessage}\r\n\r\n\r\nKind Regards, \r\n\r\nLena.`
}

module.exports = function (req, res, next) {
    const METHOD = req.method
    const PATH = req.path

    const MethodNotAllowed = () => res.status(405).send()
    const Accepted = () => res.status(204).send()

    if (PATH === '/investigations') {
        if (METHOD === 'PATCH' || METHOD === 'GET') return next()
        if (METHOD !== 'POST' && METHOD !== 'PUT') return MethodNotAllowed()

        if (METHOD === 'POST') {
            let body = {
                created_at: new Date().toJSON(),
                updated_at: new Date().toJSON(),
            }
            req.body = body

            setTimeout(
                () =>
                    fetch(`http://localhost:4000/investigations`)
                        .then((r) => r.json())
                        .then(async (investigations) => {
                            const index = investigations.length - 1
                            const id = investigations[index].id
                            const text = await getMockText()

                            fetch(
                                `http://localhost:4000/investigations/summarize`,
                                {
                                    method: 'POST',
                                    headers: new Headers({
                                        'Content-type': 'application/json',
                                    }),
                                    body: JSON.stringify({
                                        id: id,
                                        summary: text,
                                        created_at: new Date(
                                            Date.now()
                                        ).toJSON(),
                                        updated_at: new Date(
                                            Date.now()
                                        ).toJSON(),
                                    }),
                                }
                            )
                        }),
                3000
            )
        }
    }

    if (PATH.indexOf('/upload') > -1 && METHOD === 'PUT') return Accepted()

    if (PATH.indexOf('/summarize') > -1) {
        if (METHOD !== 'GET' && METHOD !== 'POST') return MethodNotAllowed()
    }

    // Continue to JSON Server router
    next()
}
