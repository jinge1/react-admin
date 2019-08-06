import React from 'react'

const list = []
let max = 10
while (max > 0) {
  list.push(10 - max)
  max--
}

export default function Home() {
  const ele = list.map(item => <p key={item}>{item}</p>)
  return <div className="Home">{ele}</div>
}
