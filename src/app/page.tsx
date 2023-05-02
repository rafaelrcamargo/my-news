import { Outro } from "@/components/outro"
import { Spinner } from "@/components/icons"

import dynamic from "next/dynamic"

const Deck = dynamic(() => import("../components/deck"), {
  loading: () => <Spinner />,
})

const Home = () => (
  <div className="bg-pattern">
    <Deck />
    <Outro />
  </div>
)

export default Home
