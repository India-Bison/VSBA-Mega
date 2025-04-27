export function get_from_cache(has_cache: boolean, cache: any, id: any) {
    if (typeof id === 'object') {
        id = JSON.stringify(id)
    }
    if (has_cache) {
        if (cache[id]) {
            return cache[id]
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

export function set_cache(has_cache: boolean, cache: any, id: any, body: any) {
    if (typeof id === 'object') {
        id = JSON.stringify(id)
    }
    if (has_cache) {
        cache[id] = body
    }
}

export function delete_from_cache(has_cache: boolean, cache: any, id: any) {
    if (has_cache) {
        delete cache[id]
    }
}
