export async function getproducts() {
    const res = await fetch("https://localhost:7260/api/products")
    return res.json()

}

export async function deleteproducts(id) {
    await fetch(
        `https://localhost:7260/api/products/${id}`,
        { method: "Delete" })
}
export async function editprodcuts(id, updatedProduct) {
    const res = await fetch(
        `https://localhost:7260/api/products/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers: {
                'Content-Type': 'application/json',
            },
        })
}

export async function addroducts(product){
    const res = await fetch(
        `https://localhost:7260/api/products`,
        {
            method: "PoST",
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
            },
        })
}