import { useState } from "react"
import { Button } from "../../components/ui/Button"
import Imgg from "../../../src/assets/placeholder.svg"
export default function Working() {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <section className="w-full py-12 md:py-24 lg:py-1 bg-muted justify-center items-center flex">
      <div className="container px-4 md:px-6 flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How this <span >app</span> <span className="text-red-500">works</span>?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our app is designed to make your life easier. With just a few taps, you can access all the features you
              need to stay organized and productive.
            </p>
          </div>
        </div>
        <div className=" mx-auto grid max-w-3xl items-center  gap-6 py-12 lg:grid-cols lg:gap-12">
          <div>
          <img
            src={Imgg}
            width="550"
            height="310"
            alt="How it works"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Stay Organized</h3>
                  <p className="text-muted-foreground">
                    Our app helps you keep track of your E-Commerce products.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold ">Works</h3>
                  <p className="text-muted-foreground">
                    With built-in tools and features, you can streamline your workflow and get more done in less time.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Collaborate Seamlessly</h3>
                  <p className="text-muted-foreground">
                    Easily share your work and collaborate with your team, no matter where you are.
                  </p>
                </div>
              </li>
            </ul>
            <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              className="w-max justify-start text-red-500 hover:bg-red-500 hover:text-white flex"
              onClick={() => setShowDetails(true)}
            >
             <p> Read more </p>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

            </Button>
            </div>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">How the app works</h2>
            {/* <p className="text-muted-foreground mb-6">
              Our app is designed to streamline your workflow and help you get more done in less time. With built-in
              tools and features, you can easily manage your tasks, notes, and schedules all in one place. Plus, you can
              collaborate seamlessly with your team, no matter where you are.
            </p> */}
            <ol className="flex items-start h-20">
                <li><p className="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
</svg>
Team member pulls a request of changes in a product</p></li>
                <li><p className="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
</svg>Admin reviews, are the corrections up to the marks?</p></li>
                <li><p className="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
</svg>If approves then the changes will be reflected to the products</p></li>
            </ol>
            <Button
              variant="ghost"
              className="justify-start text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => setShowDetails(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}