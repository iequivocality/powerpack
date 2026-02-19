import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add-product')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1 className="ml-4 text-xl font-semibold text-white">Add product</h1>
      <div className="min-h-screen grid grid-cols-12 grid-rows-12 gap-4">
        
      </div>
    </>
  )
}
