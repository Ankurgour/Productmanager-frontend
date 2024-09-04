import Footer from '../../components/shared/Footer';
import Header from '../../components/shared/Header';
import { Button } from '../../components/ui/Button';
import Testimonials from '../Testmonials/Testimonial';
import Working from './Working';
export default function Home() {
    return (
        <div>
      <Header/>
      {/* min-h-[100dvh] */}
      {/* justify-center */}
      <main className="flex  flex-col items-center  justify-center bg-background px-4 py-12 md:px-6 lg:py-24 lg:min-w-full">
        <div className="container mx-auto max-w-4xl space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            What is <span className="text-red-500">Product Manager</span> App?
          </h1>
          <p className="text-muted-foreground md:text-xl lg:text-2xl">
            Product Manager App is a powerful tool designed to help product managers streamline their workflow,
            collaborate with their teams, and bring their product visions to life.
          </p>
        </div>
      </main>
      <Working/>
      <Testimonials/>
      <Footer/>
      </div>
    )
  }
