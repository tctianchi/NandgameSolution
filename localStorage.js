// backup
let all = {}
for (let i = 0; i < localStorage.length; i++) {
  const k = localStorage.key(i)
  const v = localStorage.getItem(k)
  all[k] = v
}
console.log(JSON.stringify(all, null, 2))
