const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'users', component: () => import('pages/PageUsers.vue') },
      { path: '/auth', name:'auth', component: () => import('pages/PageAuth.vue') },
      { path: '/chat/:otherUserId', name:'chat', component: () => import('pages/PageChat.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
