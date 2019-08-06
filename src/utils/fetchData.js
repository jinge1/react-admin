// 临时模拟网络请求
export default function fetchData(api, params) {
  return new Promise((resolve, reject) => {
    import(`../mock/${api}.json`).then(res => {
      setTimeout(() => {
        resolve(res.default || res)
      }, 1000)
    })
  })
}
