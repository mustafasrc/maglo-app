// components/ErrorBoundary.tsx
"use client";

import React, { Component, ReactNode } from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface Props {
    children: ReactNode;
    errorComponent?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Caught by ErrorBoundary:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return this.props.errorComponent || (
                <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl  text-center gap-4">
                    <FiAlertCircle className="w-12 h-12 text-red-500" />
                    <h1 className="text-2xl font-bold text-red-700">Something went wrong</h1>
                    <p className="text-red-600">
                        An unexpected error occurred. Please try again.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        <FiRefreshCw className="inline w-5 h-5 mr-2" />
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
