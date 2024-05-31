import React from 'react'
import { ThemeProvider as NextThemeprovider } from 'next-themes'

function ThemeProvider({ children }) {
    return (
        <NextThemeprovider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            {children}
        </NextThemeprovider>
    )
}

export default ThemeProvider