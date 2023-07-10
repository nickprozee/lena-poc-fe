interface Investigation {
    id: string
}

interface InvestigationViewModel extends Investigation {
    title: string
    state: 'PROCESSING' | 'PROCESSED',
    summary?: string
}

export type { Investigation, InvestigationViewModel }
