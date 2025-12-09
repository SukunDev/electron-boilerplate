import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/settings/')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return <div>Hello "/_main/settings/"!</div>
}
