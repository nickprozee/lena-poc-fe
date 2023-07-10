interface Investigation {
    id: string
}

interface InvestigationViewModel extends Investigation {
    title: string
    state: 'PROCESSING' | 'PROCESSED'
}

export type { Investigation, InvestigationViewModel }
