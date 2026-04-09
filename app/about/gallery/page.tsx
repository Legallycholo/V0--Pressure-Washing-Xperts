import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import BeforeAfter from '@/components/BeforeAfter'

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-brand-blue-dark via-section-dark to-brand-blue text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Work Gallery</h1>
            <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
              Browse our extensive portfolio of pressure washing projects across residential, commercial, and industrial properties.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Before & After Section */}
        <BeforeAfter />
      </main>

      <Footer />
    </div>
  )
}
