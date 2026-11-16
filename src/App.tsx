import { useState } from 'react'
import Header from './components/Header'
import Gallery from './components/Gallery'
import Preview from './components/Preview'
import CssCode from './components/CssCode'
import Footer from './components/Footer'
import { gradients } from './data/gradients'

export default function App() {
  const [selectedGradientId, setSelectedGradientId] = useState<string | null>(gradients[0]?.id ?? null)

  const selectedGradient =
    gradients.find((g) => g.id === selectedGradientId) ?? null

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="pt-20">
        <Preview gradient={selectedGradient} onBack={() => setSelectedGradientId(null)} />

        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <CssCode css={selectedGradient?.css ?? null} />
            </div>
            <div className="md:col-span-7">
              <Gallery selectedGradientId={selectedGradientId} onSelect={setSelectedGradientId} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
