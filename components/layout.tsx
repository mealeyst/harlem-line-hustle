import Alert from "./alert"
import Footer from "./footer"
import Meta from "./meta"
import { GlobalStyle } from "../styles/globalStyles"

export default function Layout({ preview, children }) {
  return (
    <>
      <GlobalStyle />
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
