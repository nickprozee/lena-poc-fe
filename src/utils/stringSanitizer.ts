const ensureSlash = (value: string) => value.charAt(value.length - 1) === '/' ? value : `${value}/`

const ensureNoSlash = (value: string) => {
    const firstChar = value.charAt(0)
    const lastChar = value.charAt(value.length - 1)

    if (firstChar === '/' && lastChar === '/')
        return value.substring(1, value.length - 1)

    if (firstChar === '/') return value.substring(1)

    if (lastChar === '/') return value.substring(0, value.length - 1)

    return value
}

const removeExtension = (fileName: string) => {
    const parts = fileName.split('.')
    parts.pop()

    return parts.join(' ')
}

const sanitizeApiEndpoint = (
    apiEndpoint: string,
    controller: string,
    id?: string,
    query?: string
) => {
    const sanitizedApiEndpoint = ensureNoSlash(apiEndpoint)
    const sanitizedController = ensureNoSlash(controller)
    let url = ''

    if (id) url = `${sanitizedApiEndpoint}/${sanitizedController}/${id}`
    else url = `${sanitizedApiEndpoint}/${sanitizedController}`

    if (query) url += `?${query}`

    return url
}

const capitalizeFirstLetter = (s: string) => {
    if (!s) return ''

    return s.charAt(0).toUpperCase() + s.slice(1)
}

const removeLeadingUnderscores = (s: string) => {
    if (s.indexOf('_') === 0) return s.substring(1)

    return s
}
