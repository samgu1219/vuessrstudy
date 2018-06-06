import createApp from './create-app'

export default context => {
  console.log('*************************************')
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()
    // const {app, router} = createApp()

    console.log('context', context)
    router.push(context.url)
    router.onReady(() => {
      let hasAsyncData = false
      const matchedComponents = router.getMatchedComponents()
      // console.log('[matchedComponents]', matchedComponents)

      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          hasAsyncData = true
          return Component.asyncData({
            route: router.currentRoute,
            store
          })
        }
      })).then(() => {
        context.meta = app.$meta()
        hasAsyncData ? context.state = store.state : void (0)
        context.router = router
        resolve(app)
      })
    })
  })
}
