import dynamic from "next/dynamic"
import { Spinner } from "@/components/icons"
import { Outro } from "@/components/outro"

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
