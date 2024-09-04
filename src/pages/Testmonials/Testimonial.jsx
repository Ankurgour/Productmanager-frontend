import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../../components/ui/Carousel";
import { Card } from "../../components/ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button';
import Ankur from "../../assets/Ankur.png";
import Tom from "../../assets/Tom.jpg"
import mayank from "../../assets/mayank.avif"

export default function Testimonials() {
  return (<section className="w-full max-w-3xl mx-auto py-12 md:py-16">
  <div className="flex flex-col items-center gap-8">
    <div className="text-center space-y-3">
      <h2 className="text-5xl font-bold">What Our <span className='text-red-500'>Customers</span> Say</h2>
      <p className="text-muted-foreground">Hear from real people about their experiences with our products.</p>
    </div>
    <Carousel className="w-full" opts={{ loop: true }}>
      {/* <CarouselContent> */}
        <CarouselItem>
          <Card className="p-6 flex flex-col items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={Ankur} />
              {/* <AvatarFallback>JD</AvatarFallback>    */}
            </Avatar>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                "I'm absolutely thrilled with the product. It's exceeded all my expectations and has made my life
                so much easier."
              </p>
              <p className="text-sm font-medium">ankur@2003gmail.com</p>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="p-6 flex flex-col items-center gap-4">
            <Avatar className="w-24 h-26">
              <AvatarImage src={mayank} />
              {/* <AvatarFallback>AM</AvatarFallback> */}
            </Avatar>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                "This product is a game-changer. It's made my workflow so much more efficient and I couldn't be
                happier with my purchase."
              </p>
              <p className="text-sm font-medium">mayank2004@gmail.com</p>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="p-6 flex flex-col items-center gap-4">
            <Avatar className="w-24 h-26">
              <AvatarImage src={Tom} />
              {/* <AvatarFallback>TM</AvatarFallback> */}
            </Avatar>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                "I was hesitant at first, but this product has completely changed the way I work. It's a must-have
                for anyone in my field."
              </p>
              <p className="text-sm font-medium">tom@gmail.com</p>
            </div>
          </Card>
        </CarouselItem>
      {/* </CarouselContent> */}
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2">
        <Button variant="ghost" size="icon">
          <ChevronLeftIcon className="w-6 h-6" />
          <span className="sr-only">Previous</span>
        </Button>
      </CarouselPrevious>
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2">
        <Button variant="ghost" size="icon">
          <ChevronRightIcon className="w-6 h-6" />
          <span className="sr-only">Next</span>
        </Button>
      </CarouselNext>
    </Carousel>
  </div>
</section>
)
}

function ChevronLeftIcon(props) {
return (
<svg
  {...props}
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
)
}


function ChevronRightIcon(props) {
return (
<svg
  {...props}
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
)
}

