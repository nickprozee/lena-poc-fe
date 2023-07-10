interface Investigation {
    id: string
}

interface InvestigationViewModel extends Investigation {
    title: string
    state: 'CREATED' | 'PROCESSING' | 'PROCESSED',
    summary?: string
}

export type { Investigation, InvestigationViewModel }
