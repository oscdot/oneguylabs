import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/').createRoute({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome to Home</h3>
    </div>
  )
}
