import { ReactNode } from "react"

interface State {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
}