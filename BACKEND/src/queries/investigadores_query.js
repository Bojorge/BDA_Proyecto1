const add = "CREATE (i:Investigador {id: $id, nombre_completo: $nombre_completo, titulo_academico: $titulo_academico, institucion: $institucion, email: $email})";
const update = "MATCH (i:Investigador {id: $id}) SET i.nombre_completo = $nombre_completo, i.titulo_academico = $titulo_academico, i.institucion = $institucion, i.email = $email";

module.exports = {
    add,
    update
}