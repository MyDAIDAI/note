const {effect, ref} = VueReactivity;

const count = ref(1)
const renderer = createRenderer()
effect(() => {
  renderer.render(`<h1>${count.value}</h1>`, document.getElementById('app'))
})
