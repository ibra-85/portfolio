"use client";

import { Component, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (process.env.NODE_ENV === "development") {
            console.error("ErrorBoundary caught an error:", error, errorInfo);
        }
        // En production, vous pourriez envoyer l'erreur à un service de monitoring
        // Ex: Sentry, LogRocket, etc.
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mb-4" aria-hidden="true" />
                    <h2 className="text-xl font-semibold text-white mb-2">Une erreur est survenue</h2>
                    <p className="text-gray-400 mb-4">
                        Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: undefined });
                            window.location.reload();
                        }}
                        className="px-4 py-2 bg-[#1A1A1A] border border-[#333333] rounded-lg hover:bg-[#252525] transition-colors text-white"
                    >
                        Recharger la page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

