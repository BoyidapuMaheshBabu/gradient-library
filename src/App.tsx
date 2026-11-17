import { useState } from 'react'
import Header from './components/Header'
import Gallery from './components/Gallery'
import EditorEntry from './components/EditorEntry'
import Footer from './components/Footer'
import { gradients } from './data/gradients'

export default function App() {
  const [view, setView] = useState<'gallery' | 'editing'>('gallery')
  const [selectedGradientId, setSelectedGradientId] = useState<string | null>(null)

  const selectedGradient =
    gradients.find((gradient) => gradient.id === selectedGradientId) ?? null

  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        {view === 'gallery' ? (
          <Gallery
            onSelect={(id) => {
              setSelectedGradientId(id)
              setView('editing')
            }}
          />
        ) : (
          <EditorEntry
            gradient={selectedGradient}
            onBack={() => {
              setView('gallery')
              setSelectedGradientId(null)
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}
