import { useState } from 'react'
import './App.css'
import { Provider } from "@/components/ui/provider"
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Provider>
        <div>
          <Button>Hello World</Button>
        </div>
      </Provider>
    </div>
  )
}

export default App
