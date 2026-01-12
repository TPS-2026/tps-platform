export function getToastForError(e, title) {
    if (!title) {
        title = "Erreur"
    }

    let config = {severity: 'error', summary: title, detail: e.message, life: 8000}

    if (e.response && e.response.data) {
        if (e.response.data.kind) {
            config.detail = "Erreur ID: " + e.response.data.kind + "\n"
        } else {
            config.detail = "Erreur inattendue\n"
        }

        if (e.response.data.message) {
            console.error(e, e.response.data.message)
            config.detail = e.response.data.message
        }
    }

    return config
}

