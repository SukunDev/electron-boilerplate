import { useGetTodos } from '@renderer/api/getTodos'
import { Button } from '@renderer/components/ui/button'
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@renderer/components/ui/item'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle, ExternalLink } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_main/')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  const { data: todos, isLoading: fetchTodosLoading } = useGetTodos()

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-base bg-background border-2 border-border" />
          <div className="aspect-video rounded-base bg-background border-2 border-border" />
          <div className="aspect-video rounded-base bg-background border-2 border-border" />
        </div>
        <div className="h-full flex-1 rounded-base bg-background border-2 border-border">
          <div className="p-2 space-y-4">
            <div className="space-y-4">
              {fetchTodosLoading ? (
                <p>Loading...</p>
              ) : todos && todos.length > 0 ? (
                todos.map((todo) => (
                  <Item key={todo.id} variant="outline" className="bg-white">
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
                      <Button variant="noShadow" asChild>
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
        </div>
      </div>
    </>
  )
}
