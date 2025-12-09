import { useGetTodos } from '@renderer/api/getTodos'
import { Button } from '@renderer/components/ui/button'
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@renderer/components/ui/item'
import { useAuth } from '@renderer/contexts/AuthProvider'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle, ExternalLink } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_main/')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  const { data: todos, isLoading: fetchTodosLoading } = useGetTodos()
  const { logout } = useAuth()

  const handleLogout = async (): Promise<void> => {
    logout()
  }

  return (
    <div className="p-2 space-y-4">
      <Button onClick={handleLogout}>Logout</Button>
      <div className="space-y-4">
        {fetchTodosLoading ? (
          <p>Loading...</p>
        ) : todos && todos.length > 0 ? (
          todos.map((todo) => (
            <Item key={todo.id} variant="outline">
              <ItemMedia>
                <CheckCircle className="size-4 text-green-500" />
              </ItemMedia>

              <ItemContent>
                <ItemTitle>{todo.title}</ItemTitle>
              </ItemContent>

              <ItemActions>
                <Button
                // onClick={() => completeTodoMutation(id)}
                // disabled={completeTodoLoading}
                >
                  Complete
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/`}>
                    View Details <ExternalLink />
                  </Link>
                </Button>
              </ItemActions>
            </Item>
          ))
        ) : (
          <p>No todos found</p>
        )}
      </div>
    </div>
  )
}
