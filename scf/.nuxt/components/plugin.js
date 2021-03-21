import Vue from 'vue'

const components = {
  Footer: () => import('../..\\components\\Footer.vue' /* webpackChunkName: "components/footer" */).then(c => c.default || c),
  Formulario: () => import('../..\\components\\Formulario.vue' /* webpackChunkName: "components/formulario" */).then(c => c.default || c),
  Loader: () => import('../..\\components\\Loader.vue' /* webpackChunkName: "components/loader" */).then(c => c.default || c),
  Navbar: () => import('../..\\components\\Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => c.default || c),
  Tabla: () => import('../..\\components\\Tabla.vue' /* webpackChunkName: "components/tabla" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
