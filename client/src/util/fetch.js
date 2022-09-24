export const GET = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })

        const data = await res.json()
        return data
    } catch(err) {
        console.error(err)
    }
}

export const DELETE = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })

        const data = await res.json()
        return data
    } catch(err) {

    }
}

export const POST = async (url, config) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            ...config
        })

        const data = await res.json()
        return data
    } catch(err) {

    }
}

export const PUT = async (url, config) => {
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            ...config
        })

        const data = await res.json()
        return data
    } catch(err) {

    }
}