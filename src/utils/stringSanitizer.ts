export const ensureSlash = (value: string) => value.charAt(value.length - 1) === '/' ? value : `${value}/`

export const ensureNoSlash = (value: string) => {
    const firstChar = value.charAt(0)
    const lastChar = value.charAt(value.length - 1)

    if (firstChar === '/' && lastChar === '/')
        return value.substring(1, value.length - 1)

    if (firstChar === '/') return value.substring(1)

    if (lastChar === '/') return value.substring(0, value.length - 1)

    return value
}

export const removeExtension = (fileName: string) => {
    const parts = fileName.split('.')
    parts.pop()

    return parts.join(' ')
}

export const sanitizeApiEndpoint = (
    apiEndpoint: string,
    controller?: string,
    id?: string,
    query?: string
) => {
    
    const sanitizedApiEndpoint = ensureNoSlash(apiEndpoint)
    const sanitizedController = ensureNoSlash(controller ?? '')
    let url = ''

    if (id) url = `${sanitizedApiEndpoint}/${id}/${sanitizedController}`
    else url = sanitizedController.length ? `${sanitizedApiEndpoint}/${sanitizedController}` : sanitizedApiEndpoint

    if (query) url += `?${query}`

    return url
}

export const capitalizeFirstLetter = (s: string) => {
    if (!s) return ''

    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const removeLeadingUnderscores = (s: string): string => {
    if (s.indexOf('_') === 0) return removeLeadingUnderscores(s.substring(1))

    return s
}

export const getSizeString = (f: File) => {
    let size = f.size / 1000

    if (size < 1000) return `${Math.round(size)} kb`

    size = size / 1000

    return `${Math.round(size)} mb`
}
