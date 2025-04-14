
function Footer() {
  return (
    <footer className="bg-lbd-dark pt-16 pb-16">
      <div className="relative">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

        <div className="container-custom px-4 md:px-6">
          <div className="flex flex-col items-center">
            <div className="mb-8 rounded-full bg-lbd-pink/10 p-8">
              <img src="/favicon.svg" alt="Dot Design Community Hub Logo" className="w-8 h-8" />
            </div>


            <div className="text-center">
              <p className="text-sm text-white/60">
                &copy; {new Date().getFullYear()} Dot Design Community Hub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
