export function byCategory(list, cat) {
    return list.filter((model) => model.category === cat)
}

// esta função tive dificuldade em conseguir fazer 
export function search(list, text) {
    const query = text.toLowerCase()

    return list.filter((model)=> model.name.toLowerCase().includes(query)
                            ||   model.tags.some((tag) => tag.toLowerCase().includes(query)))
          
}

export function total(list) {
  return list.reduce((acc, model) => acc + model.price, 0)
}

export function top(list, n) {
    return list.toSorted((a,b) => b.price - a.price).slice(0, n)
}

//esta função foi mais complicada 
export function categories(list) {
    const categorias = [
        ...new Set(list.map((model) => model.category))
    ]
    return categorias.toSorted() 
}
// esta precisei de ajuda 
export function withDiscount(list, pct) {
  return list.map((model) => ({
    ...model,
    price: model.price * (1 - pct / 100)
  }))
}