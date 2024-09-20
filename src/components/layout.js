import React from "react";
import Navbar from "./navbar"; // Assume you have a Navbar component
import Footer from "./footer"; // Assume you have a Footer component

function Layout({ children }) {
    // Check if cookie.token matches token
    
        return (
            <>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </>
        );
}

export default Layout;