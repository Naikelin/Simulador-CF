import Vue from 'vue'

const components = {
  Formulario: () => import('../../components/Formulario.vue' /* webpackChunkName: "components/formulario" */).then(c => c.default || c),
  Loader: () => import('../../components/Loader.vue' /* webpackChunkName: "components/loader" */).then(c => c.default || c),
  Navbar: () => import('../../components/Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
