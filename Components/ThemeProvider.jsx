import React from 'react'
import { ThemeProvider as NextThemeprovider } from 'next-themes'

function ThemeProvider({ children , ...props }) {
    return (
        <NextThemeprovider {...props} // disableTransitionOnChange
        >
            {children}
        </NextThemeprovider>
    )
}

export default ThemeProvider