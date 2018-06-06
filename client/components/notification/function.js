/*
import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const notify = (options) => {
  if (Vue.prototype.$isServer) return
  const instance = new NotificationConstructor({

  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.vm.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instances.push(instance)
  return instance.vm
}
*/
