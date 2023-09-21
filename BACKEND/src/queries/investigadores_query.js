const add = "CREATE (i:Investigador {id: $1, nombre_completo: $2, titulo_academico: $3, institucion: $4, email: $5})";

module.exports = {
    add
}