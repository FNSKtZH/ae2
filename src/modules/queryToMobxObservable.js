import { observable } from 'mobx'
import { fromResource } from 'mobx-utils'

export default function(queryObservable) {
  let subscription
  //Mobx util https://github.com/mobxjs/mobx-utils#fromresource
  return fromResource(
    sink => {
      subscription = queryObservable.subscribe({
        next: graphqlRes => {
          if (graphqlRes.data) {
            sink(observable(graphqlRes.data))
          }
        },
        error: error => {
          console.log('there was an error sending the query', error)
        },
      })
    },
    () => subscription.unsubscribe()
  )
}
