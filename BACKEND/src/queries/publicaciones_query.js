const get = "MATCH (p:Publicacion) RETURN p";
const add = "CREATE (p:Publicacion {idPub: $idPub, titulo_publicacion: $titulo_publicacion, anno_publicacion: $anno_publicacion, nombre_revista: $nombre_revista})";
const update = "MATCH (p:Publicacion {idPub: $idPub}) SET p.titulo_publicacion = $titulo_publicacion, p.anno_publicacion = $anno_publicacion, p.nombre_revista = $nombre_revista";

module.exports = {
    get,
    add,
    update
}
