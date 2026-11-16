import Header from './components/Header'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="pt-20">
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}
