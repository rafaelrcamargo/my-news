import { Spinner } from "@/components/spinner"
import { Deck } from "@/components/deck"
import { Note } from "@/components/note"

const Home = () => (
  <div className="bg-pattern">
    <Deck />
    <Note />
    <Spinner />
  </div>
)

export default Home
