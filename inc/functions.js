export function response(status, mensagem, affected_rows, data = null) {
    return {
        status: status,
        mensagem: mensagem,
        affected_rows: affected_rows,
        data: data,
        timestamps: new Date().getTime()
    }
}