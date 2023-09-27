const add = "MATCH (p:Proyecto {idPry: $proyectoId}) MATCH (pub:Publicacion) WHERE pub.idPub IN $articulosIds CREATE (p)-[:ASOCIADO_A]->(pub) RETURN p, pub;";



module.exports = {
    add
}

