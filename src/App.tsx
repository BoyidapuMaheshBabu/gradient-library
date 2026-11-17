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
    gradients.find((gradient) => gradient.id === selectedGradientId) ?? null

  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        <Preview
          gradient={selectedGradient}
          onBack={() => setSelectedGradientId(null)}
        />

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.5fr)] lg:gap-8">
          <CssCode css={selectedGradient?.css ?? null} />
          <Gallery
            selectedGradientId={selectedGradientId}
            onSelect={setSelectedGradientId}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}
