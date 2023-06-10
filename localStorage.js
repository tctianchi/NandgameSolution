// backup
let keys = []
for (let i = 0; i < localStorage.length; i++) {
  const k = localStorage.key(i)
  keys.push(k)
}
keys.sort()
let all = {}
for (let k of keys) {
  all[k] = localStorage.getItem(k)
}
console.log(JSON.stringify(all, null, 2))

// restore
dumped = {} // paste from localStorage.json
for (var key in dumped) {
    localStorage[key] = dumped[key]
}
