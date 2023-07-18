import { BaseProps } from "./BaseProps";
import { Summary } from "./Summary"

interface Investigation extends BaseProps {

}

interface InvestigationViewModel extends Investigation {
    title: string;
    state: 'CREATED' | 'PROCESSING' | 'PROCESSED';
    summary?: Summary;
}

export type { Investigation, InvestigationViewModel }
