import { cookies } from "next/headers"

import { Outro } from "@/components/outro"
import { Toggle } from "@/components/toggle"
import { Wrapper } from "@/components/wrapper"
import { Theme } from "@/types/global"

const Home = () => {
  const theme = (cookies().get("theme")?.value ?? "light") as Theme

  return (
    <div className="bg-pattern">
      <Toggle theme={theme} />
      <Wrapper theme={theme} />
      <Outro />
    </div>
  )
}

export default Home
