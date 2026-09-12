export interface Localize {
    dictionary?: Record<string, any>;
    gates: Record<string, any>;
    glossary?: Record<string, any>;
    listing: Record<string, any>;
    localized: Record<string, any>;
    marketplace: string;
    pass: boolean;
    sourceLang: string;
    targetLang: string;
    violations: any[];
}
export interface LocalizeCreateData {
    dictionary?: Record<string, any>;
    gates: Record<string, any>;
    glossary?: Record<string, any>;
    listing: Record<string, any>;
    localized: Record<string, any>;
    marketplace: string;
    pass: boolean;
    sourceLang: string;
    targetLang: string;
    violations: any[];
}
