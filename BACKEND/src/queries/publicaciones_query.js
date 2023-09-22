const get = "MATCH (p:Publicaciones) RETURN p";
const add = "CREATE (p:Publicaciones {idPub: $idPub, titulo_publicacion: $titulo_publicacion, anno_publicacion: $anno_publicacion, nombre_revista: $nombre_revista})";
const update = "MATCH (p:Publicaciones {idPub: $idPub}) SET p.titulo_publicacion = $titulo_publicacion, p.anno_publicacion = $anno_publicacion, p.nombre_revista = $nombre_revista";

module.exports = {
    get,
    add,
    update
}
