/**
 * Fonction utilitaire pour valider et sanitizer les entrées utilisateur
 */

const MAX_SEARCH_LENGTH = 100;

/**
 * Sanitize une chaîne de caractères en supprimant les caractères dangereux
 */
export function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, "") // Supprimer les balises HTML
        .replace(/[{}[\]\\]/g, "") // Supprimer les caractères spéciaux
        .slice(0, MAX_SEARCH_LENGTH); // Limiter la longueur
}

/**
 * Valide une requête de recherche
 */
export function validateSearchQuery(query: string): {
    isValid: boolean;
    sanitized: string;
    error?: string;
} {
    const trimmed = query.trim();

    // Vérifier la longueur
    if (trimmed.length > MAX_SEARCH_LENGTH) {
        return {
            isValid: false,
            sanitized: sanitizeInput(trimmed),
            error: `La recherche ne peut pas dépasser ${MAX_SEARCH_LENGTH} caractères`,
        };
    }

    // Vérifier les caractères dangereux
    const dangerousPattern = /<script|javascript:|onerror|onload=/i;
    if (dangerousPattern.test(trimmed)) {
        return {
            isValid: false,
            sanitized: sanitizeInput(trimmed),
            error: "Caractères non autorisés dans la recherche",
        };
    }

    return {
        isValid: true,
        sanitized: sanitizeInput(trimmed),
    };
}

