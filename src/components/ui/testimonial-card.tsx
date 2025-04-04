import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export interface TestimonialAuthor {
  name: string
  role: string
  imageUrl?: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
}

export function TestimonialCard({ 
  author, 
  text, 
  href 
}: TestimonialCardProps) {
  return (
    <Card className={cn(
      "flex w-[350px] flex-col gap-4 p-6",
      "border border-white/10 bg-black/40 backdrop-blur-md shadow-sm",
      "transition-all duration-200 hover:border-lbd-pink/30 hover:bg-black/50 hover:shadow-md"
    )}>
      <div className="flex flex-1 flex-col gap-4">
        <p className="text-md flex-1 text-lbd-white italic leading-relaxed">"{text}"</p>
        
        <div className="flex items-center gap-3">
          {author.imageUrl ? (
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img 
                src={author.imageUrl} 
                alt={author.name} 
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-lbd-pink/30 to-purple-700/20">
              <span className="text-lbd-pink font-bold text-lg">{author.name.charAt(0)}</span>
            </div>
          )}
          
          <div>
            <p className="font-medium text-lbd-white">{author.name}</p>
            <p className="text-sm text-lbd-white/60">{author.role}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
