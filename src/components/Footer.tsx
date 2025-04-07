import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-lbd-dark pt-16 pb-16">
      <div className="relative">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

        <div className="container-custom px-4 md:px-6">
          <div className="flex flex-col items-center">
            <div className="mb-8 rounded-full bg-lbd-pink/10 p-8">
              <Icons.logo className="text-lbd-pink w-6" />
            </div>
            <div className="mb-8 flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-lbd-pink/10 hover:text-lbd-pink">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-lbd-pink/10 hover:text-lbd-pink">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-lbd-pink/10 hover:text-lbd-pink">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-lbd-pink/10 hover:text-lbd-pink">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-white/60">
                &copy; {new Date().getFullYear()} Little Big Dots. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
