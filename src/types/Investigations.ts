import { Summary } from "./Summary"

interface Investigation {
    id: string
}

interface InvestigationViewModel extends Investigation {
    title: string
    state: 'CREATED' | 'PROCESSING' | 'PROCESSED',
    summary?: Summary
}

export type { Investigation, InvestigationViewModel }
