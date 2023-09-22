const get = "MATCH (p:Proyecto) RETURN p";
const add = "CREATE (p:Proyecto {idPry: $idPry, titulo_proyecto: $titulo_proyecto, anno_inicio: $anno_inicio, duracion_meses: $duracion_meses, area_conocimiento: $area_conocimiento})";
const update = "MATCH (p:Proyecto {idPry: $idPry}) SET p.titulo_proyecto = $titulo_proyecto, p.anno_inicio = $anno_inicio, p.duracion_meses = $duracion_meses, p.area_conocimiento = $area_conocimiento";

module.exports = {
    get,
    add,
    update
}

