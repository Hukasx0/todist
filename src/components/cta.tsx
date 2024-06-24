import Link from "next/link";
import { Button } from "@/components/ui/button"

const CallToAction = () => {
    return (
      <section className="sm:flex flex-row justify-between items-center mt-10">
        <p className="text-2xl mb-5 sm:mb-0 font-bold">Start using <span className="text-primary">Todist</span> <br className="sm:block hidden"/>
          And manage your todos in a unique way on the cloud
        </p>
        <Link href="/api/auth/signin">
          <Button>
            Get started
          </Button>
        </Link>
      </section>
    )
  }
  
  export default CallToAction;