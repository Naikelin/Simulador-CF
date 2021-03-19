export { default as Formulario } from '../../components/Formulario.vue'
export { default as Loader } from '../../components/Loader.vue'
export { default as Navbar } from '../../components/Navbar.vue'
export { default as Tabla } from '../../components/Tabla.vue'

export const LazyFormulario = import('../../components/Formulario.vue' /* webpackChunkName: "components/formulario" */).then(c => c.default || c)
export const LazyLoader = import('../../components/Loader.vue' /* webpackChunkName: "components/loader" */).then(c => c.default || c)
export const LazyNavbar = import('../../components/Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => c.default || c)
export const LazyTabla = import('../../components/Tabla.vue' /* webpackChunkName: "components/tabla" */).then(c => c.default || c)
